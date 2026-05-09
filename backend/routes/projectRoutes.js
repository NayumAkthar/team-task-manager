const express = require('express');

const router = express.Router();

const db = require('../db');

const verifyToken =
    require('../middleware/authMiddleware');

const isAdmin =
    require('../middleware/roleMiddleware');



// ================= CREATE PROJECT =================

router.post(
    '/',
    verifyToken,
    isAdmin,
    (req, res) => {

        try {

            const { title, description } = req.body;

            if (!title) {

                return res.status(400).json({
                    message: 'Project title required'
                });
            }

            const query = `
                INSERT INTO projects
                (title, description, created_by)
                VALUES (?, ?, ?)
            `;

            db.query(
                query,
                [
                    title,
                    description,
                    req.user.id
                ],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: 'Project created successfully',
                        projectId: result.insertId
                    });
                }
            );

        } catch (error) {

            res.status(500).json(error);
        }
    }
);



// ================= GET ALL PROJECTS =================

router.get(
    '/',
    verifyToken,
    (req, res) => {

        try {

            const query = `
                SELECT
                    projects.*,
                    users.name AS created_by_name
                FROM projects
                JOIN users
                ON projects.created_by = users.id
                ORDER BY projects.id DESC
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



// ================= ADD MEMBER TO PROJECT =================

router.post(
    '/add-member',
    verifyToken,
    isAdmin,
    (req, res) => {

        try {

            const { project_id, user_id } = req.body;

            const query = `
                INSERT INTO project_members
                (project_id, user_id)
                VALUES (?, ?)
            `;

            db.query(
                query,
                [project_id, user_id],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: 'Member added successfully'
                    });
                }
            );

        } catch (error) {

            res.status(500).json(error);
        }
    }
);


module.exports = router;