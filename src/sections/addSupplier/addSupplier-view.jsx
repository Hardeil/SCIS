/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Input } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function AddSupplierView() {
  const theme = useTheme();

  const router = useRouter();

  const [inputs, setInputs] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    if (value === '') {
      document.getElementById(`error`).innerHTML = `Please Input Your ${name}!!`;
    } else {
      const apiUrl = 'http://localhost/xampp/back_end/addSupplier.php';
      axios.post(apiUrl, inputs);
      console.log(inputs);
      router.push('/supplier');
      document.getElementById('error').innerHTML = '';
    }
  };
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Input name="sup_fname" placeholder="First Name" onChange={handleChange} />

        <Input name="sup_lname" placeholder="Last Name" onChange={handleChange} />

        <Input name="sup_gender" placeholder="Gender" onChange={handleChange} />

        <Input name="sup_contactNo" placeholder="Contact" type="number" onChange={handleChange} />

        <Input name="sup_company" placeholder="Company" onChange={handleChange} />

        <Input name="sup_date" type="date" onChange={handleChange} />
        <span id="error"> sada</span>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        style={{ marginTop: '20px' }}
      >
        ADD
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
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
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            ADD NEW SUPPLIER
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
