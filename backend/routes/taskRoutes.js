const express = require('express');

const router = express.Router();

const db = require('../db');

const verifyToken =
    require('../middleware/authMiddleware');

const isAdmin =
    require('../middleware/roleMiddleware');



// ================= CREATE TASK =================

router.post(
    '/',
    verifyToken,
    isAdmin,
    (req, res) => {

        try {

            const {
                title,
                description,
                due_date,
                project_id,
                assigned_to
            } = req.body;

            if (!title || !project_id) {

                return res.status(400).json({
                    message: 'Required fields missing'
                });
            }

            const query = `
                INSERT INTO tasks
                (
                    title,
                    description,
                    due_date,
                    project_id,
                    assigned_to,
                    created_by
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(
                query,
                [
                    title,
                    description,
                    due_date,
                    project_id,
                    assigned_to,
                    req.user.id
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: 'Task created successfully',
                        taskId: result.insertId
                    });
                }
            );

        } catch (error) {

            res.status(500).json(error);
        }
    }
);



// ================= GET ALL TASKS =================

router.get(
    '/',
    verifyToken,
    (req, res) => {

        try {

            const query = `
                SELECT
                    tasks.*,
                    users.name AS assigned_user,
                    projects.title AS project_name
                FROM tasks

                LEFT JOIN users
                ON tasks.assigned_to = users.id

                LEFT JOIN projects
                ON tasks.project_id = projects.id

                ORDER BY tasks.id DESC
            `;

            db.query(query, (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.status(200).json(result);
            });

        } catch (error) {

            res.status(500).json(error);
        }
    }
);



// ================= UPDATE TASK STATUS =================

router.put(
    '/:id',
    verifyToken,
    (req, res) => {

        try {

            const taskId = req.params.id;

            const { status } = req.body;

            const query = `
                UPDATE tasks
                SET status = ?
                WHERE id = ?
            `;

            db.query(
                query,
                [status, taskId],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(200).json({
                        message: 'Task updated successfully'
                    });
                }
            );

        } catch (error) {

            res.status(500).json(error);
        }
    }
);


module.exports = router;