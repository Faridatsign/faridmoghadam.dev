import React from 'react'
import { motion } from 'framer-motion'

// About component that displays personal information and journey
const About: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header with title and subtitle */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">About Me</h2>
          <p className="text-xl text-blue-800 mb-8">
            A passionate data scientist focused on AI, machine learning, and data analytics.
          </p>
        </div>
        
        {/* Grid layout for about content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column with journey and expertise */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* Journey card */}
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
            
            {/* Technical expertise card */}
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

          {/* Right column with collaboration and approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Collaboration card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-50 h-full">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Collaboration & Impact</h3>
              <p className="text-blue-700 leading-relaxed">
                Collaboration is at the heart of my work. I've partnered with cross-functional teams in marketing, 
                operations, IT, and beyond to align technical solutions with business needs. Whether building dashboards 
                in Power BI and Tableau or engineering real-time tracking algorithms, I bring clarity, agility, and a 
                problem-solving mindset to every project.
              </p>
            </div>
            
            {/* Approach card */}
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
  )
}

export default About 