import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectSubmission {
  _id: string;  // Changed from id to _id for MongoDB
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  createdAt: string;  // Changed from submittedAt to createdAt
  status: 'new' | 'in-progress' | 'completed' | 'rejected';
}

function AdminPanel() {
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [deleteAlert, setDeleteAlert] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; id: string | null }>({ show: false, id: null });
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const navigate = useNavigate();

  // Add mapping objects for display values
  const projectTypeMap: { [key: string]: string } = {
    'web': 'Web Development',
    'mobile': 'Mobile App',
    'data': 'Data Science',
    'ml': 'Machine Learning',
    'other': 'Other'
  };

  const budgetMap: { [key: string]: string } = {
    'small': '$1,000 - $5,000',
    'medium': '$5,000 - $10,000',
    'large': '$10,000 - $25,000',
    'enterprise': '$25,000+'
  };

  const timelineMap: { [key: string]: string } = {
    'urgent': 'Urgent (1-2 weeks)',
    'normal': 'Normal (1-3 months)',
    'flexible': 'Flexible (3+ months)'
  };

  const handleDelete = async (id: string) => {
    setDeleteModal({ show: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/submissions/${deleteModal.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSubmissions(submissions.filter(sub => sub._id !== deleteModal.id));
        setDeleteAlert({ show: true, message: 'Submission deleted successfully' });
        setTimeout(() => setDeleteAlert({ show: false, message: '' }), 3000);
      } else {
        console.error('Failed to delete submission:', response.statusText);
        setDeleteAlert({ show: true, message: 'Failed to delete submission. Please try again.' });
        setTimeout(() => setDeleteAlert({ show: false, message: '' }), 3000);
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      setDeleteAlert({ show: true, message: 'An error occurred while deleting the submission.' });
      setTimeout(() => setDeleteAlert({ show: false, message: '' }), 3000);
    } finally {
      setDeleteModal({ show: false, id: null });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordSuccess(true);
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setTimeout(() => {
          setPasswordModal(false);
          setPasswordSuccess(false);
        }, 2000);
      } else {
        setPasswordError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setPasswordError('An error occurred while changing password');
    }
  };

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        // If no token, redirect to login (though ProtectedRoute should handle this)
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/submissions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          // Handle errors (e.g., token expired or invalid)
          console.error('Failed to fetch submissions:', response.status, response.statusText);
          // Optionally clear token and redirect to login on certain errors (e.g., 401)
           if (response.status === 401) {
             localStorage.removeItem('token');
             navigate('/login');
           }
           // Display a user-friendly error message on the UI if needed
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
        // Handle network errors
        // Display a user-friendly error message on the UI if needed
      }
    };

    fetchSubmissions();
  }, [navigate]); // Depend on navigate to avoid lint warnings, although it's stable

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/'); // Navigate to homepage after logout
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Success/Error Alert */}
      <AnimatePresence>
        {deleteAlert.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg ${
              deleteAlert.message.includes('successfully') 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {deleteAlert.message.includes('successfully') ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span>{deleteAlert.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this submission? This action cannot be undone.</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteModal({ show: false, id: null })}
                  className="px-4 py-2 bg-white text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Password Modal */}
      <AnimatePresence>
        {passwordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-200"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-700 mb-2">Change Password</h3>
                <p className="text-gray-600 text-sm">Enter your new password</p>
              </div>

              {passwordSuccess ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-green-100 border border-green-400 text-green-700 rounded-xl p-4 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Password changed successfully!
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-5">
                  {passwordError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                    >
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {passwordError}
                    </motion.div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-blue-700">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-blue-700">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="newPassword"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                        placeholder="Enter new password"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Password must be at least 6 characters long and contain at least one number and one letter
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-700">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder:text-gray-400"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setPasswordModal(false)}
                      className="px-6 py-3 bg-white text-blue-700 font-medium rounded-xl transition-colors duration-200 border border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-700 text-white font-medium rounded-xl hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-lg"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-900">Admin Panel</h1>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="px-6 py-2 bg-white text-blue-700 font-medium rounded-xl transition-colors duration-200 border border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              Back to Home
            </Link>
            <button
              onClick={() => setPasswordModal(true)}
              className="px-6 py-2 bg-white text-blue-700 font-medium rounded-xl transition-colors duration-200 border border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transform hover:scale-105 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Project Submissions</h2>
          
          {submissions.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No submissions yet</p>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">
                        {submission.firstName} {submission.lastName}
                      </h3>
                      <p className="text-blue-600">{submission.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Project Type</p>
                      <p className="text-blue-900">{projectTypeMap[submission.projectType] || submission.projectType}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Budget Range</p>
                      <p className="text-blue-900">{budgetMap[submission.budget] || submission.budget}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Timeline</p>
                      <p className="text-blue-900">{timelineMap[submission.timeline] || submission.timeline}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm font-medium text-blue-700">Submission Date</p>
                      <p className="text-blue-900">{formatDate(submission.createdAt)}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Project Description</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{submission.description}</p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(submission._id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 border border-red-200 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                      title="Delete submission"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
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