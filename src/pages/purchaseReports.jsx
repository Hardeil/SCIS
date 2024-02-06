/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { PurchaseReportView } from 'src/sections/purchaseReports/view';

// ----------------------------------------------------------------------

export default function PurchaseReportsPage() {
  return (
    <>
      <Helmet>
        <title> Purchase Reports | Minimal UI </title>
      </Helmet>

      <PurchaseReportView />
    </>
  );
}
// PurchaseFormPage.propType = {
//   state: PropTypes.string,
// };
