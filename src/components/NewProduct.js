import React, { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { saveProduct } from "../repository/ProductsRepository";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [state, setSate] = useContext(ProductsContext);
  const handleSaveProduct = (event) => {
    event.preventDefault();
    const product = { name, price, checked };
    saveProduct(product).then((resp) => {
      setSate({ ...state, products: [...state.products, resp.data] });
      alert(JSON.stringify(resp.data));
    });
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSaveProduct} method="post">
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

export default NewProduct;
