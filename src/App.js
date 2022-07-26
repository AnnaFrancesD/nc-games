import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Categories from "./components/categories";
import Profile from "./components/profile";
import ReviewList from "./components/review-list";
import ReviewCard from "./components/review-card";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/my_profile" element={<Profile />}></Route>
          <Route path="/categories/:category" element={<ReviewList />}></Route>
          <Route path="/reviews/:review_id" element={<ReviewCard />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
