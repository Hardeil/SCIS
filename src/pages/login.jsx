/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage({ setUserId, userId, userRole, setUserRole }) {
  // Define a function to handle user ID updates
  // const handleUserIdUpdate = (userId) => {
  //   // You can perform additional actions if needed
  //   console.log('User ID updated:', userId);
  // };
  useEffect(() => {
    console.log('LoginPage userId:', userId);
  }, []);
  return (
    <>
      <Helmet>
        <title> Login | SCIS UI </title>
      </Helmet>

      <LoginView
        userId={userId}
        setUserId={setUserId}
        userRole={userRole}
        setUserRole={setUserRole}
      />
    </>
  );
}
LoginPage.propTypes = {
  userId: PropTypes.any,
  userRole: PropTypes.any,
  setUserId: PropTypes.func,
  setUserRole: PropTypes.func,
};
