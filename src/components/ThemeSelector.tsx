import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { themes } from '../data/themes';
import { usePortfolioStore } from '../store/portfolioStore';

const ThemeSelector: React.FC = () => {
  const { data, updateData } = usePortfolioStore();

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Style
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Select a theme that reflects your personality and professional brand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer ${
                data.selectedTheme === theme.id ? 'ring-4 ring-white ring-opacity-50' : ''
              }`}
              onClick={() => updateData('selectedTheme', theme.id)}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <div
                  className="w-full h-40 rounded-lg mb-4 bg-cover bg-center"
                  style={{ backgroundImage: `url(${theme.preview})` }}
                >
                  <div className="w-full h-full rounded-lg flex items-center justify-center bg-black/20">
                    {data.selectedTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-full p-2"
                      >
                        <Check className="w-6 h-6 text-green-600" />
                      </motion.div>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {theme.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4">
                  {theme.layout} layout with modern aesthetics
                </p>

                <div className="flex space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;