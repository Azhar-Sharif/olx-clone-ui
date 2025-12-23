import { AlertCircle } from 'lucide-react';

interface IFormErrorProps {
  message?: string;
}

export const FormError = ({ message }: IFormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      {message}
    </div>
  );
};
