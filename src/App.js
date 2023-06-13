import './App.css';
import Banner from './sections/Banner';
import Contact from './sections/Contact';
import Review from './sections/Review';
import Footer from './sections/Footer';
import Navbar from './sections/Navbar';
import Services from './sections/Services';
import { Link, Route, Router, Routes } from "react-router-dom"; //routes link korlam
import Home from './sections/Home';
import Notfound from './sections/Notfound';
import Manage from './sections/Manage';
import Addproduct from './Manage/Addproduct';
import ManageProduct from './Manage/ManageProduct';
import Login from './sections/Login';
import SignUp from './sections/SignUp';
import DashboardLayout from './Dashboard/DashboardLayout';
import AllSeller from "./Dashboard/AdminDashboard/AllSeller/AllSeller"
import AllBuyer from './Dashboard/AdminDashboard/AllBuyer/AllBuyer';
import MyOrder from './Dashboard/BuyerDashboard/MyOrder/MyOrder';
import MyProduct from './Dashboard/SellerDashBoard/MyProduct/MyProduct';
//nirdishto path er jnno nirdishto component dekhano
function App() {
  return (
    <div className=' p-5'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/banner' element={<Banner />} />
        <Route path='/manage' element={<Manage />} />
        <Route path='/manage/:id' element={<ManageProduct />} />
        <Route path='/addproduct' element={<Addproduct />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/review' element={<Review />} />
        <Route path='*' element={<Notfound />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard'
          element={<DashboardLayout />}>
          <Route path='/dashboard/allSeller' element={<AllSeller />}></Route>
          <Route path='/dashboard/allBuyer' element={<AllBuyer />}></Route>
          <Route path='/dashboard/myOrder' element={<MyOrder />}></Route>
          <Route path='/dashboard/addProduct' element={<Addproduct />}></Route>
          <Route path='/dashboard/myProduct' element={<MyProduct />}></Route>
        </Route>
      </Routes>
    </div>
  );
}


export default App;
