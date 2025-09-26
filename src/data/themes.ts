import { Theme } from '../types/portfolio';

export const themes: Theme[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#10B981',
      background: '#F8FAFC',
      card: '#FFFFFF',
      text: '#1F2937',
    },
    layout: 'modern',
    preview: 'https://images.pexels.com/photos/374720/pexels-photo-374720.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    colors: {
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#F59E0B',
      background: '#FAFAF9',
      card: '#FFFFFF',
      text: '#374151',
    },
    layout: 'classic',
    preview: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'minimal-green',
    name: 'Minimal Green',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#F97316',
      background: '#F9FAFB',
      card: '#FFFFFF',
      text: '#111827',
    },
    layout: 'minimal',
    preview: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'creative-orange',
    name: 'Creative Orange',
    colors: {
      primary: '#F97316',
      secondary: '#EA580C',
      accent: '#3B82F6',
      background: '#FFFBEB',
      card: '#FFFFFF',
      text: '#1C1917',
    },
    layout: 'creative',
    preview: 'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 'dark-mode',
    name: 'Dark Professional',
    colors: {
      primary: '#60A5FA',
      secondary: '#3B82F6',
      accent: '#34D399',
      background: '#111827',
      card: '#1F2937',
      text: '#F9FAFB',
    },
    layout: 'modern',
    preview: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];