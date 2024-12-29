import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDjSklo0IOQsoA7R8HwH9FkLleEUM3Gqic',
  authDomain: 'zekorder.firebaseapp.com',
  projectId: 'zekorder',
  storageBucket: 'zekorder.firebasestorage.app',
  messagingSenderId: '203832099160',
  appId: '1:203832099160:web:47e37862cfe85bb150e52d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
