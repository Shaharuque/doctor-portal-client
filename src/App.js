import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Routes, Route, Link } from "react-router-dom";
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import Login from './Pages/Authentication/Login/Login';
import Register from './Pages/Authentication/Registration/Register';
import RequireAuth from './Pages/Authentication/RequireAuth/RequireAuth';
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import NoPageFound from './NoPage/NoPageFound';
import RequireAdmin from './Pages/Authentication/RequireAuth/RequireAdmin';
import MyProfile from './Pages/Dashboard/MyProfile';
import AddDoctor from './Pages/Dashboard/AddDoctor';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        
        <Route path="appointment" element={
          <RequireAuth>
            <Appointment/>
          </RequireAuth>
        }>
        </Route>

        {/* for nested route purpose ek route ar peter vitor arek route and Dashbboard is private as well*/}
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        }>
          {/* /dashboard route ar vitor geley MyProfile page ta render hoye thakbey tai path ar jaigae shudu 'index' dewa hoisey */}
          <Route index element={<MyProfile></MyProfile>}/>
          <Route path='myappointments' element={<MyAppointments></MyAppointments>}></Route>
          {/* route path jodi /dashboard/review hoy tahley MyReview page render hobey [path='review' aita hobey don't use path='/review']*/}
          <Route path='review' element={<MyReview></MyReview>}></Route>
          <Route path='history' element={<MyHistory></MyHistory>}></Route>
          <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          <Route path='doctors' element={<RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>}></Route>
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NoPageFound></NoPageFound>}></Route>
      </Routes>
      {/* react toast show korar jnno */}
      <ToastContainer />
    </div>
  );
}

export default App;
