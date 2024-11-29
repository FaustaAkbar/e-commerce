import { useState } from 'react';
import '../styles/signUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    const usernamePattern = /^[A-Z][a-zA-Z0-9]*$/;
    if (!usernamePattern.test(username)) {
      setError('Username harus diawali dengan huruf besar.');
      return;
    }

    try {
      const registerResponse = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const registerData = await registerResponse.json();
      
      if (registerResponse.status === 409) {
        setError(registerData.message);
        return;
      }

      if (!registerResponse.ok) {
        throw new Error(registerData.message || 'Failed to register');
      }

      alert(registerData.message);
      window.location.href = '/login';
    } catch (error) {
      setError(`An unexpected error occurred: ${error.message}`);
    }
};


  return (
    <div className='SignUp'>
      <div id="loading-spinner" className="loading-spinner" style={{display: "none"}}></div>

<div className="background">
  <img src="/images/login.png" width="800" height="815" alt="Login background" />
</div>
<div className="kanan">
  <img className="logozek" src="/images/logozek.png" alt="Zek logo" />
  <div className="container-signup">
    <h2>Create Account</h2>
    <form id="signUpForm" onSubmit={handleSignUp}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="email">Email Address</label>
      <input type="email" id="email" name="email" placeholder="youraddress@gmail.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="container-loginwith">
       
        <div className="Google_Login">
          <button type="button" className="Google_Login_Button">
            <div className="logo_google">
              <img src="../images/google.png" width="30" height="30" alt="Google logo" />
            </div>
            Login with Google
          </button>
        </div>
        <div className="Facebook_Login">
          <button type="button" className="Facebook_Login_Button">
            <div className="logo_facebook">
              <img src="../images/fb.png" width="50" height="50" alt="Facebook logo" />
            </div>
            Login with Facebook
          </button>
        </div>
      </div>
      <button type="submit" className="sign_up_button">Sign Up</button>
    </form>

    <div id="signUpError" style={{color: "red"}}>{error}</div>
    <p className="already">
      Already have an account? <a className="login" href="../loginPage/login.html"><b>Log in</b></a>
    </p>
  </div>
</div>
    </div>
  );
};export default SignUp;