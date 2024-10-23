import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faX,
  faTachometerAlt,
  faBell,
  faComments,
  faChartLine,
  faPuzzlePiece,
  faQuestionCircle,
  faUser,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import './Slidebar.css'; // Link to your CSS file
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate, useHistory } from 'react-router-dom';

const Slidebar = () => {
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [showBrainteaserModal, setShowBrainteaserModal] = useState(false);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    setShowDashboardModal(true);
  };

  const handleBrainteaserClick = () => {
    setShowBrainteaserModal(true);
  };

  const handleCodeSubmit = () => {
    if (code === '1234') {
      // Replace '1234' with your actual code logic
      navigate('/dashboard'); // Use navigate instead of history.push
      setShowDashboardModal(false);
    } else {
      alert('Incorrect code. Please try again.'); // User-friendly message
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      console.log('token', token);
      // localStorage.removeItem('token'); // Clear the token if you're storing it
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

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className='logo'>
          <img
            src='./Bloom icon.png' // Replace with your logo
            alt='Bloom Logo'
          />
        </div>
        <ul className='menu'>
          <Link to='#' onClick={handleDashboardClick}>
            <li>
              <FontAwesomeIcon icon={faTachometerAlt} className='icon' />
              {isOpen && <span>Dashboard</span>}
            </li>
          </Link>
          <Link to='/chat'>
            <li>
              <FontAwesomeIcon icon={faComments} className='icon' />
              {isOpen && <span>Chat</span>}
            </li>
          </Link>
          <li onClick={handleBrainteaserClick}>
            <FontAwesomeIcon icon={faPuzzlePiece} className='icon' />
            {isOpen && <span>Brainteasers</span>}
          </li>
        </ul>
        <div className='user-section'>
          <div className='user-info'>
            <FontAwesomeIcon icon={faUser} className='icon' />
            {isOpen && <span>User</span>}
          </div>
          <div className='logout' onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className='icon' />
            {isOpen && <span>Logout</span>}
          </div>
        </div>
        <button className='toggle-btn' onClick={toggleSidebar}>
          <FontAwesomeIcon icon={!isOpen ? faBars : faX} />
        </button>
      </div>
      {/* Dashboard Modal */}
      <Modal
        show={showDashboardModal}
        onHide={() => setShowDashboardModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Enter 4-digit code'
            maxLength={4}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowDashboardModal(false)}
          >
            Close
          </Button>
          <Button variant='primary' onClick={handleCodeSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Brainteasers Modal */}
      <Modal
        show={showBrainteaserModal}
        onHide={() => setShowBrainteaserModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Coming Soon</Modal.Title>
        </Modal.Header>
        <Modal.Body>This feature will be available soon!</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowBrainteaserModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Slidebar;

// import React from 'react'
// import "./Slidebar.css"
// import { useState } from 'react';
// export default function Slidebar({ handlePlusClick, elementsCount }) {

//   return (
//     <div className=" slide">
//       <div className=" slide1  start-0 text-white" >
//         <div className='plus'><i
//           className="fa-solid fa-plus"
//           style={{
//             border: "2px solid transparent",
//             padding: "4px",
//             fontSize: "30px",
//             borderRadius: "5px",

//             margin: "7px 5px 5px "
//           }}
//           onClick={handlePlusClick}
//         /></div>
//         <div>
//           {Array(elementsCount).fill(0).map((_, index) => (
//             <div key={index} className="name" style={{
//               border: "2px solid transparent",
//               padding: "5px 13px",
//               borderRadius: "8px",
//               backgroundColor: "rgba(255, 255, 255, 0.15)",
//               margin: "7px 5px 5px 5px ",
//               marginBottom: "10px",
//             }}>V</div>
//           ))}

//         </div>
//       </div>
//       <button class="btn  slide2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i class="fa-solid fa-bars" style={{ height: "4%", fontSize: "28px", marginTop: "4px" }}></i></button>

//       <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel" style={{backgroundColor:"rgba(255 255 255 / 24%)"}}>
//         <div class="offcanvas-header">

//           <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//         </div>
//         <div class="offcanvas-body" >
//           <p>
//             <div className='plus'><i
//               className="fa-solid fa-plus"
//               style={{
//                 border: "2px solid transparent",
//                 padding: "4px",
//                 fontSize: "30px",
//                 borderRadius: "5px",
//                 color:"white",
//                 margin: "7px 5px 5px "
//               }}
//               onClick={handlePlusClick}
//             />
//               {Array(elementsCount).fill(0).map((_, index) => (
//                 <div key={index} className="name" style={{
//                   border: "2px solid transparent",
//                   padding: "5px 13px",
//                   borderRadius: "8px",
//                   color:"white",
//                   backgroundColor: "rgba(255, 255, 255, 0.15)",
//                   margin: "7px 5px 5px 5px ",
//                   marginBottom: "10px",
//                 }}>V</div>
//               ))}
//             </div></p>
//         </div>
//       </div>
//     </div>

//   );
// }
