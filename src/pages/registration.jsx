import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { RegistrationView } from 'src/sections/registration';

// ----------------------------------------------------------------------

export default function RegistrationPage({ state }) {
  return (
    <>
      <Helmet>
        <title> Registraion | Minimal UI </title>
      </Helmet>

      <RegistrationView state={state} />
    </>
  );
}
RegistrationPage.propTypes = {
  state: PropTypes.string,
};
