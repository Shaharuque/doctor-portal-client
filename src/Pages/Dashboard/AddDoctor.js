import { signOut } from "firebase/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate=useNavigate()
 
  //useQuery from react query use korey service data fetch
  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:5500/service").then((res) => res.json())
  );
  //console.log(services);
  if (isLoading) {
    return <Loading></Loading>;
  }


    /**
   * 3 ways to store images
   * 1.Third party storage
   * 2. Your own storage in your own server(file system)
   * 3. Database: MongoDB, MySQL, PostgreSQL, SQLite, etc.
   * YUP: to validate file
   */
  //Thrid party image hosting at imageBB
  const imageStorageKey = "4a4f90b5ff74dccda9978dcdcf29c514";

  const onSubmit = async (data) => {  //here 'data' will get as object form
    // const image = data.image[0];
    // const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    // //image data DB tey pathanoe rule
    // const formData = new FormData();
    // formData.append("avatar", image);

    // fetch(url, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    //Uploading doctor data to server/DB
    fetch("http://localhost:5500/doctor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem("token"); //logout ar sathey sathey access token removed
                navigate("/login");
            }
            return res.json();
        })
        .then((data) => {
            if(data?.insertedDoctor?.insertedId){
              toast.success('Successfully Added')  
            } 
            else{
                console.log(data)
                toast.error('Doctor Already Added')
            }
            document.getElementById('myform').reset();   //reset form input fields   
        })

    console.log(data);
  };

 

  return (
    <div> 
      <form id="myform"   //for restting input fields of form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Doctor Name</span>
          </label>
          <input
            type="text"
            placeholder="Doctor Name"
            className="input input-bordered w-full max-w-xs"
            {...register("name", {
              required: {
                value: true,
                message: "Doctor Name is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder=" Email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                message: "Provide a valid Email",
              },
            })}
          />
          <label className="label">
            {errors.email?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="label-text-alt text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">Speciality</span>
          </label>
          <select
            {...register("speciality")}
            class="select select-accent w-full max-w-xs"
          >
            {services.map((service) => {
              return (
                <option value={service?.name} key={service?._id}>
                  {service?.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Doctor Image</span>
          </label>
          <input
            type="text"
            placeholder="Doctor Image"
            className="input input-bordered w-full max-w-xs"
            {...register("image", {
              required: {
                value: true,
                message: "Doctor image is Required",
              },
            })}
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        <input
          className="btn w-full max-w-xs text-white"
          type="submit"
          value="Add Doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
