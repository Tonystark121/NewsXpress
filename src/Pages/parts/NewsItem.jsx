import React, { useState } from "react";
import image1 from '../assets/default_img.jpeg'
import styles from './NewsItem.module.css'

const NewsItem = ({title, description, imageUrl,newsUrl, publishedAt,onNewsId}) => {
  const [isLiked, setIsLiked] = useState(false)

  const toggleBtn = () => {
    setIsLiked(prev => !prev)
    onNewsId({
      title: title,
      description:description,
      imageUrl:imageUrl,
      publishedAt:publishedAt,
      newsUrl:newsUrl
    })
  }
  
  return (
    <>
      <div className={`card ${styles.mycard}`} style={{width: "24rem"}}>
        <img src={imageUrl ? imageUrl : image1} className="card-img-top" alt="..." style={{height:'270px'}} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">
            {description}...
          </p>
          <a href={newsUrl} className="btn btn-primary">
            Read More
          </a>
        </div>
        <i className={`${!isLiked ? 'fa-regular': 'fa-solid'} fa-heart`} style={{color : isLiked ? 'red' : 'whitesmoke' }} onClick={()=>toggleBtn()}></i>
      </div>
    </>
  );
};

export default NewsItem;
