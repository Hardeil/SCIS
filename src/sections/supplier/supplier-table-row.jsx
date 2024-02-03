import { useState } from 'react';
import PropTypes from 'prop-types';

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

export default function SupplierTableRow({ selected, handleClick, onClick, supplier }) {
  const [open, setOpen] = useState(null);
  const { route: supplierEditRoute } = routers.supplier_edit;
  const router = useRouter();
  const hideCheckBox = false;
  const linkClick = () => {
    router.push(`${supplierEditRoute}/${supplier?.sup_id}`);
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {hideCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>
        )}

        <TableCell>{supplier?.sup_id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {supplier.sup_fname}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{supplier?.sup_lname}</TableCell>

        <TableCell>{supplier?.sup_gender}</TableCell>

        <TableCell>{supplier?.sup_contactNo}</TableCell>

        <TableCell>{supplier?.sup_company}</TableCell>

        {/* <TableCell>{supplier?.sup_date}</TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
        <MenuItem onClick={linkClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          <Button onClick={onClick}>Delete</Button>
        </MenuItem>
      </Popover>
    </>
  );
}
SupplierTableRow.propTypes = {
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  onClick: PropTypes.func,
  supplier: PropTypes.object,
};
