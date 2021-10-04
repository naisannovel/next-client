import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Alert } from 'reactstrap';
import { API } from '../utilities/baseURL';
import Spinner from '../utilities/Spinner';

const MyPost = () => {
    document.title = 'Next - my post';
    const [loading,setLoading] = useState(false);
    const [deleteSuccessMsg,setDeleteSuccessMsg] = useState(null);
    const [myPost,setMyPost] = useState([]);

    const history = useHistory();

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

    const deleteBtnHandler = id =>{
        axios.delete(`${API}/post/${id}`,{
            headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        .then(res => {
            setLoading(false);
            setDeleteSuccessMsg(res.data.message);
            setTimeout(()=>setDeleteSuccessMsg(null),2000);
            const existPost = myPost.filter(item => item._id !== res.data.id)
            setMyPost(existPost);
        })
    }

    let myPostPage = null;
    if(!loading){
        myPostPage = myPost?.map(item =>(
            <div className="row border my__post__container">
                <div className="col-md-8 my__post__card__content__container">
                    <h1 className="card-title"> { item.title } </h1>
                    <p className="card-text"> { item.body.slice(0,200) } </p>
                </div>
                <div className="col-md-3 offset-1 my__post__button__container">
                    <button onClick={()=>history.push(`/post/edit/${item._id}`)} className='primary__btn'><span class="fa fa-edit"></span> Edit</button>
                    <button onClick={()=> deleteBtnHandler(item._id)} className='primary__btn'><span class="fa fa-trash"></span> Delete</button>
                </div>
            </div>
        ))
    } else{
        myPostPage = <Spinner/>
    }

    return (
        <div className='container'>
            { deleteSuccessMsg !== null && <Alert color='success' style={{fontSize:'16px'}}>{deleteSuccessMsg}</Alert>}
            { myPostPage !== null ? myPostPage : 
            <h1 style={{
                color:'grey',
                position: 'absolute',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)'
                }}>No Post Available</h1> }
        </div>
    );
};

export default MyPost;