/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { Input, Button, TextField } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { routers } from 'src/common/constant';

import Logo from 'src/components/logo';
import Label from 'src/components/label';

import './purchaseViewStyle.css';
// ----------------------------------------------------------------------

export default function PurchaseView() {
  const theme = useTheme();

  const [user, setUser] = useState([]);

  const [product, setProduct] = useState([]);

  const [date, setDate] = useState([]);

  // const [hide, setHide] = useState(false);

  const router = useRouter();

  const { purchase_id } = useParams();

  const { reg_ID } = useParams();

  const { prod_id } = useParams();

  const { sup_id } = useParams();

  const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState({
    // purchase_status: 'pending',
    purchase_delivered_date: 'Not Recieved',
  });

  useEffect(() => {
    fetchData();
    getPurchaseData();
    console.log(getPurchaseData);
    console.log({ reg_ID });
    console.log({ purchase_id });
    console.log({ prod_id });

    setLoading(false);
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString({
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
    setDate(formattedDateTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { apiUrl: apiPurchaseDataUrl } = routers.purchase_data;
  const { apiUrl: apiProductDataUrl } = routers.product_list;
  const { apiUrl: apiUserDataUrl } = routers.user_list;

  const getPurchaseData = () => {
    axios
      .get(
        `http://localhost/xampp/back_end/getPurchaseData.php?purchase_id=${purchase_id}&reg_ID=${reg_ID}&prod_id=${prod_id}&sup_id=${sup_id}`
      )
      .then((response) => {
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
          prod_category: productData.prod_category,
          sup_id: supplierData.sup_id,
          sup_fname: supplierData.sup_fname,
          sup_lname: supplierData.sup_lname,
          sup_gender: supplierData.sup_gender,
          sup_contactNo: supplierData.sup_contactNo,
          sup_company: supplierData.sup_company,
          purchase_quantity: purchaseData.purchase_quantity,
          purchase_order_date: purchaseData.purchase_order_date,
          purchase_status: purchaseData.purchase_status,
          purchase_delivered_date: purchaseData.purchase_delivered_date,
          // Add other properties as needed
        });
        setLoading(false);
      });
  };
  const fetchData = async () => {
    try {
      const [userData, productData] = await Promise.all([
        axios.get(apiUserDataUrl),
        axios.get(apiProductDataUrl),
      ]);

      console.log('User Data:', userData.data);
      console.log('Product Data:', productData.data);

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

  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  if (loading) return <div>Loading...</div>;

  const renderForm = (
    <>
      <Stack display="flex" height="100%" width="100%">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <h2>Purchase Report</h2>
          <h2>Report Date:{date}</h2>
        </Stack>
        <Stack display="flex" height="100%" width="100%" flexDirection="row">
          <Stack width="20%" spacing={3} marginRight={3} marginLeft={4}>
            <h3>User Ordered:</h3>
            <Label>First Name:</Label>
            <Input
              value={inputs.reg_Fname || ''}
              name="reg_Fname"
              placeholder="First Name"
              onChange={handleChange}
            />
            <Label>Last Name:</Label>
            <Input
              value={inputs.reg_Lname || ''}
              placeholder="Last Name"
              name="reg_Lname"
              onChange={handleChange}
            />
            <Label>Contact No.:</Label>
            <Input
              value={inputs.reg_contact || ''}
              name="reg_contact"
              placeholder="Contact No."
              onChange={handleChange}
            />
            {/* <Label>Address:</Label>
            <Input
              value={inputs.reg_address || ''}
              name="reg_address"
              placeholder="Address"
              type="text"
              onChange={handleChange}
            /> */}
            <Label>Reason of Purchase:</Label>
            <textarea id="w3review" name="w3review" rows="4" cols="50" />
          </Stack>
          <Stack width="20%" spacing={3} marginLeft={4}>
            <h3>Product Details:</h3>
            <Label>Product Name:</Label>
            <Input
              type="text"
              onChange={handleChange}
              value={inputs.prod_name || ''}
              name="prod_name"
              placeholder="Product Name"
            />
            <Label>Product Description:</Label>
            <textarea
              type="text"
              onChange={handleChange}
              name="prod_description"
              value={inputs.prod_description || ''}
              placeholder="Product Description"
              rows="4"
              cols="50"
            />
            <Label>Product Category:</Label>
            <Input
              value={inputs.prod_category || ''}
              type="text"
              name="prod_category"
              placeholder="Item Category"
              onChange={handleChange}
            />
          </Stack>
          <Stack width="25%" spacing={3} marginLeft={4} marginRight={3}>
            <h3>Supplier Details:</h3>
            <Label>First Name:</Label>
            <Input
              value={inputs.sup_fname || ''}
              type="text"
              name="sup_fname"
              onChange={handleChange}
            />
            <Label>Last Name:</Label>
            <Input
              value={inputs.sup_lname || ''}
              type="text"
              name="sup_lname"
              onChange={handleChange}
            />
            <Label>Contact No.:</Label>
            <Input
              value={inputs.sup_contactNo}
              name="sup_contactNo"
              type="number"
              placeholder="Supplier Contact No."
              onChange={handleChange}
            />
            <Label>Address:</Label>
            <Input
              value={inputs.sup_address}
              name="sup_address"
              type="text"
              placeholder="Supplier Address"
              onChange={handleChange}
            />
            <Label>Company:</Label>
            <Input
              value={inputs.sup_company || ''}
              type="text"
              placeholder="Supplier Company"
              onChange={handleChange}
            />
          </Stack>
          <Stack width="23%" spacing={3} marginLeft={4} marginRight={3}>
            <h3>Purchase Details:</h3>
            <Label>Purcahse Quantity:</Label>
            <Input
              value={inputs.purchase_quantity}
              name="purchase_quantity"
              type="number"
              placeholder="Purchase Quantity"
              onChange={handleChange}
            />
            <Label>Order Date:</Label>
            <Input value={inputs.purchase_order_date} type="date" onChange={handleChange} />
            <Label>Purchase Status:</Label>
            <Input
              value={inputs.purchase_status}
              type="text"
              name="purchase_status"
              placeholder="Purchase Status"
              onChange={handleChange}
            />
            {/* )} */}
            <Label>Delivered Date</Label>
            {inputs.purchase_delivered_date === 'Not Recieved' ? (
              <Input
                value={inputs.purchase_delivered_date}
                type="text"
                name="purchase_delivered_date"
                onChange={handleChange}
              />
            ) : (
              <Input
                value={inputs.purchase_delivered_date}
                type="date"
                name="purchase_delivered_date"
                onChange={handleChange}
              />
            )}
          </Stack>
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
        className="printBtn"
        onClick={handlePrint}
      >
        Print
      </LoadingButton>
    </>
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
            maxWidth: 1300,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4">Generate Report</Typography>
            <Button onClick={() => router.push('/purchase')} variant="contained" color="inherit">
              Back
            </Button>
          </Stack>
          <Stack ref={printRef}>{renderForm}</Stack>
        </Card>
      </Stack>
    </Box>
  );
}
