import { useState } from "react";
import { CardComp } from "../Comp/FormComp/CardComp";
import MainPage from "../Comp/MainPage";
import axios from "axios";
import { NavLink, Navigate,useNavigate } from "react-router-dom";
import { InputComp } from "../Comp/FormComp/InputComp";
import { ButtonComp } from "../Comp/FormComp/ButtonComp";

export default function RegisterPage(props){
    const[registerdata,SetRegisterData]=useState({
username:'',
email:'',
password:'',
confirm_password:'',


    });
    const[message,SetMessage]=useState('');
    const[loggedIn,SetLoggedIn]=useState(false);

//For Navigation
const history=useNavigate();

  let  SetUserName=(e)=>{
        SetRegisterData({
            ...registerdata,
            username:e.target.value,
        });
    }
  let  SetEmail=(e)=>{
        SetRegisterData({
            ...registerdata,
            email:e.target.value,
        });
    }
  let  setPassword=(e)=>{
        SetRegisterData({
            ...registerdata,
            password:e.target.value,
        });
    }
   let SetConfirmPassword=(e)=>{
        SetRegisterData({
            ...registerdata,
            confirm_password:e.target.value,
        });
    }
   let formSubmit=(e)=>{
        e.preventDefault();
if(registerdata.username ==='' || registerdata.email ==='' 
|| registerdata.password==='' || registerdata.confirm_password === ''){
SetMessage('Required Filed Can not be empty');
}else{
    const userdata={
        name:registerdata.username,
        email:registerdata.email,
        password:registerdata.password,
        password_confirmation:registerdata.confirm_password,
    }
    axios.post('/register',userdata)
    .then((response)=>{      
        if(response.status===400){
            SetMessage(response.data.message);
        }
        else if(response.status===200){
localStorage.setItem('logintoken',response.data.token);
SetLoggedIn(true);
props.setUser(response.data.user);
history('/profile');
        }
        else{
            SetMessage(response.data.message);
        }
    }).catch((error)=>{
        SetMessage(error.response.data.message);
       
    });
}
    }
    //For Authorization
    let token=localStorage.getItem('logintoken');
    if(loggedIn || token !==null){
        return(
            <Navigate to='/profile' replace={true}/>
        )
    }

   
    return(
        <>
       <MainPage>
      <CardComp cardTitle={"Register Yourself"}>

        <form method="post" className="form-control" id="regisid" onSubmit={formSubmit}>
        {message !=='' ? (
 <p className="alert alert-danger">{message}</p>
               ):('')}
        <InputComp labelName={'Enter Your Full Name'} lablefor={'username'} inputType={'text'} inputName={registerdata.username} inputValue={registerdata.username} ChangeEventCatch={SetUserName} />
<InputComp labelName={'Enter Your Email id'} lablefor={'emailid'} inputType={'email'} inputName={registerdata.email} inputValue={registerdata.email} ChangeEventCatch={SetEmail}/>       
<InputComp labelName={'Enter Password'} lablefor={'password'} inputType={'password'} inputName={registerdata.password} inputValue={registerdata.password} ChangeEventCatch={setPassword}/>
<InputComp labelName={'Confirm Password'} lablefor={'confirm_password'} inputType={'password'} inputName={registerdata.confirm_password} inputValue={registerdata.confirm_password} ChangeEventCatch={SetConfirmPassword}/>
<ButtonComp buttonType={'submit'} buttonStyle={'success'} buttonName={'Register Here'}/>
        </form>
        <div className="card-footer mt-1">
            <NavLink to={'/login'} className={'text-info mb-2'}>Alreday An User Login Here </NavLink>
        </div>
      </CardComp>
       </MainPage>
        </>
    )
}