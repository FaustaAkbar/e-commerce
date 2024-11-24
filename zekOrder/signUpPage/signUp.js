import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDjSklo0IOQsoA7R8HwH9FkLleEUM3Gqic',
  authDomain: 'zekorder.firebaseapp.com',
  projectId: 'zekorder',
  storageBucket: 'zekorder.firebasestorage.app',
  messagingSenderId: '203832099160',
  appId: '1:203832099160:web:47e37862cfe85bb150e52d',
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('signUpForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Mencegah pengiriman form default

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validasi username harus dimulai dengan huruf kapital
  const usernamePattern = /^[A-Z][a-zA-Z0-9]*$/; // Huruf kapital di awal, diikuti huruf/angka
  if (!usernamePattern.test(username)) {
    document.getElementById('signUpError').innerText = 'Username Harus diawali dengan huruf besar.';
    return;
  }

  // Cek apakah username sudah digunakan
  try {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      document.getElementById('signUpError').innerText = 'Username Sudah digunakan.';
      return;
    }
  } catch (error) {
    console.error('Error checking username:', error);
    document.getElementById('signUpError').innerText = 'An error occurred while checking the username.';
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Simpan username dan email di Firestore
      return setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
      });
    })
    .then(() => {
      alert('Account successfully created!');
      window.location.href = '../loginPage/login.html';
    })
    .catch((error) => {
      // Pesan kesalahan kustom berdasarkan kode error Firebase
      const errorCode = error.code;
      let errorMessage = '';

      switch (errorCode) {
        case 'auth/weak-password':
          errorMessage = 'Password harus berisi 6 karakter.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email ini sudah terdaftar.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Tolong gunakan alamat email yang valid.';
          break;
        default:
          errorMessage = 'An unexpected error occurred: ' + error.message;
      }

      document.getElementById('signUpError').innerText = errorMessage;
    });
});
