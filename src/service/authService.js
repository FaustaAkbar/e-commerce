import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Fungsi Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Mengembalikan data user
  } catch (error) {
    throw new Error(error.message); // Lemparkan error
  }
};

// Fungsi Sign Up
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Mengembalikan data user
  } catch (error) {
    throw new Error(error.message); // Lemparkan error
  }
};
