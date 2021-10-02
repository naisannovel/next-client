import React from "react";
import { Alert, Form, FormGroup, Label } from "reactstrap";
import { useForm } from "react-hook-form";


const AddPost = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    reset()
  };

  let addDishPage = 
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
  
  return (
    <div className="add__post__container">
      <h1>Add Post</h1>
      <hr />
      { addDishPage }
    </div>
  );
};

export default AddPost;