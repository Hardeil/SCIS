/* eslint-disable no-nested-ternary */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
// import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductTableRow({
  hideCheckBox,
  selected,
  ID,
  productName,
  productDescription,
  prodQuantity,
  productCategory,
  productStatus,
  handleClick,
  onClick,
}) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const linkClick = () => {
    router.push(`/${routers.product_edit.route}/${ID}`);
    handleCloseMenu();
    console.log('ID:', ID);
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
        {/* <TableCell>{ID}</TableCell> */}

        <TableCell>{productName}</TableCell>

        <TableCell>{productDescription}</TableCell>

        <TableCell>
          {prodQuantity >= 50 ? (
            <span style={{ color: 'green' }}>{prodQuantity}</span>
          ) : prodQuantity > 0 ? (
            <span style={{ color: 'blue' }}>{prodQuantity}</span>
          ) : (
            <span style={{ color: 'red' }}>{prodQuantity}</span>
          )}
        </TableCell>
        <TableCell>{productCategory}</TableCell>

        <TableCell>{productStatus}</TableCell>

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
ProductTableRow.propTypes = {
  hideCheckBox: PropTypes.bool,
  handleClick: PropTypes.func,
  productName: PropTypes.string,
  prodQuantity: PropTypes.number,
  productCategory: PropTypes.string,
  productStatus: PropTypes.string,
  ID: PropTypes.number,
  productDescription: PropTypes.string,
  selected: PropTypes.any,
  onClick: PropTypes.func,
};
