/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { lazy, Suspense, useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { routers } from 'src/common/constant';
// import SupplierPage from 'src/pages/supplier';
import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const SupplierPage = lazy(() => import('src/pages/supplier'));
export const InventoryPage = lazy(() => import('src/pages/inventory'));
export const ProductPage = lazy(() => import('src/pages/product'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const RegistrationPage = lazy(() => import('src/pages/registration'));
export const AddSupplierPage = lazy(() => import('src/pages/addSupplier'));
export const SupplierFormPage = lazy(() => import('src/pages/supplierForm'));
export const ProductFormPage = lazy(() => import('src/pages/productForm'));
export const AddInventoryPage = lazy(() => import('src/pages/addInventory'));
export const InventoryFormPage = lazy(() => import('src/pages/inventoryForm'));
export const ViewInventoryPage = lazy(() => import('src/pages/viewInventory'));
export const PurchasePage = lazy(() => import('src/pages/purchase'));
export const PurchaseFormPage = lazy(() => import('src/pages/purchaseForm'));
export const ViewPurchasePage = lazy(() => import('src/pages/viewPurchase'));
export const AssetPage = lazy(() => import('src/pages/asset'));
export const AssetFormPage = lazy(() => import('src/pages/assetForm'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const ViewProductPage = lazy(() => import('src/pages/viewProduct'));
// ----------------------------------------------------------------------
export default function Router() {
  const [userId, setUserId] = useState(
    () =>
      // Retrieve userId from local storage, or default to 0 if not found
      localStorage.getItem('userId') || 0
  );
  const [userRole, setUserRole] = useState(
    () =>
      // Retrieve userId from local storage, or default to 0 if not found
      localStorage.getItem('userRole') || 'user'
  );

  const routes = useRoutes([
    {
      path: 'login',
      element: (
        <LoginPage
          userId={Number(userId)}
          setUserId={setUserId}
          userRole={userRole}
          setUserRole={setUserRole}
        />
      ),
    },
    {
      element: (
        <DashboardLayout
          userId={userId}
          userRole={userRole}
          onLogout={() => {
            setUserId(0);
            setUserRole('user');
          }}
        >
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/dash', element: <IndexPage /> },
        { path: routers.supplier_list.route, element: <SupplierPage /> },
        { path: routers.inventory_list.route, element: <InventoryPage /> },
        { path: routers.product_list.route, element: <ProductPage /> },
        {
          path: routers.purchase_list.route,
          element: <PurchasePage userId={userId} userRole={userRole} />,
        },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: `${routers.inventory_edit.route}/:id/:sup_id/:prod_id`,
          element: <InventoryFormPage state="edit" />,
        },
        {
          path: `${routers.purchase_edit.route}/:purchase_id/:reg_ID/:prod_id/:sup_id`,
          element: <PurchaseFormPage state="edit" />,
        },
        { path: routers.supplier_add.route, element: <SupplierFormPage state="add" /> },
        { path: `${routers.supplier_edit.route}/:id`, element: <SupplierFormPage state="edit" /> },
        { path: routers.product_add.route, element: <ProductFormPage state="add" /> },
        { path: `${routers.product_edit.route}/:id`, element: <ProductFormPage state="edit" /> },
        { path: routers.inventory_add.route, element: <InventoryFormPage state="add" /> },
        {
          path: `${routers.purchase_add.route}/:reg_ID`,
          element: <PurchaseFormPage state="add" />,
        },
        {
          path: routers.asset_list.route,
          element: <AssetPage userId={userId} userRole={userRole} />,
        },
        {
          path: `${routers.asset_edit.route}/:release_id/:reg_ID/:prod_id`,
          element: <AssetFormPage state="edit" />,
        },
        {
          path: `${routers.asset_add.route}/:reg_ID`,
          element: <AssetFormPage state="add" />,
        },
        {
          path: routers.user_list.route,
          element: <UserPage state="add" />,
        },
        {
          path: `${routers.user_edit.route}/:reg_ID`,
          element: <RegistrationPage state="edit" />,
        },
        {
          path: `profile`,
          element: <ProfilePage userId={userId} />,
        },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'registration',
      element: <RegistrationPage state="add" />,
    },
    { path: 'viewInventory/:id/:sup_id/:prod_id', element: <ViewInventoryPage state="add" /> },
    {
      path: 'viewPurchase/:purchase_id/:reg_ID/:prod_id/:sup_id',
      element: <ViewPurchasePage state="add" />,
    },
    {
      path: 'viewProduct',
      element: <ViewProductPage state="add" />,
    },
  ]);

  useEffect(() => {
    // Set userId in local storage when it changes
    localStorage.setItem('userId', userId);
    localStorage.setItem('userRole', userRole);
    console.log('userId:', userId);
    console.log('userRole:', userRole);
  }, [userId, userRole]);

  return routes;
}
