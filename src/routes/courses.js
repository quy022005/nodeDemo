const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.get('/:id/edit', courseController.edit);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id/force', courseController.forceDestroy);
router.post('/handle-form-actions', courseController.handleFormAction);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show);

module.exports = router;