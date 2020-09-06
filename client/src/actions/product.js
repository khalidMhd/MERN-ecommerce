import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, 
        PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
        PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, 
        PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL 
    } from "../constants/product";

const  axios  = require("axios");

const listProduct =()=> async (dispatch) =>{
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/product')
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload:error.message})
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const { data } = await axios.get('/product/' + productId);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
  };

const createProduct = (name, detail, price, countInStock,url) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, name, detail, price, countInStock, url });
      const {userSignin: { userInfo },} = getState();
      const { data } = await axios.post("/product", {name, detail, price, countInStock,url},{
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      })
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
}

const updateProduct = (id,name, price, countInStock, detail) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST,id, name, price, countInStock,detail });
      const { data } = await axios.put('/update-product/'+id, {name, price, countInStock, detail})
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
    }
}

const deleteProduct = (id) => async (dispatch) =>{
  try {
    dispatch({type:PRODUCT_DELETE_REQUEST,payload: id})
    const {data} = await axios.delete('/product-delete/'+id)
    dispatch({type:PRODUCT_DELETE_SUCCESS, payload:data, success:true})
  } catch (error) {
    dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message})
  }
}

export {updateProduct,listProduct, detailsProduct, createProduct, deleteProduct}