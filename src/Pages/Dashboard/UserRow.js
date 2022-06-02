import React from 'react';
import { toast } from 'react-toastify';
//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

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

    //remove user and it can be only doneby admin[remember admin can't remove another admin]

    const removeUser=(userId)=>{
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#087789",
            cancelButtonColor: "#890816",
            confirmButtonText: "Delete it!",
          }).then((result) => {
            if(result.isConfirmed){
                fetch(`http://localhost:5500/user/${userId}`,{
                    method:'DELETE',
                    headers:{
                        authorization:`bearer ${localStorage.getItem('token')}`
                    },
                })
                .then(res => {
                    if(res.status===403 || res.status===404){
                        toast.error('Failed to delete user');
                    }
                    else{
                        toast.success('Successfully deleted user');
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    refetch()
                })
            }
    })
}
    return (
        <tr>
            <th>{index+1}</th>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button onClick={()=>removeUser(user._id)} className="btn btn-xs">Remove User</button></td>
        </tr>
    );
};

export default UserRow;