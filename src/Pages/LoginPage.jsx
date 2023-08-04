import { CardComp } from "../Comp/FormComp/CardComp";
import MainPage from "../Comp/MainPage";
import {InputComp} from "../Comp/FormComp/InputComp";
import { ButtonComp } from "../Comp/FormComp/ButtonComp";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Navigate} from 'react-router-dom'

export default function LoginPage(props){
const[email,SetEmail]=useState('');
const[password,SetPassword]=useState('');
 const[message,SetMessage]=useState('');
const[loggedIn,SetLoggedIn]=useState(false);


//For Navigation
const history=useNavigate();
let EmailIdChange=(e)=>{
    SetEmail(e.target.value);
}
let PasswordChange=(e)=>{
    SetPassword(e.target.value);
}

let HandleSubmit=(e)=>{
    e.preventDefault();
    if(email==='' || password ===''){
        SetMessage('Can not be blank');
    }
   CheckLogin();
}
function CheckLogin(){
    //setted the base url in Index.js'
    
    const data={
        email:email,
        password:password,
    }
   axios.post('/login',data)
   .then((response)=>{
    if(response.status===200){
        localStorage.setItem('logintoken',response.data.token);
        SetLoggedIn(true);
        props.setUser(response.data.user);
        history('/profile');
    }
   }).catch((errors)=>{
    //console.log(errors);
    SetMessage(errors.response.data.message);
   })
}

if(loggedIn){
    return(
        <Navigate to="/profile" replace={true} />
    )
}
let token=localStorage.getItem('logintoken');
if(token !==null){
    return <Navigate to={'/profile'}/>
  }

    return(   
       <>
      
      <MainPage>
      <center>
      <div className="col-sm-6 col-md-6">
        <CardComp cardTitle={'Enter Your Criendientals'}>
            <form onSubmit={HandleSubmit}>
               {message !=='' ? (
 <p className="alert alert-danger">{message}</p>
               ):('')}
             <InputComp lablefor={'email'} labelName={'Enter Your Email'} inputType={'text'} inputName={email} inputValue={email} ChangeEventCatch={EmailIdChange}/> 
             <InputComp lablefor={'password'} labelName={'Enter Password'} inputType={'password'} inputName={password} inputValue={password} ChangeEventCatch={PasswordChange}/>
             <ButtonComp buttonType={'submit'} buttonStyle={'success'} buttonName={'Login Here'}/>
            </form>
            <div className="card-footer mt-1">
                <NavLink to={'/forgot'} className="text-danger mb-2">Fogot Password</NavLink>
                <br/>
                <NavLink to={'/register'} className={'text-info'}>Not A User ? Register here</NavLink>
            </div>
        </CardComp>
       </div>
      </center>
      </MainPage>
       </>
    )
}