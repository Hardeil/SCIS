import { routers } from 'src/common/constant';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dash',
    icon: icon('ic_analytics'),
    role: ['Admin', 'Staff'],
  },
  {
    title: 'supplier',
    path: routers.supplier_list.route,
    icon: icon('ic_user'),
    role: ['Admin', 'Staff'],
  },
  {
    title: 'product',
    path: routers.product_list.route,
    icon: icon('ic_cart'),
    role: ['Admin', 'Staff'],
  },
  {
    title: 'release',
    path: routers.asset_list.route,
    icon: icon('ic_cart'),
    role: ['Admin', 'Staff'],
  },
  {
    title: 'purchase',
    path: routers.purchase_list.route,
    icon: icon('ic_cart'),
    role: ['Admin', 'Staff'],
  },
  {
    title: 'user',
    path: routers.user_list.route,
    icon: icon('ic_user'),
    role: ['Admin'],
  },
  {
    title: 'Reports',
    path: '/purchaseReports',
    icon: icon('ic_cart'),
    role: ['Admin', 'Staff'],
  },
  // {
  //   title: 'profile',
  //   path: 'profile',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'blog',
  //   path: '/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
