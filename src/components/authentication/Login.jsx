import React, { useContext } from "react";
import { Form, FormGroup } from "reactstrap";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Redirect, useHistory, useLocation } from "react-router";
import { createAccountWithGoogle, userInfo, userLoginWithEmailAndPassword } from "./auth";
import { userInfoContext } from "../../App";


const Login = () => {
  const [user,setUser] = useContext(userInfoContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    setUser({...user,loading: true});
    userLoginWithEmailAndPassword(data.email,data.password)
    .then(res =>{
      if(res.message === undefined){
        setUser({...user,loading: false, errMsg: null, userData: res})
      }else{
        setUser({...user,loading: false, errMsg: res.message, userData:{}})
      }
    })
    .catch(err => console.log('err ',err))
    reset();
  };

  const googleLoginHandler = ()=>{
    createAccountWithGoogle()
    .then(result => setUser({...user,userData:result}))
  }

  let loginPage = 
    <div className="container row login__container m-auto">
      <div className="col-md-6 order-1">
        <img src="assets/images/login.svg" alt="login icon" />
      </div>
      <div className="col-md-6">
        <div className="login__input__container">
          <h1>Log In</h1>
          <hr />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true, pattern:/\S+@\S+\.\S+/,minLength:5,maxLength:255 })}
              />
              {errors.email && <span className='input__err'>required</span>}
            </FormGroup>
            <FormGroup>
              <input
                type="password"
                className="mt-4"
                placeholder="Password"
                {...register("password", { required: true,minLength:6,maxLength:255 })}
              />
              {errors.password && <span className='input__err'>required - minimum 6 characters</span>}
            </FormGroup>
            <button className="primary__btn mt-5">Log In</button>
          </Form>
          <p>
            Don't have an account? <Link to='/signup'>Sign Up</Link>
          </p>
          <p>Or</p>
          <br />
          <button className='primary__btn' onClick={googleLoginHandler}>Sign In With Google</button>
        </div>
      </div>
    </div>

  return (
    <div>
      {/* {  userAuth.failedMsg !== null ? <Alert color="danger" style={{fontSize:'16px'}}> { userAuth.failedMsg } </Alert>:'' } */}
      { loginPage }
    </div>
  );
};

export default Login;