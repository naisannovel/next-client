import React, { useEffect, useState } from 'react';
import PostCard from './PostCard';
import axios from 'axios';
import { API } from '../../utilities/baseURL';
import SpinnerSecondary from '../../utilities/SpinnerSecondary';

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

    let postsPage = null;
    if(!loading){
        postsPage = blogPost?.map(item =><PostCard postData={item} />)
    }else{
        postsPage = <SpinnerSecondary/>
    }
    

    return (
        <div className='container' style={{marginTop:'80px'}}>
                { postsPage }
        </div>
    );
};

export default Posts;