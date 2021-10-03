import React from "react";
import { useHistory } from "react-router";
import { API } from "../../utilities/baseURL";

const PostCard = ({ postData }) => {
  const history = useHistory();
  const { _id, title, body } = postData;
  return (
    <div className="row gx-5 shadow post__card__container" onClick={()=> history.push(`/post/details/${_id}`)} style={{cursor:'pointer'}}>
        <div className='col-md-4 post__image__container'>
          <img
            src={`${API}/post/photo/${_id}`}
            style={{objectFit:'cover'}}
            alt="blog-img"
          />
        </div>
        <div className="col-md-8 post__card__content__container">
          <h1 className="card-title"> { title } </h1>
          <p className="card-text"> { body.slice(0,300) } </p>
          <button className="primary__btn">READ MORE</button>
        </div>
    </div>
  );
};

export default PostCard;
