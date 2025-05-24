import express from 'express';
import { auth } from '../middleware/auth';
import {
  getSubmissions,
  createSubmission,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/submissionController';
import { body, param } from 'express-validator';

const router = express.Router();

// Public route - anyone can submit a project
router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('projectType').isIn(['ai-ml', 'data-science', 'web-dev', 'mobile-dev', 'database-cloud', 'other']).withMessage('Invalid project type'),
    body('budget').isIn(['small', 'medium', 'large', 'enterprise']).withMessage('Invalid budget range'),
    body('timeline').isIn(['urgent', 'normal', 'flexible']).withMessage('Invalid timeline'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  createSubmission
);

// Protected routes - only authenticated users can access these
router.get('/', auth, getSubmissions);

// Add validation middleware to the update status route
router.patch(
  '/:id/status',
  auth,
  [
    param('id').isMongoId().withMessage('Invalid submission ID'),
    body('status').isIn(['new', 'in-progress', 'completed', 'rejected']).withMessage('Invalid status value'),
  ],
  updateSubmissionStatus
);

router.delete('/:id', auth, deleteSubmission);

export default router; 