import axios from 'axios';
import './dashboard.css';
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Card,
  Row,
  Col,
  ProgressBar,
  Container,
  Button,
  Badge,
  ListGroup,
} from 'react-bootstrap';
import Slidebar from './Slidebar';

const Dashboard = () => {
  const [childData, setChildData] = useState({
    name: 'John Doe',
    age: 10,
    lastCheckIn: '2024-10-21',
    moodScore: 75,
    mentalHealthStatus: 'Good',
    conversationSummary:
      'Had a fun day at school and seemed to be in a positive mood.',
  });
  const getSummary = async (token) => {
    try {
      // Make the API call with Axios
      console.log(token);
      const response = await axios.post(
        'https://arjuna-uzmq.onrender.com/api/v1/users/summary',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token if authentication is required
          },
        }
      );
      console.log(response);

      // Extract the stability score and summary from the response
      const { stabilityScore, summary } = response.data;
      setChildData({
        name: response.data.user.name,
        age: response.data.user.age,
        lastCheckIn: new Date(response.data.user.updatedAt)
          .toISOString()
          .split('T')[0]
          .toString(),
        moodScore: stabilityScore,
        mentalHealthStatus:
          stabilityScore >= 75 ? 'Good' : stabilityScore >= 50 ? 'OK' : 'Bad',
        conversationSummary: summary,
      });

      console.log('Mental Stability Score:', stabilityScore);
      console.log('Summary:', summary);
    } catch (error) {
      console.error(
        'Error fetching mental health summary:',
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    getSummary(token);
  }, []);

  return (
    <>
      <Slidebar />
      <div className='dashboard-wrapper bg-dark'>
        <Container
          fluid
          className='d-flex flex-column justify-content-start align-items-center text-light full-height px-5'
        >
          {/* Header Section */}
          <Row className='mb-4 w-100'>
            <Col>
              <h1 className='dashboard-heading'>Parental Dashboard</h1>
            </Col>
          </Row>

          {/* Main Content Row */}
          <Row className='w-100 justify-content-around'>
            {/* Child Information */}
            <Col md={5} className='mb-4 d-flex'>
              <Card className='custom-card shadow-lg border-0 flex-fill'>
                <Card.Header className='custom-card-header text-white py-3'>
                  <h5 className='fs-4 fw-bold'>Child Information</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item className='custom-card-item text-light'>
                      <strong>Name:</strong> {childData.name}
                    </ListGroup.Item>
                    <ListGroup.Item className='custom-card-item text-light'>
                      <strong>Age:</strong> {childData.age}
                    </ListGroup.Item>
                    <ListGroup.Item className='custom-card-item text-light'>
                      <strong>Last Check-In:</strong> {childData.lastCheckIn}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Mental Health Status */}
            <Col md={5} className='mb-4 d-flex'>
              <Card className='custom-card shadow-lg border-0 flex-fill'>
                <Card.Header className='custom-card-header text-white py-3'>
                  <h5 className='fs-4 fw-bold'>Mental Health Status</h5>
                </Card.Header>
                <Card.Body className='text-center'>
                  <div style={{ width: 150, height: 150, margin: '0 auto' }}>
                    <CircularProgressbar
                      value={childData.moodScore}
                      text={`${childData.moodScore}`}
                      styles={buildStyles({
                        textColor: '#fff',
                        pathColor:
                          childData.moodScore >= 75
                            ? '#28a745'
                            : childData.moodScore >= 40
                            ? '#ffc107'
                            : '#dc3545',
                        trailColor: '#333',
                        textSize: '34px',
                      })}
                    />
                  </div>
                  <div className='mt-4'>
                    <Badge
                      bg={
                        childData.moodScore >= 75
                          ? 'success'
                          : childData.moodScore >= 40
                          ? 'warning'
                          : 'danger'
                      }
                      className='fs-5 p-3 rounded-pill shadow'
                    >
                      {childData.mentalHealthStatus}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Conversation Summary */}
          <Row className='w-100'>
            <Col>
              <Card className='custom-card shadow-lg border-0 rounded-lg'>
                <Card.Header className='custom-card-header text-white py-3'>
                  <h5 className='fs-4 fw-bold'>Conversation Summary</h5>
                </Card.Header>
                <Card.Body>
                  <Card.Text className='text-light'>
                    {childData.conversationSummary}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
