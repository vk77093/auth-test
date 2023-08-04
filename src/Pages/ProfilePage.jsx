 import MainPage from "../Comp/MainPage";
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
 import { CardComp } from "../Comp/FormComp/CardComp";
 import { Navigate } from "react-router-dom";

// export default function ProfilePage(props){
//     //  const[userData,SetUserData]=useState([]);
// // const[userName,setUserName]=useState('');
// // const[email,SetEmail]=useState('');

// //     useEffect(()=>{
// // axios.get('/user')
// // .then((response)=>{
// //     SetUserData(response.data.userData);   
// // }).catch((error)=>{
// //     console.log(error);
// // })
// //     },[]);
// // console.log(props.props.usernam);
// // console.log(props.props.userData);

//  let data=props.props.userData;
// // if(data !==undefined){
// //     console.log(data.name);
// // }


// // if(props.props !==null){
// //     setUserName(props.props.userData.name);
// //     SetEmail(props.props.userData.email);

// // }
//     let token=localStorage.getItem('logintoken');
 
//     if(token===null){
//       return <Navigate to={'/login'}/>
//     }
//     return(
//         <>
//         <MainPage>
//       <CardComp cardTitle={'Your Users Data'}>

//       {/* <h2>Your User Name is  :{userData.name}</h2>
// <h2>Your Email Is : {userData.email}</h2> */}

// {data !==undefined ? (
//     <>
//     <h2>Your User Name is  : {data.name}</h2>
//     <h2>Your Email Is : {data.email}</h2>
//     </>
// ): ('')}
  

//       </CardComp>
//         </MainPage>
//         </>
//     )
// }

export default function ProfilePage({user}){
    let data=user.userData;

    let token=localStorage.getItem('logintoken');
 
    if(token===null){
      return <Navigate to={'/login'}/>
    }
return(
<>
            <MainPage>
           <CardComp cardTitle={'Your Users Data'}>

          {/* <h2>Your User Name is  :{userData.name}</h2>
     <h2>Your Email Is : {userData.email}</h2> */}

     {data !==undefined ? (
         <>
       <h2>Your User Name is  : {data.name}</h2>
        <h2>Your Email Is : {data.email}</h2>
         </>
    ): ('')}
    

          </CardComp>
           </MainPage>
            </>
       )

}