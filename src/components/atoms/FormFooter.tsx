interface IFormFooterProps {
  type: 'register' | 'login';
}

export const FormFooter = ({ type }: IFormFooterProps) => (
  <p className="text-center text-sm text-gray-600 mt-6">
    {type === 'register' ? (
      <>
        Already have an account?{' '}
        <a
          href="/login"
          className="text-blue-600 hover:underline font-semibold"
        >
          Log In
        </a>
      </>
    ) : (
      <>
        Don&apos;t have an account?{' '}
        <a
          href="/register"
          className="text-blue-600 hover:underline font-semibold"
        >
          Create one
        </a>
      </>
    )}
  </p>
);
