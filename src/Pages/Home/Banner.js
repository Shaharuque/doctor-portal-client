import React from 'react';
import chair from '../../assets/images/chair.png';
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content grid lg:grid-cols-2 grid-cols-1">
                <div>
                    <h1 className="text-4xl font-bold">Your New Smile Starts Here</h1>
                    <p className="py-6"></p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
                <img src={chair} className="rounded-lg shadow-2xl" />
            </div>
        </div>
    );
};

export default Banner;