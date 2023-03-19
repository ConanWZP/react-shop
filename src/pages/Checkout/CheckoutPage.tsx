import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import React, {useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {useAppDispatch, useAppSelector} from "../../hooks/customHooks";
import {calculateTotalCountOfProducts, calculateTotalPrice} from "../../redux/slices/cartSlice";
import PaymentForm from "../../components/Checkout/PaymentForm";

/*const stripePromise = loadStripe("pk_test_51MmsuvD2KA41zJ2N1wKCniEDfSOhjF7uFPMW0GCCZsW9iPVAF2MYo4ygdhHWKLDYsrFD9Nqhuj04raCXvHGgBBYa00Dl7YkuCy");*/



const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHER_KEY}`);

const CheckoutPage = () => {

    const dispatch = useAppDispatch()

    const [initialMessage, setInitialMessage] = useState('Initializing checkout page')
    const [clientSecret, setClientSecret] = useState("");

    const {items, itemsNumber, itemsValue} = useAppSelector(state => state.cart)
    const {email} = useAppSelector(state => state.auth)
    const {billingData} = useAppSelector(state => state.checkout)


    const description = `Payment info: email: ${email}, Total Price: ${itemsValue}`

    useEffect(() => {
        dispatch(calculateTotalPrice())
        dispatch(calculateTotalCountOfProducts())
    }, [dispatch, items])



    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:4242/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: items,
                customerEmail: email,
                shippingAddress: billingData,
                description

            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.json().then((json) => Promise.reject(json));
            })
            .then((data) => {
                setClientSecret(data.clientSecret);
            })
            .catch((error) => {
                setInitialMessage("Failed to initialize checkout");
                toast.error("Something went wrong!");
            });
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (

        <>
            {!clientSecret ?
                <div className={`flex-auto pt-26`}>
                    {!clientSecret ?
                        <h3>{initialMessage}</h3>
                        :
                        null
                    }
                </div>
                : null
            }

            {clientSecret && (
                <Elements options={options as any} stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
            )}
        </>


    );
};

export default CheckoutPage;