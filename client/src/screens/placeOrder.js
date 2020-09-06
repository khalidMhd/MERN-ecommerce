import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/order';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, } = cart;

  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo}= userSignin

  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  
  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [postalcode, setPostalcode] = useState(shipping.postalcode);
  const [country, setCountry] = useState(shipping.country);
  const [user, setUser] = useState(userInfo.user._id);
  const [product, setProduct] = useState(cartItems.map(item=>item.product));
  const [qty, setQty] = useState(cartItems.map(item=>item.qty));

  if (!shipping.address) {
    props.history.push("/shipping");
  } 

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = 0 * itemsPrice;
  const totalPrice = itemsPrice  + taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder(address,city,postalcode,country,user,product,qty));
  }
  useEffect(() => {
    if (success) {
      // props.history.push("/order/" + order._id);
       toast("Order Placed Successfully!");
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>

    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalcode}, {cart.shipping.country},
          </div>
        </div>
        
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Qty: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Place Order
              <ToastContainer />
            </button>
          </li>
          <li>
            <h3>Order Summary</h3>
          </li>
          <li>
            <div>Items</div>
            <div>${itemsPrice}</div>
          </li>
          
          <li>
            <div>Tax</div>
            <div>${taxPrice}</div>
          </li>
          <li>
            <div>Order Total</div>
            <div>${totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;