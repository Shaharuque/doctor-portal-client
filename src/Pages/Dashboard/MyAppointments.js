//showing all the appointments of the logged in user
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";
//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const MyAppointments = () => {
  // const [appointments, setAppointments] = useState([]);
  const [user, loading, Autherror] = useAuthState(auth);
  const navigate = useNavigate();

  //react query use kora hoisey to do fetching, as it helps us to usely use refetching url when needed
  const {
    isLoading,
    error,
    data: appointments,
    refetch,
  } = useQuery("patient_appointments", () =>
    fetch(`http://localhost:5500/booking/?patient_email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`, //token ta server side a pathassi for verifying weather je get req kortesey se valid user naki outside thekey get req kortesey sheijnno. Remember authorizarion headers add korey dewar jnno akhn ar bairey thekey get req korle kono token server pabey na so ai condition use korey req vaalid naki na seita verify kora jay server a
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("token"); //logout ar sathey sathey access token removed
        navigate("/login");
      }
      return res.json();
    })
  );

  if (isLoading || loading) {
    return <Loading></Loading>;
  }
  // useEffect(() => {
  //   // user logged in thakle fetching ar kaj hobey
  //   if (user) {
  //     fetch(
  //       `https://whispering-falls-11392.herokuapp.com/booking?patient_email=${user.email}`,
  //       {
  //         //email ar through tey user find korbey db tey and tar corresponding booking info client a response hisabey send korbey
  //         method: "GET",
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("token")}`, //token ta server side a pathassi for verifying weather je get req kortesey se valid user naki outside thekey get req kortesey sheijnno. Remember authorizarion headers add korey dewar jnno akhn ar bairey thekey get req korle kono token server pabey na so ai condition use korey req vaalid naki na seita verify kora jay server a
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         if (res.status === 401 || res.status === 403) {
  //           signOut(auth);
  //           localStorage.removeItem("token"); //logout ar sathey sathey access token removed
  //           navigate("/login");
  //         }
  //         return res.json();
  //       })
  //       .then((data) => setAppointments(data));
  //   }
  // }, [user]);

  console.log(appointments);

  const deleteAction = (appointmentId) => {
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

        fetch(
          `http://localhost:5500/booking/${appointmentId}?user_email=${user.email}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your appointment has been deleted.", "success");
              navigate("/dashboard/myappointments");
            }
            return res.json();
          })
          .then((data) => {
            refetch();
          });
      }
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        You have{" "}
        {appointments.length
          ? appointments.length
          : "You Have No Appointments Yet"}{" "}
        appointments.
      </h2>
      {/* Daisy UI Table [Dynamic Table]*/}
      <div class="overflow-x-auto mt-16">
        <table class="table w-full">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Treatment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* dynamically  each row tey data dekhabey each appointment ar*/}
            {appointments.map((appointment, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{appointment.patient_name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.treatment}</td>
                <td>
                  <button
                    onClick={() => deleteAction(appointment._id)}
                    className="bg-teal-500 rounded-lg p-2 text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
