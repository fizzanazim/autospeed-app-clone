const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
    {
        order_id: {type: String},
        firstname: {type: String},
        phone: {type: String},
        email: {type: String},
        totalprice: {type: Number},
        payment_status: {type: String},
        order_status: {
            type: String,
            enum: ['Payment Pending', 'Cancelled', 'Processing', 'Completed'],
            default: 'Payment Pending'
        },
        products: [{ 
            proname: {type: String},
            proimg: {type: String},
            proqty: {type: Number},
            prorating: {type: String},
            proprice: {type: Number},
            category: {type: String},
            buyerqty: { type: Number}
            
        }]
    }
)

module.exports = mongoose.model('order', OrderSchema)