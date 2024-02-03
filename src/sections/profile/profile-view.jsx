/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Input, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { routers } from 'src/common/constant';

import Label from 'src/components/label';

import './style.css';

// import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function ProfileView({ userId }) {
  const theme = useTheme();

  const router = useRouter();

  const [inputs, setInputs] = useState({});

  const { apiUrl: apiUserDataUrl } = routers.user_data;

  const [state, setState] = useState('view');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    if (value.trim() === '') {
      document.getElementById('error').innerHTML = `Please Input Your ${name}!!`;
    } else {
      document.getElementById('error').innerHTML = '';
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `http://localhost/xampp/back_end/editUser.php?reg_ID=${userId}`;
    axios.post(apiUrl, JSON.stringify(inputs), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setState('view');
  };
  const saveClick = () => {};
  // const renderForm = (
  //   <form onSubmit={handleSubmit}>
  //     <Stack spacing={3}>
  //       <Input name="sup_fname" placeholder="First Name" onChange={handleChange} />

  //       <Input name="sup_lname" placeholder="Last Name" onChange={handleChange} />

  //       <Input name="sup_gender" placeholder="Gender" onChange={handleChange} />

  //       <Input name="sup_contactNo" placeholder="Contact" type="number" onChange={handleChange} />

  //       <Input name="sup_company" placeholder="Company" onChange={handleChange} />

  //       <Input name="sup_date" type="date" onChange={handleChange} />
  //       <span id="error"> sada</span>
  //     </Stack>

  //     <LoadingButton
  //       fullWidth
  //       size="large"
  //       type="submit"
  //       variant="contained"
  //       color="inherit"
  //       style={{ marginTop: '20px' }}
  //     >
  //       ADD
  //     </LoadingButton>
  //   </form>
  // );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.blend, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        marginTop="15px"
        marginLeft="10px"
        marginRight="10px"
      >
        <Typography variant="h4">View Profile</Typography>
        <Button
          onClick={() => setState(state === 'edit' ? 'view' : 'edit')}
          variant="contained"
          color="inherit"
        >
          {state === 'edit' ? 'Edit' : 'View'}
        </Button>
      </Stack>
      <Stack className="container">
        <Stack className="grid-1">
          <h3>Profile Photo :</h3>
          <img
            src="public/assets/images/profile/profile.JPG"
            alt="profile pic"
            height="300vh"
            width="300vh"
            style={{ borderRadius: '125px' }}
          />
        </Stack>

        <Stack className="grid-2" spacing={3}>
          <h3>Profile Data:</h3>
          <Label>First Name:</Label>

          <Label>Last Name:</Label>

          <Label>Username:</Label>

          <Label>Contact No.:</Label>

          <Label>Address:</Label>

          <Label>Email:</Label>
        </Stack>

        {state === 'view' ? (
          <Stack className="grid-3" spacing={2.5}>
            <h3>{inputs?.reg_Fname || ''}</h3>

            <h3>{inputs?.reg_Lname || ''}</h3>

            <h3>{inputs?.reg_username || ''}</h3>

            <h3>{inputs?.reg_contact || ''}</h3>

            <h3>{inputs?.reg_address || ''}</h3>

            <h3>{inputs?.reg_email || ''}</h3>
          </Stack>
        ) : (
          <form className="grid-4" onSubmit={handleSubmit}>
            <Stack spacing={2.1}>
              <Input
                type="text"
                name="reg_Fname"
                value={inputs?.reg_Fname}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="reg_Lname"
                value={inputs?.reg_Lname}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="reg_username"
                value={inputs?.reg_username}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="reg_contact"
                value={inputs?.reg_contact}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="reg_address"
                value={inputs?.reg_address}
                onChange={handleChange}
              />
              <Input
                type="Email"
                name="reg_email"
                value={inputs?.reg_email}
                onChange={handleChange}
                required
              />
              <Button type="submit" className="btn">
                save
              </Button>
            </Stack>
          </form>
        )}
      </Stack>
      {/* <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Typography variant="h4" style={{ marginBottom: '20px' }}>
          ADD NEW SUPPLIER
        </Typography>
      </Stack> */}
    </Box>
  );
}
ProfileView.propType = {
  userId: PropTypes.any,
};
