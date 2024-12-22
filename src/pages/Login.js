import React from 'react';
import ImageSection from '../components/image';
import FormSection from '../components/LoginPage/form';

function Login() {
  return (
    <div className="h-screen flex">
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 h-full">
        <ImageSection />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full bg-white">
        <FormSection />
      </div>
    </div>
  );
}

export default Login;
