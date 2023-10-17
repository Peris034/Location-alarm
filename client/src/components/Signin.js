//client/src/components/Login.js
import React, { useState } from 'react';
import './Login.css';
import './AuthBox.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputBackgroundu, setInputBackgroundu] = useState('rgba(221, 255, 2, 0.272)');
  const [inputBackground, setInputBackground] = useState('rgba(221, 255, 2, 0.272)');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signin', {
        cache: "default",
        credentials: "omit",
        method: 'POST',
        headers: {
          "Accept": "*/*",
          "Accept-Language": "en-IN,en-GB;q=0.9,en;q=0.8",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
        },
        body: JSON.stringify(formData),
        referrerPolicy: "strict-origin-when-cross-origin",
        mode: "cors",
        redirect: "follow",
        referrer: "http://localhost:3000/",
        referrerPolicy: "strict-origin-when-cross-origin"
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({
          username: '',
          password: ''
        });
        setIsLoggedIn(true);
        document.cookie = "authenticated=true";
        setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to login page after successful login
      } else {
        alert(data.message); // Display an alert for error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoggedIn) {
    navigate('/dashboard');
  }

  return (
    <div class="hero"> 
    <div className="container">
      <div className="box">
        <div className="row">
        <div className="register" onClick={() => navigate('/signup')}>
          Register
        </div>
        <div className="login">
          Login
        </div>
      </div>
      {/* <form onSubmit={handleSubmit} method='post'> */}
      <form className='login-form' onSubmit={handleSubmit} method='post' action='/login'>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          onFocus={() => setInputBackground('rgba(255, 2, 192, 0.272)')}
          onBlur={() => setInputBackground('rgba(221, 255, 2, 0.272)')}
          style={{ backgroundColor: inputBackground }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => setInputBackgroundu('rgba(255, 2, 192, 0.272)')}
          onBlur={() => setInputBackgroundu('rgba(221, 255, 2, 0.272)')}
          style={{ backgroundColor: inputBackgroundu }}
        />
        <button type="submit">Login</button>
      </form>
      <p>Not registered? <span class="login-link" onClick={() => navigate('/signup')}>Register Here</span>.</p>

      </div>
      
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
    </div>
  );
}

export default Signin;


// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// export default function Login() {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ identifier: "", password: "" });
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [loginError, setLoginError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       alert(data.message);
//       setCredentials({ identifier: "", password: "" });
//       navigate('/');
//       setLoginSuccess(true);
//       setLoginError(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setLoginError(true);
//       setLoginSuccess(false);
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username or Email</label>
//           <input
//             type="text"
//             value={credentials.identifier}
//             onChange={(e) => setCredentials({ ...credentials, identifier: e.target.value })}
//             placeholder="username or email"
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={credentials.password}
//             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//             placeholder="Password"
//           />
//         </div>

//         <button type="submit">Login</button>

//         {loginSuccess && (
//           <p className="text-success">You Are Logged in Successfully</p>
//         )}

//         {loginError && (
//           <p className="text-danger">Invalid email or password</p>
//         )}
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// export default function Login() {
//   const navigate = useNavigate();
//   const [identifier, setIdentifier] = useState(""); // Changed from username/email to identifier
//   const [password, setPassword] = useState("");
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [loginError, setLoginError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const requestBody = {
//       identifier,
//       password,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(requestBody),
//       });
      
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       alert(data.message);
//       setIdentifier('');
//       setPassword('');
//       navigate('/');
//       setLoginSuccess(true);
//       setLoginError(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setLoginError(true);
//       setLoginSuccess(false);
//     }
//   };

//   return (
//     <div className="loginContainer">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username or Email</label>
//           <input
//             type="text"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//             placeholder="username or email"
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//         </div>

//         <button type="submit">Login</button>

//         {loginSuccess && (
//           <p className="text-success">You Are Logged in Successfully</p>
//         )}

//         {loginError && (
//           <p className="text-danger">Invalid email or password</p>
//         )}
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
// import './Login.css';

// export default function Login() {
//   const navigate = useNavigate();
//   let [username, setUsername] = useState("");
//   let [email, setEmail] = useState("");
//   let [password, setPassword] = useState("");
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [loginError, setLoginError] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const requestBody = {
//       identifier: username || email, // Use username if provided, else use email
//       password,
//     };
//     // const requestBody = {
//     //   username,
//     //   email,
//     //   password,
//     // };
//     const response = fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });
//     const data = response.json();
      
//         if (!response.ok) {
//           console.log(response);
//           throw new Error("Network response was not ok");
//         } else {
//           alert(data.message);
//           setUsername = '';
//           setPassword = '';
//           //setIsLoggedIn(true);
//           navigate('/');
//         }
//         //return response.json();
      
//       .then((data) => {
//         setLoginSuccess(true);
//         setLoginError(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setLoginError(true);
//         setLoginSuccess(false);
//       });
//   };

//   return (
//     <div className="loginContainer">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username or Email</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="username or email"
//           />
//         </div>
//         {/* <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="username"
//           />
//         </div>

//         <div>
//           <label>Email address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter email"
//           />
//         </div> */}

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//         </div>

//         <button type="submit">Login</button>

//         {loginSuccess && (
//           <p className="text-success">You Are Logged in Successfully</p>
//         )}

//         {loginError && (
//           <p className="text-danger">Invalid email or password</p>
//         )}
//       </form>
//     </div>
//   );
// }

// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import Cookies from 'js-cookie';
// // import './Login.css';

// // function Logins () {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const navigate = useNavigate();

// //   const handleLogin = () => {
// //     if (username === 'user' && password === 'password') {
// //       Cookies.set('loggedIn', 'true', { expires: 1 });
// //       navigate('/');
// //     } else {
// //       alert('Invalid credentials');
// //     }
// //   };

// //   useEffect(() => {
// //     const loggedIn = Cookies.get('loggedIn');
// //     if (loggedIn === 'true') {
// //       navigate('/');
// //     }
// //   }, [navigate]);

// //   return (
// //     <div className="loginContainer">
// //       <h2>Login 2</h2>
// //       <form>
// //         <div>
// //           <input
// //             type="text"
// //             value={username}
// //             placeholder="Username"
// //             onChange={(e) => setUsername(e.target.value)}
// //           />
// //         </div>
// //         <div>
// //           <input
// //             type="password"
// //             value={password}
// //             placeholder="Password"
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //         </div>
// //         <button type="button" onClick={handleLogin}>
// //           Login
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Logins;



