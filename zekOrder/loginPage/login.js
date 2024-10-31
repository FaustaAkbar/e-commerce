document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.querySelector('.sign_in_button');
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');

  loginButton.addEventListener('click', function (event) {
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();

    if (!username || !password) {
      event.preventDefault();
      alert('Please fill in both your email and password to continue.');
    }
  });

  const googleButton = document.querySelector('.Google_Login_Button');
  const facebookButton = document.querySelector('.Facebook_Login_Button');

  googleButton.addEventListener('click', function () {
    window.open('https://accounts.google.com/signin', '_blank');
  });

  facebookButton.addEventListener('click', function () {
    window.open('https://www.facebook.com/login.php', '_blank');
  });
});
