import React, { useEffect, createContext, useReducer, useContext } from 'react';
import './App.css';
import { Route, BrowserRouter, Switch, useHistory } from 'react-router-dom'
import Navber from './screens/Navbar'
import productScreen from './screens/product';
import productDetails from './screens/productDetails';
import cartScreen from './screens/cart';
import signinScreen from './screens/Singin';
import shippingScreen from './screens/shipping';
import placeOrderScreen from './screens/placeOrder';
import adminScreen from './screens/admin';
import addProductScreen from './screens/addProduct';
import viewProduct from './screens/viewProduct';
import signupScreen from './screens/signup';
import adminSigninScreen from './screens/adminSignin';

export const UserContext = createContext()
 

function App() {
  return (
      <BrowserRouter>
      <Navber/>
      <Route exact path='/' component={productScreen} />
      <Route path='/product-details/:id' component={productDetails} />
      <Route path='/cart/:id?' component={cartScreen} />
      <Route path='/signin' component={signinScreen} />
      <Route path='/shipping' component={shippingScreen} />
      <Route path='/placeorder' component={placeOrderScreen} />
      <Route exact path='/admin' component={adminScreen} />
      <Route exact path='/add-product' component={addProductScreen} />
      <Route exact path='/viewProduct' component={viewProduct} />
      <Route path='/signup' component={signupScreen} />
      <Route exact path='/adminSignin' component={adminSigninScreen} />
      </BrowserRouter>
  );
}

export default App;
