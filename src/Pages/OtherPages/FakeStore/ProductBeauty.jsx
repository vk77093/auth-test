import { useEffect, useState } from "react";
import { FakeStoreApi } from "./AxiosUrl";
import MainPage from "../../../Comp/MainPage";

export default function ProductBeauty(){
    const[products,SetProductsData]=useState([]);
    const[message,SetMessage]=useState('');
useEffect(()=>{
    GettingProducts();
},[]);
    function GettingProducts(){
        FakeStoreApi.get('products')
        .then((response)=>{
            SetProductsData(response.data);
        }).catch((error)=>{
            SetMessage(error.response.data);
        });
    }
    return(
        <MainPage>
            <div className="container">
            <div className="row">
        
            {products.map((data,id)=>(
               
<div className="col-sm-4 col-md-4" key={id}>
<div className="card p-3">
    <div className="d-flex justify-content-between align-items-center ">
      <div className="mt-2">
        <h4 className="text-uppercase">{data.category}</h4>
        <div className="mt-5">
          <h5 className="text-uppercase mb-0">{data.title}</h5>
          <h1 className="main-heading mt-0">{data.price}</h1>
          <div className="d-flex flex-row user-ratings">
            <div className="ratings">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
            </div>
            <h6 className="text-muted ml-1">{data.rating.rate}</h6>
          </div>
        </div>
      </div>
      <div className="image">
        <img src={data.image} width={200} />
      </div>
    </div>
    <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
      <span>Available colors</span>
      <div className="colors">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
    <p>{data.description} </p>
    <button className="btn btn-danger">Add to cart</button>
  </div>
</div>
               
        
                
            ))}
  

</div>
</div>
        </MainPage>
    )
}