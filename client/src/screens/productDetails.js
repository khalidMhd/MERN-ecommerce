import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct } from '../actions/product';
function ProductScreen(props) {
    const [qty, setQty] = useState(1)

    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
        return () => {
            //
        }
    }, [])

    const handleAddToCart =()=>{
        props.history.push('/cart/' + props.match.params.id + '?qty='+ qty)
    }

    return <div className="container">
        <div className='back-to-result'>
            <Link to="/">Back to result</Link>
        </div>
        {loading ? <div>loading...</div> :
            error ? <div> {error} </div> :
                (
                    < div style={{marginTop:'20px'}}>
                        <div className="card" style={{ width: "300px", float:"left" }}>
                            <img className="card-img-top" src={product.photo} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <h6 className="card-title">PKR: {product.price}</h6>
                                <p className="card-text">{product.detail}</p>
                            </div>
                        </div>
                        <div className="card" style={{width: "400px", float:"right",backgroundColor:'#F5F5DC'}}>
                            <div className="card-body">
                                <h5 className="card-title">Price:  {product.price}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Status: {product.countInStock > 0? "In Stock":"Out Of Stock"}</h6>
                                <b>Qty: </b>  
                                <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                     {[...Array(product.countInStock).keys()].map(x=>
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    )}
                                </select>
                                <div style={{marginTop:"20px"}}>
                                {product.countInStock > 0 &&
                                <button className='btn btn-info'onClick={handleAddToCart}>Add to Cart</button>}
                                </div>
                            </div>
                        </div>

                    </div>
                )
        }

    </div>

}

export default ProductScreen