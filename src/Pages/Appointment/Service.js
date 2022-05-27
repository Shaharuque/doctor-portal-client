import React from "react";

const Service = ({ service,setTreatment }) => {
    const {name,slots}=service;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-secondary">{name}</h2>
          <p>{slots.length>1?`${slots.length} slots available`:'No slots available' } </p>
          <p>
              {
                  slots.length 
                  ?
                  <span>{slots[0]}</span>
                  :
                  <span style={{color:'red'}}>Try Another Date</span>
              }
          </p>
          <div className="card-actions justify-end">
            {/* particular kono service ar slots length 0 holey shei service ar Book now btn disabled thakbey */}
            {/* <button disabled={slots.length===0} className="btn btn-secondary text-white" onClick={()=>setTreatment(service)}>Book Appointment!</button>  */}
            {/* <!-- The button to open booking modal --> */}
            {/* onClick={()=>setTreatment(service)}=>modal ar moddhey kon data dekhabo sheita set kora hocchey */}
            <label disabled={slots.length===0} className="btn btn-secondary text-white" onClick={()=>setTreatment(service)} for="booking-modal" class="btn modal-button">Book Appointment!</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
