const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
const checkAdmin = require('../app/middleware/permission');
router.get('/show',checkAdmin,courseController.index);
router.get('/total',courseController.total);
router.post('/create',courseController.create);

module.exports = router;