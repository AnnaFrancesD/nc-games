import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/home";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Categories from "./components/categories";
import Profile from "./components/profile";
import ReviewList from "./components/review-list";
import ReviewCard from "./components/review-card";
import ErrorPage from "./components/error-page";

import { CurrentUserContext } from "./context/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState("tickle122");
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <section className="main">
            <Navbar />
            <section className="inner">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/categories" element={<Categories />}></Route>
                <Route path="/my_profile" element={<Profile />}></Route>
                <Route
                  path="/categories/:category"
                  element={<ReviewList />}
                ></Route>
                <Route
                  path="/reviews/:review_id"
                  element={<ReviewCard />}
                ></Route>
                <Route path="*" element={<ErrorPage />}></Route>
              </Routes>
            </section>
          </section>
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
