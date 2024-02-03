/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Input } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

// eslint-disable-next-line import/named
import { bgGradient, inputStyle } from 'src/theme/css';

import Logo from 'src/components/logo';
import Label from 'src/components/label';
// ----------------------------------------------------------------------

export default function AddInventoryView() {
  const theme = useTheme();

  const [supplier, setSupplier] = useState([]);

  const [product, setProduct] = useState([]);

  const [selected, setSelected] = useState(true);

  const router = useRouter();

  const [inputs, setInputs] = useState({
    sup_fname: '',
    sup_lname: '',
    sup_company: '',
    sup_contactNo: '',
    sup_date: '',
    sup_gender: '',
    prod_name: '',
    prod_description: '',
    prod_id: '', // Set default value
    sup_id: '',
    inv_quantity: '',
    inv_broken: 0,
    inv_notBroken: 0,
  });

  useEffect(() => {
    fetchData();
    console.log('product:', product);
    console.log('product:', product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const [supplierData, productData] = await Promise.all([
        axios.get('http://localhost/xampp/back_end/supplierView.php'),
        axios.get('http://localhost/xampp/back_end/productView.php'),
      ]);

      console.log('Supplier Data:', supplierData.data);
      console.log('Product Data:', productData.data);

      setSupplier(supplierData.data);
      setProduct(productData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    console.log(inputs); // Add this line to check the state
  };

  const handleSupplierChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedSupplierObj = supplier.find((obj) => obj.sup_id === selectedId);

    console.log('Selected ID:', selectedId);
    console.log('Selected Supplier Object:', selectedSupplierObj);
    console.log('supplier:', supplier);
    console.log('Supplier Array:', supplier);
    if (selectedSupplierObj) {
      console.log('Supplier Object Structure:', selectedSupplierObj);
      // Now you can access individual properties if they exist
      console.log('sup_fname:', selectedSupplierObj.sup_fname);
      console.log('sup_lname:', selectedSupplierObj.sup_lname);
      // ... and so on
    }
    if (selectedSupplierObj) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        sup_id: selectedSupplierObj.sup_id,
        sup_fname: selectedSupplierObj.sup_fname,
        sup_lname: selectedSupplierObj.sup_lname,
        sup_gender: selectedSupplierObj.sup_gender,
        sup_contactNo: selectedSupplierObj.sup_contactNo,
        sup_company: selectedSupplierObj.sup_company,
        sup_date: selectedSupplierObj.sup_date,
      }));
    }
  };

  const handleProductChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedProductObj = product.find((obj) => obj.prod_id === selectedId);
    console.log('Selected ID:', selectedId);
    console.log('Selected Product Object:', selectedProductObj);

    setSelected(false);

    if (selectedProductObj) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        prod_id: selectedProductObj.prod_id,
        prod_name: selectedProductObj.prod_name,
        prod_description: selectedProductObj.prod_description,
      }));
    }
  };
  // const handleProductNameChange = (event) => {
  //   const { name, value } = event.target;
  //   setSelectedProductName(value);
  //   setSelected(false);
  //   setInputs((values) => ({
  //     ...values,
  //     [name]: value,
  //   }));
  //   console.log(inputs);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = 'http://localhost/xampp/back_end/addInventory.php';

    console.log(inputs);

    try {
      const response = await axios.post(apiUrl, JSON.stringify(inputs), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    router.push('/inventory');
  };
  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack display="flex" flexDirection="row">
        <Stack spacing={3} marginRight={10}>
          <Label>Supplier:</Label>
          <select
            name="sup_id"
            value={inputs.sup_id}
            onChange={handleSupplierChange}
            style={{ padding: '10px' }}
          >
            {selected === true ? (
              <option>Select Supplier</option>
            ) : (
              <option disabled>Select Supplier</option>
            )}
            {supplier.map((obj, i) => (
              <option key={i} value={obj.sup_id}>
                {obj.sup_fname}
              </option>
            ))}
          </select>
          <h4 style={inputStyle}>{inputs.sup_fname === '' ? 'First Name' : inputs.sup_fname}</h4>
          <h4 style={inputStyle}>{inputs.sup_lname === '' ? 'Last Name' : inputs.sup_lname}</h4>
          <h4 style={inputStyle}>{inputs.sup_gender === '' ? 'Gender' : inputs.sup_gender}</h4>
          <h4 style={inputStyle}>
            {inputs.sup_contactNo === '' ? 'Contact No.' : inputs.sup_contactNo}
          </h4>
          <h4 style={inputStyle}>{inputs.sup_company === '' ? 'Compnay' : inputs.sup_company}</h4>
          <h4 style={inputStyle}>{inputs.sup_date === '' ? 'Date' : inputs.sup_date}</h4>
        </Stack>
        <Stack spacing={3} marginLeft={4}>
          <Label>Product:</Label>
          <select
            value={inputs.prod_id || ''}
            style={{ padding: '10px' }}
            name="prod_id"
            onChange={handleProductChange}
          >
            {selected === true ? (
              <option>Select Product</option>
            ) : (
              <option disabled>Select Product</option>
            )}
            {product.map((obj, i) => (
              <option key={i} value={obj.prod_id}>
                {obj.prod_name}
              </option>
            ))}
          </select>
          <h4 style={inputStyle}>{inputs.prod_name === '' ? 'Product Name' : inputs.prod_name}</h4>
          <h4 style={inputStyle}>
            {inputs.prod_description === '' ? 'Product Description' : inputs.prod_description}
          </h4>
          <Label>Product Quantity:</Label>
          <Input type="number" name="inv_quantity" placeholder="Quantity" onChange={handleChange} />
          <input type="number" name="inv_broken" value={0} onChange={handleChange} hidden />
          <input
            type="number"
            name="inv_notBroken"
            value={0}
            placeholder="Not Broken"
            onChange={handleChange}
            hidden
          />
        </Stack>
      </Stack>
      <span id="error"> </span>
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
            maxWidth: 600,
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            ADD NEW INVENTORY
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
