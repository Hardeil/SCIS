import { Helmet } from 'react-helmet-async';

import { AddSupplierView } from 'src/sections/addSupplier';

// ----------------------------------------------------------------------

export default function AddSupplierPage() {
  return (
    <>
      <Helmet>
        <title> Supplier | Minimal UI </title>
      </Helmet>

      <AddSupplierView />
    </>
  );
}
