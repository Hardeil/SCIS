import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function PurchaseReportTableToolbar({ numSelected, filterName, onFilterName }) {
  // const handleChange = (event) => {
  //   onFilterName(event.target.value);
  // };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Stack style={{ display: 'flex', flexDirection: 'row' }}>
          <h2>Sort By:</h2>
          <select
            value={filterName}
            onChange={onFilterName}
            style={{
              padding: '15px',
              paddingRight: '50px',
              marginLeft: '20px',
            }}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </Stack>
      )}
    </Toolbar>
  );
}

PurchaseReportTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
