import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function ProjectOrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const submission = {
      id: Date.now().toString(),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      description: formData.get('description'),
      submittedAt: new Date().toISOString()
    };

    // Get existing submissions
    const existingSubmissions = localStorage.getItem('projectSubmissions');
    const submissions = existingSubmissions ? JSON.parse(existingSubmissions) : [];
    
    // Add new submission
    submissions.push(submission);
    
    // Save updated submissions
    localStorage.setItem('projectSubmissions', JSON.stringify(submissions));
    
    // Reset form
    // e.currentTarget.reset();
    
    // Set submitted state to true instead of showing alert
    setIsSubmitted(true);

    // Note: The current implementation saves to localStorage. 
    // To save to your backend API, you would replace the localStorage logic here
    // with an asynchronous fetch or axios call to your POST /api/submissions endpoint.
    // You would also handle success/error responses from the backend API.
  };

  return (
    <div className="max-w-5xl mx-auto">
      {isSubmitted ? (
        // Render a success message when submitted
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center shadow-lg transition-all duration-300">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Thank you for your project submission. We will get back to you soon.</span>
          {/* Optional: Add a button to submit another form */}
          {/* <button onClick={() => setIsSubmitted(false)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Submit Another</button> */}
        </div>
      ) : (
        // Render the form when not submitted
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-blue-100">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="firstName" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">First Name</label>
                  <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" placeholder="John" />
                </div>
                <div className="group">
                  <label htmlFor="lastName" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" placeholder="Doe" />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Email</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" placeholder="john@example.com" />
                </div>
              </div>
            </div>
            {/* Project Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-blue-100">Project Details</h3>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="projectType" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Project Type</label>
                  <select id="projectType" name="projectType" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white appearance-none">
                    <option value="">Select a project type</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="data">Data Science</option>
                    <option value="ml">Machine Learning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="budget" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Budget Range</label>
                  <select id="budget" name="budget" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white appearance-none">
                    <option value="">Select a budget range</option>
                    <option value="small">$1,000 - $5,000</option>
                    <option value="medium">$5,000 - $10,000</option>
                    <option value="large">$10,000 - $25,000</option>
                    <option value="enterprise">$25,000+</option>
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="timeline" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Expected Timeline</label>
                  <select id="timeline" name="timeline" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white appearance-none">
                    <option value="">Select a timeline</option>
                    <option value="urgent">Urgent (1-2 weeks)</option>
                    <option value="normal">Normal (1-3 months)</option>
                    <option value="flexible">Flexible (3+ months)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Project Description */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50">
            <h3 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-blue-100">Project Description</h3>
            <div className="group">
              <textarea id="description" name="description" rows={6} required placeholder="Please describe your project in detail. Include any specific requirements, features, or technologies you'd like to use." className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white resize-none"></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg hover:shadow-xl">Submit Project Request</button>
          </div>
        </form>
      )}
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative flex items-center justify-center min-h-[90vh] overflow-hidden py-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 custom-animated-gradient"/>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
                Farid Moghadam
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto">
              Data Scientist with expertise in AI, Machine Learning, and Data Analytics. Proficient 
              in developingscalable ML models, optimizing feature engineering, and deploying deep learning frameworks. 
              Skilledin Python, R, SQL, and AWS services to drive data-drivendecision-making.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="#order"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDownIcon className="h-8 w-8 text-blue-500 animate-bounce" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CodeBracketIcon,
                title: "Web Technologies",
                description: "Modern web development using the latest frameworks and tools. From responsive single-page applications to complex web platforms with real-time capabilities and cloud integration.",
                color: "text-blue-600"
              },
              {
                icon: ChartBarIcon,
                title: "Data Science",
                description: "Advanced data analysis and machine learning solutions. Transform raw data into valuable insights, build predictive models, and create intelligent systems that learn from your data.",
                color: "text-blue-600"
              },
              {
                icon: CpuChipIcon,
                title: "Computer Vision",
                description: "State-of-the-art computer vision solutions for image and video processing. From object detection and recognition to automated visual inspection and augmented reality applications.",
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
