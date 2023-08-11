import { useEffect, useState } from "react";
import { FakeStoreApi } from "./AxiosUrl";
import MainPage from "../../../Comp/MainPage";
import { CardComp } from "../../../Comp/FormComp/CardComp";
import { Link } from "react-router-dom";
import { InputComp } from "../../../Comp/FormComp/InputComp";
import { SelectComp } from "../../../Comp/FormComp/SelectComp";
import { ButtonComp } from "../../../Comp/FormComp/ButtonComp";

export default function Product(){
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
            <div className="col-6 col-md-6">
                <CardComp cardTitle={'Fake Store Api Products Data'}>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover caption-top">
                            <caption><Link className="btn btn-secondary" to={'/productbeauty'}>Product Beauty</Link>
                            <Link className="btn btn-info" to={'/newproduct'}>Add New</Link>
                            </caption>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length >0 ? (
                                    products.map((data,id)=>(
<tr key={id}>
    <td>{data.id}</td>
    <td>{data.title}</td>
    <td>{data.price}</td>
    <td>{data.category}</td>
    <td><img src={data.image} className="img-thumbnail" width={40} height={20}/></td>
    <td>{data.rating.rate}</td>
</tr>
                                    ))
                                ):(<tr>
                                    <td><p className="alert alert-danger">{message}</p></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </CardComp>
            </div>
        </MainPage>
    )
}
export function AddProductPage(){
    const[pro,SetPro]=useState({});
    const[message,SetMessage]=useState('');
    const[categories,SetCategories]=useState([]);

    useEffect(()=>{
GetCategories();
    },[]);
    //Getting Categories
    function GetCategories(){
        FakeStoreApi.get('products/categories')
        .then((response)=>{
           // console.log(response.data);
            SetCategories(response.data);
        }).catch((error)=>{
            SetMessage(error.response.data);
        })
    }

    function ChangeProEvent(e){
        const name=e.target.name;
        const value=e.target.value;
        SetPro(values=>({...values,[name]:value}))
    }
function SaveProduct(){
    let dataSets={
        title: pro.title,
        price: pro.price,
        description: pro.description,
        image: pro.image,
        category: pro.category
    }
    FakeStoreApi.post('products',dataSets)
    .then((response)=>{
        console.log(response.data);
    }).catch((error)=>{
        SetMessage(error.response.data);
    })
}
function HandleSubmit(e){
    e.preventDefault();
    SaveProduct();
}
    return(
        <MainPage>
            <div className="col-sm-6 col-md-6">
            <CardComp cardTitle={'Add new Products'}>
                <form className="form-group" onSubmit={HandleSubmit}>
                    {message !=='' ? (<p>{message}</p>):('')}
                    <InputComp labelName={'Product Title'} lablefor={'title'} inputType={'text'}
                    inputName={pro.title} inputValue={pro.title} ChangeEventCatch={ChangeProEvent}/>
                    <InputComp labelName={'Product Price'} lablefor={'price'} inputType={'number'}
                    inputName={pro.price} inputValue={pro.price} ChangeEventCatch={ChangeProEvent}/>
                    <InputComp labelName={'Product Description'} lablefor={'description'} inputType={'text'}
                    inputName={pro.description} inputValue={pro.description} ChangeEventCatch={ChangeProEvent}/>
                    <InputComp labelName={'Product Image Url'} lablefor={'imageUrl'} inputType={'text'}
                    inputName={pro.image} inputValue={pro.image} ChangeEventCatch={ChangeProEvent}/>
                    <SelectComp labelName={'Select Category'} labelfor={'pro_cate'} SelectChangeAction={ChangeProEvent} 
                    selectName={pro.category} selectValue={pro.category}>
                        <option defaultValue={'null'} disabled>---Select Category---</option>
                        {categories.map((data,id)=>(
                            <option key={id} value={data}>{data}</option>
                        ))}
                    </SelectComp>
                    <ButtonComp buttonType={'submit'} buttonStyle={'info'} buttonName={'Save Products'}/>
                </form>
             </CardComp>
            </div>
        </MainPage>
    )
}