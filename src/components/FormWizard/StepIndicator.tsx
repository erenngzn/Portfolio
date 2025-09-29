import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

interface StepIndicatorProps {
  onBack?: () => void;
}

const steps = [
  'Personal Info',
  'About Me',
  'Experience',
  'Projects',
  'Social & Contact',
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ onBack }) => {
  const { currentStep } = usePortfolioStore();

  return (
    <div className="space-y-6">
      {/* Back to Theme Selection Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Theme Selection</span>
        </button>
      )}
      
      {/* Step Progress */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-2">
          <span>Step 3 of 3</span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div className="w-full bg-blue-600 rounded-full h-2"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Build Your Portfolio</h2>
        <p className="text-gray-600">Add your information to create your professional portfolio</p>
      </div>
      
      {/* Form Steps */}
      <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          <div className="flex items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                index <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </motion.div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 mx-4">
              <div className="h-0.5 bg-gray-200">
                <motion.div
                  className="h-full bg-blue-600"
                  initial={{ width: '0%' }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default StepIndicator;