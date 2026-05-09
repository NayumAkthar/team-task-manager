const express = require('express');

const router = express.Router();

const db = require('../db');

const verifyToken =
    require('../middleware/authMiddleware');



// ================= DASHBOARD STATS =================

router.get(
    '/',
    verifyToken,
    (req, res) => {

        try {

            const totalTasksQuery = `
                SELECT COUNT(*) AS totalTasks
                FROM tasks
            `;

            const completedTasksQuery = `
                SELECT COUNT(*) AS completedTasks
                FROM tasks
                WHERE status = 'completed'
            `;

            const pendingTasksQuery = `
                SELECT COUNT(*) AS pendingTasks
                FROM tasks
                WHERE status = 'pending'
            `;

            const overdueTasksQuery = `
                SELECT COUNT(*) AS overdueTasks
                FROM tasks
                WHERE due_date < CURDATE()
                AND status != 'completed'
            `;

            db.query(totalTasksQuery, (err, totalResult) => {

                if (err) {
                    return res.status(500).json(err);
                }

                db.query(completedTasksQuery, (err, completedResult) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    db.query(pendingTasksQuery, (err, pendingResult) => {

                        if (err) {
                            return res.status(500).json(err);
                        }

                        db.query(overdueTasksQuery, (err, overdueResult) => {

                            if (err) {
                                return res.status(500).json(err);
                            }

                            res.status(200).json({

                                totalTasks:
                                    totalResult[0].totalTasks,

                                completedTasks:
                                    completedResult[0].completedTasks,

                                pendingTasks:
                                    pendingResult[0].pendingTasks,

                                overdueTasks:
                                    overdueResult[0].overdueTasks
                            });
                        });
                    });
                });
            });

        } catch (error) {

            res.status(500).json(error);
        }
    }
);


module.exports = router;