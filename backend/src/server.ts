// Import required dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import submissionRoutes from './routes/submissions';
import { createAdminUser } from './controllers/authController';

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Configure middleware
// Enable CORS for cross-origin requests
app.use(cors());
// Parse JSON request bodies
app.use(express.json());

// Set server port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Configure MongoDB connection
// Use environment variable for MongoDB URI or default to local database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

// Connect to MongoDB database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Initialize admin user if it doesn't exist
    createAdminUser();
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Define API routes
// Authentication routes for login and user management
app.use('/api/auth', authRoutes);
// Submission routes for handling form submissions
app.use('/api/submissions', submissionRoutes);

// Root route for API health check
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running');
});

// Start the server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 