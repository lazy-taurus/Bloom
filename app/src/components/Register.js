import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://arjuna-uzmq.onrender.com/api/v1/users/register',
        {
          name,
          email,
          password,
          age: parseInt(age),
        }
      );
      //   localStorage.setItem('token', response.data.data);
      //   console.log(response);
      if (response.data.sucess) {
        toast.success('Register successful!', {
          position: 'top-right',
        });

        navigate('/login');
      } else {
        toast.error('Error. Please try again.', {
          position: 'top-right',
        });
      }
    } catch (error) {
      console.log('Error toast will show');
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'please try again.';

      toast.error(errorMessage, {
        position: 'top-right',
      });
      console.log(error);
    }
  };

  return (
    <div className='container'>
      <div className='login d-flex flex-column px-5 justify-content-evenly'>
        <p className='loginname fw-bold'>Register</p>

        <div className='user'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your Name'
          />
          <span></span>
        </div>
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
            type='text'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder='Enter your Age'
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
            Register
          </button>
          <Link className='create' to='/login'>
            <p className='create'>Already a User?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
