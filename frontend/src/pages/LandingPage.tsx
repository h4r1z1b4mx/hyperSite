import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';

const LandingPage = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Wand2 className="h-16 w-16 text-indigo-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Create Your Dream Website
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Describe your website vision, and let AI transform it into reality.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your website (e.g., 'Create a modern portfolio website with a dark theme, featuring my photography work')"
                className="w-full h-32 px-4 py-3 text-gray-300 bg-gray-800 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
            >
              Generate Website
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;