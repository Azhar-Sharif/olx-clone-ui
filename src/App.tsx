import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '@routes';

function App() {
  return (
    <div className="app">
      <Toaster position="top-center" />
      <AppRoutes />
    </div>
  );
}

export default App;
