const stripe = require.main.require('./config/stripe.config');

module.exports = {
    createPaymentIntent(consumerId, order) {
        return new Promise(async (resolve, reject) => {
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: order.amount,
                    currency: order.currency,
                    customer: consumerId,
                    payment_method: order.paymentMethodId,
                    confirmation_method: 'manual', // For 3D Security
                    description: 'Buy Product',
                });

                resolve(paymentIntent);
            } catch (err) {
                reject(err);
            }
        });
    },

    confirmPayment(intentId, methodId) {
        return new Promise(async (resolve, reject) => {
            try {
                const confirm = await stripe.paymentIntents.confirm(intentId, {
                    payment_method: methodId
                })

                resolve(confirm)
            } catch(err) {
                reject(err)
            }
        })
    },

    attachPaymentMethod(customerId, paymentMethod) {
        return new Promise(async (resolve, reject) => {
            try {
                const methodAttach = await stripe.paymentMethods.attach(paymentMethod.id, {
                    customer: customerId,
                });

                resolve(methodAttach);
            } catch (err) {
                reject(err);
            }
        });
    },

    listCustomerPayMethods(customerId) {
        return new Promise(async (resolve, reject) => {
            try {
                const paymentMethods = await stripe.customers.listPaymentMethods(customerId, {
                    type: 'card',
                });

                resolve(paymentMethods.data);
            } catch (err) {
                reject(err);
            }
        });
    },
};
