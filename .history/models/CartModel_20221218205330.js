const { query } = require('../DB/db');
const Order = require('../models/OrderModel');
const orderInstance = new Order();

module.exports = class Cartmodel {

    async createCart(data) {
        const text = 'INSERT INTO carts (user_id, created_at) VALUES ($1, current_timestamp);';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async getCartByUserId(data) {
        const text = 'SELECT * FROM carts WHERE user_id = $1;';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows;
        } catch (err) {
            throw err.stack;
        }
    }

    async getCartById(data) {
        const text = 'SELECT * FROM carts WHERE id = $1;';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async deleteCart(data) {
        const text = 'DELETE FROM carts WHERE id = $1;';
        const inputs = [data];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack
        }
    }

    async addProduct(data) {
        const text = 'INSERT INTO cart_items VALUES ($1, $2, $3)';
        const inputs = [data.cart_id, data.product_id, data.quantity];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async getAllProducts(data) {
        const text = 'SELECT products.*, quantity FROM products JOIN cart_items ON product_id = id WHERE cart_id = $1;';
        const inputs = [data];
        try {
            const result = await query(text, inputs);
            return result.rows;
        } catch (err) {
            throw err.stack
        }
    }

    async getProductById(data) {
        const text = 'SELECT products.*, quantity FROM products JOIN cart_items ON product_id = id WHERE cart_id = $1 AND product_id = $2;';
        const inputs = [data.cart_id, data.product_id];
        try {
            const result = await query(text, inputs);
            return result.rows[0];
        } catch (err) {
            throw err.stack;
        }
    }

    async updateProductQty(data) {
        const text = 'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3;';
        const inputs = [data.quantity, data.cart_id, data.product_id];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async deleteProductById(data) {
        const text = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2;';
        const inputs = [data.cart_id, data.product_id];
        try {
            return await query(text, inputs);
        } catch (err) {
            throw err.stack;
        }
    }

    async checkout(data) {
        try {
            
            const stripe = require('stripe')(stripePrivateKey);
            const products = await this.getAllProducts(data.cart_id);
            
            if(products.length === 0) return 'empty';        
            const newOrder = await orderInstance.create(data.user_id);
            const orderId = newOrder.rows[0].id;
            const paid = orderInstance.data.order_id;
                // Make charge to payment method
            await stripe.charges.create({
                amount: total,
                currency: 'usd',
                source: paymentInfo.id,
                description: 'Product Charge'
            
            })
            if(!paid) return 'payment';
            for(const product of products){
                let data = {
                    user_id: userId,
                    cart_id: cartId,
                    order_id: orderId,
                    product_id: product.id,
                    quantity: products.quantity
                }
                await orderInstance.addProduct(data);
            }
            return orderId;
        
        } catch (err) {
            throw err;
        }

    }
}
