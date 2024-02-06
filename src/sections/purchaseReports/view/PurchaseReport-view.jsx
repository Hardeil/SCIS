/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import axios from 'axios';
// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { TableCell } from '@mui/material';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import useEventsTable from 'src/hooks/useEventsTable';

import { users } from 'src/_mock/user';
import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import PurchaseTableRow from '../PurchaseReport-table-row';
import PurchaseTableHead from '../PurchaseReport-table-head';
import { emptyRows, applyFilter, getComparator } from '../utils';
import PurchaseTableToolbar from '../PurchaseReport-table-toolbar';

// ----------------------------------------------------------------------

export default function PurchaseReportPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { title: purchaseTitle, apiUrl: apiPurchaseViewUrl } = routers.purchase_list;
  const { apiUrl: apiPurchaseDelete } = routers.purchase_delete;
  const { route: addPurchaseRoute } = routers.purchase_add;

  const [purchase, setPurchase] = useState([]);

  const route = useRouter();

  const routeClick = () => {
    route.push(``);
  };

  useEffect(() => {
    purchaseList();
    // console.log('purchase:', userId);
    // console.log('purchase:', userRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function purchaseList() {
    // const apiUrl = `${apiPurchaseViewUrl}?reg_ID=${userId}&reg_role=${userRole}`;
    const apiUrl = `http://localhost/xampp/back_end/purchaseViewReports.php`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setPurchase(response.data);
      console.log(purchase);
    });
  }

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
    inputData: purchase,
    comparator: getComparator(order, orderBy),
    filterName,
  });

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
        <PurchaseTableToolbar
          // numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer ref={printRef} sx={{ overflow: 'unset' }}>
            <h2 style={{ padding: '10px' }}>Purchase Reports</h2>
            <Table sx={{ minWidth: 800 }}>
              <PurchaseTableHead
                hideCheckbox={false}
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                // numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'purchase_id', label: 'ID' },
                  { id: 'reg_Fname', label: 'Name' },
                  { id: 'prod_name', label: 'Product Name' },
                  { id: 'sup_fname', label: 'Supplier Name  ' },
                  { id: 'purchase_order_date', label: 'Order Date' },
                  { id: 'ipurchase_status', label: 'Order Status' },
                  { id: 'purchase_delivered_date', label: 'Delivered Date' },
                  { id: 'purchase_quantity', label: 'Ordered Quantity' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((obj, i) => (
                  <PurchaseTableRow
                    key={i}
                    purchase={obj}
                    hideCheckBox={false}
                    // handleClick={(event) => handleClick(event, obj.name)}
                  />
                ))}
                {/* <TableCell>sad</TableCell> */}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
// PurchasePage.propTypes = {
//   userId: PropTypes.any,
//   userRole: PropTypes.any,
// };
