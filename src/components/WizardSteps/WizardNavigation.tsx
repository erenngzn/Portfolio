import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  onGenerate?: () => void;
  canProceed?: boolean;
  isLastStep?: boolean;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onGenerate,
  canProceed = true,
  isLastStep = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center pt-8 border-t border-gray-200"
    >
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
          currentStep === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <div className="w-32 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {isLastStep ? (
        <button
          onClick={onGenerate}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-8 py-3 rounded-lg transition-all transform shadow-lg ${
            canProceed
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Portfolio</span>
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            canProceed
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

export default WizardNavigation;