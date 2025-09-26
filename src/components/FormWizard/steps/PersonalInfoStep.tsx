import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { PersonalInfo } from '../../../types/portfolio';
import StepNavigation from '../StepNavigation';

const PersonalInfoStep: React.FC = () => {
  const { data, updateData } = usePortfolioStore();
  const personalInfo = data.personalInfo || {};
  const previousDataRef = React.useRef<PersonalInfo>();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<PersonalInfo>({
    defaultValues: personalInfo,
    mode: 'onChange',
  });

  const watchedData = watch();

  React.useEffect(() => {
    const currentDataString = JSON.stringify(watchedData);
    const previousDataString = JSON.stringify(previousDataRef.current);
    
    if (currentDataString !== previousDataString) {
      updateData('personalInfo', watchedData);
      previousDataRef.current = watchedData;
    }
  }, [watchedData, updateData]);

  // Ensure form values are properly set when data changes
  React.useEffect(() => {
    if (personalInfo && Object.keys(personalInfo).length > 0) {
      Object.entries(personalInfo).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key as keyof PersonalInfo, value, { shouldDirty: false });
        }
      });
    }
  }, [personalInfo, setValue]);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue('profilePhoto', result, { shouldDirty: true });
        updateData('personalInfo', {
          ...watchedData,
          profilePhoto: result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Let's Start with the Basics
        </h2>
        <p className="text-gray-600 text-sm">
          Tell us about yourself
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Photo Upload */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-4 border-gray-200 shadow-lg">
              {watchedData.profilePhoto ? (
                <img
                  src={watchedData.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
              <Camera className="w-3 h-3 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register('fullName', { required: 'Full name is required' })}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Professional Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Title *
          </label>
          <input
            {...register('title', { required: 'Professional title is required' })}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
            placeholder="Frontend Developer"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register('phone')}
              type="tel"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register('location')}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm"
              placeholder="New York, NY"
            />
          </div>
        </div>
      </div>

      <StepNavigation />
    </motion.div>
  );
};

export default PersonalInfoStep;