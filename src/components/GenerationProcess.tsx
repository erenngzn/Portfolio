import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Code, Palette, Download, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';

const generationSteps = [
  { id: 'processing', label: 'Processing your information', icon: Sparkles },
  { id: 'applying', label: 'Applying selected theme', icon: Palette },
  { id: 'generating', label: 'Generating optimized code', icon: Code },
  { id: 'finalizing', label: 'Finalizing portfolio', icon: Check },
];

interface GenerationProcessProps {
  onComplete: () => void;
}

const GenerationProcess: React.FC<GenerationProcessProps> = ({ onComplete }) => {
  const { setGenerating, setGenerationProgress } = usePortfolioStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const stepDuration = 1500; // 1.5 seconds per step
    
    generationSteps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
        setGenerationProgress(((index + 1) / generationSteps.length) * 100);
      }, (index + 1) * stepDuration);
    });

    // Complete the process
    setTimeout(() => {
      setConfetti(true);
      setTimeout(() => {
        setGenerating(false);
        onComplete();
      }, 2000);
    }, generationSteps.length * stepDuration + 500);

  }, [setGenerating, setGenerationProgress, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
      >
        {confetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: -100, 
                  x: Math.random() * 400 - 200,
                  rotate: Math.random() * 360,
                }}
                animate={{ 
                  y: 500, 
                  rotate: Math.random() * 360 + 720,
                }}
                transition={{ 
                  duration: 2,
                  delay: Math.random() * 0.5,
                }}
                className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
              />
            ))}
          </motion.div>
        )}

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Generating Your Portfolio
          </h2>
          <p className="text-gray-600">
            Creating your professional website with beautiful design and clean code
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {generationSteps.map((step, index) => {
            const isActive = index === currentStep - 1;
            const isCompleted = index < currentStep - 1;
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: isActive || isCompleted ? 1 : 0.5,
                  scale: isActive ? 1.02 : 1,
                }}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : isActive 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <IconComponent className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <span className={`font-medium ${
                  isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                  {isActive && (
                    <span className="inline-block ml-2">
                      <span className="animate-pulse">...</span>
                    </span>
                  )}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / generationSteps.length) * 100}%` }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="text-center text-sm text-gray-500">
          Step {currentStep} of {generationSteps.length}
        </div>

        {confetti && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <div className="text-6xl mb-2">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Portfolio Created!</h3>
            <p className="text-gray-600">Your professional portfolio is ready to download</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default GenerationProcess;