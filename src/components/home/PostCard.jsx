import React from "react";

const PostCard = ({ postData }) => {
console.log('postData ',postData);
  return (
    <div className="col-md-4">
      <div className="card post__card__container">
        <div>
          <img
            src=''
            alt="blog-img"
          />
        </div>
        <div className="card-body p-4">
          <h3 className="card-title"> {  } </h3>
          <p className="card-text"> {  } </p>
          <button className="primary__btn">READ MORE</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
