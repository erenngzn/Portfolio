import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const StepNavigation: React.FC = () => {
  const { currentStep, setCurrentStep } = usePortfolioStore();

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = () => {
    // This will be handled by the parent component
    window.dispatchEvent(new CustomEvent('generatePortfolio'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center pt-8 border-t border-gray-200"
    >
      <button
        onClick={handlePrevious}
        disabled={currentStep === 0}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
          currentStep === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Step {currentStep + 1} of 5</span>
      </div>

      {currentStep < 4 ? (
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          onClick={handleGenerate}
          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Portfolio</span>
        </button>
      )}
    </motion.div>
  );
};

export default StepNavigation;