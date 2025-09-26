import { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import ThemeSelector from './components/ThemeSelector';
import FormWizard from './components/FormWizard/FormWizard';
import LivePreview from './components/LivePreview';
import GenerationProcess from './components/GenerationProcess';
import ExportModal from './components/ExportModal';
import { usePortfolioStore } from './store/portfolioStore';

type AppMode = 'landing' | 'form' | 'preview' | 'generating' | 'export';

function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  const {} = usePortfolioStore();

  // Handle generation event
  useEffect(() => {
    const handleGenerate = () => {
      usePortfolioStore.getState().setGenerating(true);
      setMode('generating');
    };

    window.addEventListener('generatePortfolio', handleGenerate);
    return () => window.removeEventListener('generatePortfolio', handleGenerate);
  }, []);

  const handleGetStarted = () => {
    setMode('form');
  };

  const handleGenerationComplete = () => {
    setMode('export');
  };

  const handleCloseExport = () => {
    setMode('preview');
  };

  if (mode === 'generating') {
    return <GenerationProcess onComplete={handleGenerationComplete} />;
  }

  return (
    <div className="min-h-screen">
      {mode === 'landing' && (
        <div className="relative min-h-screen overflow-hidden">
          <ParticleBackground />
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Create Your
                <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  {' '}Perfect{' '}
                </span>
                Portfolio
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto">
                Build a stunning, professional portfolio website in minutes. 
                Choose from beautiful themes, add your content, and export clean, 
                production-ready code.
              </p>
              <button
                onClick={handleGetStarted}
                className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                Get Started →
              </button>
              
              <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
              </div>
            </div>
          </div>
          
          <ThemeSelector />
        </div>
      )}

      {mode === 'form' && (
        <FormWizard />
      )}

      {mode === 'preview' && (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Portfolio Preview</h1>
                  <p className="text-gray-600">Review your portfolio before exporting</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setMode('form')}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setMode('export')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
            <LivePreview />
          </div>
        </div>
      )}

      <ExportModal 
        isOpen={mode === 'export'} 
        onClose={handleCloseExport} 
      />
    </div>
  );
}

export default App;