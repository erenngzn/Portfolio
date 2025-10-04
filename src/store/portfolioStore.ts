import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioData } from '../types/portfolio';

interface PortfolioStore {
  data: Partial<PortfolioData>;
  currentStep: number;
  isGenerating: boolean;
  generationProgress: number;
  language: string;
  updateData: (section: keyof PortfolioData, value: any) => void;
  setCurrentStep: (step: number) => void;
  setGenerating: (generating: boolean) => void;
  setGenerationProgress: (progress: number) => void;
  setLanguage: (language: string) => void;
  resetData: () => void;
}

const initialData: Partial<PortfolioData> = {
  personalInfo: {
    fullName: '',
    title: '',
    profilePhoto: '',
    email: '',
    phone: '',
    location: '',
  },
  about: {
    summary: '',
    skills: [],
    languages: [],
    workStyle: '',
    hobbies: [],
    goals: '',
  },
  experience: [],
  education: [],
  projects: [],
  socialLinks: {
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
    website: '',
  },
  resumeFile: '',
  selectedTheme: 'modern-blue',
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      data: initialData,
      currentStep: 0,
      isGenerating: false,
      generationProgress: 0,
      language: 'en',
      updateData: (section, value) => {
        set({
          data: {
            ...get().data,
            [section]: value,
          },
        });
      },
      setCurrentStep: (step) => set({ currentStep: step }),
      setGenerating: (generating) => set({ isGenerating: generating }),
      setGenerationProgress: (progress) => set({ generationProgress: progress }),
      setLanguage: (language) => set({ language }),
      resetData: () => set({ data: initialData, currentStep: 0 }),
    }),
    {
      name: 'portfolio-generator-storage',
    }
  )
);