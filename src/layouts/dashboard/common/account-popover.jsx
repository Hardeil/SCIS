import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { account } from 'src/_mock/account';
import { routers } from 'src/common/constant';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
    path: '/dash',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/profile',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
    to: '/settings',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover({ userId, onLogout }) {
  const [open, setOpen] = useState(null);

  const [inputs, setInputs] = useState({ reg_Fname: '', reg_Lname: '', reg_email: '' });

  const { apiUrl: apiUserDataUrl } = routers.user_data;

  useEffect(() => {
    // Set userId in local storage when it changes
    localStorage.setItem('userId', userId);
    console.log('userId:', userId);
  }, [userId]);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleCloseLogout = () => {
    setOpen(null);
    onLogout();
  };

  useEffect(() => {
    getUserData();
    console.log('user:', userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUserData = () => {
    const apiUrl = `${apiUserDataUrl}?reg_ID=${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log('API response:', response.data);
        setInputs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {inputs?.reg_Fname || 'Loading...'} {inputs?.reg_Lname || null}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {inputs?.reg_email || 'Loading...'}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <Link
            component={RouterLink}
            to={option.path}
            style={{ textDecoration: 'none', color: 'black' }}
            key={option.label}
          >
            <MenuItem onClick={handleClose}>{option.label}</MenuItem>
          </Link>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <Link component={RouterLink} to="/login" style={{ textDecoration: 'none' }}>
          <MenuItem
            disableRipple
            disableTouchRipple
            onClick={handleCloseLogout}
            sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
          >
            Logout
          </MenuItem>
        </Link>
      </Popover>
    </>
  );
}
AccountPopover.propTypes = {
  userId: PropTypes.any,
  onLogout: PropTypes.func,
};
