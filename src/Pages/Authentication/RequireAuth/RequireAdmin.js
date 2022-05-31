//to prevent accessing admin route via URL from outside(secuirty purpose)
import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../CustomHook/useAdmin';
import auth from "../../../firebase.init";
import Loading from "../../Loading/Loading";


const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    //logged in user admin kina ta chyeck korar jnno useAdmin() hook call kora hocchey it will give true or false weather the logged in user.email admin or not
    const [admin,adminLoading]=useAdmin(user)
    let location = useLocation();
  
  //user k jokhn call kortesey tokhn tar status hobey loading so loading state a ekta spinner return korey diley ar reload ar sathey sathey log in page a niye jabey na
  if(loading || adminLoading){
    return <Loading></Loading>
  }

  //user jodi loged in hoye thakey or user jodi admin na hoy tahley login page a redirect korbey
  if (!user || !admin) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
 
    signOut(auth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children
};

export default RequireAdmin;