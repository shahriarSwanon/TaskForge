import express from 'express';
import db from '../config/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, (req, res) => {
  const {
    title,
    description,
    priority,
    due_date,
    category,
  } = req.body;

  const user_id = req.user.id;

  const sql = `
    INSERT INTO tasks
    (
      user_id,
      title,
      description,
      priority,
      due_date,
      category
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      title,
      description,
      priority,
      due_date,
      category,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: 'Task created successfully',
      });
    }
  );
});

router.get('/', authMiddleware, (req, res) => {
  const sql = `
    SELECT * FROM tasks
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(
    sql,
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

router.put(
  '/update/:id',
  authMiddleware,
  (req, res) => {
    const {
      title,
      description,
      priority,
      due_date,
    } = req.body;

    const sql = `
      UPDATE tasks
      SET
        title = ?,
        description = ?,
        priority = ?,
        due_date = ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [
        title,
        description,
        priority,
        due_date,
        req.params.id,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: 'Task updated successfully',
        });
      }
    );
  }
);

router.put(
  '/toggle/:id',
  authMiddleware,
  (req, res) => {
    const sql = `
      UPDATE tasks
      SET status =
        CASE
          WHEN status = 'completed'
          THEN 'pending'
          ELSE 'completed'
        END
      WHERE id = ?
    `;

    db.query(
      sql,
      [req.params.id],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: 'Task status updated',
        });
      }
    );
  }
);

router.delete(
  '/:id',
  authMiddleware,
  (req, res) => {
    const sql =
      'DELETE FROM tasks WHERE id = ?';

    db.query(
      sql,
      [req.params.id],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          message: 'Task deleted successfully',
        });
      }
    );
  }
);

export default router;