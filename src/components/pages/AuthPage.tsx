import { useNavigate } from 'react-router-dom';
import { publicRoutes } from '@routes';

import { Logo } from '@components/atoms';
import { AuthForm } from '@components/compounds';
import { clearError, useAppDispatch, useAppSelector } from '@store';

interface IAuthPageProps {
  type: 'register' | 'login';
}

export const AuthPage = ({ type }: IAuthPageProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleSuccess = () => {
    navigate(publicRoutes.home);
  };

  const handleBackToHome = () => {
    dispatch(clearError());
    navigate(publicRoutes.home);
  };

  if (isAuthenticated) {
    navigate(publicRoutes.home);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-6">
          <Logo
            size="lg"
            className="mb-2 cursor-pointer"
            onClick={handleBackToHome}
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {type === 'register' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {type === 'register'
              ? 'Join our marketplace today'
              : 'Log in to your account'}
          </p>
        </div>

        <AuthForm type={type} onSubmitSuccess={handleSuccess} />

        <div className="text-center mt-6">
          <button
            onClick={handleBackToHome}
            className="text-slate-600 hover:text-slate-900 text-sm flex items-center justify-center mx-auto transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
