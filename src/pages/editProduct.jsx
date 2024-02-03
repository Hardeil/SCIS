import { Helmet } from 'react-helmet-async';

import { EditProductView } from 'src/sections/editProduct';

// ----------------------------------------------------------------------

export default function EditProductPage() {
  return (
    <>
      <Helmet>
        <title> Product | Minimal UI </title>
      </Helmet>

      <EditProductView />
    </>
  );
}
