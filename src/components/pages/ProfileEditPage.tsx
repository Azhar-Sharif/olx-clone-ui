import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import {
  Button,
  ErrorMessage,
  FormInput,
  FormTextarea,
} from '@components/atoms';
import { Header } from '@components/compounds';
import { validateProfileUpdate } from '@utils';
import type * as Types from '@types';
import { updateUserProfile, useAppDispatch, useAppSelector } from '@store';

export const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(
    (state) => state.auth,
  );

  const [formData, setFormData] = useState<Types.IProfileUpdateRequest>({
    email: '',
    first_name: '',
    last_name: '',
    phone_no: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    setFormData({
      email: user.email ?? '',
      first_name: user.first_name ?? '',
      last_name: user.last_name ?? '',
      phone_no: user.phone_no ?? '',
      address: user.address ?? '',
    });
  }, [user, isAuthenticated, navigate]);

  const validateForm = (): boolean => {
    const newErrors = validateProfileUpdate(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    field: keyof Types.IProfileUpdateRequest,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(updateUserProfile(formData) as any);
      if (result.payload) {
        toast.success('Profile updated successfully!');
        navigate('/profile');
      }
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Failed to update profile';
      setSubmitError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Go back to profile"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Edit Profile</h1>
            <p className="text-gray-600 mt-2">
              Update your personal information
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-6 border-b border-blue-200">
            <h2 className="text-xl font-bold text-gray-900">
              Personal Information
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Keep your profile up to date
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {submitError && (
              <ErrorMessage
                message={submitError}
                onDismiss={() => setSubmitError(null)}
              />
            )}

            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={formData.email ?? ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="your.email@example.com"
              disabled={isLoading}
              error={errors.email}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormInput
                label="First Name"
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name ?? ''}
                onChange={(e) => handleChange('first_name', e.target.value)}
                placeholder="John"
                disabled={isLoading}
              />
              <FormInput
                label="Last Name"
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name ?? ''}
                onChange={(e) => handleChange('last_name', e.target.value)}
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>

            <div>
              <FormInput
                label="Phone Number"
                id="phone_no"
                name="phone_no"
                type="tel"
                value={formData.phone_no ?? ''}
                onChange={(e) => handleChange('phone_no', e.target.value)}
                placeholder="+1 (555) 123-4567"
                disabled={isLoading}
                error={errors.phone_no}
              />
            </div>

            <FormTextarea
              label="Address"
              id="address"
              name="address"
              value={formData.address ?? ''}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="123 Main St, City, State, ZIP"
              disabled={isLoading}
              rows={3}
            />

            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => navigate('/profile')}
                disabled={isLoading}
                variant="outline"
                size="lg"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
                variant="primary"
                size="lg"
                fullWidth
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
