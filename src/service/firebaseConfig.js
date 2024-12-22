// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Konfigurasi Firebase Anda (dari Firebase Console)
const firebaseConfig = {
  apiKey: 'AIzaSyDjSklo0IOQsoA7R8HwH9FkLleEUM3Gqic',
  authDomain: 'zekorder.firebaseapp.com',
  projectId: 'zekorder',
  storageBucket: 'zekorder.firebasestorage.app',
  messagingSenderId: '203832099160',
  appId: '1:203832099160:web:47e37862cfe85bb150e52d',
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Authentication
const auth = getAuth(app);

export { auth };
