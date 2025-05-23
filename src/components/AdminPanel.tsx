import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProjectSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  submittedAt: string;
}

function AdminPanel() {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load submissions from localStorage
    const storedSubmissions = localStorage.getItem('projectSubmissions');
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            Logout
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-50">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Project Submissions</h2>
          
          {submissions.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="bg-white rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">
                        {submission.firstName} {submission.lastName}
                      </h3>
                      <p className="text-blue-600">{submission.email}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(submission.submittedAt)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Project Type</p>
                      <p className="text-blue-900">{submission.projectType}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Budget Range</p>
                      <p className="text-blue-900">{submission.budget}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Timeline</p>
                      <p className="text-blue-900">{submission.timeline}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Project Description</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{submission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel; 