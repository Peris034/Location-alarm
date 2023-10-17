import React from 'react';
import './Footer.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-HrMOF/gtF0zyt3RVchW6X6S0YakP5Ft44cCCSdh1GgiR78G9suwCSFm74DVn+JvM" crossorigin="anonymous" />
        <section id="footer">
          <div className="main-footer">
            <div className="logoinfo" data-aos="fade-up">

              <div className="contact-details">
                <h1>Contact Us</h1>
                <div className="fa fa-phone"></div><a href="tel:+919023101816">+91 9023101816</a><br></br>
                <div className="fa fa-envelope"></div><a href="mailto:gajeraperis1@gmail.com">gajeraperis1@gmail.com</a>
              </div>
            </div>
            <div className="com" data-aos="fade-up">
              <h1>Pages</h1>
              <a href="/dashboard">Home</a><br></br>
              <a href="/about">About</a><br></br>
              <a href="/profileuser">Profile</a><br></br>
              <a href="/contact">Contact</a><br></br>
            </div>
            <div className="info" data-aos="fade-up">
              <h1>Social Media</h1>
              <section class='social-media'>
                <div class='social-icons'>
                  <Link
                    class='social-icon-link facebook'
                    to='https://www.facebook.com/gajera.peris.9/'
                    target='_blank'
                    aria-label='Facebook'
                  >
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link
                    class='social-icon-link instagram'
                    to='https://www.instagram.com/gpm_rover/'
                    target='_blank'
                    aria-label='Instagram'
                  >
                    <i class='fa fa-instagram' />
                  </Link>
                  <Link
                    class='social-icon-link whatsapp'
                    to='https://api.whatsapp.com/send?phone=9023101816&text=Hello%20there!'
                    target='_blank'
                    aria-label='Whatsapp'
                  >
                    <i class='fa fa-whatsapp' />
                  </Link>
                  <Link
                    class='social-icon-link twitter'
                    to='https://twitter.com/GajeraPeris'
                    target='_blank'
                    aria-label='Twitter'
                  >
                    <i class='fa fa-twitter' />
                  </Link>
                  <Link
                    class='social-icon-link twitter'
                    to='https://www.linkedin.com/in/gajera-peris-ab5089227/'
                    target='_blank'
                    aria-label='LinkedIn'
                  >
                    <i class='fa fa-linkedin' />
                  </Link>
                </div>
              </section>
              {/* <div className="sociallogos">
                <div className="logobox">
                  <a href="#" className="fa fa-instagram"></a>
                  <a href="#" className="fa fa-linkedin"></a>
                  <a href="#" className="fa fa-facebook"></a>
                  <a href="#" className="fa fa-youtube-play"></a>
                </div>
              </div> */}
            </div>
          </div>
          <footer>&copy; Copyright 2023 All Rights Reserved</footer>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
// import React from 'react';
// import './Footer.css'; 

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footerContent">
//         <p>Thank You for visiting Us.</p>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
