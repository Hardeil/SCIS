/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

export default function EditProductView() {
  const theme = useTheme();

  const router = useRouter();

  const [inputs, setInputs] = useState({});

  const [loading, setLoading] = useState(true);

  const [selectedProductName, setSelectedProductName] = useState('');

  const [selected, setSelected] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    getProductData();
    console.log(inputs.prod_desciption);
  }, []);

  const getProductData = () => {
    const apiUrl = `http://localhost/xampp/back_end/getProductData.php?id=${id}`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setInputs(response.data);
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiUrl = `http://localhost/xampp/back_end/editProduct.php?id=${id}`;
    axios.put(apiUrl, inputs).then((response) => {
      console.log(response.data);
    });
    console.log('Product updated:', inputs);
    router.push('/product');
  };
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  const handleProductNameChange = (event) => {
    const { name, value } = event.target;
    setSelectedProductName(value);
    setSelected(false);
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(inputs);
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <select
          style={{ padding: '10px' }}
          name="prod_name"
          value={selectedProductName}
          onChange={handleProductNameChange}
        >
          <option value="PE Shoes">PE Shoes</option>
          <option value="PE TShirt">PE TShirt</option>
          <option value="PE Jogging Pants">PE Jogging Pants</option>
          <option value="Teacher Uniform">Teacher Uniform</option>
          <option value="Student Uniform">Student Uniform</option>
          <option value="Teacher Type B">Teacher Type B</option>
          <option value="Student Type B">Student Type B</option>
          {selected ? (
            <option value={selectedProductName} selected="selected">
              {inputs.prod_name}
            </option>
          ) : null}
        </select>
        <Input
          type="text"
          value={inputs.prod_description}
          name="prod_description"
          placeholder="Product Description"
          onChange={handleChange}
        />

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
        Update
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
            EDIT PRODUCT
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
