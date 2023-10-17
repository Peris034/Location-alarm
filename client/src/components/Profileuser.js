import React from 'react';
import './profile.css';

const Profileuser = () => {
  const user = JSON.parse(localStorage.getItem('username'));
  return (
    <div>
      <section className="profile">
        <div className="container">
          <div className="use-file">
            <div className="main-user-img">
              <img src="images/peris.png" alt="" />
              <p style={{ color: "aliceblue" }}>Your Photo</p>
            </div>
            <div className="webprofile">
              <div className="main-file main-user">
                <h3>User Name :</h3>
                <div className="content-box">
                  <p>{user ? user.username : 'Peris'}</p>
                </div>
              </div>
              <div className="main-file main-email">
                <h3>Email :</h3>
                <div className="content-box">
                  <p>{user ? user.email : 'peris@gmail.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profileuser;

// import React from 'react'
// import './profile.css'

// const Profileuser = () => {
//   const user = JSON.parse(localStorage.getItem('username'));
//   return (
//     <div>
//       <section className="profile">
//         <div className="container">
//           <div className="use-file">
//             <div className="main-user-img">
//               <img src="images/peris.png" alt="" />
//               <p style={{ color: "aliceblue" }}>Your Photo</p>
//             </div>
//             <div className="webprofile">
//               <div className="main-file main-user">
//                 <p>User Name : </p>
//                 <h3>{user ? user.username : 'Peris'}</h3>
//               </div>
//               <div className="main-file main-email">
//                 <p style={{ marginRight: " 42px" }}>Email        :</p>
//                 <h3>{user ? user.email : 'peris@gmail.com'}</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Profileuser;
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Profileuser({ isAuthenticated }) {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log(userData);
//     if (!isAuthenticated) {
//       navigate('/login'); // Redirect to login page if not authenticated
//     }
//   }, [isAuthenticated, navigate]);

//   useEffect(() => {
//     // Make a request to fetch user data
//     //   fetch('http://localhost:5000/profile', {
//     //     method: 'GET',
//     //     credentials: 'include',
//     //   })
//     //     .then(response => response.json())
//     //     .then(data => setUserData(data))
//     //     .catch(error => console.error('Error fetching user data:', error));
//     fetch("http://localhost:5000/profileuser", {
//       cache: "default",
//       credentials: "include",
//       headers: {
//         "Accept": "*/*",
//         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
//       },
//       method: "GET",
//       mode: "cors",
//       redirect: "follow",
//       referrer: "http://localhost:3000/",
//       referrerPolicy: "strict-origin-when-cross-origin"
//     }).then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setUserData(data)
//       })
//       .catch(error => console.error('Error fetching user data:', error));
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>User Profile</h2>
//       <div style={styles.userInfo}>
//         <p><strong>Full Name:</strong> {userData.fullname}</p>
//         <p><strong>Username:</strong> {userData.username}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//       </div>
//     </div>
//   );
// }

// export default Profileuser;

// const styles = {
//   container: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     background: '#fff',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//   },
//   heading: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   userInfo: {
//     fontSize: '16px',
//   },
// };
