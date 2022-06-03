import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../CustomHook/useAdmin";
import auth from "../../firebase.init";
import { FaUserCog } from 'react-icons/fa';
//animated background
import AnimatedBg from "react-animated-bg";

const Dashboard = () => {
  const [user] = useAuthState(auth); //je  loggedin user ar info 'user' a stored asey
  //user admin holey takey onno kicho feature dekhabo dashboard a ,useAdmin custom hook use korey define kora jassey logged in user ar email admin naki general user (true/false return korbey  )
  const [admin] = useAdmin(user);
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
        <div className="drawer-content ">
          {/*mobile view tey ekta burget Icon show hobey normal time a Icon ta hide thakbey */}
          <div className="navbar-end">
            <label
              tabIndex="1"
              for="dashboard-sidebar"
              className="btn btn-ghost bg-teal-900 text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <h2 className="text-3xl font-bold text-teal-600 text-center mt-12">
            Welcome to Your Dashboard
          </h2>
          {/* <!-- Page content show korbey nested route ar --> */}
          <div style={{ padding: "20px" }}>
            <Outlet />
          </div>
        </div>
        <div className="drawer-side ">
          <label for="dashboard-sidebar" class="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-60 bg-teal-700 text-base-content rounded-sm">
            {/* <!-- Sidebar content here --> */}
            <li>
                  <Link className='hover:bg-yellow-500 rounded-lg'
                    style={{ color: "white", fontWeight: "bold" }}
                    to="/dashboard"
                  >
                    MyProfile
                  </Link>
                  
            </li>
            {/*Admin shudu ai route dekhtey pabey */}
            {admin ? (
              <>
                <li>
                <Link className='hover:bg-yellow-500 rounded-lg'
                  style={{ color: "white", fontWeight: "bold" }}
                  to="/dashboard/users"
                >
                  All Users
                </Link>
              </li>
              <li>
                <Link className='hover:bg-yellow-500 rounded-lg'
                  style={{ color: "white", fontWeight: "bold" }}
                  to="/dashboard/doctors"
                >
                  Add Doctors
                </Link>
              </li>
              <li>
                <Link className='hover:bg-yellow-500 rounded-lg'
                  style={{ color: "white", fontWeight: "bold" }}
                  to="/dashboard/managedoctors"
                >
                  Manage Doctors
                </Link>
              </li>
              </>
            ) : (
              <div>
                 <li>
                  <Link className='hover:bg-yellow-500 rounded-lg'
                    style={{ color: "white", fontWeight: "bold" }}
                    to="/dashboard/myappointments"
                  >
                    MyAppointments
                  </Link>
                </li>
                <li>
                  <Link className='hover:bg-yellow-500 rounded-lg'
                    style={{ color: "white", fontWeight: "bold" }}
                    to="/dashboard/review"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link className='hover:bg-yellow-500 rounded-lg'
                    style={{ color: "white", fontWeight: "bold" }}
                    to="/dashboard/history"
                  >
                    My History
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
