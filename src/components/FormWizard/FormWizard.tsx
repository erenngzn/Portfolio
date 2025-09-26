import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';
import StepIndicator from './StepIndicator';
import PersonalInfoStep from './steps/PersonalInfoStep';
import AboutStep from './steps/AboutStep';
import ExperienceStep from './steps/ExperienceStep';
import ProjectsStep from './steps/ProjectsStep';
import SocialStep from './steps/SocialStep';
import LivePreview from '../LivePreview';
import ModernParticleBackground from '../ParticleBackground';

const steps = [
  { title: 'Personal Info', component: PersonalInfoStep },
  { title: 'About Me', component: AboutStep },
  { title: 'Experience', component: ExperienceStep },
  { title: 'Projects', component: ProjectsStep },
  { title: 'Social & Contact', component: SocialStep },
];

const FormWizard: React.FC = () => {
  const { currentStep } = usePortfolioStore();
  const [isMobilePreview, setIsMobilePreview] = React.useState(false);
  const CurrentStepComponent = steps[currentStep].component;

  React.useEffect(() => {
    const handleModeChange = (event: any) => {
      setIsMobilePreview(event.detail === 'mobile');
    };
    
    window.addEventListener('previewModeChange', handleModeChange);
    return () => window.removeEventListener('previewModeChange', handleModeChange);
  }, []);

  return (
    <div className="relative min-h-screen">
      <ModernParticleBackground />
      
      <div className="relative z-10 min-h-screen flex gap-0">
        <div className="lg:border-r border-gray-200 bg-white overflow-y-auto shadow-xl flex-1">
          <div className="p-6 lg:p-8">
            <StepIndicator />
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mt-8"
            >
              <CurrentStepComponent />
            </motion.div>
          </div>
        </div>

        <div className="hidden lg:block flex-1">
          <LivePreview />
        </div>
      </div>
    </div>
  );
};

export default FormWizard;