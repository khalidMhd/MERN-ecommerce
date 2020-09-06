import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {listProduct} from '../actions/product'
import { Link } from 'react-router-dom'

function productScreen(){
    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList)
    const {products, loading, error} = productList

    useEffect(()=>{
        dispatch(listProduct())
    },[])

    return (<>
        {products.length == 0? <p style={{textAlign:'center'}}>Product Not Found</p>:
        <div className="container">
            {
                products.map(item => {
                    return (
                        <div className="card" style={{ width: "300px", float: "left" }}>
                                <img className="card-img-top" src={item.photo} alt="Card image cap" style={{width:"300px", height:'400px'}} />
                                <div className="card-body">
                                <Link to={"/product-details/"+item._id}>
                                    <h5 className="card-title"> {item.name} </h5>
                                </Link>
                                <p style={{float:"left"}} className="card-text">PKR: {item.price} </p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    }
        </>

    )
}

export default productScreen