import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './components/AdminPanel';
import ProjectOrderForm from './components/ProjectOrderForm';
import Home from './pages/Home';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground excludeHero={true} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/order" element={<ProjectOrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
