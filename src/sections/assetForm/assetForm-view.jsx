/* eslint-disable no-nested-ternary */
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

// import Logo from 'src/components/logo';
import Label from 'src/components/label';
// ----------------------------------------------------------------------

export default function PurchaseFormView({ state }) {
  const theme = useTheme();

  const [user, setUser] = useState([]);

  const [product, setProduct] = useState([]);

  // const [hide, setHide] = useState(false);
  const [selectedStatus, setselectedStatus] = useState('');

  const [currentQuantity, setcurrentQuantity] = useState('');

  const [currentRelease, setcurrentRelease] = useState('');

  const router = useRouter();

  const { release_id } = useParams();

  const { reg_ID } = useParams();

  const { prod_id } = useParams();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [inputs, setInputs] = useState({ release_release: 0 });

  useEffect(() => {
    console.log('state:', state);
    if (state === 'edit') {
      fetchData();
      getPurchaseData();
      console.log(inputs);
      console.log({ reg_ID });
      console.log({ prod_id });
    } else {
      fetchData();
      setLoading(false);
      console.log('product:', product);
      console.log('product:', product);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { title: addAssetTitle, apiUrl: AddPurchaseUrl } = routers.asset_add;
  const { title: editAssetTitle, apiUrl: apiEditPurchaseUrl } = routers.asset_edit;
  const { apiUrl: apiPurchaseDataUrl } = routers.purchase_data;
  const { apiUrl: apiProductDataUrl } = routers.product_list;
  const { apiUrl: apiUserDataUrl } = routers.user_data;

  const getPurchaseData = () => {
    const apiUrl = `http://localhost/xampp/back_end/getAssetData.php?release_id=${release_id}&reg_ID=${reg_ID}&prod_id=${prod_id}`;
    axios.get(apiUrl).then((response) => {
      const { assetData, userData, productData } = response.data;
      setInputs({
        reg_ID: userData.reg_ID,
        reg_Fname: userData.reg_Fname,
        reg_Lname: userData.reg_Lname,
        reg_contact: userData.reg_contact,
        reg_address: userData.reg_address,
        prod_id: productData.prod_id,
        prod_name: productData.prod_name,
        prod_description: productData.prod_description,
        prod_quantity: productData.prod_quantity,
        prod_status: productData.prod_status,
        release_release: assetData.release_release,
        release_id: assetData.release_id,
        release_date: assetData.release_date,
        // Add other properties as needed
      });
      setcurrentQuantity(productData.prod_quantity);
      setcurrentRelease(assetData.release_release);
      setLoading(false);
    });
  };
  const fetchData = async () => {
    try {
      const [userData, productData] = await Promise.all([
        axios.get(`${apiUserDataUrl}?reg_ID=${reg_ID}`),
        axios.get(apiProductDataUrl),
      ]);

      console.log('User Data:', userData.data);
      console.log('Product Data:', productData.data);

      setUser(userData.data);
      setProduct(productData.data);
    } catch (err) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log(inputs);
  };

  // const handleUserChange = (e) => {
  //   const selectedId = Number(e.target.value);
  //   const selectedUserObj = user.find((obj) => obj.reg_ID === selectedId);
  //   console.log('Selected ID:', selectedId);
  //   console.log('Selected User Object:', selectedUserObj);

  //   if (selectedUserObj) {
  //     setInputs((prevInputs) => ({
  //       ...prevInputs,
  //       reg_ID: selectedUserObj.reg_ID,
  //       reg_Fname: selectedUserObj.reg_Fname,
  //       reg_Lname: selectedUserObj.reg_Lname,
  //       reg_contact: selectedUserObj.reg_contact,
  //       reg_address: selectedUserObj.reg_address,
  //     }));

  //     // Enable the input fields for the selected User
  //     // setHide(true);
  //   }
  // };

  const handleProductChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedProductObj = product.find((obj) => obj.prod_id === selectedId);
    console.log('Selected ID:', selectedId);
    console.log('Selected Product Object:', selectedProductObj);

    if (selectedProductObj) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        prod_id: selectedProductObj.prod_id,
        prod_name: selectedProductObj.prod_name,
        prod_description: selectedProductObj.prod_description,
        prod_quantity: selectedProductObj.prod_quantity,
      }));
    }
    setcurrentQuantity(selectedProductObj.prod_quantity);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputs);
    console.log(`first name: ${inputs.sup_fname}`);
    if (currentQuantity > inputs.release_release) {
      if (state === 'edit') {
        try {
          const apiUrl = `http://localhost/xampp/back_end/editAsset.php?release_id=${release_id}&reg_ID=${reg_ID}&prod_id=${prod_id}`;
          const response = await axios.post(apiUrl, JSON.stringify(inputs), {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(response.data);
        } catch (err) {
          console.error('Error:', error);
        }
        router.push('/asset');
      } else {
        const apiUrl = `http://localhost/xampp/back_end/addAsset.php?reg_ID=${reg_ID}`;

        console.log(inputs);

        try {
          const response = await axios.post(apiUrl, JSON.stringify(inputs), {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log(response.data);
        } catch (err) {
          console.error('Error:', error);
        }
      }
      router.push('/asset');
    } else {
      setError('Your Release Quantity is Greater than the Current Product Quantity');
    }
  };

  if (loading) return <div>Loading...</div>;

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack display="flex" flexDirection="row">
        <Stack spacing={3} marginRight={10}>
          <h2>User:</h2>
          <select
            id="reg_ID"
            name="reg_ID"
            value={inputs.reg_ID}
            // onChange={handleUserChange}
            onChange={handleChange}
            style={{ padding: '10px' }}
            required
          >
            <option value={user.reg_ID}>
              {user.reg_Fname} {user.reg_Lname}
            </option>
          </select>
          <Label>Product Name:</Label>

          {state === 'add' ? (
            <select
              value={inputs.prod_id}
              style={{ padding: '10px' }}
              name="prod_id"
              onChange={handleProductChange}
              required
            >
              <option value="">Select Product</option>
              {product.map((obj, i) => (
                <option key={i} value={obj.prod_id}>
                  {obj.prod_name}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={inputs.prod_id}
              style={{ padding: '10px' }}
              name="prod_id"
              onChange={handleProductChange}
              disabled
              required
            >
              <option value="">Select Product</option>
              {product.map((obj, i) => (
                <option key={i} value={obj.prod_id}>
                  {obj.prod_name}
                </option>
              ))}
            </select>
          )}

          {state === 'add' ? (
            <Input
              value={(inputs.prod_quantity = currentQuantity - inputs.release_release)}
              name="prod_quantity"
              placeholder="Product Quantity"
              onChange={handleChange}
              disabled
            />
          ) : (
            ''
          )}
          {state === 'edit' ? (
            <Input
              value={
                inputs.release_release > currentRelease
                  ? (inputs.prod_quantity =
                      currentQuantity - (inputs.release_release - currentRelease))
                  : inputs.release_release < currentRelease
                  ? (inputs.prod_quantity =
                      currentQuantity + (currentRelease - inputs.release_release))
                  : inputs.release_release === 0 || inputs.release_release === ''
                  ? (inputs.prod_quantity = currentQuantity + currentRelease)
                  : inputs.release_release === currentRelease
                  ? (inputs.prod_quantity =
                      currentQuantity + (currentRelease - inputs.release_release))
                  : (inputs.prod_quantity =
                      currentQuantity + (currentRelease - inputs.release_release))
              }
              name="prod_quantity"
              placeholder="Product Quantity"
              onChange={handleChange}
              disabled
            />
          ) : (
            ''
          )}
          <input
            value={(inputs.prod_status = inputs.prod_quantity > 0 ? 'available' : 'not available')}
            name="prod_quantity"
            placeholder="Product Quantity"
            onChange={handleChange}
            hidden
          />
        </Stack>
        <Stack spacing={3} marginLeft={4}>
          <Label>Release Quantity:</Label>
          <Input
            value={inputs.release_release >= 0 ? inputs.release_release : 0}
            type="number"
            name="release_release"
            placeholder="Release Quantity"
            onChange={handleChange}
            required
          />
          <Label>Release Date</Label>
          <Input
            value={inputs.release_date || ''}
            type="date"
            name="release_date"
            onChange={handleChange}
            required
          />
        </Stack>
      </Stack>
      <span id="error">
        <span style={{ color: 'red' }}>{error}</span>
      </span>
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
            maxWidth: 600,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">
              {state === 'edit' ? editAssetTitle : addAssetTitle}
            </Typography>
            <Button onClick={() => router.push('/asset')} variant="contained" color="inherit">
              Back
            </Button>
          </Stack>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
PurchaseFormView.propTypes = {
  state: PropTypes.string,
};
