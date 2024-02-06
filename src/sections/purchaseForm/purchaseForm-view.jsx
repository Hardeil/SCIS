/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
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

  const [supplier, setSupplier] = useState([]);
  const [added, setAdded] = useState(false);
  // const [hide, setHide] = useState(false);
  const [selectedStatus, setselectedStatus] = useState('');

  const [currentQuantity, setcurrentQuantity] = useState('');

  const [prevQuantity, setprevQuantity] = useState('');

  const [currentRecieveQuantity, setcurrentRecieveQuantity] = useState('');

  const router = useRouter();

  const { purchase_id } = useParams();

  const { reg_ID } = useParams();

  const { prod_id } = useParams();

  const { sup_id } = useParams();

  const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState({
    purchase_status: 'Pending',
    purchase_delivered_date: 'Not Recieved',
  });

  useEffect(() => {
    console.log('currentQuantity:', currentQuantity);
    console.log('prevQuantity:', prevQuantity);
    console.log('currentRecieveQuantity:', currentRecieveQuantity);
    console.log('state:', state);
    if (state === 'edit') {
      fetchData();
      getPurchaseData();
      console.log(inputs);
      console.log({ reg_ID });
      console.log({ purchase_id });
      console.log(getPurchaseData());
    } else {
      fetchData();
      setLoading(false);
      console.log('product:', product);
      console.log('product:', product);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuantity, prevQuantity, currentRecieveQuantity]);
  const { title: addPurchaseTitle, apiUrl: AddPurchaseUrl } = routers.purchase_add;
  const { title: editPurchaseTitle, apiUrl: apiEditPurchaseUrl } = routers.purchase_edit;
  const { apiUrl: apiPurchaseDataUrl } = routers.purchase_data;
  const { apiUrl: apiProductDataUrl } = routers.product_list;
  const { apiUrl: apiUserDataUrl } = routers.user_data;
  const { apiUrl: apiSupplierDataUrl } = routers.supplier_list;

  const getPurchaseData = () => {
    const apiUrl = `http://localhost/xampp/back_end/getPurchaseData.php?purchase_id=${purchase_id}&reg_ID=${reg_ID}&prod_id=${prod_id}&sup_id=${sup_id}`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      const { purchaseData, userData, productData, supplierData } = response.data;
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
        purchase_quantity: purchaseData.purchase_quantity,
        purchase_id: purchaseData.purchase_id,
        purchase_order_date: purchaseData.purchase_order_date,
        purchase_status: purchaseData.purchase_status,
        purchase_delivered_date: purchaseData.purchase_delivered_date,
        sup_id: supplierData.sup_id,
        sup_fname: supplierData.sup_fname,
        // Add other properties as needed
      });
      console.log(response.data);
      setprevQuantity(productData.prod_quantity);
      setcurrentRecieveQuantity(purchaseData.purchase_quantity);
      setcurrentQuantity(productData.prod_quantity);
      setLoading(false);
    });
  };
  const fetchData = async () => {
    try {
      const [userData, productData, supplierData] = await Promise.all([
        axios.get(`${apiUserDataUrl}?reg_ID=${reg_ID}`),
        axios.get(apiProductDataUrl),
        axios.get(apiSupplierDataUrl),
      ]);

      console.log('User Data:', userData.data);
      console.log('Product Data:', productData.data);
      console.log('Supplier Data:', supplierData.data);
      setSupplier(supplierData.data);
      setUser(userData.data);
      setProduct(productData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log(inputs);
  };

  const handleUserChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedUserObj = user.find((obj) => obj.reg_ID === selectedId);
    console.log('Selected ID:', selectedId);
    console.log('Selected User Object:', selectedUserObj);

    if (selectedUserObj) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        reg_ID: selectedUserObj.reg_ID,
        reg_Fname: selectedUserObj.reg_Fname,
        reg_Lname: selectedUserObj.reg_Lname,
        reg_contact: selectedUserObj.reg_contact,
        reg_address: selectedUserObj.reg_address,
      }));

      // Enable the input fields for the selected User
      // setHide(true);
    }
  };

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
  };

  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setselectedStatus(value);
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
    console.log(inputs);
    setAdded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(inputs);
    console.log(`first name: ${inputs.sup_fname}`);
    if (state === 'edit') {
      try {
        const apiUrl = `${apiEditPurchaseUrl}?purchase_id=${purchase_id}&reg_ID=${reg_ID}&prod_id=${prod_id}&sup_id${sup_id}`;
        {
          inputs.purchase_status === 'received' ? (inputs.purchase_status = 'Recieved') : '';
        }
        const response = await axios.post(apiUrl, JSON.stringify(inputs), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
      router.push('/purchase');
    } else {
      const apiUrl = `${AddPurchaseUrl}?reg_ID=${reg_ID}`;

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
      router.push('/purchase');
    }
    setAdded(false);
  };
  const calculateQuantity = () => {
    if (inputs.purchase_status === 'received') {
      inputs.prod_quantity = currentQuantity + inputs.purchase_quantity;
    }
    if (inputs.purchase_status === 'Received') {
      return inputs.purchase_quantity > currentRecieveQuantity
        ? (inputs.prod_quantity =
            prevQuantity + (inputs.purchase_quantity - currentRecieveQuantity))
        : inputs.purchase_quantity < currentRecieveQuantity
        ? (inputs.prod_quantity =
            prevQuantity - (currentRecieveQuantity - inputs.purchase_quantity))
        : inputs.purchase_quantity === 0 || inputs.purchase_quantity === ''
        ? inputs.prod_quantity
        : inputs.prod_quantity;
    }
    return inputs.prod_quantity;
  };
  // const calculateQuantity = () => {
  //   let updatedQuantity = false; // Flag to track if quantity has been updated

  //   if (inputs.purchase_status === 'Received') {
  //     if (inputs.purchase_quantity > currentRecieveQuantity) {
  //       inputs.prod_quantity = prevQuantity + (inputs.purchase_quantity - currentRecieveQuantity);
  //       updatedQuantity = true; // Set flag to true after updating quantity
  //     } else if (inputs.purchase_quantity < currentRecieveQuantity) {
  //       inputs.prod_quantity = prevQuantity - (currentRecieveQuantity - inputs.purchase_quantity);
  //       updatedQuantity = true; // Set flag to true after updating quantity
  //     } else if (inputs.purchase_quantity === 0 || inputs.purchase_quantity === '') {
  //       inputs.prod_quantity = currentQuantity;
  //       updatedQuantity = true; // Set flag to true after updating quantity
  //     }
  //   }

  //   // If quantity has not been updated yet and purchase status is 'Received'
  //   if (!updatedQuantity && inputs.purchase_status === 'Received') {
  //     inputs.prod_quantity = currentQuantity + inputs.purchase_quantity;
  //   }

  //   return inputs.prod_quantity;
  // };
  if (loading) return <div>Loading...</div>;

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack display="flex" flexDirection="row">
        <Stack spacing={3} marginRight={10}>
          <h2>User:</h2>
          <Label>Name:</Label>
          <select
            id="reg_ID"
            name="reg_ID"
            value={inputs.reg_ID}
            onChange={handleUserChange}
            style={{ padding: '10px' }}
            required
          >
            <option value={user.reg_ID}>
              {user.reg_Fname} {user.reg_Lname}
            </option>
          </select>

          <h2>Product:</h2>
          <Label>Product Name:</Label>

          {state === 'add' ? (
            <select
              value={inputs.prod_id || ''}
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
              style={{ padding: '10px', border: 'solid 1px black', color: 'black' }}
              name="prod_id"
              onChange={handleProductChange}
              disabled
            >
              <option value={inputs.prod_id}>{inputs.prod_name}</option>
            </select>
          )}
          <Label>Order Date</Label>
          <Input
            value={inputs.purchase_order_date || ''}
            type="date"
            name="purchase_order_date"
            onChange={handleChange}
          />
        </Stack>
        <Stack spacing={3} marginLeft={4}>
          {inputs.purchase_status === 'Received' ? (
            state === 'edit' ? (
              <input
                value={calculateQuantity()}
                type="number"
                name="prod_quantity"
                placeholder="Item Quantity"
                onChange={handleChange}
                hidden
              />
            ) : (
              ''
            )
          ) : (
            <input
              value={inputs.prod_quantity}
              type="number"
              name="purchase_quantity"
              placeholder="Item Quantity"
              onChange={handleChange}
              hidden
            />
          )}
          <input
            value={(inputs.prod_status = inputs.prod_quantity > 0 ? 'available' : 'not available')}
            name="prod_quantity"
            placeholder="Product Quantity"
            onChange={handleChange}
            hidden
          />
          <Label>Supplier:</Label>
          <select
            id="sup_id"
            name="sup_id"
            value={inputs.sup_id}
            onChange={handleChange}
            style={{ padding: '10px' }}
            required
          >
            {state === 'add' ? (
              <option value="">Select Supplier</option>
            ) : (
              <option value={inputs.sup_id}>
                {inputs.sup_fname} {inputs.sup_lname}
              </option>
            )}
            {supplier.map((obj, i) => (
              <option key={i} value={obj.sup_id}>
                {obj.sup_fname} {obj.sup_lname}
              </option>
            ))}
          </select>
          <Label>Purchase Quantity:</Label>
          <Input
            value={inputs.purchase_quantity >= 0 ? inputs.purchase_quantity : 0}
            type="number"
            name="purchase_quantity"
            placeholder="Item Quantity"
            onChange={handleChange}
            required
          />
          <Label>Unit Price:</Label>
          <Input
            value={inputs.purchase_price >= 0 ? inputs.purchase_price : 0}
            type="number"
            name="purchase_price"
            placeholder="Per Unit Price"
            onChange={handleChange}
            required
          />
          <Label>Total Price:</Label>
          <Stack display="flex" flexDirection="row">
            P
            <Input
              value={(inputs.purchase_quantity >= 0 && inputs.purchase_price >= 0
                ? inputs.purchase_quantity * inputs.purchase_price
                : 0
              ).toFixed(2)}
              type="number"
              name="purchase_total_price"
              placeholder="Total Price"
              onChange={handleChange}
              required
            />
          </Stack>

          {/* {state === 'edit' ? (
            <Input
              value={inputs.purchase_status}
              type="text"
              name="purchase_status"
              placeholder="Purchase Status"
              onChange={handleChange}
            />
          ) : ( */}
          {state === 'edit' ? (
            <>
              <Label>Purchase Status</Label>

              {inputs.purchase_status === 'Received' ? (
                <select
                  style={{ padding: '10px', border: 'solid 1px black', color: 'black' }}
                  name="purchase_status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  disabled
                >
                  <option value={inputs.purchase_status}>{inputs.purchase_status}</option>
                  {inputs.purchase_status !== 'Pending' && <option value="Pending">Pending</option>}
                  {inputs.purchase_status !== 'received' && (
                    <option value="received">Received</option>
                  )}
                  {inputs.purchase_status !== 'Cancelled' && (
                    <option value="Cancelled">Cancelled</option>
                  )}
                </select>
              ) : (
                <select
                  style={{ padding: '10px' }}
                  name="purchase_status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value={inputs.purchase_status}>{inputs.purchase_status}</option>
                  {inputs.purchase_status !== 'Pending' && <option value="Pending">Pending</option>}
                  {inputs.purchase_status !== 'Received' && (
                    <option value="Received">Received</option>
                  )}
                  {inputs.purchase_status !== 'Cancelled' && (
                    <option value="Cancelled">Cancelled</option>
                  )}
                </select>
              )}
            </>
          ) : (
            <input
              value={selectedStatus}
              type="text"
              name="purchase_status"
              placeholder="Purchase Status"
              onChange={handleChange}
              hidden
            />
          )}
          <input
            value={inputs.purchase_delivered_date}
            type="text"
            name="purchase_delivered_date"
            onChange={handleChange}
            hidden
          />
          {inputs.purchase_status === 'Received' ? (
            state === 'edit' ? (
              <>
                <Label>Delivered Date</Label>
                <Input
                  value={inputs.purchase_delivered_date}
                  type="date"
                  name="purchase_delivered_date"
                  onChange={handleChange}
                />
              </>
            ) : (
              <input
                value={inputs.purchase_delivered_date}
                type="text"
                name="purchase_delivered_date"
                onChange={handleChange}
                hidden
              />
            )
          ) : null}
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
              {state === 'edit' ? editPurchaseTitle : addPurchaseTitle}
            </Typography>
            <Button onClick={() => router.push('/purchase')} variant="contained" color="inherit">
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
