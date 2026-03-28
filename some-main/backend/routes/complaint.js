const express = require('express');
const router = express.Router();
const { createComplaint, getUserComplaints, submitComplaintFeedback } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

router.post('/', protect, requireRole('user'), createComplaint);
router.get('/user', protect, requireRole('user'), getUserComplaints);
router.patch('/:id/feedback', protect, requireRole('user'), submitComplaintFeedback);

module.exports = router;
