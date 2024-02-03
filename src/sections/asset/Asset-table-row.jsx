import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
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

export default function AssetTableRow({
  hideCheckBox,
  selected,
  deleteClick,
  // quantity,
  // broken,
  // notBroken,
  handleClick,
  asset,
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
      `${routers.asset_edit.route}/${asset?.release_id}/${asset?.reg_ID}/${asset?.prod_id}`
    );
    handleCloseMenu();
  };
  // const viewLinkClick = () => {
  //   router.push(`/viewAsset/${asset?.asset_id}/${asset?.sup_id}`);
  //   handleCloseMenu();
  // };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {hideCheckBox && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleClick} />
          </TableCell>
        )}

        <TableCell>{asset?.release_id}</TableCell>

        <TableCell>{asset?.reg_Fname}</TableCell>

        <TableCell>{asset?.prod_name}</TableCell>

        <TableCell>{asset?.release_release}</TableCell>

        <TableCell>{asset?.release_date}</TableCell>

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

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          <Button onClick={deleteClick}>Delete</Button>
        </MenuItem>

        {/* <MenuItem onClick={viewLinkClick} sx={{ color: 'blue' }}>
          <Iconify icon="eva:edit-2-outline" sx={{ mr: 2 }} />
          View
        </MenuItem> */}
      </Popover>
    </>
  );
}
AssetTableRow.propTypes = {
  hideCheckBox: PropTypes.bool,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  // id: PropTypes.number,
  asset: PropTypes.object,
  deleteClick: PropTypes.func,
};
