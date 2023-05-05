import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import { useEffect, useState } from "react";
import NewProduct from "./components/NewProduct";
import Stats from "./components/Stats";
import axios from "axios";
import EditProduct from "./components/EditProduct";
import { ProductsContext } from "./context/ProductsContext";
import { useAppState } from "./repository/ProductsRepository";
function App() {
  const actions = ["Home", "Products", "NewProduct"];
  const [currentAction, setCurrentAction] = useState();

  useEffect(() => {
    let currentAction = window.location.pathname;
    currentAction = currentAction.slice(1, currentAction.length);
    setCurrentAction(currentAction);
  });

  return (
    <ProductsContext.Provider value={useAppState()}>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <ul className="nav nav-pills">
              {actions.map((action) => (
                <li key={action}>
                  <Link
                    onClick={() => setCurrentAction(action)}
                    className={
                      currentAction === action
                        ? "btn btn-info ms-1"
                        : "btn btn-outline-info ms-1"
                    }
                    to={"/" + action}
                  >
                    {action}
                  </Link>
                </li>
              ))}
            </ul>
            <Stats></Stats>
          </div>
        </nav>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Products" element={<Products />}></Route>
          <Route path="/NewProduct" element={<NewProduct />}></Route>
          <Route path="/EditProduct/:id" element={<EditProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </ProductsContext.Provider>
  );
}

export default App;
