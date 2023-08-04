import { useState } from "react";
import { CardComp } from "../Comp/FormComp/CardComp";
import MainPage from "../Comp/MainPage";
import axios from "axios";
import { InputComp } from "../Comp/FormComp/InputComp";
import { ButtonComp } from "../Comp/FormComp/ButtonComp";

export default function ForgotPage(){
    const[email,SetEmail]=useState('');
    const[message,SetMessage]=useState('');

   function ChangeSetEmail(e){
SetEmail(e.target.value);
    }
    function FormSubmit(e){
        e.preventDefault();
        if(email===''){
            SetMessage('Field Can not be Empty');
        }
        const forgotData={
            email:email,
        }
        axios.post('/forgotpassword',forgotData)
        .then((response)=>{
            if(response.status===200){
                document.getElementById('forgotForm').reset();
                SetMessage(response.data.message);
            }
        }).catch((error)=>{
            SetMessage(error.response.data.message);
        })
    }
    // let alertdata='';
    // if(message !=='' || message !==null){
        
    //       alertdata=<p className="alert alert-danger" role="alert">{message}</p>
        
    // }else{
    //   alertdata=<p></p>
    // }
    return(
        <>
       <MainPage>
      <center>
      <div className="col-sm-6 col-md-6">
        <CardComp cardTitle={'Forgot Your password'}>
            <form className="form-group" method="post" id="forgotForm" onSubmit={FormSubmit}>
            {message !=='' ? (
 <p className="alert alert-danger">{message}</p>
               ):('')}
<InputComp labelName={'Enter Your Email id'} lablefor={'emailid'} inputType={'email'} inputName={email} inputValue={email} ChangeEventCatch={ChangeSetEmail}/>
<ButtonComp buttonType={'submit'} buttonStyle={'success'} buttonName={'Recived Email'}/>
            </form>
        </CardComp>
      </div>
      </center>
       </MainPage>
        </>
    )
}