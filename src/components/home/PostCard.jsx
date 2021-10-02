import React from "react";

const PostCard = ({ img,title,body }) => {

  return (
    <div className="col-md-4">
      <div className="card post__card__container">
        <div>
          <img
            src={ img }
            alt="blog-img"
          />
        </div>
        <div className="card-body p-4">
          <h3 className="card-title"> { title } </h3>
          <p className="card-text"> { body.slice(0,150) } </p>
          <button className="primary__btn">READ MORE</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
