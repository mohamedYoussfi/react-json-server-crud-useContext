import {
  faCheck,
  faCircle,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import {
  checkProduct,
  deleteProduct,
  getProducts,
} from "../repository/ProductsRepository";
import { useNavigate, useNavigation } from "react-router-dom";

function Products() {
  const [appState, setAppState] = useContext(ProductsContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setKeyword(appState.keyword);
    handleGetProducts({});
  }, []);

  const handleGetProducts = ({
    keyword = appState.keyword,
    page = appState.currentPage,
    size = appState.pageSize,
  }) => {
    console.log(keyword, page, size);
    getProducts(keyword, page, size).then((resp) => {
      const totalElements = resp.headers["x-total-count"];
      let totalPages = Math.floor(totalElements / appState.pageSize);
      if (totalElements % appState.pageSize != 0) ++totalPages;
      setAppState({
        ...appState,
        products: resp.data,
        totalPages: totalPages,
        currentPage: page,
        keyword: keyword,
      });
    });
  };
  const handleDeleteProducts = (product) => {
    deleteProduct(product)
      .then((res) => {
        let newProducts = appState.products.filter((p) => p.id != product.id);
        setAppState({ ...appState, products: newProducts });
        //handleGetProducts();
      })
      .catch((err) => {
        console.log(console.error());
      });
  };
  const handleCheckProduct = (product) => {
    checkProduct(product)
      .then((res) => {
        let newProducts = appState.products.map((p) => {
          if (p.id == product.id) {
            p.checked = !p.checked;
          }
          return p;
        });
        setAppState({ ...appState, products: newProducts });
      })
      .catch((err) => {
        console.log(console.error());
      });
  };
  const handleGotoPage = (page) => {
    handleGetProducts({ page });
  };
  const handleSearch = (event) => {
    event.preventDefault();
    handleGetProducts({ keyword: keyword, page: 1 });
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSearch} className="row">
                    <div className="col-auto">
                      <input
                        onChange={(e) => setKeyword(e.target.value)}
                        className="form-control"
                        type="text"
                        value={keyword}
                      ></input>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-outline-info">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {appState.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <button
                          onClick={() => handleCheckProduct(product)}
                          className="btn btn-outline-success"
                        >
                          <FontAwesomeIcon
                            icon={product.checked ? faCheck : faCircle}
                          ></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteProducts(product)}
                          className="btn btn-outline-danger"
                        >
                          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => navigate(`/EditProduct/${product.id}`)}
                          className="btn btn-outline-success"
                        >
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="nav nav-pills">
                {new Array(appState.totalPages).fill(0).map((page, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={(e) => {
                        handleGotoPage(index + 1);
                      }}
                      className={
                        appState.currentPage == index + 1
                          ? "btn btn-info ms-1"
                          : "btn btn-outline-info ms-1"
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
