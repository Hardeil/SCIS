/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

import { PurchaseView } from 'src/sections/viewPurchase';

// ----------------------------------------------------------------------

export default function ViewPurchasePage() {
  return (
    <>
      <Helmet>
        <title> Inventory | Minimal UI </title>
      </Helmet>

      <PurchaseView />
    </>
  );
}
