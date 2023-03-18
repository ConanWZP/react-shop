require('dotenv').config() // ~ import

const express = require("express");

const cors = require('cors')

const stripe = require("stripe")('sk_test_51MmsuvD2KA41zJ2NbCBUxBHz11Ok14ijFr0AIpk6w33PUTJ4vZxmRU8IxzwGdy8RYU1toI8qsv2X3n3KkXRr6Aof00OHkE2gbC');

const app = express();
// This is your test secret API key.

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to our shop')
})

const PORT = process.env.PORT || 4242

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));

let totalAmount
const calculateOrderAmount = (items) => {
    const initialValue = 0;
    totalAmount = items.reduce((previousValue, currentValue) => {
        return previousValue + (currentValue.price * currentValue.count)
    }, initialValue);
    return totalAmount * 100;
};


app.post("/create-payment-intent", async (req, res) => {
    const { items, customerEmail, shippingAddress, description } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
        shipping: {
            address: {
                lat: shippingAddress.lat,
                long: shippingAddress.long,
                address: shippingAddress.address

            },
            phone: shippingAddress.phone,
            name: shippingAddress.name
        }
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

