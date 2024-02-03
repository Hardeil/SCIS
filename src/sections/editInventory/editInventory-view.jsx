/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

import Logo from 'src/components/logo';
// import Label from 'src/components/label';

export default function EditInventoryView({ state }) {
  const theme = useTheme();
  const router = useRouter();
  const { id, sup_id, prod_id } = useParams();

  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  // const [release, setRelease] = useState(0);
  const [currentRelease, setCurrentRelease] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const { purchase_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [inputs, setInputs] = useState({
    sup_id: '',
    sup_fname: '',
    sup_lname: '',
    sup_gender: '',
    sup_contactNo: '',
    sup_company: '',
    prod_id: '',
    prod_name: '',
    prod_description: '',
    inv_quantity: '',
    inv_release: 0,
  });

  useEffect(() => {
    fetchData();
    if (state === 'edit') {
      getInventoryData();
    } else {
      setLoading(false);
    }
    console.log('state:', state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { title: addInventoryTitle, apiUrl: apiAddInventoryUrl } = routers.inventory_add;
  const { title: editInventoryTitle, apiUrl: apiEditInventoryUrl } = routers.inventory_edit;
  const { apiUrl: apiInventoryDataUrl } = routers.inventory_data;
  const { apiUrl: apiProductDataUrl } = routers.product_list;
  const { apiUrl: apiSupplierDataUrl } = routers.supplier_list;

  const getInventoryData = () => {
    const apiUrl = `${apiInventoryDataUrl}?id=${id}&sup_id=${sup_id}&prod_id=${prod_id}`;
    axios.get(apiUrl).then((response) => {
      const { inventoryData, supplierData, productData } = response.data;
      setInputs({
        sup_id: supplierData.sup_id,
        sup_fname: supplierData.sup_fname,
        sup_lname: supplierData.sup_lname,
        sup_gender: supplierData.sup_gender,
        sup_contactNo: supplierData.sup_contactNo,
        sup_company: supplierData.sup_company,
        prod_id: productData.prod_id,
        prod_name: productData.prod_name,
        prod_description: productData.prod_description,
        inv_quantity: inventoryData.inv_quantity,
        inv_product_condition: inventoryData.inv_product_condition,
        inv_release: inventoryData.inv_release,
      });
      setCurrentRelease(inventoryData.inv_release);
      setCurrentQuantity(inventoryData.inv_quantity_remaining);
      setLoading(false);
    });
  };

  const fetchData = async () => {
    try {
      const [supplierData, productData] = await Promise.all([
        axios.get(apiSupplierDataUrl),
        axios.get(apiProductDataUrl),
      ]);

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
    console.log(inputs);
    // if (name === 'inv_release') {
    //   // Update inv_release based on user input
    //   setRelease(Number(value));
    // }
    // else {
    //   setInputs((prevInputs) => ({
    //     ...prevInputs,
    //     [name]: value,
    //   }));
    // }
  };

  const handleSupplierChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedSupplierObj = supplier.find((obj) => obj.sup_id === selectedId);

    if (selectedSupplierObj) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        sup_id: selectedSupplierObj.sup_id,
        sup_fname: selectedSupplierObj.sup_fname,
        sup_lname: selectedSupplierObj.sup_lname,
        sup_gender: selectedSupplierObj.sup_gender,
        sup_contactNo: selectedSupplierObj.sup_contactNo,
        sup_company: selectedSupplierObj.sup_company,
      }));
    }
  };

  const handleProductChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedProductObj = product.find((obj) => obj.prod_id === selectedId);

    if (selectedProductObj) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        prod_id: selectedProductObj.prod_id,
        prod_name: selectedProductObj.prod_name,
        prod_description: selectedProductObj.prod_description,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === 'edit') {
      try {
        const apiUrl = `${apiEditInventoryUrl}?id=${id}&sup_id=${sup_id}&prod_id=${prod_id}`;
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
    } else {
      const apiUrl = apiAddInventoryUrl;

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
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack display="flex" flexDirection="row">
        <Stack spacing={3} marginRight={10}>
          <h2>Supplier:</h2>
          <select
            id="sup_id"
            name="sup_id"
            value={inputs.sup_id}
            onChange={handleSupplierChange}
            style={{ padding: '10px' }}
          >
            {state === 'add' ? (
              <option value="" selected disabled>
                Select Supplier
              </option>
            ) : (
              <option disabled>Select Supplier</option>
            )}
            {supplier.map((obj, i) => (
              <option key={i} value={obj.sup_id}>
                {obj.sup_fname} {obj.sup_lname}
              </option>
            ))}
          </select>
          <Input
            value={inputs.sup_fname}
            name="sup_fname"
            placeholder="First Name"
            onChange={handleChange}
            disabled
          />
          <Input
            value={inputs.sup_lname}
            name="sup_lname"
            placeholder="Last Name"
            onChange={handleChange}
            disabled
          />
        </Stack>
        <Stack spacing={3} marginLeft={4}>
          <h2>Product:</h2>
          <select
            value={inputs.prod_id}
            style={{ padding: '10px' }}
            name="prod_id"
            onChange={handleProductChange}
          >
            {state === 'add' ? (
              <option value="" selected disabled>
                Select Product
              </option>
            ) : (
              <option disabled>Select Product</option>
            )}
            {product.map((obj, i) => (
              <option key={i} value={obj.prod_id}>
                {obj.prod_name}
              </option>
            ))}
          </select>
          <Input
            type="text"
            name="prod_name"
            onChange={handleChange}
            value={inputs.prod_name}
            placeholder="Product Name"
            disabled
          />
          <Input
            value={inputs.inv_quantity}
            type="number"
            name="inv_quantity"
            placeholder="Item Quantity"
            onChange={handleChange}
          />
          <Input
            value={inputs.inv_product_condition}
            type="text"
            name="inv_product_condition"
            placeholder="Product Condition"
            onChange={handleChange}
          />
          {/* {state === 'edit' ? (
            <>
              <Label>Release Item No.</Label>
              <Input
                value={
                  release === 0 || release === ''
                    ? inputs.inv_release
                    : (inputs.inv_release = currentRelease + release)
                }
                type="number"
                name="inv_release"
                placeholder="Item Release"
                onChange={handleChange}
              />
            </>
          ) : (
            <input type="number" name="inv_release" onChange={handleChange} hidden />
          )}
          {state === 'edit' ? (
            <>
              <Label>Quantity Remaining</Label>
              <Input
                value={
                  inputs.inv_quantity_remaining === 0 || inputs.inv_quantity_remaining === ''
                    ? (inputs.inv_quantity_remaining = inputs.inv_quantity - release)
                    : (inputs.inv_quantity_remaining = currentQuantity - release)
                }
                type="number"
                name="inv_remaining"
                onChange={handleChange}
                disabled
              />
            </>
          ) : (
            <input type="number" name="inv_release" onChange={handleChange} hidden />
          )}

          {state === 'edit' ? (
            <>
              <Label>Release Item</Label>
              <Input
                type="number"
                placeholder="Input No. Release Item"
                onChange={(e) => setRelease(Number(e.target.value))}
              />
            </>
          ) : null} */}
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
        {state === 'edit' ? 'Update' : 'Add'}
      </LoadingButton>
    </form>
  );
  if (loading) return <div>Loading...</div>;
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
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">
              {state === 'edit' ? editInventoryTitle : addInventoryTitle}
            </Typography>
            <Button onClick={() => router.push('/inventory')} variant="contained" color="inherit">
              Back
            </Button>
          </Stack>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}

EditInventoryView.propTypes = {
  state: PropTypes.string,
};
