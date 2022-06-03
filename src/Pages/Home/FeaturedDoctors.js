import React from 'react';
import { useQuery } from 'react-query';

const FeaturedDoctors = () => {
    const {data:doctors,isLoading,refetch} = useQuery('doctors',()=>fetch('').then(res=>res.json()).then(result=>console.log(result)));
    return (
        <>
            <div className='mt-3 mb-3' >
                <h1>Featured Doctorss</h1>
            </div>
        </>
    );
};

export default FeaturedDoctors;