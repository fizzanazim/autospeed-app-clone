const orderSchema = require('../schema/order.schema');
const dotenv = require('dotenv')

dotenv.config({path: './.env'})
const stripe = require('stripe')(process.env.STRIPE_KEY)

const OrderStripe = async (req, res) => {

    const body = req.body;

    const lineItems = body.products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.proname,
                images: [product.proimg]
            },
            unit_amount: product.proprice * 100,
        },
        quantity: product.buyerqty
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
    });

    console.log(session, 'SESSIONMADE');

    let obj = {

        order_id: session.id,
        firstname: body.user_info.firstname,
        phone: body.user_info.phone,
        email: body.user_info.email,
        totalprice: body.products.reduce((init, ele) => {

            return init + ele.proprice * ele.buyerqty

        }, 0),
        payment_status: 'unpaid',
        products: body.products,
    }

    // console.log(obj, 'obj');

    await orderSchema.create(obj)

    res.json({ id: session.id, frontendstripekey: process.env.STRIPE_FRONT_END_KEY, message: 'obj created successfully!' })

}

const GetOrders = async (req, res) => {

    let orders = await orderSchema.find()

    res.send({ message: 'successful', success: true, orders: orders })

}

const PlaceOrders = async (req, res) => {

    //this contains all the customer details
    console.log(req.body, 'req.body'); //we receive data here from stripe coz we've provided this endpoint in webhooks
   
    try {

        const result = await orderSchema.findOne(
            {
                order_id: req.body?.data?.object?.id
            }
        )

        if (result) {
            result.payment_status = req.body?.data?.object?.payment_status;
            await result.save();
        }

        
    } catch (error) {

        // console.log(error);  

    }

}

const UpdateOrderStatus = async (req, res)=>{

    const {orderId, order_status} = req.body

    let result = await orderSchema.findOneAndUpdate(
        {

            order_id: orderId

        },
        {

            $set: {order_status}

        },
        {

            new: true

        }
    )

    res.send({message: 'order status updated successfully!', success: true, order_status: result.order_status})

}

module.exports = { OrderStripe, GetOrders, PlaceOrders, UpdateOrderStatus}