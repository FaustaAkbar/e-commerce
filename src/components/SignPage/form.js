import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig'; // Pastikan untuk mengimpor Firebase Auth
import SocialLoginButton from '../button';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fungsi signUp email password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Membuat akun baru dengan email dan password
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect ke halaman login setelah berhasil mendaftar
    } catch (err) {
      setError('An error occurred, please try again.'); // Menampilkan pesan error jika pendaftaran gagal
    }
  };

  // Fungsi untuk login dengan Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirect ke halaman home
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  // Fungsi untuk login dengan Facebook
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/'); // Redirect ke halaman home
    } catch (err) {
      setError('Facebook login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 md:px-20">
      <div className="mb-8">
        <img src="/images/logo.png" alt="Zek Order Logo" className="h-12" />
      </div>
      <h2 className="text-2xl font-sans font-extrabold text-gray-800 mb-6 self-start">Create Account</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="mt-1 block w-full rounded-md  border-gray-500 shadow-sm focus:ring-green-500 focus:border-green-500 mb-8 p-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Email Address</label>
          <input
            type="email"
            placeholder="Youraddress@email.com"
            className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:ring-green-500 focus:border-green-500 mb-8 p-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 mb-8 p-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Tampilkan error jika ada */}
        <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Create Account
        </button>
      </form>

      {/* Login Link */}
      <p className="mt-5 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/" className="text-green-600 hover:underline">
          Log in
        </Link>
      </p>

      {/* Social Buttons */}
      <div className="p-5 flex justify-between w-full space-x-4">
        <SocialLoginButton
          className="bg-red-600 hover:bg-red-700 text-white"
          platform="Google"
          iconSrc="/images/google.png"
          onClick={handleGoogleLogin} // Hubungkan dengan fungsi Google
        />
        <SocialLoginButton
          className="bg-blue-600 hover:bg-blue-700 text-white"
          platform="Facebook"
          iconSrc="/images/facebook.png"
          onClick={handleFacebookLogin} // Hubungkan dengan fungsi Facebook
        />
      </div>
    </div>
  );
};

export default SignUp;
