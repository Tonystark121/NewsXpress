import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "./Navbar.module.css";
import { Avatar } from "antd";

const Navbar = ({ onChangeCategory }) => {
  const handleCategory = (value) => {
    onChangeCategory(value);
  };

  return (
    <>
      <nav className={Styles.nav}>
        <Link to={"../home"}>
          <h1>NewsXpress</h1>
        </Link>
        <ul>
          <li>
            <Link onClick={() => handleCategory("")}>Top Headlines</Link>
          </li>
          <li>
            <Link onClick={() => handleCategory("Science")}>Science</Link>
          </li>
          <li>
            <Link onClick={() => handleCategory("Technology")}>Technology</Link>
          </li>
          <li>
            <Link onClick={() => handleCategory("Sports")}>Sports</Link>
          </li>
          <li>
            <Link onClick={() => handleCategory("Entertainment")}>
              Entertainment
            </Link>
          </li>
        </ul>
        <div className={Styles.userinfo}>
          <div className={Styles.likedIcon}>
            <Link
              to={{
                pathname: "../LikedNews",
              }}
            >
              <i className="fa-solid fa-folder-plus" />
            </Link>
            <p>Liked News</p>
          </div>
          <Avatar size={54} icon="R" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
