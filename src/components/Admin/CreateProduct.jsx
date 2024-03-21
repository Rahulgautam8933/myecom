import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const token = Cookies.get("UserToken");
  const [createProduct, setCreateProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    Stock: "",
  });

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const onchangeProduct = (e) => {
    setCreateProduct({ ...createProduct, [e.target.name]: e.target.value });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const myForm = new FormData();

      myForm.set("name", createProduct.name);
      myForm.set("price", createProduct.price);
      myForm.set("description", createProduct.description);
      myForm.set("category", createProduct.category);
      myForm.set("Stock", createProduct.Stock);

      images.forEach((image) => {
        myForm.append("images", image);
      });
      console.log(myForm);

      const data = await axios.post(
        `${import.meta.env.VITE_API_KEY}/api/v1/admin/product/new`,

        myForm,

        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
      toast.success("Product Added successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="create-product">
        <h3 className="text-center m-3">Create Product</h3>
        <form>
          <Row
            style={{
              width: "90%",
              margin: "auto",
              position: "relative",
            }}
          >
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Product Title
                </label>
                <input
                  name="name"
                  value={createProduct.name}
                  onChange={onchangeProduct}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Product Title"
                />
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Price
                </label>
                <input
                  name="price"
                  value={createProduct.price}
                  onChange={onchangeProduct}
                  type="Number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Price"
                />
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Category
                </label>
                <select
                  name="category"
                  value={createProduct.category}
                  onChange={onchangeProduct}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Select Category</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Clothes">Clothes</option>
                  <option value="electronics">electronics</option>
                </select>
              </div>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Stock
                </label>
                <input
                  name="Stock"
                  value={createProduct.Stock}
                  onChange={onchangeProduct}
                  type="Number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Stock"
                />
              </div>
            </Col>

            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Images
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Price"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>
            </Col>

            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Discription
                </label>
                <textarea
                  name="description"
                  value={createProduct.description}
                  onChange={onchangeProduct}
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Discription"
                ></textarea>
              </div>
            </Col>
          </Row>

          <div className="mb-3 text-center">
            <button
              onClick={createProductSubmitHandler}
              className="btn btn-primary text-center"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
