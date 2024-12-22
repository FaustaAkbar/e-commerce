import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../../service/firebaseConfig'; // Pastikan untuk mengimpor Firebase Auth
import SocialLoginButton from '../button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null); // State untuk menyimpan data pengguna
  const navigate = useNavigate();

  // Fungsi login email password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      // Jika displayName dan photoURL kosong, update profil pengguna
      if (!user.displayName || !user.photoURL) {
        await updateProfile(user, {
          displayName: 'Zeks',
          photoURL: '/images/people.png',
        });
      }

      // Menyimpan data pengguna ke localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      setUserData({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      navigate('/HomePage', { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  // Fungsi untuk login dengan Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserData({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      navigate('/HomePage', { replace: true }); // Redirect ke halaman home
    } catch (err) {
      setError('Google login failed. Please try again.');
    }
  };

  // Fungsi untuk login dengan Facebook
  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUserData({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      navigate('/HomePage', { replace: true }); // Redirect ke halaman home
    } catch (err) {
      console.error('Facebook login error:', err);
      setError('Facebook login failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-8 md:px-20">
      <div className="mb-12">
        <img src="/images/logo.png" alt="Zek Order Logo" className="h-12 " />
      </div>
      <h2 className="text-2xl font-sans font-bold text-gray-800 mb-6 self-start ">Login to your account!</h2>

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

      {/* Form */}
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Email Address</label>
          <input
            type="email"
            placeholder="Youraddress@email.com"
            className="mt-1 block w-full rounded-md border-2 border-gray-500 shadow-sm mb-8 p-2"
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
            className="mt-1 block w-full rounded-md border-2 border-gray-500 shadow-lg mb-8 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Tampilkan error jika ada */}
        <button type="submit" className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Login
        </button>
      </form>

      {/* Sign Up Link */}
      <p className="mt-5 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-green-600 hover:underline">
          Sign up
        </Link>
      </p>

      {/* Menampilkan data pengguna setelah login */}
      {userData && (
        <div className="mt-8 flex items-center">
          <img src={userData.photoURL} alt="Profile" className="w-10 h-10 rounded-full mr-4" />
          <span className="text-lg font-medium text-gray-700">Hi, {userData.displayName}</span>
        </div>
      )}
    </div>
  );
};

export default Login;
