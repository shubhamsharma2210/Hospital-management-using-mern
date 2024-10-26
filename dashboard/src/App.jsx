import './App.css'
import {BrowserRouter as Router , Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import AddNewDoctot from './components/AddNewDoctot'
import AddNewAdmin from './components/AddNewAdmin'
import Doctor from './components/Doctor'
import Message from './components/Message'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from 'react'
import {Context} from './main'
import axios from 'axios'
import SideBar from './components/SideBar'
import AdminRegisterSuccess from './components/AdminRegisterSuccess'

function App() {
  const {isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/v1/user/admin", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(response.data.users); // This should set user data
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);

  setInterval(() => {
      if(!isAuthenticated){
        return <Navigate to={'/login'} />
      }
  },10000)
  
  
 
  return (
    <>
      <Router>
        <SideBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/addnewdoctor' element={<AddNewDoctot />} />
          <Route path='/addnewadmin' element={<AddNewAdmin />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/message' element={<Message />} />
          <Route path='/success-page' element={<AdminRegisterSuccess />} />

        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App
