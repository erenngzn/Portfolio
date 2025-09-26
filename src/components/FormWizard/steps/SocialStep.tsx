import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Linkedin, Github, Twitter, Instagram, Globe, Upload } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { SocialLinks } from '../../../types/portfolio';
import StepNavigation from '../StepNavigation';

const SocialStep: React.FC = () => {
  const { data, updateData } = usePortfolioStore();
  const socialLinks = data.socialLinks || {};
  const previousDataRef = React.useRef<SocialLinks>();

  const { register, watch, setValue, formState: { errors } } = useForm<SocialLinks>({
    defaultValues: socialLinks,
    mode: 'onChange',
  });

  const watchedData = watch();

  React.useEffect(() => {
    // Only update if the data has actually changed
    const currentDataString = JSON.stringify(watchedData);
    const previousDataString = JSON.stringify(previousDataRef.current);
    
    if (currentDataString !== previousDataString) {
      updateData('socialLinks', watchedData);
      previousDataRef.current = watchedData;
    }
  }, [watchedData, updateData]);

  // Ensure form values are properly set when data changes
  React.useEffect(() => {
    if (socialLinks && Object.keys(socialLinks).length > 0) {
      Object.entries(socialLinks).forEach(([key, value]) => {
        if (value !== undefined && value !== null && typeof value === 'string') {
          setValue(key as keyof SocialLinks, value, { shouldDirty: false });
        }
      });
    }
  }, [socialLinks, setValue]);
  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateData('resumeFile', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Connect & Contact
        </h2>
        <p className="text-gray-600">
          Add your social profiles and upload your resume to complete your portfolio
        </p>
      </div>

      <div className="space-y-6">
        {/* Social Media Links */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Profiles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* LinkedIn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600" />
                <input
                  {...register('linkedin', {
                    pattern: {
                      value: /^https:\/\/(www\.)?linkedin\.com\/.+/,
                      message: 'Please enter a valid LinkedIn URL',
                    },
                  })}
                  type="url"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              {errors.linkedin && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
              )}
            </div>

            {/* GitHub */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Profile
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
                <input
                  {...register('github', {
                    pattern: {
                      value: /^https:\/\/(www\.)?github\.com\/.+/,
                      message: 'Please enter a valid GitHub URL',
                    },
                  })}
                  type="url"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourname"
                />
              </div>
              {errors.github && (
                <p className="mt-1 text-sm text-red-600">{errors.github.message}</p>
              )}
            </div>

            {/* Twitter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter Profile
              </label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  {...register('twitter', {
                    pattern: {
                      value: /^https:\/\/(www\.)?(twitter\.com|x\.com)\/.+/,
                      message: 'Please enter a valid Twitter/X URL',
                    },
                  })}
                  type="url"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://twitter.com/yourname"
                />
              </div>
              {errors.twitter && (
                <p className="mt-1 text-sm text-red-600">{errors.twitter.message}</p>
              )}
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Profile
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-600" />
                <input
                  {...register('instagram', {
                    pattern: {
                      value: /^https:\/\/(www\.)?instagram\.com\/.+/,
                      message: 'Please enter a valid Instagram URL',
                    },
                  })}
                  type="url"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://instagram.com/yourname"
                />
              </div>
              {errors.instagram && (
                <p className="mt-1 text-sm text-red-600">{errors.instagram.message}</p>
              )}
            </div>

            {/* Personal Website */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-600" />
                <input
                  {...register('website', {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Please enter a valid website URL',
                    },
                  })}
                  type="url"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              {errors.website && (
                <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume/CV Upload</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload your resume</span>
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>
            </div>
            
            {data.resumeFile && (
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-700">Resume uploaded successfully</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateData('resumeFile', '')}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="email-contact"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label htmlFor="email-contact" className="text-sm text-gray-700">
                Enable contact form on portfolio website
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="download-resume"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label htmlFor="download-resume" className="text-sm text-gray-700">
                Allow resume download on portfolio website
              </label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="social-links"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label htmlFor="social-links" className="text-sm text-gray-700">
                Display social media links on portfolio
              </label>
            </div>
          </div>
        </div>

        {/* Portfolio Preview Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xs font-bold">i</span>
              </div>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-900">
                Ready to Generate Your Portfolio?
              </h4>
              <p className="mt-1 text-sm text-blue-700">
                You've completed all the required information. Click "Next" to review your portfolio 
                and generate your professional website with downloadable code.
              </p>
            </div>
          </div>
        </div>
      </div>

      <StepNavigation />
    </motion.div>
  );
};

export default SocialStep;