import React from 'react'
import { motion } from 'framer-motion'
import { CodeBracketIcon, ChartBarIcon, CpuChipIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

// Services component that displays the services offered
const Services: React.FC = () => {
  // Array of service items with their details
  const services = [
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
  ]

  return (
    <section id="services" className="py-20 sm:py-32 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">What I Can Do For You</h2>
          <p className="text-xl text-blue-800">Cutting-edge solutions powered by modern technology</p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50 group"
            >
              {/* Service icon */}
              <div className={`${service.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-12 w-12" />
              </div>
              
              {/* Service title */}
              <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>
              
              {/* Service description */}
              <p className="text-blue-800 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services 