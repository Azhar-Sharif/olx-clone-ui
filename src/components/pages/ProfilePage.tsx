import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from 'lucide-react';

import { Header } from '@components/compounds';
import { fetchOrders, useAppDispatch, useAppSelector } from '@store';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders() as any);
    }
  }, [isAuthenticated, dispatch]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-12 bg-blue-200 rounded-full w-24 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading profile...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const fullName =
    `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username;
  const initials = fullName
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);

  const handleViewOrders = () => {
    navigate('/orders');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-3xl opacity-90"></div>
          <div className="relative bg-gradient-to-r from-blue-350 via-blue-400 to-blue-500 rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mb-16"></div>

            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-white via-blue-100 to-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                  <span className="text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {initials}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-400 w-8 h-8 rounded-full border-4 border-white shadow-lg"></div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="mb-2">
                  <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">
                    Welcome , {fullName}
                  </p>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {user.username}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-opacity-15 rounded-full text-blue-100 text-sm font-medium backdrop-blur-sm border border-white border-opacity-20">
                    <Award size={16} />
                    OLX Member
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-opacity-15 rounded-full text-blue-100 text-sm font-medium backdrop-blur-sm border border-white border-opacity-20">
                    <Calendar size={16} />
                    Active User
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <User size={24} className="text-white" />
                  </div>
                  Account Information
                </h2>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 pb-6 border-b border-gray-100 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <User size={20} className="text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                        Username
                      </p>
                      <p className="text-gray-900 text-lg font-bold">
                        {user.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pb-6 border-b border-gray-100 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors">
                    <div className="flex-shrink-0 mt-1">
                      <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                        <Mail size={20} className="text-emerald-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                        Email Address
                      </p>
                      <p className="text-gray-900 text-lg font-bold">
                        {user.email || (
                          <span className="text-gray-400 italic">Not set</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-100">
                    <div className="flex items-start gap-3 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className="p-2 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                          <User size={16} className="text-purple-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                          First Name
                        </p>
                        <p className="text-gray-900 font-bold text-sm">
                          {user.first_name || (
                            <span className="text-gray-400 italic">
                              Not set
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className="p-2 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200">
                          <User size={16} className="text-pink-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                          Last Name
                        </p>
                        <p className="text-gray-900 font-bold text-sm">
                          {user.last_name || (
                            <span className="text-gray-400 italic">
                              Not set
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-100 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                          <Phone size={20} className="text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                          Phone Number
                        </p>
                        <p className="text-gray-900 text-lg font-bold">
                          {user.phone_no || (
                            <span className="text-gray-400 italic">
                              Not set
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                          <MapPin size={20} className="text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">
                          Address
                        </p>
                        <p className="text-gray-900 text-lg font-bold">
                          {user.address || (
                            <span className="text-gray-400 italic">
                              Not set
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-105 transition-transform duration-300">
              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider mb-2">
                      Total Orders
                    </p>
                    <p className="text-5xl font-bold">{orders.length}</p>
                  </div>
                  <div className="p-4 bg-white bg-opacity-15 rounded-2xl backdrop-blur-sm border border-white border-opacity-20">
                    <ShoppingBag size={40} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3 border border-gray-100">
              <button
                onClick={handleViewOrders}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-bold shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
              >
                <ShoppingBag size={22} />
                View Orders
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700 text-sm font-semibold mb-3">
                Need help?
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                Update your profile information to improve your account security
                and visibility on OLX.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
