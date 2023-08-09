import axios from "axios";
import { useEffect, useState } from "react"
import { CardComp } from "../../Comp/FormComp/CardComp";
import MainPage from "../../Comp/MainPage";
import { ButtonComp } from "../../Comp/FormComp/ButtonComp";
import { InputComp } from "../../Comp/FormComp/InputComp";

export default function SubjectPage(){
    const[subjectData,SetSubjectData]=useState([]);
    const[message,SetMessage]=useState('');
    const [VisibleOfCreateArea,setVisibleOfCreateArea]=useState(false);
    const[idgot,SetIdGot]=useState('');
    const[ButtonTitle,SetButtonTitle]=useState('Add New Subject');
    //GetSubject data
    function GetSubjectData(){
        axios.get('/subject')
        .then((response)=>{
            if(response.status===200){
            SetSubjectData(response.data);
            }else{
                SetSubjectData([]);
            }
        }).catch((error)=>{
            SetMessage(error.response.data.message);
        });
    }
    useEffect(()=>{
GetSubjectData();
    },[]);
let DataGot=[];
if(subjectData.length >0){
DataGot=subjectData.map((data,id)=>{
    return(
       
        <tr key={id}>
            <td>{data.id}</td>
            <td>{data.subject_name}</td>
            <td>{data.subject_code}</td>
            <td><ButtonComp buttonType={'button'} buttonStyle={'info'} buttonName={'Update IT'} actiononButton={()=>UpdateButtonClick(data.id)}/></td>
            <td><ButtonComp buttonType={'button'} buttonStyle={'danger'} buttonName={'Delete IT'} actiononButton={()=>DeleteSubject(data.id)}/></td>
        </tr>
        
    )
});
}else{
    <tr>
        <td colSpan={4}>No Data Is Found</td>
    </tr>
}

    //End of Get Subject data

    // Creating Subject Data
    function SubjectAreaShow(){
       setVisibleOfCreateArea(true);
       SetButtonTitle('Add New Subject');      
    }
    const[subjects,SetSubjects]=useState({
        subjectName:'',subjectCode:''
    });
    function ChangeSubjectName(e){
        SetSubjects({
            ...subjects,
            subjectName:e.target.value,
        })
    }
    function ChangeSubjectCode(e){
        SetSubjects({
            ...subjects,
            subjectCode:e.target.value,
        })
    }
    function HandleForm(e){
        e.preventDefault();
if(ButtonTitle==='Add New Subject'){
    CreateSubject();
}else if(ButtonTitle==='Update Subject'){
    UpdateSubject();
}
    }
    function CreateSubject(){
        let dataSet={
            subject_name:subjects.subjectName,
            subject_code:subjects.subjectCode,
        }
        axios.post('/subject',dataSet)
        .then((response)=>{
            if(response.status===201){
                SetMessage(response.data.message);
                GetSubjectData();
                document.getElementById('subjectForm').reset();
            }
        }).catch((error)=>{
           // console.log(error.response.data.message);
            SetMessage(error.response.data.message);
        })
    }
    //end of Creating
//Update Subject
function UpdateSubject(){
    let dataSet={
        subject_name:subjects.subjectName,
        subject_code:subjects.subjectCode,
    }
axios.put('/subject/'+idgot,dataSet)
.then((response)=>{
SetMessage(response.data.message);
GetSubjectData();
}).catch((error)=>{
    SetMessage(error.response.data.message);
})
}
function UpdateButtonClick(id){
  axios.get('/subject/'+id)
  .then((response)=>{
    SetSubjects({
        ...subjects,
        subjectCode:response.data.subject_code,
        subjectName:response.data.subject_name,
    });
    SetIdGot(response.data.id);
 
    SetButtonTitle('Update Subject');
  }).catch((error)=>{
    SetMessage(error.response.data.message);
  })  
}
//end of Subject Updated
//delete Subject
function DeleteSubject(id){
    axios.delete('/subject/'+id)
    .then((response)=>{
        SetMessage(response.data.message);
        GetSubjectData();
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
//end of delete subject
    return(
       <MainPage>
        <div className="col-sm-6 col-md-6">
{/* Show Subject Data */}
<CardComp cardTitle={'Create Subject Data'}>
    <ButtonComp buttonType={'button'} buttonName={'Add New'} buttonStyle={'secondary'} actiononButton={SubjectAreaShow}/>
<table className="table table-bordered table-hover">
    <thead>
        <tr>
            <th>Id</th>
            <th>Subject Name</th>
            <th>Subject Code</th>
        </tr>
    </thead>
    <tbody>
        {DataGot}
    </tbody>
</table>
</CardComp>
        </div>
        <div className="col-sm-6 col-md-6">
{/* Create Subject data */}
{VisibleOfCreateArea===true ? (
    <CardComp cardTitle={'Create New Subject'}>
<form className="form-group" onSubmit={HandleForm} id="subjectForm">
{message !=='' ?(<p className="alert alert-danger" role="alert">{message}</p>):('')}
<InputComp labelName={'Subject Name'} lablefor={'subjectName'} inputType={'text'}
 inputName={subjects.subjectName} inputValue={subjects.subjectName} ChangeEventCatch={ChangeSubjectName}/>
 <InputComp labelName={'Subject Code'} lablefor={'subjectCode'} inputType={'text'}
 inputName={subjects.subjectCode} inputValue={subjects.subjectCode} ChangeEventCatch={ChangeSubjectCode}/>
 <ButtonComp buttonType={'submit'} buttonStyle={'success'} buttonName={ButtonTitle}/>
</form>
    </CardComp>
) : ('')}
        </div>
        </MainPage>
    )
}