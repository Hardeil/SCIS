import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { PurchaseView } from 'src/sections/purchase/view';

// ----------------------------------------------------------------------

export default function PurchasePage({ userId, userRole }) {
  return (
    <>
      <Helmet>
        <title> Purchase | Minimal UI </title>
      </Helmet>

      <PurchaseView userId={userId} userRole={userRole} />
    </>
  );
}
PurchasePage.propTypes = {
  userId: PropTypes.any,
  userRole: PropTypes.any,
};
