/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
// import { useState } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

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

import { users } from 'src/_mock/user';
import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { title: userTitle, apiUrl: apiGetUser } = routers.user_list;
  const { apiUrl: apiDeleteUrl } = routers.user_delete;
  const { route: useraddRoute } = routers.user_add;
  const router = useRouter();

  // const addClick = () => {
  //   router.push(useraddRoute);
  // };

  const [user, setUser] = useState([]);

  useEffect(() => {
    userList();
    console.log(dataFiltered);
    console.log('page:', page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function userList() {
    const apiUrl = apiGetUser;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setUser(response.data);
      console.log(user);
    });
  }
  const deleteClick = (id) => {
    const apiUrl = `${apiDeleteUrl}?id=${id}`;
    axios.delete(apiUrl).then((response) => {
      console.log(response.data);
      userList();
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
    inputData: user,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{userTitle}</Typography>
        {/* 
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={addClick}
        >
          Add New User
        </Button> */}
      </Stack>

      <Card>
        <UserTableToolbar
          // numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={user.length}
                // numSelected={selected.length}
                onRequestSort={handleSort}
                // onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'reg_ID', label: 'ID' },
                  { id: 'reg_Fname', label: 'First Name' },
                  { id: 'reg_Lname', label: 'Last Name' },
                  { id: 'reg_username', label: 'Username' },
                  { id: 'reg_contact', label: 'Contact No.' },
                  { id: 'reg_address', label: 'Address' },
                  { id: 'reg_email', label: 'Email' },
                  { id: 'reg_role', label: 'Role' },
                  { id: 'reg_status', label: 'Status' },
                  { id: '' },
                  // { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((obj, id) => (
                    <UserTableRow
                      key={id} // Use a unique identifier as the key
                      user={obj}
                      onClick={() => {
                        deleteClick(obj.reg_ID);
                      }}
                    />
                  ))}
                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, user.length)} />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TablePagination
          page={page}
          component="div"
          count={user.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
