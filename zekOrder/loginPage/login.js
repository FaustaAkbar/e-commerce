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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.sign_in_button');
  const googleButton = document.querySelector('.Google_Login_Button');
  const facebookButton = document.querySelector('.Facebook_Login_Button');

  if (loginButton) {
    loginButton.addEventListener('click', function (event) {
      event.preventDefault();
      login();
    });
  } else {
    console.log('Login button not found');
  }

  if (googleButton) {
    googleButton.addEventListener('click', function () {
      loginWithGoogle();
    });
  } else {
    console.log('Google login button not found');
  }

  if (facebookButton) {
    facebookButton.addEventListener('click', function () {
      loginWithFacebook();
    });
  } else {
    console.log('Facebook login button not found');
  }
});

const showLoader = () => {
  document.getElementById('loading-spinner').style.display = 'block';
};

const hideLoader = () => {
  document.getElementById('loading-spinner').style.display = 'none';
};

const login = () => {
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  showLoader(); //loader

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const docRef = db.collection('users').doc(user.uid);

      return docRef.get().then((doc) => {
        hideLoader();

        if (doc.exists) {
          console.log('Akun anda berhasil login');
          window.location.href = '../homePage/homePage.html';
        } else {
          console.log('User tidak ditemukan');
          alert('User tidak ditemukan. Silakan buat akun baru.');
          window.location.href = '../signUpPage/signUp.html';
        }
      });
    })
    .catch((error) => {
      hideLoader();
      console.log('Error: ' + error.message);
      alert('Login error: ' + error.message);
    });
};

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  showLoader();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const docRef = db.collection('users').doc(user.uid);

      return docRef.get().then((doc) => {
        if (!doc.exists) {
          // Simpan data pengguna baru ke Firestore
          return db.collection('users').doc(user.uid).set({
            username: user.displayName,
            email: user.email,
            profilePicture: user.photoURL,
            provider: 'google',
            createdAt: new Date().toISOString(),
          });
        }
      });
    })
    .then(() => {
      hideLoader();
      window.location.href = '../homePage/homePage.html';
    })
    .catch((error) => {
      hideLoader();
      console.log('Error Google Sign-In:', error.message);
      alert('Google Sign-In error: ' + error.message);
    });
};

const loginWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();

  showLoader();

  auth
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      const docRef = db.collection('users').doc(user.uid);

      return docRef.get().then((doc) => {
        if (!doc.exists) {
          // Simpan data pengguna baru ke Firestore
          return db
            .collection('users')
            .doc(user.uid)
            .set({
              username: user.displayName || 'Facebook User',
              email: user.email || null,
              profilePicture: user.photoURL || null,
              provider: 'facebook',
              createdAt: new Date().toISOString(),
            });
        }
      });
    })
    .then(() => {
      hideLoader(); // Sembunyikan loader
      window.location.href = '../homePage/homePage.html';
    })
    .catch((error) => {
      hideLoader(); // Sembunyikan loader jika terjadi error
      console.log('Error Facebook Sign-In:', error.message);
      alert('Facebook Sign-In error: ' + error.message);
    });
};
