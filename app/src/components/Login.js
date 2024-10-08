import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://arjuna-uzmq.onrender.com/api/v1/users/login',
        // 'http://localhost:5000/api/v1/users/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      localStorage.setItem('token', response.data.data.accessToken);
      console.log(response.data.data.accessToken);
      if (response.data.sucess) {
        toast.success('Login successful!', {
          position: 'top-right',
        });

        navigate('/chat');
      } else {
        toast.error('Error. Please try again.', {
          position: 'top-right',
        });
      }
    } catch (error) {
      // console.log('Error toast will show');
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'please try again.';

      toast.error(errorMessage, {
        position: 'top-right',
      });
      // console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='login d-flex flex-column px-5 justify-content-evenly'>
        <p className='loginname fw-bold'>LOGIN</p>

        <div className='user'>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
          />
          <span></span>
        </div>
        <div className='user'>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
          <span></span>
        </div>

        <div className='d-flex flex-column justify-content-center'>
          <button className='btn px-5 py-2 fw-bold' onClick={handleSubmit}>
            LOGIN
          </button>
          <Link className='create' to='/register'>
            <p className='create'>create account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
