/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { EditInventoryView } from 'src/sections/editInventory';

// ----------------------------------------------------------------------

export default function InventoryFormPage({ state }) {
  return (
    <>
      <Helmet>
        <title> Inventory | Minimal UI </title>
      </Helmet>

      <EditInventoryView state={state} />
    </>
  );
}
InventoryFormPage.propType = {
  state: PropTypes.string,
};
