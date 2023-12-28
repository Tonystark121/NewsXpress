import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider,db } from "../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

const Welcome = ({userEmail, setUserEmail }) => {
  const navigate = useNavigate();

  const createCollection = async (email) => {
    try {
      const collectionRef = doc(db, "LikedNews", email);
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

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await setUserEmail(result.user.email);
      const collectionRef = doc(db, "LikedNews", result.user.email);
      const check = await getDoc(collectionRef);
      if (!check._document) await createCollection(result.user.email);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    signIn();
    setTimeout(() => {
      navigate("../home");
    }, 1000);
  };

  return (
    <>
      <div className="contents">
        <div className="title">
          <h1>Welcome to NewsXpress</h1>
          <span>| Get Fast and Accurate News at your fingertips..</span>
        </div>
        <div className="buttons">
          <button onClick={() => signInWithGoogle()}>SignIn with Google</button>
          <button onClick={() => navigate("../signin")}>
            SignIn with Email
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
