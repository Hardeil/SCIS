import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function PurchaseReportTableRow({ hideCheckBox, selected, handleClick, purchase }) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      {hideCheckBox && (
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
      )}

      <TableCell>{purchase?.purchase_id}</TableCell>

      <TableCell>{purchase?.reg_Fname} </TableCell>

      <TableCell>{purchase?.prod_name}</TableCell>

      <TableCell>{purchase?.sup_fname}</TableCell>

      <TableCell>{purchase?.purchase_order_date}</TableCell>

      <TableCell>{purchase?.purchase_status}</TableCell>

      <TableCell>{purchase?.purchase_delivered_date}</TableCell>

      <TableCell>{purchase?.purchase_quantity}</TableCell>
    </TableRow>
  );
}
PurchaseReportTableRow.propTypes = {
  hideCheckBox: PropTypes.bool,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  // id: PropTypes.number,
  purchase: PropTypes.object,
};
