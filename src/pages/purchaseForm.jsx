/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { PurchaseFormView } from 'src/sections/purchaseForm';

// ----------------------------------------------------------------------

export default function PurchaseFormPage({ state }) {
  return (
    <>
      <Helmet>
        <title> Purchase | Minimal UI </title>
      </Helmet>

      <PurchaseFormView state={state} />
    </>
  );
}
PurchaseFormPage.propType = {
  state: PropTypes.string,
};
