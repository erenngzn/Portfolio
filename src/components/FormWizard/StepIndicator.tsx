import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const steps = [
  'Personal Info',
  'About Me',
  'Experience',
  'Projects',
  'Social & Contact',
];

const StepIndicator: React.FC = () => {
  const { currentStep } = usePortfolioStore();

  return (
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
  );
};

export default StepIndicator;