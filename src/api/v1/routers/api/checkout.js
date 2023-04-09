const express = require('express');
const { getAllUserInfo } = require('../../user/user.service');
const { requireLoggedIn } = require('../../middlewares/auth');
const {
    confirmPayment,
    createPaymentIntent,
    attachPaymentMethod,
    listCustomerPayMethods,
} = require('../../helpers/payment.helper');

const checkoutRoute = express.Router();

checkoutRoute.post('/payment/attach-method', requireLoggedIn, async (req, res) => {
    const { paymentMethod } = req.body;
    const { userInfo } = await getAllUserInfo(req.user.id);
    console.log(req.body);
    try {
        const response = await attachPaymentMethod(userInfo.stripeId, paymentMethod);
        return res.status(200).json({
            errType: null,
            message: 'Attach payment method successfully!',
            payload: response,
        });
    } catch (err) {
        return res.status(500).json({
            errType: 'attach',
            message: err.message,
        });
    }
});

checkoutRoute.get('/payment/methods', requireLoggedIn, async (req, res) => {
    const { userInfo } = await getAllUserInfo(req.user.id);

    try {
        const listMethods = await listCustomerPayMethods(userInfo.stripeId);

        return res.status(200).json({
            errType: null,
            message: 'Get all payment methods successfully!',
            payload: listMethods,
        });
    } catch (err) {
        return res.status(500).json({
            errType: 'retrieve',
            message: err.message,
        });
    }
});

checkoutRoute.post('/payment/create-intent', requireLoggedIn, async (req, res) => {
    const { order } = req.body;
    const { userInfo } = await getAllUserInfo(req.user.id);

    try {
        const paymentIntent = await createPaymentIntent(userInfo.stripeId, order);

        res.status(200).json({
            errType: null,
            message: paymentIntent.code || 'Create client secret successfully!',
            payload: paymentIntent,
        });
    } catch (err) {
        res.status(500).json({ errType: 'intent', message: err.message });
    }
});

checkoutRoute.post('/payment/confirm', requireLoggedIn, async (req, res) => {
    const { intentId, methodId } = req.body;

    try {
        const confirm = await confirmPayment(intentId, methodId);

        res.status(200).json({
            errType: null,
            message: confirm || 'Create client secret successfully!',
            payload: confirm,
        });
    } catch (err) {
        res.status(500).json({ errType: 'intent', message: err.message });
    }
});

module.exports = checkoutRoute;
