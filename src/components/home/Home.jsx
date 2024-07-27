import React, { useRef, useState } from "react";
import "./Home.css";
import { Col, Row } from "react-bootstrap";
import { useAppState } from "../../context/AppState";
import ProductCard from "../productCard/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import home1 from "../../assets/home1.png";
import home2 from "../../assets/home1.jpg";
import home3 from "../../assets/home2.jpg";
import "swiper/css/navigation";
import Loading from "../loading/Loading";
const Home = () => {
  const { product, loading } = useAppState();
  console.log(product);
  const lastFourProducts = product?.slice(-4)?.reverse();
  return (
    <>
      <div className="homeMain">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="sliderimg" style={{ position: "relative" }}>
            <img src={home2} alt="" />

            <div className="homecontent-button">
              <div className="carousel-caption  d-md-block contentitem">
                <h3>Exclusive Ceramics & Art</h3>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
                <button>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="sliderimg" style={{ position: "relative" }}>
            <img src={home2} alt="" />

            <div className="homecontent-button">
              <div className="carousel-caption  d-md-block contentitem">
                <h3>Exclusive Ceramics & Art</h3>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
                <button>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="sliderimg" style={{ position: "relative" }}>
            <img src={home3} alt="" />

            <div className="homecontent-button">
              <div className="carousel-caption  d-md-block contentitem">
                <h3>Exclusive Ceramics & Art</h3>
                <p>
                  Some representative placeholder content for the third slide.
                </p>
                <button>Shop Now</button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="home-latest-product">
        <h2 className="text-center m-3">Latest Product</h2>

        {loading ? (
          <Loading />
        ) : (
          <Row>
            {lastFourProducts?.map((item) => (
              <Col xs={6} sm={6} md={4} lg={3}>
                <ProductCard
                  img={item?.thumbnail?.url}
                  productname={item?.name}
                  price={item?.price}
                  description={item?.description}
                  id={item?._id}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default Home;
