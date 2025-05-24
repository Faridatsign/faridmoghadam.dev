// src/components/ProjectOrderForm.tsx

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, AcademicCapIcon, RocketLaunchIcon, ChevronLeftIcon, ChevronRightIcon, CpuChipIcon, ChartBarIcon, CodeBracketIcon } from '@heroicons/react/24/outline'; // Assuming these are used in the form, if not remove

function ProjectOrderForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Validation
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const city = formData.get('city') as string;
    const country = formData.get('country') as string;

    // Name validation
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
    if (!nameRegex.test(firstName)) {
      setError('First name should be 2-50 characters long and contain only letters and spaces');
      return;
    }
    if (!nameRegex.test(lastName)) {
      setError('Last name should be 2-50 characters long and contain only letters and spaces');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // City validation (optional)
    if (city && !/^[a-zA-Z\u0600-\u06FF\s]{2,50}$/.test(city)) {
      setError('City name should be 2-50 characters long and contain only letters and spaces');
      return;
    }

    // Country validation
    const countryRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/;
    if (!countryRegex.test(country)) {
      setError('Country name should be 2-50 characters long and contain only letters and spaces');
      return;
    }
    
    const submission = {
      firstName,
      lastName,
      email,
      city,
      country,
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      timeline: formData.get('timeline'),
      description: formData.get('description'),
    };

    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit project');
      }

      // Reset form before showing success message
      if (formRef.current) {
        formRef.current.reset();
      }
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the project');
      console.error('Error submitting project:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center shadow-lg transition-all duration-300 mb-6">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
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
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-blue-100">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="firstName" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">First Name *</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    required 
                    pattern="[a-zA-Z\u0600-\u06FF\s]{2,50}"
                    title="2-50 characters, letters and spaces only"
                    className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" 
                    placeholder="Enter your first name" 
                  />
                </div>
                <div className="group">
                  <label htmlFor="lastName" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Last Name *</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    required 
                    pattern="[a-zA-Z\u0600-\u06FF\s]{2,50}"
                    title="2-50 characters, letters and spaces only"
                    className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" 
                    placeholder="Enter your last name" 
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    title="Please enter a valid email address"
                    className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" 
                    placeholder="Enter your email address" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label htmlFor="country" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Country *</label>
                    <input 
                      type="text" 
                      id="country" 
                      name="country" 
                      required 
                      pattern="[a-zA-Z\u0600-\u06FF\s]{2,50}"
                      title="2-50 characters, letters and spaces only"
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" 
                      placeholder="Enter your country" 
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="city" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">City</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      pattern="[a-zA-Z\u0600-\u06FF\s]{2,50}"
                      title="2-50 characters, letters and spaces only"
                      className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white" 
                      placeholder="City (optional)" 
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Project Information */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b border-blue-100">Project Details</h3>
              <div className="space-y-6">
                <div className="group">
                  <label htmlFor="projectType" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Project Type *</label>
                  <select id="projectType" name="projectType" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white appearance-none">
                    <option value="">Select a project type</option>
                    <option value="ai-ml">AI & Machine Learning</option>
                    <option value="data-science">Data Science & Analytics</option>
                    <option value="web-dev">Web Development</option>
                    <option value="mobile-dev">Mobile App Development</option>
                    <option value="database-cloud">Database & Cloud Solutions</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="budget" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Budget Range *</label>
                  <select id="budget" name="budget" required className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white/50 hover:bg-white appearance-none">
                    <option value="">Select a budget range</option>
                    <option value="very-small">€100 - €500</option>
                    <option value="small">€500 - €1,000</option>
                    <option value="medium">€1,000 - €5,000</option>
                    <option value="large">€5,000 - €10,000</option>
                    <option value="very-large">€10,000 - €25,000</option>
                    <option value="enterprise">€25,000+</option>
                  </select>
                </div>
                <div className="group">
                  <label htmlFor="timeline" className="block text-sm font-medium text-blue-700 mb-1 group-hover:text-blue-600 transition-colors">Expected Timeline *</label>
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

export default ProjectOrderForm; 