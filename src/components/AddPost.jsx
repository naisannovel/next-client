import React, { useContext, useState } from "react";
import { Alert, Form, FormGroup, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { myPostContext } from "../App";
import { API } from "../utilities/baseURL";
import axios from "axios";
import Spinner from '../utilities/Spinner';


const AddPost = () => {
  const [myPost,setMyPost] = useContext(myPostContext);
  const [addSuccessMsg,setAddSuccessMsg] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    setMyPost({...myPost, loading: true })
    const formData = new FormData();
          formData.append('title',data.title);
          formData.append('body', data.body);
          formData.append('image',data.image[0]);
          axios.post(`${API}/post`,formData,{
            headers:{
              "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
          .then(res => {
            setMyPost({...myPost, post: myPost.post.concat(res.data.data), loading: false });
            setAddSuccessMsg(res.data.message);
            setTimeout(()=>{
              setAddSuccessMsg(null);
            },2000)
          })
          .catch(err => console.log(err.response.message));
    reset()
  };

  let addPostPage = null;
    if(!myPost.loading){
        addPostPage =
        <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <input type="text" {...register("title", { required: true })} placeholder='Title...' />
          {errors.title && <span className='input__err'>title is required</span>}
        </FormGroup>
        <FormGroup>
          <textarea type="textarea" {...register("body", { required: true })} placeholder='write your post here...' />
          {errors.body && <span className='input__err'>body is required</span>}
        </FormGroup>
        <FormGroup>
          <Label for="file" style={{ display: "block" }}>
            Image
          </Label>
          <input type="file" className='add__post__file__input' name='image' {...register("image", { required: true })} />
          {errors.image && <span className='input__err' style={{display:'block'}}>image is required</span>}
        </FormGroup>
        <button className="primary__btn">Post</button>
      </Form>
    }else{
      addPostPage = <Spinner/>
    }
  
  return (
    <div className="add__post__container">
      <h1>Add Post</h1>
      <hr />
      { addSuccessMsg !== null && <Alert color='success' style={{fontSize:'16px'}}>{addSuccessMsg}</Alert>}
      { addPostPage }
    </div>
  );
};

export default AddPost;