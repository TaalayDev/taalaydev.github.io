import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'sending', 'success', 'error'
  
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? null : 'Name is required';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) 
          ? null 
          : 'Please enter a valid email';
      case 'subject':
        return value.trim() ? null : 'Subject is required';
      case 'message':
        return value.trim().length > 10 
          ? null 
          : 'Message should be at least 10 characters';
      default:
        return null;
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const handleFocus = (name) => {
    setFocused(name);
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFocused(null);
    
    // Validate on blur
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formState).forEach(field => {
      const error = validateField(field, formState[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
    setSubmitStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
      
      {submitStatus === 'success' ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex items-center animate-fadeIn">
          <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <p className="font-medium text-green-800">Message sent successfully!</p>
            <p className="text-sm text-green-600">I'll get back to you soon.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div 
              className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
                errors.name ? 'border-red-300' : 
                focused === 'name' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-300'
              }`}
            >
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                value={formState.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className="block w-full px-4 pt-5 pb-1 text-base text-gray-900 placeholder-transparent focus:outline-none bg-transparent"
              />
              <label 
                htmlFor="name"
                className={`absolute left-4 transition-all duration-200 ${
                  formState.name || focused === 'name' 
                    ? 'top-1 text-xs text-blue-500' 
                    : 'top-3 text-base text-gray-500'
                }`}
              >
                Your Name
              </label>
            </div>
            {errors.name && (
              <p className="text-xs text-red-500 pl-1 animate-slideIn">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <div 
              className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
                errors.email ? 'border-red-300' : 
                focused === 'email' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-300'
              }`}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={formState.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                className="block w-full px-4 pt-5 pb-1 text-base text-gray-900 placeholder-transparent focus:outline-none bg-transparent"
              />
              <label 
                htmlFor="email"
                className={`absolute left-4 transition-all duration-200 ${
                  formState.email || focused === 'email' 
                    ? 'top-1 text-xs text-blue-500' 
                    : 'top-3 text-base text-gray-500'
                }`}
              >
                Email Address
              </label>
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 pl-1 animate-slideIn">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <div 
              className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
                errors.subject ? 'border-red-300' : 
                focused === 'subject' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-300'
              }`}
            >
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder=" "
                value={formState.subject}
                onChange={handleChange}
                onFocus={() => handleFocus('subject')}
                onBlur={handleBlur}
                className="block w-full px-4 pt-5 pb-1 text-base text-gray-900 placeholder-transparent focus:outline-none bg-transparent"
              />
              <label 
                htmlFor="subject"
                className={`absolute left-4 transition-all duration-200 ${
                  formState.subject || focused === 'subject' 
                    ? 'top-1 text-xs text-blue-500' 
                    : 'top-3 text-base text-gray-500'
                }`}
              >
                Subject
              </label>
            </div>
            {errors.subject && (
              <p className="text-xs text-red-500 pl-1 animate-slideIn">{errors.subject}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <div 
              className={`relative border rounded-lg overflow-hidden transition-all duration-300 ${
                errors.message ? 'border-red-300' : 
                focused === 'message' ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-300'
              }`}
            >
              <textarea
                name="message"
                id="message"
                rows="4"
                placeholder=" "
                value={formState.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className="block w-full px-4 pt-5 pb-2 text-base text-gray-900 placeholder-transparent focus:outline-none bg-transparent resize-none"
              />
              <label 
                htmlFor="message"
                className={`absolute left-4 transition-all duration-200 ${
                  formState.message || focused === 'message' 
                    ? 'top-1 text-xs text-blue-500' 
                    : 'top-3 text-base text-gray-500'
                }`}
              >
                Your Message
              </label>
            </div>
            {errors.message && (
              <p className="text-xs text-red-500 pl-1 animate-slideIn">{errors.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            disabled={submitStatus === 'sending'}
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
              submitStatus === 'sending'
                ? 'bg-blue-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-98'
            }`}
          >
            {submitStatus === 'sending' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;