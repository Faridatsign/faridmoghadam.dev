import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    title: 'Machine Learning Solar Panel Yield | Siemens Data',
    description: 'Developed a machine learning model to analyze solar cell efficiency and predictenergy absorption using Python and Pandas. Forecasted energy storage levels for upcoming months with time-seriesanalysis and Scikit-learn. Utilized AWS SageMaker for model deployment andoptimization.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'numpy', 'Time-Series', 'Deep learning']
  },
  {
    title: 'Convolutional Neural Networks | Brain CancerClassification',
    description: 'Enhanced CNN model performance for brain cancer classification using architectures like MobileNet andResNet. Applied deep learning frameworks (TensorFlow, Keras) and computer vision tools (OpenCV) to process medicalimaging data. Improved classification accuracy by implementing feature engineering and dimensionalityreduction techniques.',
    technologies: ['Python', 'CNN', 'TensorFlow', 'OpenCV', 'Scikit-learn', 'VGG16', 'VGG19', 'MobileNet', 'ResNet', 'Neural Networks', 'Data Augmentation', 'Image-Masking']
  },
  {
    title: 'Python Movie Database',
    description: 'Built a movie database application using Python and the TMDB API to fetch movie and series data. Designed a relational database with PostgreSQL and integrated it with a RESTful API using Node.jsand Express. Created a responsive front-end interface with React and Tailwind CSS for data visualization.',
    technologies: ['Python', 'PostgreSQL', 'Relational Database', 'React', 'Node.js']
  },
  {
    title: 'Classification of COVID-19 in Chest X-Rays',
    description: 'Developed a machine learning model to classify chest X-rays into COVID-19 positive, pneumonia, or normal cases. Utilized Python libraries (Scikit-learn, TensorFlow) and feature engineering to preprocess and analyze X-ray images. Achieved high accuracy through grid search and cross-validation techniques.',
    technologies: ['Python', 'CNN', 'OpenCV', 'Scikit-learn', 'TensorFlow', 'Neural Networks']
  },
  {
    title: 'Stock Price Movement Prediction for TechnologySector',
    description: 'Predicted stock price trends for technology companies using historical data and machine learning models. Implemented forecasting algorithms with Python (NumPy, Pandas) and PyTorch for time-series analysis. Delivered actionable insights for financial decision-making using explainable AI tools (SHAP, LIME).',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Time-Series', 'Machine learning']
  },
  {
    title: 'Cryptocurrency Price Volatility Prediction',
    description: 'Predicted cryptocurrency price volatility using time-series analysis and machine learning models. Leveraged Python (Pandas, PyTorch) and historical price data for accurate forecasting. Deployed models on AWS Lambda for real-time predictions',
    technologies: ['Python', 'Pandas', 'PyTorch', 'Time-Series', 'AWS Lambda']
  }
];

const Projects = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const goToPreviousProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToNextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="projects" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">
            My Projects
          </h2>
          <p className="text-xl text-blue-800">
            Explore my featured work.
          </p>
        </div>

        {/* Dynamic Project Card Display with Controls */}
        <div className="relative flex justify-center items-center">
          {/* Navigation Arrows */}
          <button
            className="absolute left-0 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-20 -ml-4"
            onClick={goToPreviousProject}
            aria-label="Previous project"
          >
            <ChevronLeftIcon className="h-6 w-6 text-blue-600" />
          </button>

          <button
            className="absolute right-0 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-20 -mr-4"
            onClick={goToNextProject}
            aria-label="Next project"
          >
            <ChevronRightIcon className="h-6 w-6 text-blue-600" />
          </button>

          {/* Project Card Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProjectIndex}
              className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{projects[currentProjectIndex].title}</h3>
                <p className="text-gray-600 text-lg mb-6">{projects[currentProjectIndex].description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[currentProjectIndex].technologies.map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects; 