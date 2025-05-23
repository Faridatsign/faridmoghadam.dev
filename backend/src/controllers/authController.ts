import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { validationResult } from 'express-validator';

export const login = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create admin user if it doesn't exist
export const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });

    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        password: 'admin', // This will be hashed by the pre-save hook
      });

      await admin.save();
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}; 