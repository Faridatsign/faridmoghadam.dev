import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'
import About from './About'
import Services from './Services'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from './Contact'
import Footer from '../components/Footer'
import AnimatedSymbols from '../components/AnimatedSymbols'

// Main Home component that combines all sections
const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Navigation bar */}
      <Navbar />

      {/* Hero section with animated background */}
      <section id="hero" className="relative flex items-center justify-center min-h-[90vh] overflow-hidden py-20">
        {/* Background gradient and effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/80 opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/30 via-transparent to-transparent" />
          <AnimatedSymbols />
        </div>
        
        {/* Hero content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main title */}
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-600 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Farid Moghadam
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Data Scientist with expertise in AI, Machine Learning, and Data Analytics. Proficient 
                in developing scalable ML models, optimizing feature engineering, and deploying deep learning frameworks. 
                Skilled in Python, R, SQL, and AWS services to drive data-driven decision-making.
              </motion.p>

              {/* Call to action button */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="#contact"
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

        {/* Scroll indicator */}
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

      {/* About section */}
      <section id="about">
        <About />
      </section>

      {/* Services section */}
      <section id="services">
        <Services />
      </section>

      {/* Skills section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Projects section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Contact section */}
      <section id="order">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home 