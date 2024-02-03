export const routers = {
  product_list: {
    title: 'List of Product',
    route: '/product',
    apiUrl: 'http://localhost/xampp/back_end/productView.php',
  },
  product_add: {
    title: 'Product Add',
    route: 'product-add',
    apiUrl: 'http://localhost/xampp/back_end/addProduct.php',
  },
  product_edit: {
    title: 'Product Edit',
    route: 'product-edit',
    apiUrl: `http://localhost/xampp/back_end/editProduct.php`,
    apiGetProductUrl: `http://localhost/xampp/back_end/getProductData.php`,
  },
  product_delete: {
    title: 'Product Delete',
    route: 'product-delete',
    apiUrl: 'http://localhost/xampp/back_end/deleteProduct.php',
  },
  supplier_list: {
    title: 'Supplier List',
    route: '/supplier',
    apiUrl: `http://localhost/xampp/back_end/supplierView.php`,
  },
  supplier_delete: {
    title: 'Supplier Delete',
    route: 'supplier-delete',
    apiUrl: `http://localhost/xampp/back_end/deleteSupplier.php`,
  },
  supplier_add: {
    title: 'Add New Supplier',
    route: '/supplier-add',
    apiUrl: 'http://localhost/xampp/back_end/addSupplier.php',
  },
  supplier_edit: {
    title: 'Edit Supplier',
    route: '/supplier-edit',
    apiUrl: `http://localhost/xampp/back_end/editSupplier.php`,
  },
  supplier_data: {
    title: 'Supplier Data',
    route: 'supplier-data',
    apiUrl: `http://localhost/xampp/back_end/getSupplierData.php`,
  },
  inventory_list: {
    title: 'Inventory List',
    route: '/inventory',
    apiUrl: 'http://localhost/xampp/back_end/inventoryView.php',
  },
  inventory_delete: {
    title: 'Inventory Delete',
    route: '/inventory-delete',
    apiUrl: `http://localhost/xampp/back_end/deleteInventory.php`,
  },
  inventory_add: {
    title: 'Inventory Add',
    route: '/inventory-add',
    apiUrl: `http://localhost/xampp/back_end/addInventory.php`,
  },
  inventory_edit: {
    title: 'Inventory Edit',
    route: '/inventory-edit',
    apiUrl: `http://localhost/xampp/back_end/editInventory.php`,
  },
  inventory_data: {
    title: 'Inventory Data',
    route: '/inventory-delete',
    apiUrl: `http://localhost/xampp/back_end/getInventoryData.php`,
  },
  purchase_list: {
    title: 'Purchase Product List',
    route: '/purchase',
    apiUrl: 'http://localhost/xampp/back_end/purchaseView.php',
  },
  purchase_delete: {
    title: 'Inventory Delete',
    route: '/purchase-delete',
    apiUrl: `http://localhost/xampp/back_end/deletePurchase.php`,
  },
  purchase_add: {
    title: 'Purchase Order Add',
    route: '/purchase-add',
    apiUrl: `http://localhost/xampp/back_end/addPurchase.php`,
  },
  purchase_edit: {
    title: 'Purchase Order Edit',
    route: '/purchase-edit',
    apiUrl: `http://localhost/xampp/back_end/editPurchase.php`,
  },
  purchase_data: {
    title: 'Inventory Delete',
    route: '/purchase-data',
    apiUrl: `http://localhost/xampp/back_end/getPurchaseData.php`,
  },
  asset_list: {
    title: 'Release List Details',
    route: '/asset',
    apiUrl: 'http://localhost/xampp/back_end/assetView.php',
  },
  asset_delete: {
    title: 'asset Delete',
    route: '/asset-delete',
    apiUrl: `http://localhost/xampp/back_end/deleteAsset.php`,
  },
  asset_add: {
    title: 'Release Add',
    route: '/asset-add',
    apiUrl: `http://localhost/xampp/back_end/addAsset.php`,
  },
  asset_edit: {
    title: 'Release Edit',
    route: '/asset-edit',
    apiUrl: `http://localhost/xampp/back_end/editAsset.php`,
  },
  asset_data: {
    title: 'Asset Data',
    route: '/asset-delete',
    apiUrl: `http://localhost/xampp/back_end/getAssetData.php`,
  },
  user_list: {
    title: 'User List',
    route: '/user',
    apiUrl: 'http://localhost/xampp/back_end/userView.php',
  },
  user_delete: {
    title: 'user Delete',
    route: '/user-delete',
    apiUrl: `http://localhost/xampp/back_end/deleteUser.php`,
  },
  user_add: {
    title: 'Asset Add',
    route: '/user-add',
    apiUrl: `http://localhost/xampp/back_end/addUser.php`,
  },
  user_edit: {
    title: 'User Edit',
    route: '/user-edit',
    apiUrl: `http://localhost/xampp/back_end/editUser.php`,
  },
  user_data: {
    title: 'User Data',
    route: '/user-data',
    apiUrl: `http://localhost/xampp/back_end/getUserData.php`,
  },
};
