import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { routers } from 'src/common/constant';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function InventoryTableRow({
  hideCheckBox,
  selected,
  deleteClick,
  // quantity,
  // broken,
  // notBroken,
  handleClick,
  inventory,
}) {
  const [open, setOpen] = useState(null);

  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const addLinkClick = () => {
    router.push(
      `${routers.inventory_edit.route}/${inventory?.id}/${inventory?.sup_id}/${inventory?.prod_id}`
    );
    handleCloseMenu();
  };
  const viewLinkClick = () => {
    router.push(`/viewInventory/${inventory?.id}/${inventory?.sup_id}/${inventory?.prod_id}`);
    handleCloseMenu();
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {hideCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>
        )}

        <TableCell>{inventory?.id}</TableCell>

        <TableCell>{inventory?.sup_fname}</TableCell>

        <TableCell>{inventory?.prod_name}</TableCell>

        <TableCell>{inventory?.inv_quantity}</TableCell>

        <TableCell>{inventory?.inv_product_condition}</TableCell>

        {/* <TableCell>{inventory?.inv_release}</TableCell> */}

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
        <MenuItem onClick={addLinkClick}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={deleteClick} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>

        <MenuItem onClick={viewLinkClick} sx={{ color: 'blue' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          View
        </MenuItem>
      </Popover>
    </>
  );
}
InventoryTableRow.propTypes = {
  hideCheckBox: PropTypes.bool,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  id: PropTypes.number,
  inventory: PropTypes.object,
  deleteClick: PropTypes.func,
};
