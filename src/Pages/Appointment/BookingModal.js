import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, setTreatment, date,refetch }) => {
  const { _id, name, slots } = treatment;
  //logged in user ar information pabo 'user' object ar vitor
  const [user, loading, error] = useAuthState(auth);

  const handleForm = (e) => {
    e.preventDefault();
    const time_slot = e.target.slot.value;
    const formattedDate = format(date, "PP");
    const phone = e.target.phone.value;
    const userName = user.displayName;
    const userEmail = user.email;

    //console.log({time_slot,formattedDate,name,_id,userName,userEmail,phone})  //object create kora holo for simplicity to send Booking data to database
    //bookingInfo will be sent to backend
    const bookingInfo = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot: time_slot,
      patient_name: userName,
      patient_email: userEmail,
      patient_phone: phone,
    };
    //calling POST api to post data to server
    fetch("https://whispering-falls-11392.herokuapp.com/booking", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingInfo),
    })
    .then(res=>res.json())  //server side thekey jei resonso pabo sheita json() a convert
    .then(data=>{
      console.log(data)
      if(data.success){
        toast(`Appointment is set, ${formattedDate} at ${time_slot}`)
      }
      else{
        toast.error(`You already have an Appointment on, ${data.booking?.date} at ${data.booking?.slot}`)
      }
    })
    .catch(err=>console.log(err))

    //refetching the "https://whispering-falls-11392.herokuapp.com/available?date=${formattedDate}" api 
    refetch()
    setTreatment(null); //kaj shes a modal close kora hocchey
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            style={{
              color: "red",
              backgroundColor: "teal",
              border: "1px solid teal",
            }}
            for="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">
            Booking for: <span style={{ color: "teal" }}>{name}</span>
          </h3>

          <form
            onSubmit={handleForm}
            className="my-8 grid grid-cols-1 gap-5 justify-items-center"
          >
            <input
              type="text"
              value={date ? format(date, "PP") : "Please pick one"}
              class="input input-bordered w-full max-w-xs"
              disabled
            />
            <select name="slot" class="select select-accent w-full max-w-xs">
              {slots.map((slot) => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              value={user?.displayName}
              placeholder="Your Name"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              value={user?.email}
              placeholder="Email Address"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              class="input input-bordered w-full max-w-xs"
            />

            <input
              type="submit"
              value="Submit"
              class="btn btn-secondary w-full max-w-xs"
            />
          </form>

          <div className="modal-action">
            <label
              style={{
                color: "red",
                backgroundColor: "teal",
                border: "1px solid teal",
              }}
              for="booking-modal"
              className="btn"
            >
              X
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
