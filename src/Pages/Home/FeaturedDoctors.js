import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import DoctorCard from './DoctorCard';
import {BiGroup} from 'react-icons/bi'
 
const FeaturedDoctors = () => {
    const [doctors,setDoctors]=useState([])
    useEffect(()=>{
        fetch('https://whispering-falls-11392.herokuapp.com/doctor')
        .then(res=>res.json())
        .then(data=>{
            setDoctors(data)
        })
    },[])
    console.log(doctors)
    return (
        <>
            <div className='mt-3 mb-12 p-4' >
                <h1 className='text-primary text-2xl flex justify-center items-center font-bold'>Featured Doctors <BiGroup className=' ml-2 text-yellow-500'/></h1>
                <div class="divider mt-0"></div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        doctors?.map((doctor,index)=>(<DoctorCard doctor={doctor} key={index}></DoctorCard>))
                    }
                </div>
            </div>
        </>
    );
};

export default FeaturedDoctors;