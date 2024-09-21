import { memo } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Page from './components/Page';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility function to check if the user is logged in (e.g., checking localStorage for token)
const isAuthenticated = () => {
  // For example, check if there's a token in localStorage or cookies
  return localStorage.getItem('token'); // Customize according to how you store auth token
};

// Protected Route component: Redirects to login if user is not authenticated
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to='/login' />;
};

// Redirect if authenticated: Redirects to /chat if user is logged in
const RedirectIfAuthenticated = ({ element }) => {
  return isAuthenticated() ? <Navigate to='/chat' /> : element;
};

const App = memo(function App(props = {}) {
  return (
    <Router>
      <div className='App w-full'>
        <Routes>
          {/* Default to login page if root path is selected */}
          <Route path='/' element={<Navigate to='/login' />} />

          {/* Register route - Redirects to /chat if user is already logged in */}
          <Route
            path='/register'
            element={<RedirectIfAuthenticated element={<Register />} />}
          />

          {/* Login route - Redirects to /chat if user is already logged in */}
          <Route
            path='/login'
            element={<RedirectIfAuthenticated element={<Login />} />}
          />

          {/* Chat route - Protected, only accessible if user is logged in */}
          <Route path='/chat' element={<ProtectedRoute element={<Page />} />} />

          {/* Catch-all route - Redirect to login if no valid route */}
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
});

export { App };
