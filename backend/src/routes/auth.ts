// Import required dependencies
import express from 'express';
import { login, changePassword } from '../controllers/authController';
import { auth } from '../middleware/auth';
import { body } from 'express-validator';

// Create Express router instance
const router = express.Router();

/**
 * Login route
 * POST /api/auth/login
 * Validates username and password
 * Returns JWT token on successful authentication
 */
router.post(
  '/login',
  [
    // Validate username field
    body('username').notEmpty().withMessage('Username is required'),
    // Validate password field
    body('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

/**
 * Change password route
 * POST /api/auth/change-password
 * Requires authentication
 * Validates current and new password
 * Updates user password if validation passes
 */
router.post('/change-password', [
  // Require authentication middleware
  auth,
  // Validate current password
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  // Validate new password with multiple rules
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('New password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('New password must contain at least one letter'),
], changePassword);

export default router; 