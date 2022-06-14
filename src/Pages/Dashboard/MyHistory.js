//specific/loggedin user ar TXTid show korbo and ai data payments DB collection thekey pawa jabey thekey pawa jabey
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import {MdAddChart} from 'react-icons/md'

const MyHistory = () => {
    const [payments, setPayements] = useState();
    const [user] = useAuthState(auth);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        setLoading(true)
        fetch(`https://whispering-falls-11392.herokuapp.com/transaction/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                console.log(data.payment)
                setPayements(data.payment)
            })
    }, [user.email])
    return (
        <div>
            <h1 className='mb-8 font-bold flex justify-center items-center hover:text-yellow-500'>Treatment Payment History<MdAddChart className='ml-2'/></h1>
            {
                loading ? <Loading></Loading> :
                <div>
                <div class="overflow-x-auto">
                    <table class="table w-full">

                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments?.map((payment, index) => (
                                    <tr>
                                        <th>{index+1}</th>
                                        <td>{payment.patient_email}</td>
                                        <td>${payment.amount/100}</td>
                                        <td>{payment.transactionId}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
    );
};

export default MyHistory;