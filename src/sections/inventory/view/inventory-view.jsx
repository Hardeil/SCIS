/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
// import { useState } from 'react';

import axios from 'axios';
import { useState, useEffect } from 'react';

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

import useEventsTable from 'src/hooks/useEventsTable';

import { users } from 'src/_mock/user';
import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import InventoryTableRow from '../inventory-table-row';
import InventoryTableHead from '../inventory-table-head';
import InventoryTableToolbar from '../inventory-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
// ----------------------------------------------------------------------

export default function InventoryPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { title: inventoryTitle, apiUrl: apiInventoryViewUrl } = routers.inventory_list;
  const { apiUrl: apiInventoryDelete } = routers.inventory_delete;
  const { route: addInventoryRoute } = routers.inventory_add;

  const [inventory, setInventory] = useState([]);

  const route = useRouter();

  const routeClick = () => {
    route.push(addInventoryRoute);
  };

  const assetLink = () => route.push(routers.asset_list.route);

  useEffect(() => {
    inventoryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function inventoryList() {
    const apiUrl = apiInventoryViewUrl;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setInventory(response.data);
      console.log(inventory);
    });
  }
  const deleteClick = (id) => {
    const apiUrl = `${apiInventoryDelete}?id=${id}`;
    axios.delete(apiUrl).then((response) => {
      console.log(response.data);
      inventoryList();
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
    inputData: inventory,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{inventoryTitle}</Typography>

        <Button
          onClick={routeClick}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Inventory
        </Button>
      </Stack>

      <Card>
        <InventoryTableToolbar
          // numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onClickLink={assetLink}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <InventoryTableHead
                hideCheckbox={false}
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                // numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'sup_fname', label: 'Supllier Name' },
                  { id: 'prod_name', label: 'Product Name' },
                  { id: 'inv_quantity', label: 'Quantity' },
                  { id: 'inv_product_condition', label: 'Product Condition' },
                  // { id: 'inv_release', label: 'Release Item' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((obj, i) => (
                  <InventoryTableRow
                    key={i}
                    inventory={obj}
                    hideCheckBox={false}
                    // handleClick={(event) => handleClick(event, obj.name)}
                    deleteClick={() => {
                      deleteClick(obj.id);
                    }}
                  />
                ))}

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
