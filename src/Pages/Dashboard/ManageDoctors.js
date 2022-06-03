import { signOut } from "firebase/auth";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";
//sweet alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const ManageDoctors = () => {
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("all_doctors", () =>
    fetch("https://whispering-falls-11392.herokuapp.com/doctor", {         //getting all doctors
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  const removeDoctor = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://whispering-falls-11392.herokuapp.com/doctor/${id}`, {
          method: "DELETE",
          //headers server side a na pathaley kinto unauthorized access diye dibey as middleware hisbey verifyJWT use kora hoisey
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              refetch();
            } else {
              toast.error(data.message);
            }
          });
      }
    });
  };

  return (
    <div>
      <h1 className="font-bold text-sm">(No. of Doctor:0{doctors?.length})</h1>

      <div class="overflow-x-auto w-full">
        <table class="table w-full">
          <thead>
            <tr className="bg-teal-400">
              <th>Name</th>
              <th>Email</th>
              <th>Speciality</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              return (
                <tr>
                  <td>
                    <div class="flex items-center space-x-3">
                    {/* doctor image show into avatar */}
                      <div class="avatar">
                        <div class="w-16 rounded">
                          <img src={doctor?.image} />
                        </div>
                      </div>

                      <div>
                        <div class="font-bold">{doctor?.name}</div>
                        <div class="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-ghost badge-xl hover:text-white hover:bg-violet-600 p-4">
                      {doctor?.email}
                    </span>
                  </td>
                  <td>{doctor?.speciality}</td>
                  <th>
                    <button
                      onClick={() => removeDoctor(doctor._id)}
                      class="btn btn-ghost btn-xs bg-teal-500 text-white hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
