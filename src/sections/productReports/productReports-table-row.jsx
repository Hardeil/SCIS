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

export default function ProductReportsTableRow({
  hideCheckBox,
  selected,
  productName,
  productDescription,
  prodQuantity,
  productCategory,
  productStatus,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const router = useRouter();

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      {hideCheckBox && (
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
      )}
      {/* <TableCell>{ID}</TableCell> */}

      <TableCell>{productName}</TableCell>

      <TableCell>{productDescription}</TableCell>

      <TableCell>{productCategory}</TableCell>

      <TableCell>{productStatus}</TableCell>
      <TableCell>{prodQuantity}</TableCell>
    </TableRow>
  );
}
ProductReportsTableRow.propTypes = {
  hideCheckBox: PropTypes.bool,
  handleClick: PropTypes.func,
  productName: PropTypes.string,
  prodQuantity: PropTypes.number,
  productCategory: PropTypes.string,
  productStatus: PropTypes.string,
  productDescription: PropTypes.string,
  selected: PropTypes.any,
};
