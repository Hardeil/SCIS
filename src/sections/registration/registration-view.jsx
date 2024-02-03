/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import Button from '@mui/material/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
// import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { bgGradient } from 'src/theme/css';
import { routers } from 'src/common/constant';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegistrationView({ state }) {
  // const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [selectedRoleName, setSelectedRoleName] = useState('');

  const [selectedStatus, setselectedStatus] = useState('');

  const [inputs, setInputs] = useState({ reg_status: 'Inactive' });

  const [loading, setLoading] = useState(true);

  const { title: editTitle, apiUrl: apiEditUrl } = routers.user_edit;
  const { apiUrl: apiUserDataUrl } = routers.user_data;

  const { reg_ID } = useParams();

  useEffect(() => {
    if (state === 'edit') {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const getUserData = () => {
    const apiUrl = `${apiUserDataUrl}?reg_ID=${reg_ID}`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setInputs(response.data);
      setLoading(false);
    });
  };

  const handleRoleChange = (event) => {
    const { name, value } = event.target;
    setSelectedRoleName(value);
    console.log(value);
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(inputs);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setselectedStatus(value);
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(inputs);
  };

  const handleSubmit = (e) => {
    if (state !== 'edit') {
      e.preventDefault();
      const apiUrl = 'http://localhost/xampp/back_end/addUser.php';
      axios.post(apiUrl, JSON.stringify(inputs), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(inputs);
      router.push('/login');
    } else {
      const apiUrl = `http://localhost/xampp/back_end/editUser.php?reg_ID=${reg_ID}`;
      axios.post(apiUrl, JSON.stringify(inputs), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/user');
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          value={inputs.reg_Fname}
          name="reg_fname"
          label="First Name"
          onChange={handleChange}
          required
        />

        <TextField
          value={inputs.reg_Lname}
          name="reg_lname"
          label="Last Name"
          onChange={handleChange}
          required
        />

        <TextField
          value={inputs.reg_username}
          name="reg_username"
          label="Username"
          onChange={handleChange}
          required
        />

        <TextField
          value={inputs.reg_contact}
          name="reg_contact"
          label="Contact"
          type="number"
          onChange={handleChange}
          required
        />

        <TextField
          value={inputs.reg_address}
          name="reg_address"
          label="Address"
          onChange={handleChange}
          required
        />

        <TextField
          value={inputs.reg_email}
          name="reg_email"
          label="Email address"
          onChange={handleChange}
          required
        />

        {state === 'edit' ? null : (
          <TextField
            name="reg_password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
        )}

        <select
          name="reg_role"
          value={selectedRoleName || inputs.reg_role}
          onChange={handleRoleChange}
          style={{ padding: '10px' }}
          required
        >
          {state !== 'edit' ? (
            <>
              <option value="">Select Role</option>
              <option value="Staff">Cudtodial Staff</option>
              <option value="Admin">Administrator</option>
            </>
          ) : (
            <>
              <option value={inputs.reg_role}>{inputs.reg_role}</option>
              {inputs.reg_role !== 'Staff' && <option value="Staff">Staff</option>}
              {inputs.reg_role !== 'Admin' && <option value="Admin">Administrator</option>}
            </>
          )}
        </select>

        {/* <TextField name="reg_status" value="inactive" onChange={handleChange} hidden /> */}
        {state === 'edit' ? (
          <select
            style={{ padding: '10px' }}
            name="reg_status"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value={inputs.reg_status}>{inputs.reg_status}</option>
            {inputs.reg_status !== 'Inactive' && <option value="Inactive">Inactive</option>}
            {inputs.reg_status !== 'Active' && <option value="Active">Active</option>}
          </select>
        ) : null}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        // onClick={handleClick}
        style={{ marginTop: '20px' }}
      >
        {state === 'edit' ? 'Update' : 'Register'}
      </LoadingButton>
      {state === 'edit' ? null : (
        <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
          Already Have An Account?{' '}
          <Link component={RouterLink} to="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
            Login here...
          </Link>
        </Typography>
      )}
    </form>
  );

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  return (
    <Box
      sx={{
        ...bgGradient({
          // color: alpha(theme.palette.background.default, 0.9),
          color: '#F7E7CE',
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {state === 'edit' ? null : (
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />
      )}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            {state === 'add' ? 'Sign up to SCIS' : editTitle}
          </Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack> */}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
RegistrationView.propTypes = {
  state: PropTypes.string,
};
