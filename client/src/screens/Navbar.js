import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';


const Navbar = () => {
  const userSignin = useSelector(state=>state.userSignin)
  const {userInfo}= userSignin
  
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          {
            userInfo? <Link className="nav-link" to="/profile"> {userInfo.user.name} <span className="sr-only">(current)</span></Link>
            :
            <Link className="nav-link" to="/signin"> Signin <span className="sr-only">(current)</span></Link>

          }
          <li className="nav-item active">
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart  <span className="badge badge-secondary"> {cartItems.length} </span></Link>
          </li>
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
        </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="#">Action</Link>
              <Link className="dropdown-item" to="#">Another action</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="#">Something else here</Link>
            </div>
          </li>
         
        </ul>
      </div>
    </nav>
  )
}

export default Navbar