import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { SupplierFormView } from 'src/sections/supplierForm';

// ----------------------------------------------------------------------

export default function SupplierFormPage({ state }) {
  return (
    <>
      <Helmet>
        <title> Supplier | Minimal UI </title>
      </Helmet>

      <SupplierFormView state={state} />
    </>
  );
}
SupplierFormPage.propTypes = {
  state: PropTypes.string,
};
