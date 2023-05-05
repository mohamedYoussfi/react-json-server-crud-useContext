import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import {
  api,
  getProductById,
  saveProduct,
  updateProduct,
} from "../repository/ProductsRepository";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [state, setSate] = useContext(ProductsContext);
  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const product = { id, name, price, checked };
    updateProduct(product).then((resp) => {
      let updateProduct = resp.data;
      let newProducts = state.products.map((p) =>
        p.id == updateProduct.id ? updateProduct : p
      );
      setSate({ ...state, products: newProducts });
      alert(JSON.stringify(updateProduct));
    });
  };
  useEffect(() => {
    handleGetProductById(id);
  }, []);

  const handleGetProductById = (id) => {
    getProductById(id).then((resp) => {
      setName(resp.data.name);
      setPrice(resp.data.price);
      setChecked(resp.data.checked);
    });
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleUpdateProduct} method="post">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                id="price"
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={checked}
                onChange={(e) => setChecked(e.target.value)}
                id="checked"
              />
              <label className="form-check-label" htmlFor="checked">
                Checked
              </label>
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
