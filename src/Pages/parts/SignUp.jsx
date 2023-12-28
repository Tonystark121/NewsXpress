import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {db, auth} from '../config/firebase'
import { doc, getDoc, setDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword} from 'firebase/auth'

const SignUp = ({ userEmail, setUserEmail }) => {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const createCollection = async () => {
    const collectionRef = doc(db, "LikedNews", userEmail);
    try {
      await setDoc(collectionRef, {
        LikedNews: [],
        profile: {
          Email: userEmail,
          LikedNews: 0,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userEmail.length === 0) {
      setPasswordError("Email cannot be empty");
      return;
    }
    if (password.length === 0) {
      setPasswordError("Password cannot be empty");
      return;
    }
    if (checkPassword.length === 0) {
      setPasswordError("Re-enter password field cannot be empty");
      return;
    } else if (password === checkPassword) {
      const collectionRef = doc(db, "LikedNews", userEmail);
      console.log(collectionRef)
      const check = await getDoc(collectionRef);
      console.log(check)
      if (check._document) {
        setPasswordError("account already exists, please sign in");
      } else {
        await createUserWithEmailAndPassword(auth, userEmail, password);
        await createCollection();
        navigate("../home");
      }
    }
    else {
      setPasswordError("Passwords do not match");
    }
  };

  return (
    <div className="signin-content">
      <div className="toggle-btns">
        <button
          className="active"
          type="button"
          onClick={() => navigate("../signin")}
        >
          SignIn
        </button>
        <button
          type="button"
          style={{ backgroundColor: "rgb(166, 89, 238)" }}
          onClick={() => navigate("../signup")}
        >
          SignUp
        </button>
      </div>
      <div className="input">
        <form onSubmit={submitHandler} style={{ gap: "20px" }}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Re-enter Password"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />
          </div>
          <button type="submit">Create new account?</button>
        </form>
        <div className="input-info">
          <p>
            Already have a account?{" "}
            <span>
              <a href="/signup">SignUp</a>
            </span>
          </p>
          <p style={{ color: "red" }}>{passwordError}</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
