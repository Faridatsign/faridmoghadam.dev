import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  {
    category: "Front-end Development",
    items: [
      "React",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3 | Tailwind CSS",
      "Responsive Design",
      "UI/UX Principles"
    ]
  },
  {
    category: "Back-end Development",
    items: [
      "Node.js",
      "Python",
      "SQL (PostgreSQL, MySQL, MS SQL Server)",
      "NoSQL Databases (MongoDB, Firebase)",
      "RESTful API Development",
      "Authentication & Authorization"
    ]
  },
  {
    category: "AI & Machine Learning",
    items: [
      "Convolutional Neural Network (OpenCV)",
      "Deep Learning | Machine Learning",
      "Natural Language Processing (NLP)",
      "Large Language Models (LLMs), Prompt Engineering",
      "Model Optimization (Grid Search and Hyperparameter Tuning with Scikit-learn)",
      "Machine Learning Forecasting (Random Forest, Gradient Boosting, Deep Learning)",
      "Feature Engineering (Missing Value Handling, Scaling & Normalization, Feature Transformation, Feature Creation, Outlier Handling, ...)",
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      "Cloud Platforms (AWS, Microsoft Azure)",
      "Cloud Services (EC2, S3, Lambda, RDS, Kubernetes)",
      "Big Data Processing (Apache Spark, Hadoop)",
      "ETL Processes (Building and optimizing data pipelines for warehouse integration)",
      "Docker",
      "CI/CD (GitHub, GitLab)",
      "MLOps",
    ]
  },
   {
    category: "Data Analysis & Visualization",
    items: [
      "Data Visualization with Tableau, Power BI, or Python (Matplotlib, Seaborn)",
      "R",
      "Statistical Analysis",
      "Data Cleaning & Preprocessing",
      "Modeling"
    ]
  },
  {
    category: "Tools & Methodologies",
    items: [
      "Agile / Scrum",
      "Microsoft Office (Excel, Dynamics 365)",
      "Git Version Control",
      "Problem Solving",
      "Project Management"
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Skills</h2>
          <p className="text-xl text-gray-600">Expertise across multiple domains</p>
          <motion.a
            href="/assets/cv"
            download="Farid_Moghadam_Resume.pdf"
            className="mt-8 inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <h3 className="text-2xl font-semibold text-blue-600 mb-6 pb-2 border-b border-gray-100">
                {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    className="flex items-start text-gray-700 hover:text-blue-600 transition-colors duration-200 leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 