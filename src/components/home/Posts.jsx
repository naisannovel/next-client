import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import axios from 'axios';
import { API } from '../../utilities/baseURL';

const Posts = () => {
    const [loading,setLoading] = useState(false);
    const [blogPost,setBlogPost] = useState([]);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${API}/post`)
        .then(res => {
            setLoading(false);
            setBlogPost(res.data);
        })
        .catch(err => console.log(err.response.data));
    },[])

    return (
        <div className='container'>
            <div className="row">
                <PostCard postData={blogPost} />
            </div>
        </div>
    );
};

export default Posts;