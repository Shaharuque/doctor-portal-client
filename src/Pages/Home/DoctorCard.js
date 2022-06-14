import React from 'react';

const DoctorCard = ({ doctor }) => {
    const { image, name, speciality } = doctor
    return (
        <div>
            <div class="card text-gray-300 shadow-xl">
                <div class="card-body">
                <img className='rounded-lg h-64' src={image} alt="" />
                    <h2 class="card-title ">{name}</h2>
                    <p className='mb-4'>"Everything is going very well. I started working 3 weeks ago, it's gone well. I am getting into the...</p>
                    <p>Specialized in: <span className='text-primary font-bold hover:text-yellow-500'>{speciality}</span></p>
                    <div class="card-actions justify-end">
                        <button class="btn hover:bg-primary hover:border-primary hover:text-white">Visit Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;