/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile';

// ----------------------------------------------------------------------

export default function ProfilePage({ userId }) {
  return (
    <>
      <Helmet>
        <title> Profile | Minimal UI </title>
      </Helmet>

      <ProfileView userId={userId} />
    </>
  );
}
ProfilePage.propType = {
  userId: PropTypes.any,
};
