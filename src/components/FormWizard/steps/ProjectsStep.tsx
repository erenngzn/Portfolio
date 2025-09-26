import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Plus, X, ExternalLink, Github, Image } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { Project } from '../../../types/portfolio';
import StepNavigation from '../StepNavigation';

const projectCategories = [
  'Web Application',
  'Mobile App',
  'Desktop Application',
  'API/Backend',
  'Library/Package',
  'Design System',
  'Data Analysis',
  'Machine Learning',
  'Game Development',
  'Other',
];

const commonTechStack = [
  'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript',
  'Node.js', 'Python', 'Java', 'C#', 'PHP',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'HTML', 'CSS', 'Sass', 'Tailwind', 'Bootstrap',
];

const ProjectsStep: React.FC = () => {
  const { data, updateData } = usePortfolioStore();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<Project>();
  const watchedTechStack = watch('techStack') || [];

  const handleProjectSubmit = (formData: Project) => {
    const projects = data.projects || [];
    const projectData = {
      ...formData,
      id: editingIndex !== null ? projects[editingIndex].id : Date.now().toString(),
      images: selectedImages,
    };

    let updatedProjects;
    if (editingIndex !== null) {
      updatedProjects = projects.map((project, index) => 
        index === editingIndex ? projectData : project
      );
    } else {
      updatedProjects = [...projects, projectData];
    }

    updateData('projects', updatedProjects);
    reset();
    setSelectedImages([]);
    setShowProjectForm(false);
    setEditingIndex(null);
  };

  const editProject = (index: number) => {
    const project = (data.projects || [])[index];
    reset(project);
    setSelectedImages(project.images || []);
    setEditingIndex(index);
    setShowProjectForm(true);
  };

  const removeProject = (index: number) => {
    const updatedProjects = (data.projects || []).filter((_, i) => i !== index);
    updateData('projects', updatedProjects);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const addTechnology = (tech: string) => {
    const currentTech = watchedTechStack || [];
    if (tech && !currentTech.includes(tech)) {
      setValue('techStack', [...currentTech, tech]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    const newTechStack = (watchedTechStack || []).filter(t => t !== tech);
    setValue('techStack', newTechStack);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Showcase Your Work
        </h2>
        <p className="text-gray-600">
          Add your best projects to demonstrate your skills and creativity
        </p>
      </div>

      {/* Add Project Button */}
      {!showProjectForm && (
        <button
          onClick={() => setShowProjectForm(true)}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      )}

      {/* Project Form */}
      {showProjectForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 p-6 rounded-lg space-y-6"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              {editingIndex !== null ? 'Edit Project' : 'Add Project'}
            </h3>
            <button
              onClick={() => {
                setShowProjectForm(false);
                setEditingIndex(null);
                setSelectedImages([]);
                reset();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(handleProjectSubmit)} className="space-y-6">
            {/* Project Title and Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  {...register('title', { required: 'Project title is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Awesome Project"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {projectCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'Project description is required' })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe what this project does, the problem it solves, and your role in creating it..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Project Links */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Live Demo URL
                </label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register('liveLink')}
                    type="url"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://myproject.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Repository
                </label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    {...register('githubLink')}
                    type="url"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>
            </div>

            {/* Technology Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technology Stack
              </label>
              
              {/* Common Technologies */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Select from common technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {commonTechStack.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => addTechnology(tech)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        (watchedTechStack || []).includes(tech)
                          ? 'bg-blue-100 text-blue-800 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Technology Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add custom technology..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(newTech))}
                />
                <button
                  type="button"
                  onClick={() => addTechnology(newTech)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Selected Technologies */}
              {watchedTechStack && watchedTechStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {watchedTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Project Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Images
              </label>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Image className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 5MB each)</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Image Previews */}
              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Project image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingIndex !== null ? 'Update' : 'Add'} Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingIndex(null);
                  setSelectedImages([]);
                  reset();
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="grid md:grid-cols-2 gap-6">
        {(data.projects || []).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            {project.images && project.images.length > 0 && (
              <div className="h-48 bg-gray-100">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editProject(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              {project.category && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mb-2">
                  {project.category}
                </span>
              )}
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>
              )}
              
              <div className="flex space-x-4">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <StepNavigation />
    </motion.div>
  );
};

export default ProjectsStep;