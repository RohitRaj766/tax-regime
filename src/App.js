import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import AddTaxRegime from './components/AddTaxRegime';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
// import Logout from './components/Logout';
import Navbar from './components/Navbar';
import SuggestionManagement from './components/SuggestionManagement';
import NotFound from './components/NotFound'; // Create NotFound component

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/tax-regime" element={
              <ProtectedRoute>
                <AddTaxRegime />
              </ProtectedRoute>
            } />
            <Route path="/suggestion-management" element={
              <ProtectedRoute>
                <SuggestionManagement />
              </ProtectedRoute>
            } />
            {/* Catch-all route for 404 errors */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
