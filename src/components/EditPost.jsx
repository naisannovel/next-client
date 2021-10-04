import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utilities/baseURL";
import { useParams } from "react-router";
import _ from 'lodash';
import { Alert } from "reactstrap";
import Spinner from '../utilities/Spinner';

const EditPost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [showUpdateBtn,setShowUpdateBtn] = useState(false);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState(null);
  const { id } = useParams();

  const inputOnChangeHandler = event => {
      const data = { ...post };
      data[event.target.name] = event.target.value
      setShowUpdateBtn(true);
      setPost(data);
  };

  const onSubmitHandler = (event,data) =>{
    setLoading(true);
      event.preventDefault()
    axios.put(`${API}/post/${id}`,data,{
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
    })
    .then(res => {
        setLoading(false);
        setUpdateSuccessMsg(res.data);
        setTimeout(()=>setUpdateSuccessMsg(null),2000)
    })
    .catch(err => console.log(err.response.data))
  }

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setPost(_.pick(res.data,["title","body"]));
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  let editPostPage = null;
  if(!loading){
      editPostPage =
      <form onSubmit={(event)=>onSubmitHandler(event, post)}>
          <input
            type="text"
            name="title"
            onChange={inputOnChangeHandler}
            value={post.title}
          />
          <textarea
            type="textarea"
            name="body"
            value={post.body}
            onChange={inputOnChangeHandler}
          />
        {showUpdateBtn && <button type='submit' className="primary__btn mt-4">Update</button>}
      </form>
  }else{
      editPostPage = <Spinner/>
  }

  return (
    <div className="edit__post__container">
      <h1>Edit Post</h1>
      <hr />
      { updateSuccessMsg !== null && <Alert color='success' style={{fontSize:'16px'}}>{updateSuccessMsg}</Alert>}
      { editPostPage }
    </div>
  );
};

export default EditPost;
