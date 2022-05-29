import { useEffect, useState } from "react"

const useToken=(user)=>{
    const [token,setToken]=useState('')
    useEffect(()=>{
        const email=user?.user?.email
        const currentUser={email:email}  //client side thekey ai data jabey

        if(email){
            fetch(`http://localhost:5500/user/${email}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log( 'data inside useToken',data)
                localStorage.setItem('token',data.accessToken)
                setToken(data.accessToken)
            })
        }
    },[user])


    return [token,setToken]
}

export default useToken;