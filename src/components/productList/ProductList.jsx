import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductCard from "../productCard/ProductCard";
import { Col, Row } from "react-bootstrap";
import img1 from "../../assets/camera.png";
import img2 from "../../assets/mobile.png";
import { IoIosSearch } from "react-icons/io";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useAppState } from "../../context/AppState";
import Loading from "../loading/Loading";
import { Pagination } from "antd";
const ProductList = () => {
  const { product, loading } = useAppState();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Adjust this based on the number of products you want to show per page

  // const getproduct = async () => {
  //   try {
  //     // const data = await axios.get(`https://dummyjson.com/products`);
  //     const data = await axios.get(
  //       `${import.meta.env.VITE_API_KEY}/api/v1/products`
  //     );
  //     console.log(data?.data?.products);
  //     setProducts(data?.data?.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getproduct();
  // }, []);

  const filteredProducts = product.filter(
    (product) =>
      (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const getVisibleProducts = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  };
  return (
    <>
      <div className="productlistContainer">
        <Row>
          <Col style={{ position: "relative" }} xs={12} md={2}>
            <div className="input">
              <span>
                <IoIosSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <br />
            <h6>Categories</h6>
            <Form.Select
              aria-label="Default select example"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option>Categories</option>
              <option value="smartphones">smartphones</option>
              <option value="laptops">laptops</option>
              <option value="fragrances">fragrances</option>
            </Form.Select>
            <br />
            <h6>Price Range</h6>
          </Col>

          {loading ? (
            <Loading />
          ) : (
            <Col>
              <Row>
                {getVisibleProducts().map((ele, ind) => {
                  return (
                    <>
                      <Col xs={12} sm={6} md={4} lg={3}>
                        <ProductCard
                          img={ele?.thumbnail?.url}
                          productname={ele?.name}
                          price={ele?.price}
                          description={ele?.description}
                          id={ele?._id}
                        />
                      </Col>
                    </>
                  );
                })}
              </Row>
              <Pagination
                defaultCurrent={1}
                current={currentPage}
                pageSize={pageSize}
                total={filteredProducts.length}
                onChange={onPageChange}
              />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProductList;
