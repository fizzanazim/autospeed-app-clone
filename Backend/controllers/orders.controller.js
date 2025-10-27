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

    // console.log(session);

    let obj = {

        order_id: '',
        firstname: body.user_info.firstname,
        phone: body.user_info.phone,
        email: body.user_info.email,
        totalprice: body.products.reduce((init, ele) => {

            return init + ele.proprice * ele.buyerqty

        }, 0),
        payment_status: 'unpaid',
        products: body.products,
    }

    console.log(obj, 'obj');

    await orderSchema.create(obj)

    res.json({ id: session.id, frontendstripekey: process.envSTRIPE_FRONT_END_KEY, message: 'obj created successfully!' })

}

const GetOrders = async (req, res) => {

    let orders = await orderSchema.find()

    res.send({ message: 'successful', success: true, orders: orders })

}

const PlaceOrders = async (req, res) => {

    //this contains all the customer details
    console.log(req.body, 'FROM PLACE ORDER 1'); //we receive data here from stripe coz we've provided this endpoint in webhooks
    console.log(req.body?.data?.object?.customer_details, 'FROM PLACE ORDER'); //we receive data here from stripe coz we've provided this endpoint in webhooks
    console.log(req.body?.data?.object?.customer_details, 'req.body?.data?.object?.customer_details');

    try {

        const result = await orderSchema.findOne(
            {
                email: req.body?.data?.object?.customer_details?.email
            }
        )

        if (result) {
            result.payment_status = req.body?.data?.object?.payment_status;
            result.order_id = req.body?.id;
            await result.save();
        }

        console.log("------", result, "result");

    } catch (error) {

        console.log(error);  

    }

}

// const UpdateOrderStatus = async (req, res)=>{

//     await orderSchema.findOneAndUpdate(
//         {

//             email: req.body.orderEmail

//         },
//         {

//             $set: {order_status: req.body.status}

//         },
//         {

//             new: true

//         }
//     )

// }

module.exports = { OrderStripe, GetOrders, PlaceOrders}