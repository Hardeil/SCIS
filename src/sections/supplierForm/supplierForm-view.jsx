/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { routers } from 'src/common/constant';

// import Logo from 'src/components/logo';
// ----------------------------------------------------------------------

export default function SupplierFormView({ state }) {
  const theme = useTheme();

  const { title: addTitle, apiUrl: apiAddUrl } = routers.supplier_add;
  const { title: editTitle, apiUrl: apiEditUrl } = routers.supplier_edit;
  const { apiUrl: apiSupplierDataUrl } = routers.supplier_data;

  const router = useRouter();

  const [TextFields, setTextFields] = useState({});

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    if (state === 'edit') {
      getSupplierData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const getSupplierData = () => {
    const apiUrl = `${apiSupplierDataUrl}?id=${id}`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setTextFields(response.data);
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTextFields((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === 'edit') {
      const apiUrl = `${apiEditUrl}?id=${id}`;
      axios.put(apiUrl, TextFields).then((response) => {
        console.log(response.data);
        router.push('/supplier');
      });
      console.log('Supplier updated:', TextFields);
    } else {
      const apiUrl = apiAddUrl;
      axios.post(apiUrl, TextFields);
      console.log(TextFields);
      router.push('/supplier');
    }
  };
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="sup_fname"
          label="First Name"
          onChange={handleChange}
          value={TextFields.sup_fname || ''}
        />
        <TextField
          name="sup_lname"
          label="Last Name"
          onChange={handleChange}
          value={TextFields.sup_lname || ''}
        />
        <TextField
          name="sup_gender"
          label="Gender"
          onChange={handleChange}
          value={TextFields.sup_gender || ''}
        />
        <TextField
          name="sup_contactNo"
          label="Contact"
          type="number"
          onChange={handleChange}
          value={TextFields.sup_contactNo || ''}
        />
        <TextField
          name="sup_company"
          label="Company"
          onChange={handleChange}
          value={TextFields.sup_company || ''}
        />
        {/* <TextField
          name="sup_date"
          type="date"
          onChange={handleChange}
          value={TextFields.sup_date}
        /> */}

        <span id="error"> sada</span>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        style={{ marginTop: '20px' }}
        name="save"
      >
        {state === 'edit' ? 'update' : 'Add'}
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.blend, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4"> {state === 'edit' ? editTitle : addTitle}</Typography>
            <Button
              onClick={() => router.push(routers.supplier_list.route)}
              variant="contained"
              color="inherit"
            >
              Back
            </Button>
          </Stack>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
SupplierFormView.propTypes = {
  state: PropTypes.string,
};
