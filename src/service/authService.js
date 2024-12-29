import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Pastikan firebaseConfig sudah benar

// Fungsi Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cek apakah email dan password adalah untuk admin
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Redirect ke /admin jika admin login
      return { user, redirectTo: '/admin' };
    } else {
      // Redirect ke /HomePage jika bukan admin
      return { user, redirectTo: '/HomePage' };
    }
  } catch (error) {
    throw new Error('Invalid credentials. Please check your email and password.');
  }
};

// Fungsi Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Mengembalikan data user
  } catch (error) {
    throw new Error(error.message); // Lemparkan error jika gagal sign up
  }
};
