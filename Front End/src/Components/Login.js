import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import '../Components/Login.css';

import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const [user, setName] = useState('');
  const [mail, setMail] = useState('');
  const [number, setNumber] = useState('');
  const [pass, setPass] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const [emailExistsError, setEmailExistsError] = useState('');
  const [mobileNumberExistsError, setMobileNumberExistsError] = useState('');
  const [Incorrect, setIncorrect] = useState('');
  const dispatch = useDispatch();

  const handleChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleChangeNumber = (e) => {
    const value = e.target.value;
    setNumber(value);
  };

  const handleChangeMail = (e) => {
    const value = e.target.value;
    setMail(value);
  };

  const handleChangePass = (e) => {
    const value = e.target.value;
    setPass(value);
  };

  const handleEmailBlur = async () => {
    if (mail) {
      try {
        const response = await axios.get(`http://127.0.0.1:8181/api/v1/auth/email-exists?email=${mail}`);
        if (response.status === 200) {
          setEmailExistsError('');
        }
      } catch (error) {
        console.error('Error checking email:', error);
        setEmailExistsError('*Email already exists');
      }
    } else {
      setEmailExistsError('');
    }
  };

  
  const handleMobileNumberBlur = async () => {
    if (number) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8181/api/v1/auth/mobile-number-exists?mobileNumber=${number}`
        );
        if (response.status === 200) {
          const { exists } = response.data;
          if (exists) {
          
            setMobileNumberExistsError('*Mobile number already exists');
          } else {
            
            setMobileNumberExistsError('');
          }
        } else {
          
          setMobileNumberExistsError('');
        }
      } catch (error) {
        
        console.error('Error checking mobile number:', error);
        setMobileNumberExistsError('');
      }
    } else {
      setMobileNumberExistsError('');
    }
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector('#sign-in-btn');
    const sign_up_btn = document.querySelector('#sign-up-btn');
    const container = document.querySelector('.container');

    sign_up_btn.addEventListener('click', () => {
      container.classList.add('sign-up-mode');
    });

    sign_in_btn.addEventListener('click', () => {
      container.classList.remove('sign-up-mode');
    });
  }, []);

 
  const handleSignUp = async (e) => {
    e.preventDefault();

    try { 
      const response = await axios.post('http://127.0.0.1:8181/api/v1/auth/register', {
        name :user,
        email:mail,
        mobilenumber:number,
        password:pass,
      });

      if (response.status === 200) {
        setPopupMessage('Registered Successfully');
        navigate('/');
        setName('');
        setNumber('');
        setPass('');
        setMail('');
      }
    } catch (error) {
      console.error('Error: ', error);
    }

  };

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:8181/api/v1/auth/authenticate', {
        email: mail,
        password: pass,
      });
  
      let token = response.data.token;
      let user = response.data.userResponse;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type : "EMAIL",payload:mail})
      navigate('/home');
    } catch (error) {
      console.error('Error: ', error);
      setIncorrect('*Invalid credentials');
    }
  };
  
  

  const handlePopupClose = () => {
    setPopupMessage('');
  };

  

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSignIn}>
            <h2 className="title">Sign in</h2>
            
            <div className="message" style={{fontSize:"25px"}}>
            {Incorrect && <p>{Incorrect}</p>}
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input required type="email" placeholder="Email" value={mail} onChange={handleChangeMail} />

            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input required type="password" placeholder="Password" value={pass} onChange={handleChangePass} />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          
          <form action="#" className="sign-up-form" onSubmit={handleSignUp}>
            <h2 className="title">Sign up</h2>
            
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input required type="text" placeholder="Name" value={user} onChange={handleChangeName} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input required type="email" placeholder="Email" value={mail} onChange={handleChangeMail} onBlur={handleEmailBlur}/>
              </div>
              <div className="message">
              {emailExistsError && <p>{emailExistsError}</p>}
              </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input required type="number" placeholder="Mobile Number" value={number} onChange={handleChangeNumber} onBlur={handleMobileNumberBlur}/>
              </div>
              <div className="message">
              {mobileNumberExistsError && (
                <p>{mobileNumberExistsError}</p>
                )}
                </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input required type="password" placeholder="Password" value={pass} onChange={handleChangePass} />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
        {popupMessage === 'Registered Successfully' && (
          <div className="popupContainer">
            <div className="popup">
              <p>{popupMessage}</p>
              <button className="popupClose" onClick={handlePopupClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {popupMessage === 'Password is Incorrect' && (
        <div className="popupContainer">
          <div className="popup">
            <p>{popupMessage}</p>
            <button className="popupClose" onClick={handlePopupClose}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Enter your personal details and start the journey with us</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>To keep connected with us please login with your personal info</p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
