import { useNavigate } from 'react-router-dom';
import { publicRoutes } from '@routes';

import { Button } from '@components/atoms';
import { logoutUser, useAppDispatch, useAppSelector } from '@store';

export const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLoginClick = () => navigate(publicRoutes.login);
  const handleRegisterClick = () => navigate(publicRoutes.register);

  const handleLogout = () => {
    dispatch(logoutUser() as any)
      .unwrap()
      .then(() => {
        navigate(publicRoutes.home);
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-400 to-cyan-400 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center space-y-8 relative z-10 border border-white/20">
        <div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Welcome to OLX Clone
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-cyan-400 mx-auto rounded-full mt-4"></div>
        </div>

        {isAuthenticated && user ? (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 space-y-3">
            <p className="text-lg font-semibold text-gray-800">
              Welcome, <span className="text-blue-400">{user.username}!</span>
            </p>
            <div className="flex gap-3 justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex-1"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              Start your journey by creating an account or signing in to explore
              amazing deals
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={handleRegisterClick}
                className="px-8 py-3 bg-gradient-to-r from-indigo-400 to-blue-400 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Register
              </button>

              <button
                onClick={handleLoginClick}
                className="px-8 py-3 bg-white text-indigo-400 font-semibold rounded-lg border-2 border-indigo-400 hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Log In
              </button>
            </div>

            <p className="text-gray-400 text-sm pt-4">
              Join thousands of users buying and selling locally
            </p>
          </>
        )}
      </div>
    </div>
  );
};
