import { Helmet } from 'react-helmet-async';

import { AddInventoryView } from 'src/sections/addInventory';

// ----------------------------------------------------------------------

export default function AddInventoryPage() {
  return (
    <>
      <Helmet>
        <title> Inventory | Minimal UI </title>
      </Helmet>

      <AddInventoryView />
    </>
  );
}
