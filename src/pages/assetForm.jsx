/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { AssetFormView } from 'src/sections/assetForm';

// ----------------------------------------------------------------------

export default function AssetFormPage({ state }) {
  return (
    <>
      <Helmet>
        <title> Product | Minimal UI </title>
      </Helmet>

      <AssetFormView state={state} />
    </>
  );
}
AssetFormPage.propType = {
  state: PropTypes.string,
};
