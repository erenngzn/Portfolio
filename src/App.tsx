import { useState, useEffect } from 'react';
import LandingStep from './components/WizardSteps/LandingStep';
import ThemeSelectionStep from './components/WizardSteps/ThemeSelectionStep';
import FormWizard from './components/FormWizard/FormWizard';
import LivePreview from './components/LivePreview';
import GenerationProcess from './components/GenerationProcess';
import ExportModal from './components/ExportModal';
import { usePortfolioStore } from './store/portfolioStore';

type AppMode = 'landing' | 'theme-selection' | 'form' | 'preview' | 'generating' | 'export';

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
    setMode('theme-selection');
  };

  const handleThemeSelected = () => {
    setMode('form');
  };

  const handleBackToThemes = () => {
    setMode('theme-selection');
  };

  const handleBackToLanding = () => {
    setMode('landing');
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
        <LandingStep onGetStarted={handleGetStarted} />
      )}

      {mode === 'theme-selection' && (
        <ThemeSelectionStep 
          onNext={handleThemeSelected}
          onBack={handleBackToLanding}
        />
      )}

      {mode === 'form' && (
        <FormWizard onBack={handleBackToThemes} />
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