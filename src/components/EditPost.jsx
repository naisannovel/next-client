import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../utilities/baseURL";
import { useParams } from "react-router";
import _ from 'lodash';

const EditPost = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [showUpdateBtn,setShowUpdateBtn] = useState(false);

  const inputOnChangeHandler = event => {
      const data = { ...post };
      data[event.target.name] = event.target.value
      setShowUpdateBtn(true);
      setPost(data);
  };

  const { id } = useParams();

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

  return (
    <div className="edit__post__container">
      <h1>Edit Post</h1>
      <hr />
      {/* { addSuccessMsg !== null && <Alert color='success' style={{fontSize:'16px'}}>{addSuccessMsg}</Alert>} */}
      <form>
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
        {showUpdateBtn && <button type='submit' className="primary__btn">Update</button>}
      </form>
    </div>
  );
};

export default EditPost;
