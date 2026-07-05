import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


// ================= REGISTER =================

router.post('/register', async (req, res) => {

  const {
    username,
    email,
    password,
  } = req.body;

  if (
    !username ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      message:
        'All fields are required',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message:
        'Password must be at least 6 characters',
    });
  }

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql =
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    db.query(
      sql,
      [
        username,
        email,
        hashedPassword,
      ],
      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json(err);
        }

        res.json({
          message:
            'User registered successfully',
        });

      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json(error);

  }
});


// ================= LOGIN =================

router.post('/login', (req, res) => {

  const {
    email,
    password,
  } = req.body;

  const sql =
    'SELECT * FROM users WHERE email = ?';

  db.query(
    sql,
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {

        return res.status(400).json({
          message: 'User not found',
        });

      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message: 'Invalid password',
        });

      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',

        token,

        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    }
  );
});


// ================= CHANGE PASSWORD =================

router.put(
  '/change-password',
  authMiddleware,
  async (req, res) => {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    try {

      const sql =
        'SELECT * FROM users WHERE id = ?';

      db.query(
        sql,
        [req.user.id],
        async (err, result) => {

          if (err) {

            return res
              .status(500)
              .json(err);

          }

          if (result.length === 0) {

            return res.status(404).json({
              message: 'User not found',
            });

          }

          const user = result[0];

          const isMatch =
            await bcrypt.compare(
              currentPassword,
              user.password
            );

          if (!isMatch) {

            return res.status(400).json({
              message:
                'Current password incorrect',
            });

          }

          const hashedPassword =
            await bcrypt.hash(
              newPassword,
              10
            );

          const updateSql =
            'UPDATE users SET password = ? WHERE id = ?';

          db.query(
            updateSql,
            [
              hashedPassword,
              req.user.id,
            ],
            (updateErr) => {

              if (updateErr) {

                return res
                  .status(500)
                  .json(updateErr);

              }

              res.json({
                message:
                  'Password changed successfully',
              });

            }
          );
        }
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          'Password change failed',
      });

    }
  }
);

export default router;