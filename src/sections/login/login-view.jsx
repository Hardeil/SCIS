/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
//  import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function LoginView({ userId, setUserId, userRole, setUserRole }) {
  // const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [credentials, setCredentials] = useState({});
  // const [token, setToken] = useState('');
  const [inputs, setInputs] = useState({
    reg_password: '',
    reg_username: '',
  });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setMsg('');
      console.log(inputs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    if (value === '') {
      console.log('plss dont leave blank data');
    }
  };

  const handleSubmit = () => {
    const url = 'http://localhost/xampp/back_end/login.php';
    if (
      (inputs.reg_username !== '' && inputs.reg_password !== '') ||
      inputs.reg_status === 'Inactive'
    ) {
      axios
        .post(url, JSON.stringify(inputs))
        .then((response) => {
          console.log(response.data);
          if (response.data.result === 'Invalid Username or Password') {
            console.log('Invalid authentication');
            setError('Invalid authentication');
            setMsg(response.data.result);
          } else if (response.data.result === 'Account is not active') {
            console.log('Account is not active');
            setError('Account is not active');
            setMsg(response.data.result);
          } else if (response.data.result === 'Success') {
            console.log('Login successful');
            setError('');
            console.log('userID:', response.data.reg_Id);
            userId = response.data.reg_Id;
            userRole = response.data.reg_role;
            setUserId(userId);
            console.log(userRole);
            setUserRole(userRole);
            // const { tocken } = response.data;
            // setToken(tocken);

            setMsg('Login successful!!! Redirecting....');
            setTimeout(() => {
              router.push(`/dash`);
            }, 5000);
          }
        })
        .catch((err) => {
          console.log(err);
          setError('Error during login');
          setMsg('');
        });
    } else {
      console.log('Error: Username or password is empty');
      setError('Username or password is empty');
      setMsg('');
    }
  };

  useEffect(() => {
    if (msg === 'Login successful!!! Redirecting....') {
      setTimeout(() => {
        setMsg('');
      }, 4000);
    }
  }, [msg]);
  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="reg_username" label="Username" onChange={handleInputChange} />

        <TextField
          name="reg_password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleInputChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* <input name="token" type="hidden" value={token} onChange={handleInputChange} /> */}
      </Stack>
      <p>
        {error !== '' ? (
          <span style={{ color: 'red' }}>{String(error)}</span>
        ) : (
          <span style={{ color: 'green' }}> {msg}</span>
        )}
      </p>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        onClick={handleSubmit}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: '#F7E7CE',
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to SCIS</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link component={RouterLink} to="/registration" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
LoginView.propTypes = {
  userId: PropTypes.any,
  userRole: PropTypes.any,
  setUserId: PropTypes.func,
  setUserRole: PropTypes.func,
};
