import React, { useState } from "react";
import "./ProductList.css";
import ProductCard from "../productCard/ProductCard";
import { Col, Row } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import Form from "react-bootstrap/Form";
import { useAppState } from "../../context/AppState";
import Loading from "../loading/Loading";
import { Pagination } from "antd";
const ProductList = () => {
  const { product, loading } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

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
                      <Col xs={6} sm={6} md={4} lg={3}>
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
