import bcrypt from 'bcryptjs';
import db from '../config/db.js';

export const changePassword = (
  req,
  res
) => {

  const {
    currentPassword,
    newPassword,
  } = req.body;

  const userId = req.user.id;

  const sql =
    'SELECT * FROM users WHERE id = ?';

  db.query(
    sql,
    [userId],
    async (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: 'Server error',
        });

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
        [hashedPassword, userId],
        (updateErr) => {

          if (updateErr) {

            console.log(updateErr);

            return res.status(500).json({
              message:
                'Password update failed',
            });

          }

          res.json({
            message:
              'Password changed successfully',
          });

        }
      );
    }
  );
};