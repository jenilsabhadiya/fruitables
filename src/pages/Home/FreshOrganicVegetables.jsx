import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Tastimonial.css";

function FreshOrganicVegetables() {
  return (
    <div className="container-fluid vesitable py-5">
      <div className="container py-5">
        <h1 className="mb-0">Fresh Organic Vegetables</h1>

        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          speed={2500}
          modules={[Autoplay, Navigation]}
          className="vegetables"
        >
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-6.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-1.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-3.png"
                  className="img-fluid w-100 rounded-top bg-light"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Banana</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-4.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Bell Papper</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-5.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Potatoes</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-6.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-5.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Potatoes</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src="public/assets/img/vegetable-item-6.jpg"
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                Vegetable
              </div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod te incididunt
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a
                    href="#"
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary" /> Add
                    to cart
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default FreshOrganicVegetables;
