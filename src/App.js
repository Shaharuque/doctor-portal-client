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
        
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      {/* react toast show korar jnno */}
      <ToastContainer />
    </div>
  );
}

export default App;
