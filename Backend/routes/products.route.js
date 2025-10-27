const express = require('express');
const { FindSingleProduct, AddNewProduct, GetAllProducts, DeleteProduct, UpdateProduct } = require('../controllers/products.controller');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const router = express.Router()

router.get('/for-finding-object/:id', FindSingleProduct);
router.post('/products-data', AddNewProduct);
router.get('/products-array', GetAllProducts);
router.delete('/del-product/:id', DeleteProduct)
router.patch('/update-product/:updateid', UpdateProduct)

module.exports = router