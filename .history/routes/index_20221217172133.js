
const router = require("express").Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const swaggerUi = require("swagger-ui-express");

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerLog, options));
router.use('/api', authRouter);
router.use('/api/users', userRouter);
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/api/orders', orderRouter);