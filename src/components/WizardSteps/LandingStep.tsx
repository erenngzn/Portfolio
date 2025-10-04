import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../ParticleBackground';
import LanguageSelector from '../LanguageSelector';
import { Language } from '../../utils/translations';

interface LandingStepProps {
  onGetStarted: () => void;
}

const LandingStep: React.FC<LandingStepProps> = ({ onGetStarted }) => {
  const [language, setLanguage] = useState<Language>('en');

  React.useEffect(() => {
    const savedLang = localStorage.getItem('portfolioLanguage') as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('portfolioLanguage', lang);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <div className="absolute top-6 right-6 z-20">
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Create Your
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              {' '}Perfect{' '}
            </span>
            Portfolio
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Build a stunning, professional portfolio website in minutes. 
            Choose from beautiful themes, add your content, and export clean, 
            production-ready code.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={onGetStarted}
            className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            Get Started →
          </motion.button>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beautiful Themes</h3>
              <p className="text-gray-300">Choose from professionally designed themes that look great on any device</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-300">Build your portfolio in under 10 minutes with our intuitive step-by-step wizard</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Export Code</h3>
              <p className="text-gray-300">Download clean HTML, CSS, and JavaScript ready for deployment anywhere</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingStep;