import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, X, Star } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { AboutInfo } from '../../../types/portfolio';
import StepNavigation from '../StepNavigation';

const commonSkills = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Node.js',
  'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift',
  'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap', 'Material-UI',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST API',
  'Docker', 'AWS', 'Azure', 'GCP', 'Kubernetes', 'CI/CD',
  'Git', 'Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Agile', 'Scrum',
];

const AboutStep: React.FC = () => {
  const { data, updateData } = usePortfolioStore();
  const aboutInfo = data.about || {};
  const previousDataRef = React.useRef<AboutInfo>();
  
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ name: '', level: 1 });
  const [newHobby, setNewHobby] = useState('');

  const { register, watch, setValue, formState: { errors } } = useForm<AboutInfo>({
    defaultValues: aboutInfo,
  });

  const watchedData = watch();

  React.useEffect(() => {
    const currentDataString = JSON.stringify(watchedData);
    const previousDataString = JSON.stringify(previousDataRef.current);
    
    if (currentDataString !== previousDataString) {
      updateData('about', watchedData);
      previousDataRef.current = watchedData;
    }
  }, [watchedData, updateData]);

  const addSkill = (skill: string) => {
    const currentSkills = watchedData.skills || [];
    if (skill && !currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill];
      setValue('skills', newSkills);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = (watchedData.skills || []).filter(s => s !== skill);
    setValue('skills', newSkills);
  };

  const addLanguage = () => {
    if (newLanguage.name) {
      const currentLanguages = watchedData.languages || [];
      const newLanguages = [...currentLanguages, newLanguage];
      setValue('languages', newLanguages);
      setNewLanguage({ name: '', level: 1 });
    }
  };

  const removeLanguage = (index: number) => {
    const newLanguages = (watchedData.languages || []).filter((_, i) => i !== index);
    setValue('languages', newLanguages);
  };

  const addHobby = () => {
    if (newHobby) {
      const currentHobbies = watchedData.hobbies || [];
      const newHobbies = [...currentHobbies, newHobby];
      setValue('hobbies', newHobbies);
      setNewHobby('');
    }
  };

  const removeHobby = (hobby: string) => {
    const newHobbies = (watchedData.hobbies || []).filter(h => h !== hobby);
    setValue('hobbies', newHobbies);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell Your Story
        </h2>
        <p className="text-gray-600 text-sm">
          Share your professional journey and what makes you unique
        </p>
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary *
        </label>
        <textarea
          {...register('summary', { required: 'Professional summary is required' })}
          rows={4}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm resize-none"
          placeholder="I'm a passionate frontend developer with 3+ years of experience..."
        />
        {errors.summary && (
          <p className="mt-1 text-xs text-red-600">{errors.summary.message}</p>
        )}
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills & Technologies
        </label>
        
        {/* Common Skills */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2">Select from common skills:</p>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  (watchedData.skills || []).includes(skill)
                    ? 'bg-blue-600 text-white border-blue-500'
                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Skill Input */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add custom skill..."
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
          />
          <button
            type="button"
            onClick={() => addSkill(newSkill)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Skills */}
        {watchedData.skills && watchedData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {watchedData.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages
        </label>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newLanguage.name}
            onChange={(e) => setNewLanguage({...newLanguage, name: e.target.value})}
            placeholder="Language name"
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
          />
          <select
            value={newLanguage.level}
            onChange={(e) => setNewLanguage({...newLanguage, level: parseInt(e.target.value)})}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
          >
            {[1, 2, 3, 4, 5].map(level => (
              <option key={level} value={level}>{level} Star{level !== 1 ? 's' : ''}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={addLanguage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {watchedData.languages && watchedData.languages.length > 0 && (
          <div className="space-y-2">
            {watchedData.languages.map((language, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-900 text-sm">{language.name}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= language.level ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeLanguage(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Work Style */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Style
          </label>
          <textarea
            {...register('workStyle')}
            rows={3}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm resize-none"
            placeholder="I thrive in collaborative environments..."
          />
        </div>

        {/* Goals */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Career Goals
          </label>
          <textarea
            {...register('goals')}
            rows={3}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm resize-none"
            placeholder="I'm looking to grow into a senior role..."
          />
        </div>
      </div>

      {/* Hobbies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hobbies & Interests
        </label>
        
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby..."
            className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
          />
          <button
            type="button"
            onClick={addHobby}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {watchedData.hobbies && watchedData.hobbies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {watchedData.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded-full text-xs"
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => removeHobby(hobby)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <StepNavigation />
    </motion.div>
  );
};

export default AboutStep;