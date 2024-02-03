/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

import { ProductView } from 'src/sections/viewProduct';

// ----------------------------------------------------------------------

export default function ViewProductPage() {
  return (
    <>
      <Helmet>
        <title> Product | Minimal UI </title>
      </Helmet>

      <ProductView />
    </>
  );
}
