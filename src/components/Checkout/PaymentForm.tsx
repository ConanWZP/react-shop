import React, {FormEvent, useEffect, useState} from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import CheckoutInfo from "./CheckoutInfo";
import Loader from "../MiniComponents/Loader";
import {toast} from "react-toastify";
import * as stripeJs from "@stripe/stripe-js";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState<any>('');
    const [message, setMessage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
    }, [stripe]);


    const saveOrder = () => {
        console.log('Order was saved')
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null)


        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);



        /*const confirmPayment = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000/checkout-successfully",
            },
            redirect: 'if_required'
        }).then((result) => {
            // ok - paymentIntent, bad - error
            if (result.error) {
                toast.error(result.error.message)
                setMessage(result.error.message)
                return;
            }
            if (result.paymentIntent) {
                if (result.paymentIntent.status === 'succeeded') {
                    setIsLoading(false)
                    toast.success('Payment successful')
                    saveOrder()
                }
            }
        });*/
        const confirmPayment = await stripe
            .confirmPayment({
                elements,
                confirmParams: {
                    // Make sure to change this to your payment completion page
                    return_url: "http://localhost:3000/checkout-success",
                },
                redirect: "if_required",
            })
            .then((result) => {
                // ok - paymentIntent // bad - error
                if (result.error) {
                    toast.error(result.error.message);
                    setMessage(result.error.message);
                    return;
                }
                if (result?.paymentIntent) {
                    if (result?.paymentIntent.status === "succeeded") {
                        setIsLoading(false);
                        toast.success("Payment successful");
                        saveOrder();
                    }
                }
            });



        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <section className={`w-full bg-gray-50 flex-auto`}>
            <div className={`mx-auto max-w-[1280px] px-5 pt-24`}>
                <h2 className={`text-[40px] font-bold`}>Checkout</h2>
                <div className={`flex gap-3 justify-between`}>
                    <CheckoutInfo/>
                    <form onSubmit={handleSubmit}>
                        <div className={`shadow-xl p-2 max-w-[800px]`}>
                            <h3>Payment info</h3>
                            <LinkAuthenticationElement
                                id="link-authentication-element"
                                onChange={(e) => setEmail(e.value)}
                            />
                            <PaymentElement id="payment-element" options={paymentElementOptions as any}/>
                            <button disabled={isLoading || !stripe || !elements} id="submit"
                                    className={`bg-green-500 text-white rounded px-4 py-2 font-semibold cursor-pointer 
                                    shadow-lg transition-all duration-300 ease-in w-full relative hover:bg-green-600 mt-3
                                    ${isLoading || !stripe || !elements ? 'opacity-50 cursor-default' : ''}`}>
                                <span id="button-text">
                                  {isLoading ? <div className={`w-[20px] h-[20px] bg-blue-500 rounded-full`}></div> : "Pay now"}
                                </span>
                            </button>
                            {/* Show any error or success messages */}
                            {message && <div id="payment-message">{message}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default PaymentForm;