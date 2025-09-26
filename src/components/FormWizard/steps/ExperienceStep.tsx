import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, X, Briefcase, GraduationCap } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { Experience, Education } from '../../../types/portfolio';
import StepNavigation from '../StepNavigation';

const ExperienceStep: React.FC = () => {
  const { data, updateData } = usePortfolioStore();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { register: registerExp, handleSubmit: handleExpSubmit, reset: resetExp, formState: { errors: expErrors } } = useForm<Experience>();
  const { register: registerEdu, handleSubmit: handleEduSubmit, reset: resetEdu, formState: { errors: eduErrors } } = useForm<Education>();

  const handleExperienceSubmit = (formData: Experience) => {
    const experiences = data.experience || [];
    const experienceData = {
      ...formData,
      id: editingIndex !== null ? experiences[editingIndex].id : Date.now().toString(),
    };

    let updatedExperiences;
    if (editingIndex !== null) {
      updatedExperiences = experiences.map((exp, index) => 
        index === editingIndex ? experienceData : exp
      );
    } else {
      updatedExperiences = [...experiences, experienceData];
    }

    updateData('experience', updatedExperiences);
    resetExp();
    setShowExperienceForm(false);
    setEditingIndex(null);
  };

  const handleEducationSubmit = (formData: Education) => {
    const educations = data.education || [];
    const educationData = {
      ...formData,
      id: editingIndex !== null ? educations[editingIndex].id : Date.now().toString(),
    };

    let updatedEducations;
    if (editingIndex !== null) {
      updatedEducations = educations.map((edu, index) => 
        index === editingIndex ? educationData : edu
      );
    } else {
      updatedEducations = [...educations, educationData];
    }

    updateData('education', updatedEducations);
    resetEdu();
    setShowEducationForm(false);
    setEditingIndex(null);
  };

  const editExperience = (index: number) => {
    const exp = (data.experience || [])[index];
    resetExp(exp);
    setEditingIndex(index);
    setShowExperienceForm(true);
  };

  const editEducation = (index: number) => {
    const edu = (data.education || [])[index];
    resetEdu(edu);
    setEditingIndex(index);
    setShowEducationForm(true);
  };

  const removeExperience = (index: number) => {
    const updatedExperiences = (data.experience || []).filter((_, i) => i !== index);
    updateData('experience', updatedExperiences);
  };

  const removeEducation = (index: number) => {
    const updatedEducations = (data.education || []).filter((_, i) => i !== index);
    updateData('education', updatedEducations);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Your Professional Journey
        </h2>
        <p className="text-gray-600">
          Add your work experience and educational background
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('experience')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
            activeTab === 'experience'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Experience
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-colors ${
            activeTab === 'education'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 mr-2" />
          Education
        </button>
      </div>

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          {/* Add Experience Button */}
          {!showExperienceForm && (
            <button
              onClick={() => setShowExperienceForm(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Work Experience</span>
            </button>
          )}

          {/* Experience Form */}
          {showExperienceForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {editingIndex !== null ? 'Edit Experience' : 'Add Experience'}
                </h3>
                <button
                  onClick={() => {
                    setShowExperienceForm(false);
                    setEditingIndex(null);
                    resetExp();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleExpSubmit(handleExperienceSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      {...registerExp('company', { required: 'Company is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Google"
                    />
                    {expErrors.company && (
                      <p className="mt-1 text-sm text-red-600">{expErrors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      {...registerExp('role', { required: 'Job title is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Senior Frontend Developer"
                    />
                    {expErrors.role && (
                      <p className="mt-1 text-sm text-red-600">{expErrors.role.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date *
                    </label>
                    <input
                      {...registerExp('startDate', { required: 'Start date is required' })}
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {expErrors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{expErrors.startDate.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      {...registerExp('endDate')}
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center space-x-2 pt-6">
                      <input
                        {...registerExp('current')}
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Current Position</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea
                    {...registerExp('description')}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingIndex !== null ? 'Update' : 'Add'} Experience
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowExperienceForm(false);
                      setEditingIndex(null);
                      resetExp();
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Experience List */}
          <div className="space-y-4">
            {(data.experience || []).map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                    </div>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700">{exp.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editExperience(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          {/* Add Education Button */}
          {!showEducationForm && (
            <button
              onClick={() => setShowEducationForm(true)}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Education</span>
            </button>
          )}

          {/* Education Form */}
          {showEducationForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 p-6 rounded-lg space-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {editingIndex !== null ? 'Edit Education' : 'Add Education'}
                </h3>
                <button
                  onClick={() => {
                    setShowEducationForm(false);
                    setEditingIndex(null);
                    resetEdu();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEduSubmit(handleEducationSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Institution *
                  </label>
                  <input
                    {...registerEdu('institution', { required: 'Institution is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="University of Technology"
                  />
                  {eduErrors.institution && (
                    <p className="mt-1 text-sm text-red-600">{eduErrors.institution.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Degree *
                    </label>
                    <input
                      {...registerEdu('degree', { required: 'Degree is required' })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Bachelor's Degree"
                    />
                    {eduErrors.degree && (
                      <p className="mt-1 text-sm text-red-600">{eduErrors.degree.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field of Study
                    </label>
                    <input
                      {...registerEdu('field')}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Computer Science"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Graduation Year *
                  </label>
                  <input
                    {...registerEdu('year', { required: 'Graduation year is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="2023"
                  />
                  {eduErrors.year && (
                    <p className="mt-1 text-sm text-red-600">{eduErrors.year.message}</p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingIndex !== null ? 'Update' : 'Add'} Education
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEducationForm(false);
                      setEditingIndex(null);
                      resetEdu();
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Education List */}
          <div className="space-y-4">
            {(data.education || []).map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <GraduationCap className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    </div>
                    <p className="text-gray-600 font-medium">{edu.institution}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      {edu.field && <span>{edu.field}</span>}
                      <span>•</span>
                      <span>{edu.year}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editEducation(index)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <StepNavigation />
    </motion.div>
  );
};

export default ExperienceStep;