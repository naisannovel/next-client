import React, { useState } from "react";
import { Alert, Form, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../utilities/baseURL";

const EditPost = () => {
  const [loading, setLoading] = useState(false);
  const [addSuccessMsg, setAddSuccessMsg] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // setLoading(true);
    //       axios.post(`${API}/post`,data,{
    //         headers:{
    //           "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //         }
    //       })
    //       .then(res => {
    //         setLoading(false);
    //         setAddSuccessMsg(res.data.message);
    //         setTimeout(()=>{
    //           setAddSuccessMsg(null);
    //         },2000)
    //       })
    //       .catch(err => console.log(err.response.message));
    console.log(data);
    reset();
  };

  return (
    <div className="edit__post__container">
      <h1>Edit Post</h1>
      <hr />
      {/* { addSuccessMsg !== null && <Alert color='success' style={{fontSize:'16px'}}>{addSuccessMsg}</Alert>} */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <input type="text" {...register("title")}/>
        </FormGroup>
        <FormGroup>
          <textarea
            type="textarea"
            {...register("body")}
          />
        </FormGroup>
        <button className="primary__btn">Update</button>
      </Form>
    </div>
  );
};

export default EditPost;
