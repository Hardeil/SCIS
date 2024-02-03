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
import { Table, Button, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';
import { routers } from 'src/common/constant';

import Logo from 'src/components/logo';
import Label from 'src/components/label';

import './productViewStyle.css';
// ----------------------------------------------------------------------

export default function PurchaseView() {
  const theme = useTheme();

  const [product, setProduct] = useState([]);

  const [date, setDate] = useState([]);

  // const [hide, setHide] = useState(false);
  const { apiUrl: productListApi, title: productListTitle } = routers.product_list;

  const router = useRouter();

  // const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState({
    // purchase_status: 'pending',
    purchase_delivered_date: 'Not Recieved',
  });

  useEffect(() => {
    productList();
    const currentDate = new Date();
    const formattedDateTime = currentDate.toLocaleString({
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
    setDate(formattedDateTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function productList() {
    // const apiUrl = 'http://localhost/xampp/back_end/productView.php';
    axios.get(productListApi).then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    console.log(inputs);
  };

  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  // if (loading) return <div>Loading...</div>;

  const renderForm = (
    <>
      <Stack display="flex" height="100%" width="100%">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <h2>Product Inventory Report</h2>
          <h2>Report Date:{date}</h2>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Id</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Description</TableCell>
              <TableCell>Product Quantity</TableCell>
              <TableCell>Product Category</TableCell>
              <TableCell>Product Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((obj) => (
              <TableRow key={obj.prod_id}>
                <TableCell>{obj.prod_id}</TableCell>
                <TableCell>{obj.prod_name}</TableCell>
                <TableCell>{obj.prod_description}</TableCell>
                <TableCell>{obj.prod_quantity}</TableCell>
                <TableCell>{obj.prod_category}</TableCell>
                <TableCell>{obj.prod_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stack>
      <span id="error"> </span>
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
            <Button
              onClick={() => router.push(routers.product_list.route)}
              variant="contained"
              color="inherit"
            >
              Back
            </Button>
          </Stack>
          <Stack ref={printRef}>{renderForm}</Stack>
          <Button
            className="printBtn"
            fullWidth
            size="large"
            variant="contained"
            color="inherit"
            style={{ marginTop: '20px' }}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Card>
      </Stack>
    </Box>
  );
}
