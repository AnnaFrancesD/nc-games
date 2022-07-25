import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Categories from "./components/categories";
import Profile from "./components/profile";
import Strategy from "./components/category-pages/strategy";
import HiddenRoles from "./components/category-pages/hidden-roles";
import Dexterity from "./components/category-pages/dexterity";
import PushYourLuck from "./components/category-pages/push-your-luck";
import RollAndWrite from "./components/category-pages/roll-and-write";
import DeckBuilding from "./components/category-pages/deck-building";
import EngineBuilding from "./components/category-pages/engine-building";

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
          <Route path="/categories/strategy" element={<Strategy />}></Route>
          <Route
            path="/categories/hidden-roles"
            element={<HiddenRoles />}
          ></Route>
          <Route path="/categories/dexterity" element={<Dexterity />}></Route>
          <Route
            path="/categories/push-your-luck"
            element={<PushYourLuck />}
          ></Route>
          <Route
            path="/categories/roll-and-write"
            element={<RollAndWrite />}
          ></Route>
          <Route
            path="/categories/deck-building"
            element={<DeckBuilding />}
          ></Route>
          <Route
            path="/categories/engine-building"
            element={<EngineBuilding />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
