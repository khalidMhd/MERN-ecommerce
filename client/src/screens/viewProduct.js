import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProduct, deleteProduct, updateProduct } from '../actions/product'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function viewProduct(props) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [detail, setdetail] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setCountInStock] = useState('');
    const [id, setId] = useState('');

    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList;

    const productDelete = useSelector(state => state.productDelete)
    const { product, success } = productDelete;

    const adminSignin = useSelector(state => state.adminSignin)
    const { adminInfo } = adminSignin

    const productUpdate = useSelector(state=>state.productUpdate)
    const {success:updateSuccess} = productUpdate

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        { adminInfo === null ? props.history.push('/adminSignin') : props.history.push('/viewProduct') }

        dispatch(listProduct())
        if (updateSuccess) {
            props.history.push('/viewProduct')
            toast("Update Successfully")
        }
        if (success) {
            toast("Delete Successfully")
        }
    }, [success, adminInfo,updateSuccess])

    const updateHandler=(item)=>{
        setId(item._id)
        setName(item.name)
        setPrice(item.price)
        setCountInStock(item.countInStock)
        setdetail(item.detail)
    }

    const submitHandler = (e) => {
        e.preventDefault();
            dispatch(updateProduct(id, name, price, countInStock, detail ));
      }

    return (
        <div className="container">

            <Link to='/add-product'>
                <button className='btn btn-info'>Add Product</button>
            </Link>
            {
                products.length == 0 ? <p style={{ textAlign: 'center' }}>Product Not Uplaoded!</p>
                    :
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Count In Stock</th>
                                <th>Details</th>
                                <th>Created_At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(item =>
                                    <tr>
                                        <td><img src={item.photo} style={{ width: '100px' }} /></td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.countInStock}</td>
                                        <td>{item.detail}</td>
                                        <td>{new Date(item.created_At).toLocaleString()}</td>
                                        <td> <button onClick={() => { if (window.confirm('Are you sure to delete this item?')) deleteHandler(item._id) }}> Delete </button></td>

                                        <td>
                                            <button onClick={()=>updateHandler(item)} type="button" data-toggle="modal" data-target={"#exampleModal" + item._id}>
                                                edit
                                        </button>
                                        </td>

                                        {/* update Model */}
                                        <div className="modal fade" id={"exampleModal" + item._id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">{item.name}</h5>
                                                    </div>

                                                    <div className="modal-body">
                                                        <form onSubmit={submitHandler} className='card' style={{ width: '400px', margin: '20px auto' }}>
   
                                                            <div className="form-group">
                                                                <h6 style={{ textAlign: 'center' }}>Update Product</h6>
                                                                <label for="name">Name: <b>{item.name}</b> </label>
                                                                <input type="text"  className="form-control" onChange={(e) => setName(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <label for="price">Price: <b>{item.price}</b></label>
                                                                <input type="text" className="form-control" id="price" onChange={(e) => setPrice(e.target.value)} />
                                                            </div>
                                            
                                                            <div className="form-group">
                                                                <label for="countInStock">Count In Stock: <b>{item.countInStock}</b></label>
                                                                <input type="text" className="form- control" id="countInStock" onChange={(e) => setCountInStock(e.target.value)} />
                                                            </div>
                                                            <div className="form-group">
                                                                <label for="detail">Detail: <b>{item.detail}</b></label>
                                                                <input type="text" className="form-control" id="detail" onChange={(e) => setdetail(e.target.value)} />
                                                            </div>

                                                            <button type="submit" className="btn btn-primary">Submit </button>
                                                        </form>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <ToastContainer />

                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
            }
        </div>

    )
}

export default viewProduct