import React, { useState, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import '../styles/checkout.css';
import { toast } from 'react-toastify';

const Checkout = ({total,orderButton, setTransaction}) => {
    const [{ options }, dispatch] = usePayPalScriptReducer();
    const [paymentMethod, setPaymentMethod] = useState("paypal");

    useEffect(() => {
        if (paymentMethod === "paypal") {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: "USD",
                },
            });
        }
    }, [paymentMethod, total,dispatch]);

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                        currency_code: "USD",
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            console.log(details)
            const name = details.payer.name.given_name;
            toast.success(`Transaction completed by ${name}`)
            setTransaction(details.id)
            if (orderButton.current) {
                orderButton.current.click();    
            }   
              });
    }

    return (
        <div className="checkout">
            <div className="payment-methods">
                <label className="pay-radio">
                    <input  
                        type="radio" 
                        name="paymentMethod" 
                        value="paypal" 
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                    />
                    PayPal
                </label>
                <label className="pay-radio">
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                    />
                    Cash on Delivery
                </label>
            </div>

            {paymentMethod === "paypal" ? (
                <PayPalButtons 
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
            ) : (
                <div className='cod'>
                    <p>You will pay for your order when it is delivered to your address.</p>
                </div>
            )}
        </div>
    );
}

export default Checkout;
