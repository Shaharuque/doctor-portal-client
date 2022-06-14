import React from 'react';
import { Link } from 'react-router-dom';
import chair from '../../assets/images/chair.png';
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content grid lg:grid-cols-2 grid-cols-1">
                <div>
                    <h1 className="text-4xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6">The main focus at Our Dental Clinic, we aim to provide a good care in consideration of your particular dental needs. Our dentists will take the time to carefully consider your problem and your dental objective, then curate a detailed dental planning at an affordable price to meet your desires and solve all the concerns.</p>
                    <Link to='/appointment'><button className='bg-yellow-500 p-3 text-white font-bold rounded-lg hover:bg-black'>Get Started</button></Link>
                </div>
                <img src="https://images.adsttc.com/media/images/512e/1260/b3fc/4b00/6d00/01a1/large_jpg/JM_ClinicaDentaria_PauloMerlini_047.jpg?1361973845" alt='dental-clinic' className="rounded-lg shadow-2xl" />
            </div>
        </div>
    );
};

export default Banner;