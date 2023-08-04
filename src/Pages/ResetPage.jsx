import { useState } from "react";
import MainPage from "../Comp/MainPage";
import { CardComp } from "../Comp/FormComp/CardComp";
import { InputComp } from "../Comp/FormComp/InputComp";
import { ButtonComp } from "../Comp/FormComp/ButtonComp";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ResetPage(){
    const[resetData,SetResetData]=useState({
        email:'',
        token:'',
        password:'',
        confirm_password:'',
    });
    const[message,SetMessage]=useState('');
//getting Query Parameters

const { id } = useParams()
    function SetEmail(e){
        SetResetData({
            ...resetData,
            email:e.target.value,
        });
    }
    function SetToken(e){
        SetResetData({
            ...resetData,
           
            token:e.target.value,
            
        });
    }
    function SetPassword(e){
        SetResetData({
            ...resetData,
            password:e.target.value,
        });
    }
    function SetConfirmPassword(e){
        SetResetData({
            ...resetData,
            confirm_password:e.target.value,
        });
    }
    function HanleForm(e){
        e.preventDefault();
        const dataSettting={
            token:resetData.token,
            email:resetData.email,
            password:resetData.password,
            password_confirmation:resetData.confirm_password,

        };
        axios.post('/resetpassword',dataSettting)
        .then((response)=>{
            if(response.status===200){
                SetMessage(response.data.message);
                document.getElementById('resetform').reset();
            }else{
                SetMessage(response.data.message);
            }
        }).catch((error)=>{
            SetMessage(error.response.data.message);
        });
    }
    return(
        <>
        <MainPage>
            <center>
            <div className="col-sm-6 col-md-6">
<CardComp cardTitle={'Please Enter Your Details for Reseting the Password'}>
    {/* <p>id Got is {idnumbergot.get('id')}</p> */}
    <p>Token Got Is {id}</p>
    <form className="form-group" method="post" id="resetform" onSubmit={HanleForm}>
    {message !=='' ? (
 <p className="alert alert-danger">{message}</p>
               ):('')}
        <InputComp labelName={'Token Got'} lablefor={'token'} inputType={'number'} inputName={resetData.token} ChangeEventCatch={SetToken}/>
        <InputComp labelName={'Email id'} lablefor={'emailid'} inputType={'email'} inputName={resetData.email} ChangeEventCatch={SetEmail}/>
        <InputComp labelName={'New Password'} lablefor={'password'} inputType={'password'} inputName={resetData.password} ChangeEventCatch={SetPassword}/>
        <InputComp labelName={'Confirm New Password'} lablefor={'password_confirmn'} inputType={'password'} inputName={resetData.confirm_password} ChangeEventCatch={SetConfirmPassword}/>
        <ButtonComp buttonType={'submit'} buttonName={'Reset Password'} buttonStyle={'success'}/>
    </form>
</CardComp>
            </div>
            </center>
        </MainPage>
        </>
    )
}