/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-imports */
import axios from 'axios';
import PropTypes from 'prop-types';
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ selected, handleClick, onClick, user }) {
  const [open, setOpen] = useState(null);
  const [inputs, setInputs] = useState({});
  const [selectedStatus, setselectedStatus] = useState('');
  const { apiUrl: apiUserDataUrl } = routers.user_data;
  const [inputColors, setInputColors] = useState('');
  // const { route: UserEditRoute } = routers.User_edit;
  const router = useRouter();
  const hideCheckBox = false;
  // const linkClick = () => {
  //   router.push(`${routers.user_edit.route}/${user?.reg_ID}`);
  //   handleCloseMenu();
  // };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  useEffect(() => {
    getUserData();
    // handleStatusChange();
  }, []);

  const getUserData = () => {
    const apiUrl = `${apiUserDataUrl}?reg_ID=${user?.reg_ID}`;
    axios.get(apiUrl).then((response) => {
      console.log(response.data);
      setInputs(response.data);
    });
  };
  useEffect(() => {
    // Define color mapping object
    const statusColors = {
      Active: 'green',
      Inactive: 'red',
      // Add more statuses and their respective colors as needed
    };

    // Update inputColors based on selectedStatus

    setInputColors(
      selectedStatus !== ''
        ? statusColors[selectedStatus]
        : inputs.reg_status === 'Active'
        ? 'green'
        : inputs.reg_status === 'Inactive'
        ? 'red'
        : ''
    );
    console.log('selectedStatus', selectedStatus);
  }, [selectedStatus, inputs.reg_status]);
  const handleStatusChange = async (event) => {
    const { name, value } = event.target;
    setselectedStatus(value); // Update selectedStatus immediately
    try {
      const apiUrl = `http://localhost/xampp/back_end/editUserStatus.php?reg_ID=${user?.reg_ID}`;
      await axios.post(
        apiUrl,
        { [name]: value },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {hideCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>
        )}

        <TableCell>{user?.reg_ID}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {user?.reg_Fname}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{user?.reg_Lname}</TableCell>

        <TableCell>{user?.reg_username}</TableCell>

        <TableCell>{user?.reg_contact}</TableCell>

        <TableCell>{user?.reg_address}</TableCell>

        <TableCell>{user?.reg_email}</TableCell>

        <TableCell>{user?.reg_role}</TableCell>

        <TableCell>
          <select
            style={{
              padding: '10px',
              color: inputColors,
            }}
            value={selectedStatus}
            name="reg_status"
            onChange={handleStatusChange}
          >
            <option value={inputs.reg_status}>{inputs.reg_status}</option>
            {inputs.reg_status !== 'Inactive' && (
              <option style={{ color: 'red' }} value="Inactive">
                Inactive
              </option>
            )}
            {inputs.reg_status !== 'Active' && (
              <option style={{ color: 'green' }} value="Active">
                Active
              </option>
            )}
          </select>
        </TableCell>
        <TableCell sx={{ color: 'error.main', width: 300 }}>
          <Stack display="flex">
            <Button onClick={onClick} sx={{ mr: 2, color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" />
              Delete
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      {/* <MenuItem onClick={handleCloseMenu}></MenuItem> */}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        {/* <MenuItem onClick={linkClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem> */}
      </Popover>
    </>
  );
}
UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onClick: PropTypes.func,
  user: PropTypes.object,
};
