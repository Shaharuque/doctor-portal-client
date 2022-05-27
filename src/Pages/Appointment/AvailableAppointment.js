import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';


const AvailableAppointment = ({date}) => {
    const [services,setService]=useState([])
    //booking modal open/close ar jnno
    const [treatment,setTreatment]=useState()
    useEffect(()=>{
        fetch('services.json')
        .then(res=>res.json())
        .then(data=>{
            setService(data)
        })
    },[])
    console.log(services)
    return (
        <div>
            <p className='text-xl text-secondary text-center my-12'>Available Appointments on :{date ?format(date,'PP'):'Please pick one'}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
               {
                   services.map(service=><Service service={service} key={service._id} setTreatment={setTreatment}></Service>)
               }
            </div>
            {treatment ? <BookingModal date={date} treatment={treatment} setTreatment={setTreatment}></BookingModal>:null}
        </div>
    );
};

export default AvailableAppointment;