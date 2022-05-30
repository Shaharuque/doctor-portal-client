import React from 'react';
import { toast } from 'react-toastify';

const UserRow = ({ user,index,refetch }) => {
    //email =>userCollection a jotogula user asey tader email bujhano hoisey one by one arki,Remember ai email ta kinto jei user logged in korsey site a tar na
    const {email,role}=user
    const makeAdmin=()=>{
        fetch(`https://whispering-falls-11392.herokuapp.com/user/makeAdmin/${email}`,{
            method:'PUT',
            headers:{
                authorization:`bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if(res.status === 403){
                toast.error('Failed to Make an admin');
            }
            return res.json()})
        .then(data => {
            if (data.modifiedCount > 0) {
                refetch();
                toast.success(`Successfully made an admin`);
            }

        })
    }
    
    return (
        <tr>
            <th>{index+1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button className="btn btn-xs">Remove User</button></td>
        </tr>
    );
};

export default UserRow;