import express from 'express';
import db from '../config/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  (req, res) => {
    const sql = `
      SELECT
        id,
        username,
        email,
        profile_image
      FROM users
      WHERE id = ?
    `;

    db.query(
      sql,
      [req.user.id],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json(result[0]);
      }
    );
  }
);

router.put(
  '/update',
  authMiddleware,
  (req, res) => {
    const {
      username,
      email,
      profile_image,
    } = req.body;

    const sql = `
      UPDATE users
      SET
        username = ?,
        email = ?,
        profile_image = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        username,
        email,
        profile_image,
        req.user.id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message:
            'Profile updated successfully',
        });
      }
    );
  }
);

export default router;