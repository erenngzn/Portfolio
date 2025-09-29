import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { themes } from '../../data/themes';
import { usePortfolioStore } from '../../store/portfolioStore';
import ParticleBackground from '../ParticleBackground';

interface ThemeSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ThemeSelectionStep: React.FC<ThemeSelectionStepProps> = ({ onNext, onBack }) => {
  const { data, updateData } = usePortfolioStore();

  const handleThemeSelect = (themeId: string) => {
    updateData('selectedTheme', themeId);
  };

  const canProceed = data.selectedTheme;

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center space-x-2 text-sm text-white/80">
                <span>Step 2 of 3</span>
                <div className="w-32 bg-white/20 rounded-full h-2">
                  <div className="w-2/3 bg-white rounded-full h-2"></div>
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Style
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Select a theme that reflects your personality and professional brand
            </p>
          </motion.div>

          {/* Theme Categories */}
          <div className="mb-8">
            <div className="flex justify-center space-x-8 mb-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Creative Themes</h3>
                <p className="text-sm text-gray-300">Colorful and vibrant designs</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">Professional Themes</h3>
                <p className="text-sm text-gray-300">Clean and formal layouts</p>
              </div>
            </div>
          </div>

          {/* Creative Themes */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Creative Collection</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.slice(0, 5).map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    data.selectedTheme === theme.id 
                      ? 'ring-4 ring-white ring-opacity-70 scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div
                      className="w-full h-40 rounded-lg mb-4 bg-cover bg-center relative overflow-hidden"
                      style={{ backgroundImage: `url(${theme.preview})` }}
                    >
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                        {data.selectedTheme === theme.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white rounded-full p-3 shadow-lg"
                          >
                            <Check className="w-6 h-6 text-green-600" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold text-white mb-2">
                      {theme.name}
                    </h4>
                    <p className="text-gray-200 text-sm mb-4">
                      {theme.layout} layout with modern aesthetics
                    </p>

                    <div className="flex space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Professional Themes */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Professional Collection</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.slice(5).map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 5) * 0.1 }}
                  className={`relative group cursor-pointer transition-all duration-300 ${
                    data.selectedTheme === theme.id 
                      ? 'ring-4 ring-white ring-opacity-70 scale-105' 
                      : 'hover:scale-102'
                  }`}
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                    <div
                      className="w-full h-40 rounded-lg mb-4 bg-cover bg-center relative overflow-hidden"
                      style={{ backgroundImage: `url(${theme.preview})` }}
                    >
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                        {data.selectedTheme === theme.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-white rounded-full p-3 shadow-lg"
                          >
                            <Check className="w-6 h-6 text-green-600" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold text-white mb-2">
                      {theme.name}
                    </h4>
                    <p className="text-gray-200 text-sm mb-4">
                      {theme.layout} layout with professional aesthetics
                    </p>

                    <div className="flex space-x-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.colors.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.colors.secondary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-between items-center max-w-4xl mx-auto"
          >
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-lg text-white rounded-lg hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="text-center">
              {data.selectedTheme && (
                <p className="text-white/80 text-sm">
                  Selected: {themes.find(t => t.id === data.selectedTheme)?.name}
                </p>
              )}
            </div>

            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                canProceed
                  ? 'bg-white text-gray-900 hover:bg-gray-100 transform hover:scale-105 shadow-lg'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelectionStep;