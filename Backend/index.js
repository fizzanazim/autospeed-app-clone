const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// const LoginRouter = require('./routes/login.route')
const ProductsRouter = require('./routes/products.route')
const CategoriesRouter = require('./routes/categories.route')
const LoginRouter = require('./routes/login.route')
const OrderRouter = require('./routes/orders.route')

dotenv.config({path: './.env'})

const server = express()

server.use(cors())
server.use(express.json())

server.use('/api', ProductsRouter)
server.use('/api', CategoriesRouter)
server.use('/api', LoginRouter)
server.use('/api', OrderRouter)

mongoose.connect(process.env.MONGODBURL).then(()=>{

    console.log('DB connected');

    server.listen(process.env.PORT, ()=>{

        console.log('server connected');
        

    })
    

})