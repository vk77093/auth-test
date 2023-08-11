import {
    BrowserRouter as Router,
    Routes,
    Route,
   NavLink
} from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';

import RegisterPage from '../Pages/RegisterPage';
import ForgotPage from '../Pages/ForgotPage';
import ProfilePage from '../Pages/ProfilePage';
import NoPage from '../Pages/NoPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ResetPage from '../Pages/ResetPage';
import ClassPage, { CreateClass } from '../Pages/OtherPages/ClassPage/ClassPage';
import SectionPage from '../Pages/OtherPages/Section/SectionPage';
import SubjectPage from '../Pages/OtherPages/ClassPage/SubjectPage';
import StudentPage from '../Pages/OtherPages/ClassPage/StudentPage.jsx';
import Product, { AddProductPage } from '../Pages/OtherPages/FakeStore/Product';
import ProductBeauty from '../Pages/OtherPages/FakeStore/ProductBeauty';



export default function Navbar(){
const[userdata,setUser]=useState('');
//let userdata=[];

useEffect(()=>{
  axios.get('/user')
  .then((response)=>{
   
      setUser(response.data);
    
//userdata=response.data;

  }).catch((error)=>{
      console.log(error);
  })
},[]);

let LogoutUser=()=>{
    localStorage.clear();
    setUser('');
    
}
    return(
        <>
       <Router>
     
       <nav className="navbar navbar-expand-lg fixed-top bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
  <NavLink className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
     }  >
      
      </NavLink>
  <NavLink className="navbar-brand" to={'/'}>Auth Page</NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            
          <NavLink className="nav-link active" aria-current="page" to={'/'}>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={'/profile'} user={userdata} >
            Profile
          </NavLink>
        </li>  
        <li className='nav-item'>
          <NavLink className={'nav-link'} to={'/classhow'}>Class Show</NavLink>
          
          </li>
          <li className='nav-item'>
            <NavLink className={'nav-link'} to={'/sectiondata'}>Section Show</NavLink>
            </li>  
            <li className='nav-item'>
            <NavLink className={'nav-link'} to={'/subjectShow'}>Subject Show</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className={'nav-link'} to={'/studentShow'}>Student Show</NavLink>
              </li>  
              <li className='nav-item'>
              <NavLink className={'nav-link'} to={'/products'}>Products</NavLink>
              </li>   
      </ul>    
     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userdata==='' ? (<li className="nav-item">
           <NavLink to='/login' className="nav-link">Login</NavLink>
        </li>):
        
        (<li className="nav-item">
        <button type='button' className="nav-link" onClick={LogoutUser}>LogOut</button>
     </li>)
    }
        <li className="nav-item">
           <NavLink to='/register' className="nav-link" user={userdata}>Register</NavLink>
        </li>
     </ul>
    </div>
  </div>
</nav>
        <Routes>        
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage user={userdata}/>}/>
        <Route path='/forgot' element={<ForgotPage/>}/>
        {/* <Route path='/profile'  element={<ProfilePage user={user}/>}/> */}
        {/* <Route path='/profile' element={<ProfilePage props={{usernam:'vijay'}}/>}/> */}
        {/* <Route path='/profile' element={<ProfilePage props={userdata}/>}/> */}
        <Route path='/profile' element={<ProfilePage user={userdata}/>}/>
        <Route path='/reset/:id' element={<ResetPage/>}/>
        {/* <Route path='/reset/:id' Component={ResetPage}/> */}
        <Route path='*' element={<NoPage />}/>

        <Route path='/classhow' element={<ClassPage/>}/>
        <Route path='/createclass' element={<CreateClass/>}/>
        <Route path='/sectiondata' element={<SectionPage/>}/>
        <Route path='/subjectShow' element={<SubjectPage/>}/>
        <Route path='/studentShow' element={<StudentPage/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/productbeauty' element={<ProductBeauty/>}/>
        <Route path='/newproduct' element={<AddProductPage/>}/>
        </Routes>
        </Router> 
        </>
    )
}