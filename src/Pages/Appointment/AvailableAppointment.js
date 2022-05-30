import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import BookingModal from './BookingModal';
import Service from './Service';


const AvailableAppointment = ({ date }) => {
    // const [services,setService]=useState([])
    //booking modal open/close ar jnno
    const [treatment, setTreatment] = useState()

    const formattedDate = format(date, 'PP');

    //useEffect and useState ar use na korey useQuery from react query use kora hocchey
    //data: services means data is services
    //refetch use kortese cuz state change ar sathey sathey jeno abr api ta call korey ager assignment a increse/decrease ar kaj korsilam same technique use korei
    //data: services=>data is named as services and inside services all the fetched data will be stored ,['availble',formattedDate]=>formattedDate is the dependency here
    const { isLoading, error, data: services,refetch } = useQuery(['availble',formattedDate], () =>
        fetch(`http://localhost:5500/available?date=${formattedDate}`).then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <Loading></Loading>
    }
    // useEffect(() => {
    //     fetch(`http://localhost:5500/available?date=${formattedDate}`)
    //         .then(res => res.json())
    //         .then(data => setService(data));
    // }, [formattedDate])

    return (
        <div>
            <p className='text-xl text-secondary text-center my-12'>Available Appointments on :{date ? format(date, 'PP') : 'Please pick one'}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service => <Service service={service} key={service._id} setTreatment={setTreatment}></Service>)
                }
            </div>
            {treatment ? <BookingModal date={date} treatment={treatment} setTreatment={setTreatment} refetch={refetch}></BookingModal> : null}
        </div>
    );
};

export default AvailableAppointment;