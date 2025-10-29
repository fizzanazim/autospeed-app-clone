const express = require("express")
const { OrderStripe, GetOrders, PlaceOrders, UpdateOrderStatus } = require("../controllers/orders.controller")
const router = express.Router()

router.post('/create-checkout-session', OrderStripe)
router.get('/get-orders', GetOrders)
router.post('/place-orders', PlaceOrders)
router.patch('/update-order-status', UpdateOrderStatus)

module.exports = router