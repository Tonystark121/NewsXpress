import React, { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./Pages/parts/Welcome";
import NewsApp from "./Pages/NewsApp";
import LikedNews from './Pages/LikedNews'
import SignIn from "./Pages/parts/SignIn";
import SignUp from "./Pages/parts/SignUp";
import Login from "./Pages/parts/Login";

import {
  Route,
  Routes,
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import {
  getDocs,
  collection,
  doc,
  getDoc,
  documentId,
} from "firebase/firestore";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [likedNews, setLikedNews] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route
          path="/"
          element={<Login userEmail={userEmail} setUserEmail={setUserEmail} />}
        >
          <Route
            path=""
            element={
              <Welcome userEmail={userEmail} setUserEmail={setUserEmail} />
            }
          />

          <Route
            path="signIn"
            element={
              <SignIn userEmail={userEmail} setUserEmail={setUserEmail} />
            }
          />
          <Route
            path="signUp"
            element={
              <SignUp userEmail={userEmail} setUserEmail={setUserEmail} />
            }
          />
        </Route>
        <Route
          path="/home"
          element={
            <NewsApp
              likedNews={likedNews}
              setLikedNews={setLikedNews}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
            />
          }
        ></Route>
        <Route path="/likednews" element={<LikedNews />}></Route>
      </Route>
    )
  );

  return (
    <>
      <div className="body1">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
