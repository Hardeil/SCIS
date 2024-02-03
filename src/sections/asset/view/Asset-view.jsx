/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
// import { useState } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';
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

import useEventsTable from 'src/hooks/useEventsTable';

import { users } from 'src/_mock/user';
import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import AssetTableRow from '../Asset-table-row';
import TableEmptyRows from '../table-empty-rows';
import AssetTableHead from '../Asset-table-head';
import AssetTableToolbar from '../Asset-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function AssetPage({ userId, userRole }) {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { title: assetTitle, apiUrl: apiAssetViewUrl } = routers.asset_list;
  const { apiUrl: apiAssetDelete } = routers.asset_delete;
  const { route: addAssetRoute } = routers.asset_add;

  const [asset, setAsset] = useState([]);

  const route = useRouter();

  const routeClick = () => {
    route.push(`${addAssetRoute}/${userId}`);
  };

  useEffect(() => {
    assetList();
    console.log(asset);
    console.log('asset:', userId);
    console.log('asset:', userRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function assetList() {
    const apiUrl = `${apiAssetViewUrl}?reg_ID=${userId}&reg_role=${userRole}`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setAsset(response.data);
      console.log(asset);
    });
  }
  const deleteClick = (id) => {
    const apiUrl = `http://localhost/xampp/back_end/deleteAsset.php?id=${id}`;
    axios.delete(apiUrl).then((response) => {
      console.log(response.data);
      assetList();
    });
    console.log({ id });
  };
  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });
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
    inputData: asset,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{assetTitle}</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={routeClick}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Release Details
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
        <AssetTableToolbar
          // numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <AssetTableHead
                hideCheckbox={false}
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                // numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'release_id', label: 'ID' },
                  { id: 'reg_Fname', label: 'User' },
                  { id: 'prod_name', label: 'Product Name' },
                  { id: 'release_release', label: 'Release Quantity' },
                  { id: 'release_date', label: 'Release Date' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered.map((obj, i) => (
                  <AssetTableRow
                    key={i}
                    asset={obj}
                    hideCheckBox={false}
                    // handleClick={(event) => handleClick(event, obj.name)}
                    deleteClick={() => {
                      deleteClick(obj.release_id);
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
AssetPage.propTypes = {
  userId: PropTypes.any,
  userRole: PropTypes.any,
};
