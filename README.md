# Farid Moghadam - Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Node.js. This project showcases professional experience, skills, and projects in data science and software development.

## Project Structure

```
faridmoghadam.dev/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   │   ├── AnimatedSymbols.tsx    # Animated background symbols
│   │   ├── Navbar.tsx            # Navigation bar component
│   │   ├── Skills.tsx            # Skills section component
│   │   ├── Projects.tsx          # Projects showcase component
│   │   ├── Footer.tsx            # Footer component
│   │   ├── Login.tsx             # Login form component
│   │   ├── ProtectedRoute.tsx    # Route protection component
│   │   └── AdminPanel.tsx        # Admin dashboard component
│   ├── pages/              # Page components
│   │   ├── Home.tsx             # Main landing page
│   │   ├── About.tsx            # About section
│   │   ├── Services.tsx         # Services section
│   │   └── Contact.tsx          # Contact form
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── backend/                # Backend source code
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
├── public/                # Static assets
└── package.json           # Project dependencies
```

## Frontend Architecture

The frontend is built using:
- **React**: For building the user interface
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For styling and responsive design
- **Framer Motion**: For smooth animations and transitions
- **React Router**: For client-side routing

### Key Features
1. **Responsive Design**: Adapts to all screen sizes
2. **Modern UI**: Clean and professional interface
3. **Animations**: Smooth transitions and interactive elements
4. **Performance**: Optimized for fast loading and smooth interactions

## Backend Architecture

The backend is built using:
- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database
- **JWT**: Authentication

### API Endpoints
- `/api/auth`: Authentication routes
- `/api/projects`: Project management
- `/api/contact`: Contact form submission
- `/api/admin`: Admin panel operations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/faridmoghadam.dev.git
cd faridmoghadam.dev
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Set up environment variables:
Create a `.env` file in the backend directory with:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Start the development servers:

Frontend:
```bash
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Development

### Frontend Development
- Components are organized by feature and reusability
- Styling uses Tailwind CSS utility classes
- Animations are implemented using Framer Motion
- TypeScript interfaces ensure type safety

### Backend Development
- RESTful API architecture
- Middleware for authentication and error handling
- MongoDB models for data structure
- Environment variables for configuration

## Deployment

The project is configured for deployment on Vercel:
- Frontend: Automatic deployment from main branch
- Backend: Deployed on a separate server
- Environment variables are configured in Vercel dashboard

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Technologies Used

### Frontend
- React.js
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- HeadlessUI
- HeroIcons
- React Icons
- PostCSS
- ESLint
- Prettier

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Express Validator
- CORS
- Dotenv

### Development Tools
- Git
- npm
- MongoDB Compass
- Postman/Insomnia
- VS Code
