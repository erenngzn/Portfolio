import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { themes } from '../data/themes';

const LivePreview: React.FC = () => {
  const { data } = usePortfolioStore();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // FormWizard'a mobil durumunu bildirmek için
  React.useEffect(() => {
    const event = new CustomEvent('previewModeChange', { detail: viewMode });
    window.dispatchEvent(event);
  }, [viewMode]);
  
  const selectedTheme = themes.find(theme => theme.id === data.selectedTheme) || themes[0];
  const personalInfo = data.personalInfo || {};
  const about = data.about || {};
  const experiences = data.experience || [];
  const projects = data.projects || [];

  return (
    <div className="h-screen flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-end mb-4 gap-2">
        <button
          onClick={() => setViewMode('desktop')}
          className={`p-2 rounded-lg transition-all ${
            viewMode === 'desktop' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
          }`}
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('mobile')}
          className={`p-2 rounded-lg transition-all ${
            viewMode === 'mobile' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Browser Window */}
      <div className={`flex-1 flex items-center ${viewMode === 'mobile' ? 'justify-end' : 'justify-center'}`}>
        <motion.div
          layout
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 200 
          }}
          className={`bg-slate-800/70 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden flex flex-col ${
            viewMode === 'mobile' ? 'w-[375px] h-[667px]' : 'w-full h-full'
          }`}
        >
          {/* Browser Top Bar */}
          <div className="flex-shrink-0 bg-slate-900/90 px-4 py-3 flex items-center gap-3 border-b border-slate-700/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 bg-slate-800/50 rounded-md px-3 py-1.5 text-xs text-slate-400">
              {personalInfo?.fullName?.toLowerCase().replace(/\s+/g, '') || 'yourportfolio'}.com
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: selectedTheme.colors.background,
                  color: selectedTheme.colors.text,
                }}
                className="min-h-full"
              >
                {/* Hero Section */}
                <div
                  className="relative py-16 px-6 text-center"
                  style={{
                    background: `linear-gradient(135deg, ${selectedTheme.colors.primary} 0%, ${selectedTheme.colors.secondary} 100%)`,
                  }}
                >
                  <div className="max-w-4xl mx-auto">
                    {personalInfo?.profilePhoto && (
                      <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        src={personalInfo.profilePhoto}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
                      />
                    )}
                    <motion.h1 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl font-bold text-white mb-2"
                    >
                      {personalInfo?.fullName || 'Your Name'}
                    </motion.h1>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl text-white/90 mb-6"
                    >
                      {personalInfo?.title || 'Your Professional Title'}
                    </motion.p>
                    {personalInfo?.location && (
                      <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/80"
                      >
                        📍 {personalInfo.location}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* About Section */}
                <div className="py-16 px-6">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: selectedTheme.colors.primary }}>
                      About Me
                    </h2>
                    
                    {about?.summary && (
                      <div className="mb-12">
                        <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto">
                          {about.summary}
                        </p>
                      </div>
                    )}

                    {about?.skills && about.skills.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-xl font-semibold mb-6 text-center">Skills & Technologies</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                          {about.skills.map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="px-4 py-2 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: selectedTheme.colors.accent + '20',
                                color: selectedTheme.colors.accent,
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Experience Section */}
                {experiences.length > 0 && (
                  <div className="py-16 px-6" style={{ backgroundColor: selectedTheme.colors.background }}>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: selectedTheme.colors.primary }}>
                        Experience
                      </h2>
                      <div className="space-y-8">
                        {experiences.slice(0, 3).map((exp, index) => (
                          <motion.div
                            key={exp.id}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-6 rounded-lg shadow-sm"
                            style={{ backgroundColor: selectedTheme.colors.card }}
                          >
                            <h3 className="text-xl font-semibold mb-2">{exp.role}</h3>
                            <p className="font-medium mb-2" style={{ color: selectedTheme.colors.primary }}>
                              {exp.company}
                            </p>
                            <p className="text-sm text-gray-500 mb-4">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </p>
                            {exp.description && (
                              <p className="text-gray-600">{exp.description}</p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Projects Section */}
                {projects.length > 0 && (
                  <div className="py-16 px-6">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: selectedTheme.colors.primary }}>
                        Featured Projects
                      </h2>
                      <div className="grid md:grid-cols-2 gap-8">
                        {projects.slice(0, 4).map((project, index) => (
                          <motion.div
                            key={project.id}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-lg shadow-sm overflow-hidden"
                            style={{ backgroundColor: selectedTheme.colors.card }}
                          >
                            {project.images && project.images[0] && (
                              <div className="h-48 bg-gray-200">
                                <img
                                  src={project.images[0]}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-6">
                              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                              <p className="text-gray-600 mb-4">{project.description}</p>
                              {project.techStack && project.techStack.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {project.techStack.slice(0, 3).map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-1 text-xs rounded"
                                      style={{
                                        backgroundColor: selectedTheme.colors.accent + '20',
                                        color: selectedTheme.colors.accent,
                                      }}
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="flex space-x-4">
                                {project.liveLink && (
                                  <button className="flex items-center text-sm" style={{ color: selectedTheme.colors.primary }}>
                                    <ExternalLink className="w-4 h-4 mr-1" />
                                    Live Demo
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Section */}
                <div
                  className="py-16 px-6 text-center text-white"
                  style={{
                    background: `linear-gradient(135deg, ${selectedTheme.colors.secondary} 0%, ${selectedTheme.colors.primary} 100%)`,
                  }}
                >
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
                    {personalInfo?.email && (
                      <p className="text-xl mb-4">
                        📧 {personalInfo.email}
                      </p>
                    )}
                    {personalInfo?.phone && (
                      <p className="text-lg mb-8">
                        📞 {personalInfo.phone}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LivePreview;