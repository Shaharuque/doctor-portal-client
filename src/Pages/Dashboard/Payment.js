import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import CheckoutForm from "./CheckoutForm";

//stripe payment ar jnno [public key]
const stripePromise = loadStripe(
  "pk_test_51K8U3bA8Wu6mzkGuZsrT10w2wnveRW9iGAKLXMSIaAaiVCbAQWBCTf0hTqOc6KdlyMmOPJkkBO5vyvKzjSRPyLps00DZH6fW4z"
);

const Payment = () => {
  const { id } = useParams();

  //item id wise item info fetching[apointment id wise appointment info fetching]
  const url = `https://whispering-falls-11392.herokuapp.com/booking/${id}`;
  //data fetching ar jnno useEffect use na korey useQuery use kora hocchey, dependency use kortese=>dependency holo id cuz its changeable
  const {
    data: appointment,
    isLoading,
  } = useQuery(["user_payment", id], () =>                  //["user_payment", id]=>id is the dependency here
    fetch(url, {
      method: "GET",
      //verifyJWT tey Client side thekey token ta pathano hocchey verification ar jnno
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  //console.log(appointment);

  return (
    <div className="flex justify-center">
      <div class="card w-50 max-w-md bg-white shadow-xl my-12">
        <div class="card-body">
          <p className="text-success font-bold">
            Hello, Mr/Mrs. {appointment.booking.patient_name}
          </p>
          <h2 class="card-title">
            Please Pay for {appointment.booking.treatment}
          </h2>
          <p>
            Your Appointment:{" "}
            <span className="text-orange-700">{appointment.booking.date}</span>{" "}
            at {appointment.booking.slot}
          </p>
          <p className="text-red-500 font-bold">Please Pay: ${appointment.booking.price}</p>
        </div>

        <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl my-12 bg-yellow-500 ">
          <div class="card-body">
            <Elements stripe={stripePromise}>
              <CheckoutForm appointment={appointment}/>
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
