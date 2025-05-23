# Portfolio Backend

This is the backend for the portfolio website with a project submission system. It provides API endpoints for authentication and managing project submissions.

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT Authentication

## Features

- User authentication (admin login)
- Project submission management
- RESTful API
- MongoDB database integration
- JWT-based authentication

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
   For MongoDB Atlas, replace the MONGODB_URI with your connection string.

### Running the Application

#### Development Mode

```
npm run dev
```

This will start the server in development mode with hot reloading.

#### Production Mode

```
npm run build
npm start
```

This will build the TypeScript files and start the server in production mode.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with username and password

### Project Submissions

- `POST /api/submissions` - Create a new project submission (public)
- `GET /api/submissions` - Get all submissions (protected)
- `PATCH /api/submissions/:id/status` - Update submission status (protected)
- `DELETE /api/submissions/:id` - Delete a submission (protected)

## Default Admin Credentials

- Username: `admin`
- Password: `admin`

**Note:** Change these credentials in production!

## Deployment

This backend can be deployed to various platforms:

- Render.com (recommended for free tier)
- Heroku
- AWS
- DigitalOcean

## Connecting to Frontend

Update your frontend API calls to point to this backend server. For local development, the API will be available at `http://localhost:5000/api/`. 