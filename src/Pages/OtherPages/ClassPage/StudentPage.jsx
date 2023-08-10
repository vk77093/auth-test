import { useEffect, useState } from "react";
import MainPage from "../../../Comp/MainPage";
import { CardComp } from "../../../Comp/FormComp/CardComp";
import axios from "axios";
import { InputComp } from "../../../Comp/FormComp/InputComp";
import { SelectComp } from "../../../Comp/FormComp/SelectComp";
import { ButtonComp } from "../../../Comp/FormComp/ButtonComp";

export default function StudentPage(){
const[inputs,SetInputs]=useState({}); 
const[studentData,SetStudentData]=useState([]);
const[message,SetMessage]=useState('');
const[classData,SetClassData]=useState([]);
const[sectionData,SetSectionData]=useState([]);
const[buttonTitle,SetButtonTitle]=useState('Save Data');
const[idGot,SetIdGot]=useState('');
function HandleChange(e){
    const name=e.target.name;
    const value=e.target.value;
SetInputs(values => ({...values, [name]: value}))
}
//Getting The StudentData
useEffect(()=>{
GetData();
GetClassData();
GetSectionData();
},[])
 function GetData(){
    axios.get('/student')
    .then((response)=>{
if(response.status===200){
SetStudentData(response.data);
}else{
    SetStudentData([]);
}
    }).catch((error)=>{
SetMessage(error.response.data.message);
    })
 }
//setting the view Part
let GotData=[];
if(studentData.length >0){
GotData=studentData.map((data,id)=>{
    return(
        <tr key={id}>
            <td>{data.id}</td>
            <td>{data.class_data.class_name}</td>
            <td>{data.stu_name}</td>
            <td>{data.section_data.section_name}</td>
            <td>{data.email}</td>
            <td>{data.number}</td>
            <td><ButtonComp buttonType={'button'} buttonStyle={'info'} buttonName={'Update IT'} actiononButton={()=>UpdateButtonClick(data.id)}/></td>
            <td><ButtonComp buttonType={'button'} buttonStyle={'danger'} buttonName={'Delete IT'} actiononButton={()=>DeleteSubject(data.id)}/></td>
        </tr>
    )
})
}else{
    <tr>
        <td colSpan={4}>Currently No Data Is found</td>
    </tr>
}
//end of View Part
//Creating Method
//fetching the ClassData
function GetClassData(){
    axios.get('/showclass')
    .then((response)=>{
        SetClassData(response.data);
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
//Fetching Section
function GetSectionData(){
axios.get('/section')
.then((response)=>{
SetSectionData(response.data.sectionData)
}).catch((error)=>{
    SetMessage(error.response.data.message);
})
}
//Saving Student
function SaveStudent(){
    let dataSet={
        class_id:inputs.class_id,
        stu_name:inputs.stu_name,
        stu_pass:inputs.stu_pass,
        section_id:inputs.section_id,
        address:inputs.address,
        gender:inputs.gender,
        email:inputs.email,
        number:inputs.number,
        photo:'student/first.jpg',
    }
    axios.post('/student',dataSet)
    .then((response)=>{
        if(response.status===201){
            SetMessage(response.data.message);
            GetData();
        }else{
            SetMessage(response.data.message);
        }
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
//Update Student
function UpdateStudent(){
    let dataSet={
        class_id:inputs.class_id,
        stu_name:inputs.stu_name,
        stu_pass:inputs.stu_pass,
        section_id:inputs.section_id,
        address:inputs.address,
        gender:inputs.gender,
        email:inputs.email,
        number:inputs.number,
        photo:'student/first.jpg',
    }
axios.put('/student/'+idGot,dataSet)
.then((response)=>{
    SetMessage(response.data.message);
    GetData();
}).catch((error)=>{
    SetMessage(error.response.data.message);
})
}
function UpdateButtonClick(id){
    axios.get('/student/'+id)
    .then((response)=>{
      
    const value=response.data;
    SetInputs({
        ...inputs,
        class_id:response.data.class_id, 
        stu_name:response.data.stu_name,
        stu_pass:response.data.stu_pass, 
        section_id:response.data.section_id,
        address:response.data.address,
        gender:response.data.gender,
        email:response.data.email,
        number:response.data.number,
          
    });
    SetIdGot(response.data.id);
    SetButtonTitle('Update Data');
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
   
}


//end of Update Student
//Handling Form

function HandleForm(e){
    e.preventDefault();
    if(buttonTitle==='Save Data'){
        SaveStudent();
    }else{
        UpdateStudent();
    }
  
    
}
//Setting Message
// let messageGot='';
// if(message !==''){
//     return(
//         messageGot=<p className="alert alert-danger" role="alert">{message}</p>
//     )
// }
//Deleting Subject
function DeleteSubject(id){
    axios.delete('/student/'+id)
    .then((response)=>{
        SetMessage(response.data.message);
        GetData();
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
return(
    <>
    <MainPage>
        <div className="col-sm-6 col-md-6">
<CardComp cardTitle={'List Of All Data'}>
<table className="table table-bordered table-hover table-stripped">
    <thead>
        <tr>
            <td>Id</td>
            <td>Class</td>
            <td>Student Name</td>
            <td>Section</td>
            <td>Email</td>
            <td>Number</td>
        </tr>
    </thead>
    <tbody>
{GotData}
    </tbody>
</table>
</CardComp>
        </div>
        <div className="col-sm-6 col-md-6">
<CardComp cardTitle={'Create Data Here'}>
<form onSubmit={HandleForm} id="stuform" className="form-group">
    {message !=='' ? (<p className="alert alert-danger" role="alert">{message}</p>): ('')}
<SelectComp labelfor={'class_id'} labelName={'Select The Class'} selectName={'class_id'} selectValue={inputs.class_id} SelectChangeAction={HandleChange}>
<option value={'DEFAULT'} disabled>---Choose Class---</option>
{classData.map((data)=>(
    <option key={data.id} value={data.id}>{data.class_name}</option>
))}
</SelectComp>
<InputComp labelName={'Full Name'} lablefor={'stu_name'} inputName={'stu_name'} 
inputType={'text'} inputValue={inputs.stu_name} ChangeEventCatch={HandleChange}/>
<InputComp labelName={'Your Password'} lablefor={'stu_pass'} inputName={'stu_pass'}
inputType={'password'} inputValue={inputs.stu_pass} ChangeEventCatch={HandleChange}/>
<SelectComp labelName={'Select Section'} labelfor={'section_id'} selectName={'section_id'} selectValue={inputs.section_id} SelectChangeAction={HandleChange}>
    <option value={'DEFAULT'} disabled>---Choose Section---</option>
    {sectionData.map((data)=>(
        <option key={data.id} value={data.id}>{data.section_name}</option>
    ))}
</SelectComp>
<InputComp labelName={'Your Address'} lablefor={'address'} inputName={'address'}
inputType={'text'} inputValue={inputs.address} ChangeEventCatch={HandleChange}/>
<SelectComp labelName={'Select gender'} labelfor={'gender'} selectName={'gender'}
selectValue={inputs.gender} SelectChangeAction={HandleChange}>
    <option value={'Default'} disabled>---Select Gender---</option>
    <option value={'Male'}>Male</option>
    <option value={'FeMale'}>FeMale</option>
</SelectComp>
<InputComp labelName={'Your Email'} lablefor={'email'} inputName={'email'}
inputType={'email'} inputValue={inputs.email} ChangeEventCatch={HandleChange}/>
<InputComp labelName={'Your Number'} lablefor={'number'} inputName={'number'}
inputType={'number'} inputValue={inputs.number} ChangeEventCatch={HandleChange}/>
<ButtonComp buttonName={buttonTitle} buttonStyle={'info'} buttonType={'submit'}/>
</form>
</CardComp>

        </div>
    </MainPage>
    </>
)
}