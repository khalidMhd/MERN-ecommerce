import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct } from '../actions/product';
import { Link } from 'react-router-dom';

const addProductScreen= (props) =>{
    const [name, setName] = useState('');
    const [detail, setdetail] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const productCreate = useSelector(state=>state.productCreate)
    const { loading, success, error, product } = productCreate;

    const adminSignin = useSelector(state=>state.adminSignin)
    const {adminInfo}= adminSignin
    
    useEffect(()=>{
      { adminInfo === null ? props.history.push('/adminSignin'): props.history.push('/add-product') }
      if(success){
        toast('Product Added')
      } 
    },[success,adminInfo])

    const uploadPic = ()=>{
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "insta-demo")
      data.append("cloud_name", "insta-demo")
      fetch("https://api.cloudinary.com/v1_1/insta-demo/image/upload", {
          method: "post",
          body: data
      })
          .then(res => res.json())
          .then(data => {
              if (data.error) {
                  toast(data.error);
              } else {
                  setUrl(data.url)
              }
          })
          .catch(err => {
              console.log(err)
          })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createProduct( name, detail, price, countInStock,url ));
      }

    return <>
    { loading? <p>loading</p>:
      
    <form onSubmit={submitHandler} className='card' style={{width:'500px',margin:'20px auto'}}>
    <Link to='/viewProduct'><button className='btn btn-primary'>View Product</button></Link>

    <div className="form-group">
        <h6 style={{textAlign:'center'}}>Add Product</h6>
      <label for="name">Name:</label>
      <input type="text" className="form-control" id="name" onChange={(e)=>setName(e.target.value)} required />
    </div>
    <div className="form-group">
      <label for="price">Price:</label>
      <input type="text" className="form-control" id="price" onChange={(e)=>setPrice(e.target.value)} required />
    </div>
    <div className="form-group">
      <label for="countInStock">Count In Stock:</label>
      <input type="text" className="form- control" id="countInStock" onChange={(e)=>setCountInStock(e.target.value)} required />
    </div>
    <div className="form-group">
      <label for="detail">Detail:</label>
      <input type="text" className="form-control" id="detail" onChange={(e)=>setdetail(e.target.value)} required />
    </div>
    <div className="form-group">

      {
        url != '' && <p>Uploaded</p>
      }

      {image == ''? <input type="file" className="form-control" id="image" onChange={(e)=>setImage(e.target.files[0])} required />
      :
        <a className="btn btn-info" onClick={()=>uploadPic()} >Upload Image</a> 
      }

    </div>
    <button type="submit" className="btn btn-primary">Submit </button>
    <ToastContainer />
  </form>
}
  </>
}

export default addProductScreen