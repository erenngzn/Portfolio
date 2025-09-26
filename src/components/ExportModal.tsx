import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Code, Eye, Github, Globe } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { generatePortfolioCode, downloadPortfolio } from '../utils/codeGenerator';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const { data } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'js'>('preview');
  const [isDownloading, setIsDownloading] = useState(false);

  const { html, css, js } = generatePortfolioCode(data as any);

  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
    downloadPortfolio(data as any);
    setIsDownloading(false);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Portfolio Export</h2>
                <p className="text-gray-600">Preview and download your generated portfolio</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                title="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === 'html'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>HTML</span>
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === 'css'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>CSS</span>
              </button>
              <button
                onClick={() => setActiveTab('js')}
                className={`flex items-center space-x-2 px-6 py-3 font-medium transition-colors ${
                  activeTab === 'js'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>JavaScript</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
              {activeTab === 'preview' && (
                <div className="h-full p-4">
                  <iframe
                    srcDoc={html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`).replace('<script src="script.js"></script>', `<script>${js}</script>`)}
                    className="w-full h-[600px] border border-gray-300 rounded-lg bg-white"
                    title="Portfolio Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              )}
              
              {activeTab !== 'preview' && (
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">
                      {activeTab.toUpperCase()} Code
                    </span>
                    <button
                      onClick={() => copyToClipboard(
                        activeTab === 'html' ? html : activeTab === 'css' ? css : js
                      )}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Copy Code
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <pre className="h-full p-4 overflow-auto bg-gray-900 text-gray-100 text-sm leading-relaxed">
                    <code>
                      {activeTab === 'html' ? html : activeTab === 'css' ? css : js}
                    </code>
                  </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Ready to deploy?</p>
                  <p>Upload to GitHub, Netlify, Vercel, or any web hosting service.</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isDownloading ? 'Downloading...' : 'Download Files'}</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Deployment Options */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Quick Deploy Options:</p>
                <div className="flex space-x-4">
                  <a
                    href="https://pages.github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Pages</span>
                  </a>
                  <a
                    href="https://netlify.com/drop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Netlify</span>
                  </a>
                  <a
                    href="https://vercel.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Vercel</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExportModal;