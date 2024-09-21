import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ bgchange }) {
  const navigate = useNavigate(); // Corrected to useNavigate

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'https://arjuna-uzmq.onrender.com/api/v1/users/logout', // Adjust URL as necessary
        // 'http://localhost:5000/api/v1/users/logout', // Adjust URL as necessary
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        },
        { withCredentials: true } // Include credentials for cookie-based auth
      );

      if (response.status === 200) {
        // Handle successful logout (e.g., clear local storage, redirect)
        localStorage.removeItem('token'); // Clear the token if you're storing it
        toast.success(response.data.message || 'Logged out successfully');
        navigate('/login'); // Redirect to login page
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Logout failed. Please try again.';
      toast.error(errorMessage);
      console.error('Logout Error:', error);
    }
  };
  return (
    <nav
      className='navbar navbar-expand-lg '
      style={{ backgroundColor: 'rgba(248, 247, 249, 0.1)', margin: '0' }}
    >
      <div className='container-fluid' style={{ margin: '0 9px' }}>
        <a className='navbar-brand' href='#'>
          <img
            src='./Bloom icon.png'
            alt='error'
            style={{ height: '65px', width: '75px' }}
          ></img>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
          <ul className='navbar-nav  mb-2 mb-lg-0 ' style={{ width: '100%' }}>
            <li className='nav-item' style={{ width: '80%' }}>
              <form
                className='d-flex justify-content-center ms-8'
                role='search'
              >
                <input
                  className='form-control me-2 w-60'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  style={{ width: '50%' }}
                />
              </form>
            </li>
            <li
              className='nav-item'
              style={{ marginRight: '7px', fontSize: '25px' }}
            >
              <i className='nav-link active fa-solid fa-bolt'></i>
            </li>
            <li
              className='nav-item '
              style={{ marginRight: '7px', fontSize: '25px' }}
            >
              <i class=' nav-link fa-regular fa-bell'></i>
            </li>
            <li
              className='nav-item '
              style={{ marginRight: '7px', fontSize: '25px' }}
              onClick={handleLogout}
            >
              <i class=' nav-link fa-solid fa-right-to-bracket'></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
