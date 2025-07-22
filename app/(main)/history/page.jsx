//for old go to old/history
'use client'
import React, { useEffect, useState } from 'react'
import { Clock, FileText, Trash2, Copy, Check } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer';

const MAX_PROMPT_PREVIEW = 120;

const History = () => {
  const [prompts, setPrompts] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("textPromptHistory") || "[]");
    setPrompts(stored);
  }, []);

  const handleCopy = async (prompt, index) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedPrompts = prompts.filter((_, index) => index !== indexToDelete);
    setPrompts(updatedPrompts);
    localStorage.setItem("textPromptHistory", JSON.stringify(updatedPrompts));
  };

  const clearAllHistory = () => {
    setPrompts([]);
    localStorage.setItem("textPromptHistory", JSON.stringify([]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar /> {/* ✅ Added at the very top */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Prompt History</h1>
            </div>
            <p className="text-gray-600 text-lg">Review and manage your previous text prompts</p>
          </div>
          {prompts.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{prompts.length}</div>
                <div className="text-sm text-gray-600">Total Prompts</div>
              </div>
              <button
                onClick={clearAllHistory}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear All History</span>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {prompts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-md mx-auto">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No prompt history found</h3>
              <p className="text-gray-600">
                Start creating prompts to see your history here!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {prompts.map((prompt, idx) => {
              const isLong = prompt.length > MAX_PROMPT_PREVIEW;
              const isExpanded = expanded[idx];
              return (
                <div key={idx} className="group bg-white shadow-sm hover:shadow-md rounded-xl border border-gray-200 transition-all duration-200 overflow-hidden flex flex-col h-full min-h-[120px]">
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        #{prompts.length - idx}
                      </span>
                      <span className="text-sm text-gray-500">
                        Prompt {idx + 1}
                      </span>
                    </div>
                    <p className={`text-gray-900 leading-relaxed break-words flex-1 text-sm ${!isExpanded && isLong ? 'line-clamp-3' : ''}`}
                      style={{ minHeight: '3.5em' }}>
                      {isExpanded || !isLong ? prompt : prompt.slice(0, MAX_PROMPT_PREVIEW) + '...'}
                    </p>
                    {isLong && (
                      <button
                        className="mt-2 text-blue-600 hover:underline text-xs self-start"
                        onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      >
                        {isExpanded ? 'View Less' : 'View More'}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleCopy(prompt, idx)}
                      className="flex items-center space-x-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Copy prompt"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="flex items-center space-x-1 px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete prompt"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default History;
