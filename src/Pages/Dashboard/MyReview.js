import React from 'react';
import {MdOutlineReviews} from 'react-icons/md';

const myReview = () => {
    return (
        <div>
           <h2 className='flex justify-center items-center text-black font-bold text-xs lg:text-xl hover:text-yellow-500'>Please Tell Us Your Experience!<MdOutlineReviews className='text-white ml-2'/></h2> 
        </div>
    );
};

export default myReview;