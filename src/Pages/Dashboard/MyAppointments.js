//showing all the appointments of the logged in user
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // user logged in thakle fetching ar kaj hobey
    if (user) {
      fetch(`http://localhost:5500/booking?patient_email=${user.email}`) //email ar through tey user find korbey db tey and tar corresponding booking info client a response hisabey send korbey
        .then((res) => res.json())
        .then((data) => setAppointments(data));
    }
  }, []);
  console.log(appointments);

  return (
    <div>
      <h2 style={{textAlign:'center'}}>
        You have {appointments.length ? appointments.length: "You Have No Appointments Yet"} appointments.
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
            </tr>
          </thead>

          <tbody>
              {/* dynamically  each row tey data dekhabey each appointment ar*/}
            {appointments.map((appointment,index) => (
              <tr>
                <td>{index+1}</td>
                <td>{appointment.patient_name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.treatment}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
