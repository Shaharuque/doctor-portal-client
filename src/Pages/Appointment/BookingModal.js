import React from "react";
import { format } from 'date-fns';

const BookingModal = ({treatment,setTreatment,date}) => {
    const {_id,name,slots}=treatment

    const handleForm=(e)=>{
        e.preventDefault()
        const time_slot=e.target.slot.value
        console.log(time_slot,name,_id)
        setTreatment(null) //kaj shes a modal close kora hocchey
    }
  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
        <label style={{color:'red',backgroundColor:'teal',border:'1px solid teal'}}  for="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">
            Booking for: <span style={{color:'teal'}}>{name}</span> 
          </h3>
          <form onSubmit={handleForm} className="my-8 grid grid-cols-1 gap-5 justify-items-center">
                <input type="text" value={date ?format(date,'PP'):'Please pick one'}  class="input input-bordered w-full max-w-xs" disabled/>
                <select name="slot" class="select select-accent w-full max-w-xs">
                    {
                        slots.map(slot=><option key={slot}>{slot}</option>)
                    }

                </select>
                <input type="text" name="name" placeholder="Your Name" class="input input-bordered w-full max-w-xs" />
                <input type="email" name="email" placeholder="Email Address" class="input input-bordered w-full max-w-xs" />
                <input type="text" name="phone" placeholder="Phone Number" class="input input-bordered w-full max-w-xs" />
                <input type="submit" value="Submit" class="btn btn-secondary w-full max-w-xs" />
          </form>
          <div className="modal-action">
            <label style={{color:'red',backgroundColor:'teal',border:'1px solid teal'}} for="booking-modal" className="btn">
              X
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
