import React, { useEffect, useState } from "react";
import Navbar from "./parts/Navbar";
import styles from "./parts/NewsItem.module.css";

const LikedNews = () => {
  const [LikedNews, setLikedNew] = useState([]);

  useEffect(() => {
    const storedLikedNews = JSON.parse(localStorage.getItem("LikedNews")) || [];
    setLikedNew(storedLikedNews);
  }, []);

  const updateLikedNews = (id) => {
    const updatedLikedNews = LikedNews.filter(
      (item) => item.publishedAt !== id
    );
    setLikedNew(updatedLikedNews);
    localStorage.setItem("LikedNews", JSON.stringify(updatedLikedNews));
    console.log(LikedNews)
  };

  return (
    <div className="news-page">
      <div className="navbar">
        <Navbar />
      </div>
      <h2>NewsXpress | LikedNews</h2>
      <div className="news-container">
        {LikedNews.map((news) => (
          <div className={`card ${styles.mycard}`} style={{ width: "24rem" }}>
            <img
              src={news.imageUrl}
              className="card-img-top"
              alt="..."
              style={{ height: "270px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{news.title}...</h5>
              <p className="card-text">{news.description}...</p>
              <a href={news.newsUrl} className="btn btn-primary">
                Read More
              </a>
            </div>
            <i
              className={`fa-solid fa-heart`}
              style={{ color: "red" }}
              onClick={() => updateLikedNews(news.publishedAt)}
            ></i>
          </div>
        ))}
      </div>
      <div className="news-btns">
        <button className="btn btn-primary" type="submit">
          &larr; Prev
        </button>
        <button className="btn btn-primary" type="submit">
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default LikedNews;
