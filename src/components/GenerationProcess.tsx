import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Code, Palette, Sparkles } from 'lucide-react';
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
    const stepDuration = 2000;
    let currentStepIndex = 0;

    const advanceStep = () => {
      if (currentStepIndex < generationSteps.length) {
        setCurrentStep(currentStepIndex + 1);
        setGenerationProgress(((currentStepIndex + 1) / generationSteps.length) * 100);
        currentStepIndex++;
        setTimeout(advanceStep, stepDuration);
      } else {
        setConfetti(true);
        setTimeout(() => {
          setGenerating(false);
          onComplete();
        }, 2000);
      }
    };

    const initialTimer = setTimeout(() => {
      advanceStep();
    }, 500);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [setGenerating, setGenerationProgress, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }} // Smooth cubic-bezier easing
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden"
      >
        {confetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -100,
                  x: Math.random() * 400 - 200,
                  rotate: Math.random() * 360,
                  scale: 0,
                }}
                animate={{
                  y: 500,
                  rotate: Math.random() * 360 + 720,
                  scale: 1,
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
                className="absolute w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded"
              />
            ))}
          </motion.div>
        )}

        <div className="text-center mb-8">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
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
                  x: 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
              >
                <motion.div 
                  animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-100 text-green-600' 
                    : isActive 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <IconComponent className={`w-4 h-4 ${isActive ? 'animate-spin' : ''}`} />
                  )}
                </motion.div>
                <span className={`font-medium ${
                  isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                  {isActive && (
                    <motion.span 
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block ml-2"
                    >
                      ...
                    </motion.span>
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
            transition={{ duration: 0.5, ease: "easeOut" }}
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