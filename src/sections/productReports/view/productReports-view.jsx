/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
// import { useState } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import { users } from 'src/_mock/user';
import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import ProductReportsTableRow from '../productReports-table-row';
import ProductReportsTableHead from '../productReports-table-head';
import ProductReportsTableToolbar from '../productReports-table-toolbar';

// ----------------------------------------------------------------------

export default function ProductPage(ID) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { apiUrl: productListApi, title: productListTitle } = routers.product_list;
  const { apiUrl: productDeleteApi } = routers.product_delete;
  const { route: addRoute } = routers.product_add;
  const [product, setProduct] = useState([]);
  const router = useRouter();
  const Id = null;
  const addClick = () => {
    router.push(`/${addRoute}`);
  };

  useEffect(() => {
    productList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function productList() {
    // const apiUrl = 'http://localhost/xampp/back_end/productView.php';
    axios.get(productListApi).then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  }
  const deleteClick = (id) => {
    const apiDeleteUrl = `${productDeleteApi}?id=${id}`;
    console.log(apiDeleteUrl);
    axios.delete(apiDeleteUrl).then((response) => {
      console.log(response.data);
      productList();
    });
    console.log({ id });
  };
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: product,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  // const handlePrint = () => {
  //   window.print();
  // };
  const notFound = !dataFiltered.length && !!filterName;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h1">Reports</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="bi:printer-fill" />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </Stack>
      </Stack>

      <Card>
        <Stack direction="row" justifyContent="left" mb={3}>
          <Button
            component={Link}
            to="/purchaseReports"
            variant="outlined"
            sx={{ color: 'black', border: 'none', borderBottom: '1px solid black' }}
          >
            Purchase
          </Button>
          <Button
            component={Link}
            to="/productReports"
            variant="outlined"
            sx={{ color: 'black', border: 'none', borderBottom: '1px solid black' }}
          >
            Product
          </Button>
        </Stack>
        <ProductReportsTableToolbar
          // numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer ref={printRef} sx={{ overflow: 'unset' }}>
            <h2 style={{ padding: '10px' }}>Product Reports</h2>
            <Table sx={{ minWidth: 800 }}>
              <ProductReportsTableHead
                hideCheckbox={false}
                order={order}
                orderBy={orderBy}
                rowCount={product.length}
                // numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'prod_name', label: 'Product Name' },
                  { id: 'prod_description', label: 'Product Description' },
                  { id: 'prod_category', label: 'Product Category' },
                  { id: 'prod_status', label: 'Product Status' },
                  { id: 'prod_quantity', label: 'Product Quantity' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((obj, i) => (
                  <ProductReportsTableRow
                    key={i}
                    productName={obj.prod_name}
                    productDescription={obj.prod_description}
                    prodQuantity={obj.prod_quantity}
                    productCategory={obj.prod_category}
                    productStatus={obj.prod_status}
                    onClick={() => {
                      deleteClick(obj.prod_id);
                    }}
                    ID={obj.prod_id}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, product.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={product.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
ProductPage.propTypes = {
  setId: PropTypes.func,
};
