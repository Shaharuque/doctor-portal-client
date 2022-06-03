import React from 'react';
import doctor from '../../assets/images/doctor.png';
import appointment from '../../assets/images/appointment.png';
import PrimaryButton from '../Shared/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section style={{
            background: `url(${appointment})`,
            borderRadius:'5px'
        }} 
        className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-100px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 p-2 lg:text-center'>
                <h2 className='text-3xl text-white mt-2 font-bold'>Make an Appointment Today</h2>
                <p className='text-yellow-400 font-serif mt-2'>We provide world class treatment to your teeth. Remember "WE ARE CREATED TO CREATE BEAUTIFUL SMILES". So hurry up and book your appointment with us today.</p>
                <PrimaryButton>Book Now!</PrimaryButton>
            </div>
        </section>
    );
};

export default MakeAppointment;