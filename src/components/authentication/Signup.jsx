import React from "react";
import { Alert, Form, FormGroup } from "reactstrap";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Redirect, useHistory, useLocation } from "react-router";

const SignUp = () => {
    
  const history = useHistory();
  const location = useLocation()
  let { from } = location.state || { from: { pathname: '/' } };
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  const onSubmit = data => {
    console.log(data);
    reset()
  };

  let signupPage =
      <div className="container row m-auto signup__container">
          <div className="col-md-6">     
            <div className="signup__input__container">
              <h1>Sign Up</h1>
              <hr />
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <input type="text" {...register("name", { required: true, minLength:2,maxLength:255})} placeholder="Name" />
                  {errors.name && <span className='form__error__style'>required</span>}
                </FormGroup>
                <FormGroup>
                  <input
                    type="email"
                    className="mt-4"
                    placeholder="Email"
                    {...register("email", { required: true, pattern:/\S+@\S+\.\S+/,minLength:5,maxLength:255 })}
                  />
                  {errors.email && <span className='form__error__style'>required</span>}
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    className="mt-4"
                    placeholder="Password"
                    {...register("password", { required: true,minLength:5,maxLength:255 })}
                  />
                  {errors.password && <span className='form__error__style'>required - minimum 5 characters</span>}
                </FormGroup>
                <button className="primary__btn mt-5">SIGN UP</button>
              </Form>
              <p>
                have an account? <Link to='/login'>Log In</Link>
              </p>
            </div>
          </div>
          <div className="col-md-6"> 
            <img src="assets/images/signup.svg" alt="signup icon" />
          </div>
        </div>

  return (
    <div>
      { signupPage }
    </div>
  );
};

export default SignUp;