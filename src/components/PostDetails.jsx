import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API } from '../utilities/baseURL';
import Spinner from '../utilities/Spinner';

const PostDetails = (props) => {
    document.title = 'Next - post details';
    const { id } = useParams();
    const [post,setPost] = useState([]);
    const [loading,setLoading] = useState(false);

    const { _id, name, title, body } = post;

    useEffect(()=>{
        setLoading(true);
        axios.get(`${API}/post/${id}`,{
            headers:{
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
        })
        .then(res => {
            setLoading(false);
            setPost(res.data);
        })
        .catch(err => console.log(err.response.data))
    },[])

    let PostDetailsPage = null;
    if(!loading){
        PostDetailsPage = 
        <div>
            <h1> { title } </h1>
            <div className="post__details__img__container">
                <img src={`${API}/post/photo/${_id}`} alt="" />
            </div>
            <span> { name } </span>
            <p> { body } </p>
        </div>
    }else{
        PostDetailsPage = <Spinner/>
    }

    return (
        <div className='container mt-5 post__details__container'>
            { PostDetailsPage }
        </div>
    );
};

export default PostDetails;