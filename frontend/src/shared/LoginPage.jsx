import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-center text-2xl mb-4 text-white">Sign In</h1>
        <SignIn  />
      </div>
    </div>
  );
};

export default LoginPage;
