//by calling this custom hook by user parameter it will return user.email/logged in user admin naki general user (true/false return korbey  )

import { useEffect, useState } from "react"

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect( () =>{
        const email = user?.email;
        if(email){
            fetch(`https://whispering-falls-11392.herokuapp.com/admin/${email}`, {
                method:'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('token')}`    //user logged in hobar por ekta token server side thekey user k dewa hoy ja kina user ar device ar local storage save korey rakha hoy . ai saved token client side thekey GET req ar sathey authorization header hisabey server a pathano hocchey to verify that token is valid or not. token valid holey client side thekey GET req ar response dibey server thekey ta naholey error message show korbey
                }
            })
            .then(res=>res.json())
            .then(data => {
                setAdmin(data.admin);
                setAdminLoading(false)
            })
        }
    }, [user])

    return [admin,adminLoading]
}

export default useAdmin;