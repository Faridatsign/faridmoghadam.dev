import React from 'react'
import ProjectOrderForm from '../components/ProjectOrderForm'

// Contact component that displays the contact form and information
const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-6">
            Let's Build Your Vision
          </h2>
          <p className="text-xl text-blue-800">
            Share your project details and let's create something extraordinary together.
          </p>
        </div>

        {/* Contact form container */}
        <div className="max-w-5xl mx-auto">
          <ProjectOrderForm />
        </div>
      </div>
    </section>
  )
}

export default Contact 