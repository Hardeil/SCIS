/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

import { ProductReports } from 'src/sections/productReports/view';

// ----------------------------------------------------------------------

export default function ProductReportsPage() {
  return (
    <>
      <Helmet>
        <title> Product | Minimal UI </title>
      </Helmet>

      <ProductReports />
    </>
  );
}
