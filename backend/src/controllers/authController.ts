import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

/**
 * Login controller
 * Handles user authentication and JWT token generation
 * @param req - Express request object containing username and password
 * @param res - Express response object
 */
export const login = async (req: Request, res: Response) => {
  // Validate request body using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find user in database by username
    const user = await User.findOne({ username });

    // Return error if user not found
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password using bcrypt
    const isMatch = await user.comparePassword(password);

    // Return error if password doesn't match
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with user data
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '1d' }
    );

    // Return token to client
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create admin user
 * Initializes default admin user if it doesn't exist
 * Used during server startup
 */
export const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ username: 'admin' });

    // Create admin user if it doesn't exist
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        password: 'admin', // Password will be hashed by pre-save hook
      });

      await admin.save();
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

/**
 * Change password controller
 * Allows authenticated users to change their password
 * @param req - Express request object containing current and new password
 * @param res - Express response object
 */
export const changePassword = async (req: Request, res: Response) => {
  try {
    // Extract passwords from request body
    const { currentPassword, newPassword } = req.body;
    // Get JWT token from authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify JWT token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
    // Find user by ID
    const user = await User.findById(decoded.id);

    // Return error if user not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Return success message
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 