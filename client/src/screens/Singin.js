import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../actions/auth'
import {Link} from 'react-router-dom'

const signinScreen = (props) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
        return () => {
          //
        };
      }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
      }

    return <form onSubmit={submitHandler} className='card' style={{width:'500px', margin:'20px auto'}}>
      <h4 style={{textAlign:'center'}}>Login</h4>
        <div class="form-group">
        {loading && <div>Loading...</div>}
          {error && <div>Invaled Email or Password</div>}
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"  onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <p>Create an account <Link to={redirect === "/" ? "signup" : "register?redirect=" + redirect}> Sign up</Link> </p>
    </form>

}

export default signinScreen


