/* eslint-disable react/prop-types */

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { ProductForm } from 'src/sections/productForm';

// ----------------------------------------------------------------------

export default function ProductFormPage({ state }) {
  return (
    <>
      <Helmet>
        <title> Product | Minimal UI </title>
      </Helmet>

      <ProductForm state={state} />
    </>
  );
}
ProductFormPage.prototype = {
  state: PropTypes.string,
};
