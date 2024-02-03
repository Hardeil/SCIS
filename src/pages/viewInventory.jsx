/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

import { InventoryView } from 'src/sections/viewInventory';

// ----------------------------------------------------------------------

export default function ViewInventoryPage() {
  return (
    <>
      <Helmet>
        <title> Inventory | Minimal UI </title>
      </Helmet>

      <InventoryView />
    </>
  );
}
