import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const CheckoutForm = ({ appointment }) => {
  //apointment booking price
  const { price, patient_name, _id, treatment, patient_email } = appointment.booking;
  console.log(price, patient_name, treatment, patient_email)
  const stripe = useStripe();
  const elements = useElements(); //card a jei information gula dewa hocchey sheigula newar jnno
  const [cardError, setCardError] = useState('')
  const [success, setSuccess] = useState('')
  const [processing,setProcessing]=useState(false) //for showing loading sppiner while loading data
  const [transactionId, setTransactionId] = useState('')
  const [clientSecret, setClientSecret] = useState("");

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://whispering-falls-11392.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ price }),  //data server side a json korey pathano hocchey
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setClientSecret(data.clientSecret)        //clientSecret server side thekey passi 
      }
      );
  }, [price]);

  //form btn handler
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);  //card a user given inforemation gula newa hocchey

    if (card == null) {
      return;
    }

    setProcessing(true)
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || '')

    //confirm card payment
    const { paymentIntent, error: intent_error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          //k payment kortesey tar information pathano jay stripe ar kachey
          billing_details: {
            name: patient_name,
            email: patient_email,
          },
        },
      },
    );

    //card payment successful na holey
    if (intent_error) {
      setCardError(intent_error?.message);
      setProcessing(false)
    }
    //card payment successful holey
    else {
      setCardError('')
      console.log(paymentIntent)
      setTransactionId(paymentIntent.id)
      setSuccess('Your payment is successful')

      //store payment info of user on database
      const payment={
        appointmentId:_id,
        transactionId:paymentIntent.id,
        amount:paymentIntent.amount,
        patient_email:patient_email,
      }
      //booking data update and payment ar info DB a save korte hobe
      fetch(`https://whispering-falls-11392.herokuapp.com/booking/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          setProcessing(false)
          console.log(data)
        })
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "black",
                "::placeholder": {
                  color: "black",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-success btn-sm mt-4 hover:bg-black hover:text-white" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        {/*card payment unsuccessful holey UI tey user k tar error show korabo */}
        {
          cardError && <div className="text-red-500 text-sm mt-2">{cardError}</div>   //card error show korbey
        }
        {/*card payment successful holey UI tey user k tar TXT id show korabo */}
        {
          success && <div className="text-black text-sm mt-2 font-bold">{success} and your TXT_ID:{transactionId}</div>   //card error show korbey
        }
      </form>
    </div>
  );
};

export default CheckoutForm;
