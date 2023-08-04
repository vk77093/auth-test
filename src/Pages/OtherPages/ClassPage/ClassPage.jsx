import { useEffect, useState } from "react"
import { CardComp } from "../../../Comp/FormComp/CardComp"
import MainPage from "../../../Comp/MainPage"
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { InputComp } from "../../../Comp/FormComp/InputComp";
import { ButtonComp } from "../../../Comp/FormComp/ButtonComp";
import { useNavigate } from "react-router-dom";

export default function ClassPage(){
return(
    <>
    <ShowClass/>
    </>
)
}

//Showing Classes
export function ShowClass(){
    const[classData,setClassData]=useState([]);
    const[message,SetMessage]=useState('');
   const[buttonTitle,SetButtonTitle]=useState('Add new Class');
function getClass(){
    axios.get('/showclass')
    .then((response)=>{
        if(response.status===200){
            setClassData(response.data);
        }
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
    useEffect(()=>{
getClass();
    },[]);

    //Deleting Class
function deleteClass(id){
    axios.get('/showclass/delete/'+id)
    .then((res)=>{
        SetMessage2(res.data);
        urlLink('/classhow');
        getClass();
    }).catch((error)=>{
        SetMessage(error.response.data);
    })
}

//Updating The Button
const[idgot,SetIdGot]=useState('');
function UpdateClass(id){
    axios.get('/showclass/edit/'+id).
    then((response)=>{
        SetClassName(response.data.class_name);
        SetButtonTitle('Update Class');
       SetIdGot(response.data.id);
    }).catch((error)=>{
        SetMessage2(error.response.data);
    })
}

let GotData=[];
    if(classData.length>0){
     GotData=classData.map((data,id)=>{
        return(
            <tr key={id}>
<td>{data.id}</td>
<td>{data.class_name}</td>
<td><ButtonComp buttonName={'Delete IT'} buttonStyle={'danger'} buttonType={'button'} actiononButton={()=>deleteClass(data.id)}/></td>
<td><ButtonComp buttonName={'Update IT'} buttonStyle={'danger'} buttonType={'button'} actiononButton={()=>UpdateClass(data.id)}/></td>           
</tr>
        )
       })
    }
    // let token=localStorage.getItem('logintoken');
    // if(token===null){
    //    return <Navigate to={'/login'}/>
    // }

//For Value of Creating Classes
const[classname,SetClassName]=useState('');
const[message2,SetMessage2]=useState('');

const urlLink=useNavigate();
function ChangeSetClass(e){
    SetClassName(e.target.value);
}
function HandleSubmit(e){
e.preventDefault();
if(buttonTitle ==='Add new Class'){
    const dataSet={
        class_name:classname,
    }
    axios.post('/showclass/create',dataSet)
    .then((res)=>{
        if(res.status===200){
            SetMessage2(res.data);
            urlLink('/classhow');
            getClass();
            //console.log(res.data.message);
        
        }
    }).catch((error)=>{
        console.log(error);
    });
}else{
    const dataSetUp={
class_name:classname,

    };
    axios.post('showclass/update/'+idgot,dataSetUp)
    .then((response)=>{
        if(response.status===200){
            SetMessage2(response.data);
            getClass();
        }
    }).catch((error)=>{
SetMessage2(error.response.data);
    });
}
}

return (
    <>
    <MainPage>
        <div className="col-sm-6 col-md-6">
            <CardComp cardTitle={'All The Classes Data'}>
                
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Class Name</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {GotData}
                    </tbody>
                </table>
            </CardComp>
        </div>
        <div className="col-sm-6 col-md-6">
            <CardComp cardTitle={'Create New Class'}>
<form className="form-group" onSubmit={HandleSubmit}>
    {message2 !=='' ? (<p className="alert alert-danger">{message2}</p>): ('')}
    <InputComp labelName={'Enter Class Name'} lablefor={'classname'} 
    inputType={'text'} inputName={classname} ChangeEventCatch={ChangeSetClass} inputValue={classname}/>
    <ButtonComp buttonName={buttonTitle} buttonStyle={'info'} buttonType={'submit'}/>
</form>
            </CardComp>
        </div>
    </MainPage>
    </>
)

}

//Creating Class
export function CreateClass(){

}
