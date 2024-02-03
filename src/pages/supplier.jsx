import { Helmet } from 'react-helmet-async';

import { SupplierView } from 'src/sections/supplier/view';

// ----------------------------------------------------------------------

export default function SupplierPage() {
  return (
    <>
      <Helmet>
        <title> Supplier | Minimal UI </title>
      </Helmet>

      <SupplierView />
    </>
  );
}
