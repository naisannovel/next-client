import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API } from '../utilities/baseURL';
import Spinner from '../utilities/Spinner';

const MyPost = () => {
    const [loading,setLoading] = useState(false);
    const [myPost,setMyPost] = useState([]);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${API}/post/mine`,{
            headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        .then(res => {
            setLoading(false);
            setMyPost(res.data);
        })
        .catch(err => console.log(err.response.data))
    },[])

    let myPostPage = null;
    if(!loading){
        myPostPage = myPost?.map(item =>(
            <div className="row border my__post__container">
                <div className="col-md-8 my__post__card__content__container">
                    <h1 className="card-title"> { item.title } </h1>
                    <p className="card-text"> { item.body.slice(0,200) } </p>
                </div>
                <div className="col-md-3 offset-1 my__post__button__container">
                    <button className='primary__btn'><span class="fa fa-edit"></span> Edit</button>
                    <button className='primary__btn'><span class="fa fa-trash"></span> Delete</button>
                </div>
            </div>
        ))
    } else{
        myPostPage = <Spinner/>
    }

    return (
        <div className='container'>
            { myPostPage }
        </div>
    );
};

export default MyPost;