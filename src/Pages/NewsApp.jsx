import React, { useEffect, useState } from "react";
import Navbar from "./parts/Navbar";
import NewsItem from "./parts/NewsItem";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "./config/firebase";

const NewsApp = ({ userEmail, likedNews, setLikedNews }) => {
  const [newsData, setNewsData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [category, setCategory] = useState('')

  let defaultDescription =
    "In the culinary realm, a rising trend spotlights fusion cuisines blending diverse flavors and cultural influences. From Korean-Mexican fusion to innovative dessert pairings, chefs creatively combine traditions, creating new taste sensations.";

  let defaultTitle =
    "India Vs South Africa 1st Test: Virat Kohli On Cusp Of Huge Milestone In Test Cricket, Can Break Rahul Dravid And Virender Sehwag Record";

  const api = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=74dcee9425e84af5b6c1a260ae5e36f0&page=${currPage}&pageSize=18`;


  const fetchNews = async () => {
    let data = await fetch(api);
    let parsedNews = await data.json();
    setNewsData(parsedNews);
  };

  const prevPage = () => {
    setCurrPage((page) => page - 1);
  };

  const NextPage = async () => {
    if (currPage + 1 > Math.ceil(newsData.length / 18)) return;
    setCurrPage((page) => page + 1);
  };

  const handleCategory = (value) => {
      console.log(value)
      setCategory(value)
  }

  const addLikedNews = (value) => {
    setLikedNews((prevLikedNews) => {
      if (prevLikedNews.includes(value)) {
        return prevLikedNews.filter((item) => item !== value);
      } else {
        return [...prevLikedNews, value];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("LikedNews", JSON.stringify(likedNews));
  }, [likedNews]);

  useEffect(() => {
    fetchNews();
  }, [currPage, category]);

  return (
    <div className="news-page">
      <div className="navbar">
        <Navbar onChangeCategory={handleCategory} />
      </div>
      <h2>NewsXpress | {category ? category : 'Top Headlines'}</h2>
      <div className="news-container">
        {newsData.length !== 0 ? (
          <>
            {newsData.articles.map((news, idx) => (
              <div className="newsItems-container" key={idx}>
                <NewsItem
                  title={
                    news.title
                      ? news.title.slice(0, 80)
                      : defaultTitle.slice(0, 120)
                  }
                  description={
                    news.description
                      ? news.description.slice(0, 150)
                      : defaultDescription.slice(0, 150)
                  }
                  imageUrl={news.urlToImage}
                  newsUrl={news.url}
                  publishedAt={news.publishedAt}
                  onNewsId={addLikedNews}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            <p style={{ color: "gray", textAlign: "center" }}>Loading...</p>
          </>
        )}
      </div>
      <div className="news-btns">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={prevPage}
          disabled={currPage <= 1}
        >
          &larr; Prev
        </button>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={NextPage}
          disabled={currPage >= Math.ceil(newsData.length / 18)}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default NewsApp;
