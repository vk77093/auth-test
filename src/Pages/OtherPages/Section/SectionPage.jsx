import { useEffect, useState } from "react";
import { CardComp } from "../../../Comp/FormComp/CardComp";
import MainPage from "../../../Comp/MainPage";
import axios from "axios";
import { InputComp } from "../../../Comp/FormComp/InputComp";
import { ButtonComp } from "../../../Comp/FormComp/ButtonComp";

export default function SectionPage(){
    const[sectiondata,SetSectionData]=useState([]);
    const[message,SetMessage]=useState('');
    const[formVisible,SetFomrVisible]=useState(false);

    //getting The Section Data
   function GetSectionData(){
      axios.get('/section')
        .then((response)=>{
            if(response.status===202){
                SetSectionData(response.data.sectionData);
                //console.log(response.data.sectionData);
            }
        }).catch((error)=>{
            SetMessage(error.response.data.message);
        })
    }
 useEffect(()=>{
 GetSectionData();
    },[]);

    let GoData=[];
    if(sectiondata.length >0){
        GoData=sectiondata.map((data,id)=>{
            return(
                
             
               
                <tr key={id}>
                    <td>{data.id}</td>
                    <td>{data.class_data.class_name}</td>
                    <td>{data.section_name}</td>
                    <td><ButtonComp buttonName={'Update IT'} buttonType={'button'} buttonStyle={'info'} actiononButton={()=>updateSection(data.id)}/></td>
                    <td><ButtonComp buttonName={'Delete IT'} buttonType={'button'} buttonStyle={'danger'} actiononButton={()=>DeleteSection(data.id)}/></td>
                </tr>
              
            )
        })
    }
    // For creating the section
    const[sectionName,SetSectionName]=useState('');
    const[classData,SetClassData]=useState([]);
    const[classid,SetClassid]=useState('select the class id');
    const[buttonTitle,SetButtonTitle]=useState('Add New Section');
    const[idgot,SetIdGot]=useState('');
    //getting the classId
    useEffect(()=>{
GetClassId();
    },[]);
//Get Class Method
function GetClassId(){
    axios.get('/showclass')
    .then((response)=>{
        SetClassData(response.data);
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}

function SectionChnage(e){
    SetSectionName(e.target.value);
}
function ClassIdChange(e){
    GetClassId();
    SetClassid(e.target.value);
}
function HandleSubmit(e){
e.preventDefault();
if(buttonTitle==='Add New Section'){
const dataSet={
    class_id:classid,
    section_name:sectionName,
}
axios.post('/section',dataSet)
.then((response)=>{
    if(response.status===201){
        SetMessage(response.data.message);
        document.getElementById('sectionForm').reset();
        GetSectionData();
    }
}).catch((error)=>{
    SetMessage(error.response.data.message);
});
}else if(buttonTitle==='Update Section'){
    const dataSet={
        class_id:classid,
        section_name:sectionName,
    }
    axios.put('/section/'+idgot,dataSet)
    .then((response)=>{
        if(response.status===200){
            document.getElementById('sectionForm').reset();
             SetMessage(response.data.message);
          
            GetSectionData();
        }
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
}

//end of Create
//For Update
function updateSection(id){
    axios.get('/section/'+id)
    .then((response)=>{
        SetClassid(response.data.data.class_id);
        SetSectionName(response.data.data.section_name);
        SetIdGot(response.data.data.id);
        SetButtonTitle('Update Section');
    }).catch((error)=>{
        SetMessage(error.response.data);
    });
}
//End for Update

//Deleting 
function DeleteSection(id){
    axios.delete('/section/'+id)
    .then((response)=>{
        SetMessage(response.data.message);
        GetSectionData();
    }).catch((error)=>{
        SetMessage(error.response.data.message);
    })
}
//end of Deleting

//Button Add Enable
function EnableAddSection(){
SetFomrVisible(true);
SetButtonTitle('Add New Section');
SetSectionName('');
}
//end
    return(
        <>
        <MainPage>
            <div className="col-sm-6 col-md-6">
{/* Show The section Data  */}
<CardComp cardTitle={'All The Section Data'}>
<ButtonComp buttonType={'button'} buttonName={'Add Section'} buttonStyle={'primary'} actiononButton={EnableAddSection}/>
    <table className="table table-bordered table-hover table-stripped">
    <thead>
   
    <tr>
       <th>Id</th>
       <th>Class Name</th>
       <th>Section Name</th> 
    </tr>
    </thead>  
    <tbody>
        {GoData}
    </tbody>     
    </table>
</CardComp>
            </div>
            <div className="col-sm-6 col-md-6">
{/* Create The Section data */}
{formVisible===true ? (
    <CardComp cardTitle={'Create New Section'}>
    <form className="form-group" onSubmit={HandleSubmit} id="sectionForm">
        {message !=='' ?(<p className="alert alert-danger" role="alert">{message}</p>):('')}
        <div className="form-group row">
            <label className="col-sm-3 col-md-3 form-label">Select Class</label>
            <div className="col-sm-4 col-md-4">
                {/* <select className="form-control" name={classid} onChange={ClassIdChange} defaultValue={'DEFAULT'} value={classid}> */}
                <select className="form-control" name={classid} onChange={ClassIdChange} value={classid}>
                   {/* <option selected value disabled>{classid}</option> */}
                   <option value="DEFAULT" disabled>Choose a Class ...</option>
                    {classData.map((data)=>(
                        <option key={data.id} value={data.id}>{data.class_name}</option>
                    ))}
                </select>
            </div>
        </div>
        <InputComp labelName={'Section Name'} lablefor={'section'} inputType={'text'} inputName={sectionName} ChangeEventCatch={SectionChnage} inputValue={sectionName}/>
        <ButtonComp buttonName={buttonTitle} buttonStyle={'info'} buttonType={'submit'}/>
    </form>
</CardComp>
) : ('')}
            </div>
        </MainPage>
        </>
    )
}