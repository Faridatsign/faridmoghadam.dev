import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownIcon, CodeBracketIcon, ChartBarIcon, CpuChipIcon, EnvelopeIcon, AcademicCapIcon, RocketLaunchIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Navbar from './components/Navbar';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import React, { useRef, useState } from 'react';
import AdminPanel from './components/AdminPanel';
import ProjectOrderForm from './components/ProjectOrderForm';

// Add this new component for animated background
const AnimatedBackground = () => {
  const lines = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    length: Math.random() * 150 + 100,
    angle: Math.random() * 360,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.7,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.length}px`,
            height: '3px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.8) 50%, rgba(59, 130, 246, 0) 100%)',
            transform: `rotate(${line.angle}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)',
          }}
          animate={{
            opacity: [0, line.opacity, 0],
            scale: [0.8, 1.2, 0.8],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      {lines.map((line) => (
        <motion.div
          key={`secondary-${line.id}`}
          className="absolute"
          style={{
            left: `${(line.x + 30) % 100}%`,
            top: `${(line.y + 20) % 100}%`,
            width: `${line.length * 0.7}px`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.6) 50%, rgba(37, 99, 235, 0) 100%)',
            transform: `rotate(${line.angle + 45}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 0 6px rgba(37, 99, 235, 0.2)',
          }}
          animate={{
            opacity: [0, line.opacity * 0.7, 0],
            scale: [0.8, 1.1, 0.8],
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: line.duration * 1.2,
            delay: line.delay + 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

function Home() {
  // Define the text content for the hero section
  const heroText = [
    "Unlock the power of",
    "AI and Machine Learning",
    "for your business.",
  ];

  // Services data - updated to reflect AI/ML focus
  const services = [
    {
      icon: <CpuChipIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />,
      title: "AI & Machine Learning Development",
      description: "Custom AI/ML model training, integration, and deployment for predictive analytics, automation, and more.",
    },
    {
      icon: <ChartBarIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />,
      title: "Data Science & Analytics",
      description: "Unlock insights from your data with advanced statistical analysis, data visualization, and reporting.",
    },
    {
      icon: <CodeBracketIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />,
      title: "Full-Stack Web & Mobile Development",
      description: "Building robust and scalable web and mobile applications tailored to your needs.",
    },
  ];

  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative flex items-center justify-center min-h-[90vh] overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/80 opacity-95" />
          <AnimatedBackground />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Farid Moghadam
              </motion.h1>
              <motion.p 
                className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Data Scientist with expertise in AI, Machine Learning, and Data Analytics. Proficient 
                in developing scalable ML models, optimizing feature engineering, and deploying deep learning frameworks. 
                Skilled in Python, R, SQL, and AWS services to drive data-driven decision-making.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="#order"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Project
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDownIcon className="h-8 w-8 text-blue-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">About Me</h2>
            <p className="text-xl text-blue-800 mb-8">
              A passionate data scientist focused on AI, machine learning, and data analytics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-50 h-full">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">My Journey</h3>
                <p className="text-blue-700 leading-relaxed">
                  I am a data scientist with a strong focus on artificial intelligence, machine learning, and data analytics. 
                  My journey into this field began with a deep fascination for how data can drive intelligent decision-making 
                  and shape real-world outcomes. Over the years I have built a diverse skill set that allows me to develop 
                  and deploy scalable machine learning models, design efficient data pipelines, and craft data-driven solutions 
                  that deliver measurable impact.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-50 h-full">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Technical Expertise</h3>
                <p className="text-blue-700 leading-relaxed">
                  Through hands-on experience across industries from telecommunications to security technology I've become 
                  proficient in working with tools and technologies like Python, R, SQL, Spark, Hadoop, and cloud services 
                  such as AWS and Azure. I have implemented deep learning models for computer vision tasks, developed NLP 
                  solutions, and optimized model performance using advanced techniques like hyperparameter tuning and feature 
                  engineering.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col gap-8"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-50 h-full">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Collaboration & Impact</h3>
                <p className="text-blue-700 leading-relaxed">
                  Collaboration is at the heart of my work. I've partnered with cross-functional teams in marketing, 
                  operations, IT, and beyond to align technical solutions with business needs. Whether building dashboards 
                  in Power BI and Tableau or engineering real-time tracking algorithms, I bring clarity, agility, and a 
                  problem-solving mindset to every project.
                </p>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-50 h-full">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">My Approach</h3>
                <p className="text-blue-700 leading-relaxed">
                  I see data not just as numbers but as a powerful tool to uncover insights, optimize systems, and create 
                  better user experiences. My approach blends technical depth with a drive to continuously learn, adapt, 
                  and contribute meaningfully to every team I'm part of.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="services" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What I Can Do For You</h2>
            <p className="text-xl text-blue-800">Cutting-edge solutions powered by modern technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: CpuChipIcon,
                title: "AI & Machine Learning",
                description: "Custom AI solutions including predictive modeling, computer vision, and natural language processing. From research paper implementation to production-ready ML models with MLOps integration.",
                color: "text-blue-600"
              },
              {
                icon: ChartBarIcon,
                title: "Data Science & Analytics",
                description: "Advanced data analysis, statistical modeling, and business intelligence solutions. Transform complex data into actionable insights using Python, R, and modern BI tools.",
                color: "text-blue-600"
              },
              {
                icon: CodeBracketIcon,
                title: "Web & Mobile Development",
                description: "Full-stack development of modern web applications and mobile apps. From responsive single-page applications to complex platforms with real-time capabilities and cloud integration.",
                color: "text-blue-600"
              },
              {
                icon: RocketLaunchIcon,
                title: "Database & Cloud Solutions",
                description: "Design and implementation of scalable database architectures and cloud infrastructure. Expert in both SQL and NoSQL databases, AWS services, and cloud-native applications.",
                color: "text-blue-600"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50 group"
              >
                <div className={`${item.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                <p className="text-blue-800 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Project Order Section */}
      <section id="order" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">
              Let's Build Your Vision
            </h2>
            <p className="text-xl text-blue-800">
              Share your project details and let's create something extraordinary together.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <ProjectOrderForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Animated Abstract Dots Background Container */}
      <div className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 w-full h-full custom-animated-gradient noise-texture z-0" />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route // Homepage is now public
            path="/"
            element={
              <>
                <Navbar />
                <main className="relative z-10">
                  <Home />
                </main>
              </>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          {/* Add other protected routes here within ProtectedRoute */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
