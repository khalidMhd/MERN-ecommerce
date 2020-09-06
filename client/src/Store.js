import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { productListReducer, productDetailsReducer, 
         productCreateReducer, productDeleteReducer, 
         productUpdateReducer 
        } from './reducers/product'
import { cartReducer } from './reducers/cart'
import { signinReducer, signupReducer, admnSigninReducer } from './reducers/auth'
import { orderCreateReducer, orderListReducer, orderDeleteReducer } from './reducers/order'


const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null
const adminInfo = Cookie.getJSON("adminInfo") || null

const initialState = { cart:{cartItems},userSignin:{userInfo},adminSignin:{adminInfo}   }
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userSignin:signinReducer,
    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    productCreate: productCreateReducer,
    userSignup: signupReducer,
    productDelete: productDeleteReducer,
    orderDelete:orderDeleteReducer,
    adminSignin: admnSigninReducer,
    productUpdate: productUpdateReducer
    

})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store