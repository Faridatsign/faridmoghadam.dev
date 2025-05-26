/**
 * Main application component that handles routing and layout
 * This is the root component of the application
 */

// Importing necessary components from react-router-dom for routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importing authentication related components
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
// Importing admin and project management components
import AdminPanel from './components/AdminPanel';
import ProjectOrderForm from './components/ProjectOrderForm';
// Importing main page component
import Home from './pages/Home';

function App() {
  return (
    // Router component to enable client-side routing
    <Router>
      {/* Main container with relative positioning for absolute children */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Route definitions for different pages */}
        <Routes>
          {/* Home page route - main landing page */}
          <Route path="/" element={<Home />} />
          
          {/* Login page route - authentication page */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected admin panel route - only accessible after authentication */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          
          {/* Project order form route - for submitting new projects */}
          <Route path="/order" element={<ProjectOrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
