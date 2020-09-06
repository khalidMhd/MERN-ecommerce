import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signup } from '../actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signupScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const userSignup = useSelector(state=>state.userSignup)
    const {loading, userInfo, error} = userSignup
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signup(name, email, password));
      }

      useEffect(() => {
        
          return () => {
              if(userInfo)
              toast("Account Created Successfully!");
              props.history.push(redirect)
          }
      }, [userInfo])

    return <form onSubmit={submitHandler} className='card' style={{width:'500px', margin:'20px auto'}}>
      <h4 style={{textAlign:'center'}}>Sign up</h4>
      {loading && <div>Loading...</div>}
          {error && <div>User Already Exist</div>}
      <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Name" name="name" onChange={(e) => setName(e.target.value)} required />
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"  onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" class="btn btn-primary">Submit <ToastContainer /></button>
        <p>Have an account
            <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center" > login</Link>
        </p>
    </form>

}

export default signupScreen


