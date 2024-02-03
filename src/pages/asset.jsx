import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { AssetView } from 'src/sections/asset/view';

// ----------------------------------------------------------------------

export default function AssetPage({ userId, userRole }) {
  return (
    <>
      <Helmet>
        <title> Asset | Minimal UI </title>
      </Helmet>

      <AssetView userId={userId} userRole={userRole} />
    </>
  );
}
AssetPage.propTypes = {
  userId: PropTypes.any,
  userRole: PropTypes.any,
};
