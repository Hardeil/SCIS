/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable no-unused-vars */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Input, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { routers } from 'src/common/constant';

import Label from 'src/components/label';

// import Logo from 'src/components/logo';

export default function ProductForm({ state }) {
  const theme = useTheme();
  const router = useRouter();
  const { route: productListRouter } = routers.product_list;
  const { title: productAddTitle, apiUrl: apiAddUrl } = routers.product_add;
  const { title: productEditTitle, apiUrl: apiEditUrl, apiGetProductUrl } = routers.product_edit;
  const { id } = useParams();

  const [inputs, setInputs] = useState({});
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selected, setSelected] = useState(true);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');

  useEffect(() => {
    console.log('state:', state);
    if (state !== 'add') {
      // Edit mode
      getProductData();
      console.log('edit:', getProductData());
    } else {
      // Add mode
      setLoading(false);
    }
    const currentDate = new Date();
    const formattedDateTime = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    setDate(formattedDateTime);
  }, [id]);

  const getProductData = () => {
    const apiUrl = `${apiGetProductUrl}?id=${id}`;
    axios.get(apiUrl).then((response) => {
      const { productData } = response.data;
      console.log(response.data);
      setInputs({
        prod_id: productData.prod_id,
        prod_name: productData.prod_name,
        prod_description: productData.prod_description,
        prod_quantity: productData.prod_quantity,
        prod_category: productData.prod_category,
        prod_status: productData.prod_status,
      });
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((values) => ({
      ...values,
      [name]: value,
      logs_activity: state === 'add' ? 'You added Product' : 'You edited Product',
      logs_dateTime: date,
    }));
    inputs.prod_status = inputs.prod_quantity > 0 ? 'available' : 'not available';
    console.log(inputs);
  };

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

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setSelectedCategory(value);
    setSelected(false);
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(inputs);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (state === 'edit') {
      // Edit mode
      const apiUrl = `${apiEditUrl}?id=${id}`;
      if (selectedProductName === 'Others') {
        window.alert('Product is empty');
      } else {
        axios.put(apiUrl, inputs).then((response) => {
          console.log('edit:', response.data);
          router.push(`${productListRouter}`);
        });
        axios.post(`http://localhost/xampp/back_end/addActivityLogs.php`, inputs);
      }
      console.log('Product updated:', inputs);
    } else if (state === 'add') {
      // Add mode
      if (selectedProductName === 'Others') {
        window.alert('Product is empty');
      } else {
        const apiUrl = apiAddUrl;
        axios.post(apiUrl, inputs);
        console.log('Product added:', inputs);
        router.push(`${productListRouter}`);
        axios.post(`http://localhost/xampp/back_end/addActivityLogs.php`, inputs);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <Label>Product Name:</Label>
        <select
          style={{ padding: '10px' }}
          name="prod_name"
          value={selectedProductName}
          onChange={handleProductNameChange}
          required
        >
          {/* <option value="" disabled>
            Select Product
          </option> */}
          {state === 'edit' ? (
            <option value={inputs.prod_name}>{inputs.prod_name}</option>
          ) : (
            <option value="">Select Product</option>
          )}
          <option value="PE Shoes">PE Shoes</option>
          <option value="PE TShirt">PE TShirt</option>
          <option value="PE Jogging Pants">PE Jogging Pants</option>
          <option value="Teacher Uniform">Teacher Uniform</option>
          <option value="Student Uniform">Student Uniform</option>
          <option value="Teacher Type B">Teacher Type B</option>
          <option value="Student Type B">Student Type B</option>
          <option value="Others">Others</option>
        </select>
        {selectedProductName === 'Others' && (
          <Input
            name="prodName"
            onChange={handleChange}
            placeholder="Input Product Name"
            // value={otherProductName}
          />
        )}
        <Label>Product Description:</Label>
        <Input
          type="text"
          value={inputs.prod_description || ''}
          name="prod_description"
          placeholder="Product Description"
          onChange={handleChange}
          required
        />
        <Label>Product Quantity:</Label>
        <Input
          type="number"
          value={inputs.prod_quantity || 0}
          name="prod_quantity"
          placeholder="Product Quantity"
          onChange={handleChange}
          required
        />
        <Label>Product Category:</Label>
        <select
          style={{ padding: '10px' }}
          name="prod_category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          required
        >
          {state === 'edit' ? (
            <option value={inputs.prod_category}>{inputs.prod_category}</option>
          ) : (
            <option value="">Select Category</option>
          )}
          <option value="PE Gear">PE Gear</option>
          <option value="Uniforms">Uniforms</option>
          <option value="Type B">Type B</option>
        </select>
        <span id="error"> </span>
        <input
          type="text"
          value={
            (inputs.prod_status =
              inputs.prod_quantity > 0
                ? 'available'
                : inputs.prod_quantity === 0
                ? 'not available'
                : 'not available')
          }
          name="prod_status"
          placeholder="Product Status"
          onChange={handleChange}
          hidden
        />
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
        {id ? 'Update' : 'ADD'}
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
            <Typography variant="h4">{id ? productEditTitle : productAddTitle}</Typography>
            <Button
              onClick={() => router.push(routers.product_list.route)}
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
ProductForm.propTypes = {
  state: PropTypes.string,
};
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
/* import axios from 'axios';
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

export default function AddProductView() {
  const theme = useTheme();

  const router = useRouter();

  const [inputs, setInputs] = useState({});
  const [selectedProductName, setSelectedProductName] = useState('');
  const [selected, setSelected] = useState(true);
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
    console.log(inputs);
  };
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    if (value === '') {
      document.getElementById(`error`).innerHTML = `Please Input Your ${name}!!`;
    } else {
      const apiUrl = 'http://localhost/xampp/back_end/addProduct.php';
      axios.post(apiUrl, inputs);
      console.log(inputs);
      router.push('/product');
      document.getElementById('error').innerHTML = '';
    }
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
          {selected === true ? (
            <option>Select Product</option>
          ) : (
            <option disabled>Select Product</option>
          )}
          <option value="PE Shoes">PE Shoes</option>
          <option value="PE TShirt">PE TShirt</option>
          <option value="PE Jogging Pants">PE Jogging Pants</option>
          <option value="Teacher Uniform">Teacher Uniform</option>
          <option value="Student Uniform">Student Uniform</option>
          <option value="Teacher Type B">Teacher Type B</option>
          <option value="Student Type B">Student Type B</option>
        </select>
        <Input
          type="number"
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
            ADD NEW Product
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
} */
