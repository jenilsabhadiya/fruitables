import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Tastimonial.css";

function Tastimonial() {
  return (
    <div>
      {/* Tastimonial Start */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
          </div>
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
            }}
            speed={2500}
            modules={[Autoplay, Navigation]}
            className="testimonial"
          >
            <SwiperSlide>
              <div className="testimonial-item img-border-radius bg-light rounded p-4">
                <div className="position-relative">
                  <i
                    className="fa fa-quote-right fa-2x text-secondary position-absolute"
                    style={{ bottom: 30, right: 0 }}
                  />
                  <div className="mb-4 pb-4 border-bottom border-secondary">
                    <p className="mb-0">
                      Lorem Ipsum is simply dummy text of the printing Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s,
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-nowrap">
                    <div className="bg-secondary rounded">
                      <img
                        src="public/assets/img/testimonial-1.jpg"
                        className="img-fluid rounded"
                        style={{ width: 100, height: 100 }}
                        alt=""
                      />
                    </div>
                    <div className="ms-4 d-block">
                      <h4 className="text-dark">Client Name</h4>
                      <p className="m-0 pb-3">Profession</p>
                      <div className="d-flex pe-5">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item img-border-radius bg-light rounded p-4">
                <div className="position-relative">
                  <i
                    className="fa fa-quote-right fa-2x text-secondary position-absolute"
                    style={{ bottom: 30, right: 0 }}
                  />
                  <div className="mb-4 pb-4 border-bottom border-secondary">
                    <p className="mb-0">
                      Lorem Ipsum is simply dummy text of the printing Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s,
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-nowrap">
                    <div className="bg-secondary rounded">
                      <img
                        src="public/assets/img/testimonial-1.jpg"
                        className="img-fluid rounded"
                        style={{ width: 100, height: 100 }}
                        alt=""
                      />
                    </div>
                    <div className="ms-4 d-block">
                      <h4 className="text-dark">Client Name</h4>
                      <p className="m-0 pb-3">Profession</p>
                      <div className="d-flex pe-5">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item img-border-radius bg-light rounded p-4">
                <div className="position-relative">
                  <i
                    className="fa fa-quote-right fa-2x text-secondary position-absolute"
                    style={{ bottom: 30, right: 0 }}
                  />
                  <div className="mb-4 pb-4 border-bottom border-secondary">
                    <p className="mb-0">
                      Lorem Ipsum is simply dummy text of the printing Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s,
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-nowrap">
                    <div className="bg-secondary rounded">
                      <img
                        src="public/assets/img/testimonial-1.jpg"
                        className="img-fluid rounded"
                        style={{ width: 100, height: 100 }}
                        alt=""
                      />
                    </div>
                    <div className="ms-4 d-block">
                      <h4 className="text-dark">Client Name</h4>
                      <p className="m-0 pb-3">Profession</p>
                      <div className="d-flex pe-5">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-item img-border-radius bg-light rounded p-4">
                <div className="position-relative">
                  <i
                    className="fa fa-quote-right fa-2x text-secondary position-absolute"
                    style={{ bottom: 30, right: 0 }}
                  />
                  <div className="mb-4 pb-4 border-bottom border-secondary">
                    <p className="mb-0">
                      Lorem Ipsum is simply dummy text of the printing Ipsum has
                      been the industry's standard dummy text ever since the
                      1500s,
                    </p>
                  </div>
                  <div className="d-flex align-items-center flex-nowrap">
                    <div className="bg-secondary rounded">
                      <img
                        src="public/assets/img/testimonial-1.jpg"
                        className="img-fluid rounded"
                        style={{ width: 100, height: 100 }}
                        alt=""
                      />
                    </div>
                    <div className="ms-4 d-block">
                      <h4 className="text-dark">Client Name</h4>
                      <p className="m-0 pb-3">Profession</p>
                      <div className="d-flex pe-5">
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                        <i className="fas fa-star text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      {/* Tastimonial End */}
    </div>
  );
}

export default Tastimonial;
