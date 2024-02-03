/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Label from 'src/components/label';

import './inventoryViewStyle.css';
// ----------------------------------------------------------------------

export default function InventoryView() {
  const theme = useTheme();

  // const [hide, setHide] = useState(false);

  const router = useRouter();

  const { id } = useParams();

  const { sup_id } = useParams();

  const { prod_id } = useParams();

  const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    // fetchData();
    getInventoryData();
    console.log(inputs);
    console.log({ id });
    console.log({ sup_id });
    console.log({ prod_id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInventoryData = () => {
    const apiUrl = `http://localhost/xampp/back_end/getInventoryData.php?id=${id}&sup_id=${sup_id}&prod_id=${prod_id}`;
    axios.get(apiUrl).then((response) => {
      const { inventoryData, supplierData, productData } = response.data;
      setInputs({
        sup_id: supplierData.sup_id,
        sup_fname: supplierData.sup_fname,
        sup_lname: supplierData.sup_lname,
        sup_gender: supplierData.sup_gender,
        sup_contactNo: supplierData.sup_contactNo,
        sup_company: supplierData.sup_company,
        sup_date: supplierData.sup_date,
        prod_id: productData.prod_id,
        prod_name: productData.prod_name,
        prod_description: productData.prod_description,
        inv_quantity: inventoryData.inv_quantity,
        inv_broken: inventoryData.inv_broken,
        inv_notBroken: inventoryData.inv_notBroken,
        // Add other properties as needed
      });
      setLoading(false);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.print();

    // console.log(inputs);
    // console.log(`first name: ${inputs.sup_fname}`);
    // if (id) {
    //   try {
    //     const apiUrl = `http://localhost/xampp/back_end/editInventory.php?id=${id}&sup_id=${sup_id}&prod_id=${prod_id}`;
    //     const response = await axios.post(apiUrl, JSON.stringify(inputs), {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });

    //     console.log(response.data);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    //   router.push('/inventory');
    // } else {
    //   const apiUrl = 'http://localhost/xampp/back_end/addInventory.php';

    //   console.log(inputs);

    //   try {
    //     const response = await axios.post(apiUrl, JSON.stringify(inputs), {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });

    //     console.log(response.data);
    //   } catch (error) {
    //     console.error('Error:', error);
    //   }
    //  ;
    // }
  };
  const generateFormHtml = () => (
    <Stack display="flex" flexDirection="row">
      <Stack spacing={2} marginRight={10} flex={1}>
        <h2>Supplier:</h2>
        <Label>Name:</Label>
        <h4>
          {inputs.sup_fname} {inputs.sup_lname}
        </h4>
        <Label>Gender:</Label>
        <h4>{inputs.sup_gender}</h4>
        <Label>Contact No.:</Label>
        <h4>{inputs.sup_contactNo}</h4>
        <Label>Company:</Label>
        <h4>{inputs.sup_company}</h4>
        <Label>Date:</Label>
        <h4>{inputs.sup_date}</h4>
      </Stack>
      <Stack spacing={2} flex={1}>
        <h2>Product:</h2>
        <Label>Product Name:</Label>
        <h4>{inputs.prod_name}</h4>
        <Label>Product Description:</Label>
        <h4>{inputs.prod_description}</h4>
        <Label>Product Quantity:</Label>
        <h4>{inputs.inv_quantity}</h4>
        <Label>Status</Label>
        <h4>Broken Item: {inputs.inv_broken}</h4>
        <h4>Not Broken Item: {inputs.inv_notBroken}</h4>
      </Stack>
    </Stack>
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  // const renderForm = (

  // );

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
        className="sad"
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
            <Typography variant="h4">Generate Report</Typography>
            <Button onClick={() => router.push('/inventory')} variant="contained" color="inherit">
              Back
            </Button>
          </Stack>
          <form onSubmit={handleSubmit}>
            {Object.keys(inputs).length > 0 && generateFormHtml()}
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="inherit"
              style={{ marginTop: '20px' }}
              className="printBtn"
            >
              Print
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
