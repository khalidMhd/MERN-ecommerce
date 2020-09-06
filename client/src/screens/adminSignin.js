import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { signinAdmin } from '../actions/auth'

const adminSigninScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const adminSignin = useSelector(state => state.adminSignin);
    const { loading, userInfo, error } = adminSignin;

    useEffect(() => {
        if (userInfo) {
          props.history.push('/admin');
        }
        return () => {
          //
        };
      }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signinAdmin(email, password));
      }

    return <form onSubmit={submitHandler} className='card' style={{width:'500px', margin:'20px auto'}}>
      <h4 style={{textAlign:'center'}}>Admin Login</h4>
        <div class="form-group">
        {loading && <div>Loading...</div>}
          {error && <div>Invaled Email or Password</div>}
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"  onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

}

export default adminSigninScreen


