import React, { useEffect, useRef, useState } from 'react';
import './Page.css';
import Navbar from './Navbar';
import Slidebar from './Slidebar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Page({ elementsCount }) {
  const [name, setName] = useState('baby1');
  const [text, settext] = useState('');
  const [chat, setChat] = useState([]);

  const chatContainerRef = useRef(null);

  const textchng = (event) => {
    settext(event.target.value);
  };
  const navigate = useNavigate();

  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleName = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        // 'http://localhost:5000/api/v1/users/find',
        'https://arjuna-uzmq.onrender.com/api/v1/users/find',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        },
        { withCredentials: true }
      );
      //   localStorage.setItem('token', response.data.data);
      //   console.log(response);
      if (response.data.sucess) {
        // toast.success('Login successful!', {
        //   position: 'top-right',
        // });

        setName(response.data.data.user.name);

        // navigate('/chat');
      } else {
        console.log('Error. Please try again.');
      }
    } catch (error) {
      console.log('Error toast will show');

      //   console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await fetch('/data.json'); // Path to your JSON file
      const data = await response.json();
      setChat(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // fetchData();
    handleName();
    handleSubmit();
    console.log(chat);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        // 'http://localhost:5000/api/v1/users/display',
        'https://arjuna-uzmq.onrender.com/api/v1/users/display',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        },
        { withCredentials: true }
      );
      //   localStorage.setItem('token', response.data.data);
      //   console.log(response);
      //   console.log(response);
      if (response.status === 200) {
        // toast.success('Login successful!', {
        //   position: 'top-right',
        // });
        setChat(response.data);

        // navigate('/chat');
      } else {
        toast.error('Error. Please try again.', {
          position: 'top-right',
        });
      }
    } catch (error) {
      //   console.log(error);
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'please try again.';

      toast.error(errorMessage, {
        position: 'top-right',
      });
      //   console.log(error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return; // Prevent sending empty messages
    const token = localStorage.getItem('token');

    const messageData = {
      message: text,
      userName: name,
    };

    try {
      const response = await axios.post(
        'https://arjuna-uzmq.onrender.com/api/v1/users/chat',
        // 'http://localhost:5000/api/v1/users/chat',
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here
          },
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { userChat, botChat } = response.data;

        // Update your chat state with both user and bot messages
        setChat((prevChat) => [
          ...prevChat,
          userChat, // User's message
          botChat, // Bot's response
        ]);
        settext(''); // Clear the input field after sending
        scrollToBottom(); // Optional: Scroll to the bottom after sending
      } else {
        console.error('Error sending message:', response.data.error);
      }
    } catch (error) {
      console.error(
        'Error:',
        error.response ? error.response.data : error.message
      );
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Navbar />
      {/* <Slidebar /> */}
      <div className='contanier' style={{ marginTop: '10px' }}>
        <div className='d-flex flex-wrap rectangle6'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className='col-6 p-2' key={index}>
              <div className='square'>
                <img
                  src='./pic.jpg'
                  alt='error'
                  className='img-fluid rounded'
                />
                <div className='square-name'>Name {index + 1}</div>
              </div>
            </div>
          ))}
        </div>

        <div className='rectangle1'>
          <div
            className='chat'
            ref={chatContainerRef}
            style={{ overflowY: 'auto', height: '90%' }}
          >
            {chat.length > 0 ? (
              chat.map((message) =>
                message.name === name ? (
                  <div key={message._id} className='message text right'>
                    <p className='name'>{message.name}</p>
                    <p>{message.message}</p>
                    <p className='timestamp'>
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div key={message._id} className='message text left'>
                    <p className='name'>{message.name}</p>
                    <p>{message.message}</p>
                    <p className='timestamp'>
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                )
              )
            ) : (
              <p>Loading messages...</p>
            )}
          </div>
          <div className='d-flex flex-row align-items-center send'>
            <div style={{ flex: 1, marginRight: '10px' }}>
              <textarea
                className='send1'
                value={text}
                onChange={textchng}
                placeholder='Type a message...'
              />
            </div>
            <img
              src='./send.png'
              alt='Send'
              onClick={handleSend}
              style={{
                cursor: 'pointer',
                marginBottom: '5px',
                height: '40px',
                width: '40px',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
