import React, { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stats() {
  const [appState, setAppState] = useContext(ProductsContext);
  return (
    <ul className="navbar-nav">
      <li>
        <button type="button" className="btn btn-primary position-relative">
          Caddy
          <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
            {appState.products.length}
          </span>
        </button>
      </li>
    </ul>
  );
}

export default Stats;
