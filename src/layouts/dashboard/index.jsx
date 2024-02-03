/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useTheme } from '@emotion/react';

import { Navigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Nav from './nav';
import Main from './main';
import Header from './header';
// ----------------------------------------------------------------------

export default function DashboardLayout({ children, userId, userRole, onLogout }) {
  const [openNav, setOpenNav] = useState(false);
  const { id } = useParams();
  const theme = useTheme();
  console.log('dash:', userId);
  return (
    <>
      <Header userId={userId} onLogout={onLogout} onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          ...bgGradient({
            color: alpha(theme.palette.background.blend, 0.9),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
          height: 1,
        }}
        // style={{ color: theme.palette.background.blend }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
          userId={userId}
          userRole={userRole}
        />
        <Main>{children}</Main>
      </Box>
    </>
  );
  // : (
  //   <Navigate to="/login" />
  // );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
  userId: PropTypes.any,
  userRole: PropTypes.any,
  onLogout: PropTypes.func,
};
