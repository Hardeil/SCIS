/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
// import { useState } from 'react';
import axios from 'axios';
import { useRef, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import { TablePagination } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { useRouter } from 'src/routes/hooks';

// eslint-disable-next-line import/no-named-as-default
// import useEventsTable from 'src/hooks/useEventsTable';

import { useReactToPrint } from 'react-to-print';

import { users } from 'src/_mock/user';
import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import SupplierTableRow from '../supplier-table-row';
import SupplierTableHead from '../supplier-table-head';
import SupplierTableToolbar from '../supplier-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function SupplierPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { title: supplierTitle, apiUrl: apiGetSupplier } = routers.supplier_list;
  const { apiUrl: apiDeleteUrl } = routers.supplier_delete;
  const { route: supplieraddRoute } = routers.supplier_add;
  const router = useRouter();

  const addClick = () => {
    router.push(supplieraddRoute);
  };

  const [supplier, setSupplier] = useState([]);

  useEffect(() => {
    supplierList();
    console.log(dataFiltered);
    console.log('page:', page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function supplierList() {
    const apiUrl = apiGetSupplier;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setSupplier(response.data);
      console.log(supplier);
    });
  }
  const deleteClick = (id) => {
    const apiUrl = `${apiDeleteUrl}?id=${id}`;
    axios.delete(apiUrl).then((response) => {
      console.log(response.data);
      supplierList();
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
  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = supplier.map((n) => n.sup_fname);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

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
    inputData: supplier,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{supplierTitle}</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={addClick}
          >
            Add New Supplier
          </Button>
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
        <SupplierTableToolbar
          // numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table ref={printRef} sx={{ minWidth: 800 }}>
              <SupplierTableHead
                order={order}
                orderBy={orderBy}
                rowCount={supplier.length}
                // numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'sup_id', label: 'ID' },
                  { id: 'sup_fname', label: 'First Name' },
                  { id: 'sup_lname', label: 'Last Name' },
                  { id: 'sup_gender', label: 'Gender' },
                  { id: 'sup_contactNo', label: 'Contact No.' },
                  { id: 'sup_company', label: 'Company' },
                  // { id: 'sup_date', label: 'Date Delivered' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((obj, i) => (
                    <SupplierTableRow
                      key={i}
                      supplier={obj}
                      onClick={() => {
                        deleteClick(obj.sup_id);
                      }}
                      // handleClick={(event) => handleClick(event, obj.sup_fname)}
                    />
                  ))}
                {/* <Stack>sadad</Stack> */}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, supplier.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={supplier.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
