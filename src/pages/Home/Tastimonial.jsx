import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Tastimonial.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../redux/slice/Tastimonial.slice";
import Rating1 from "../../Admin/components/Rating/Rating1";
import { Rating } from "@mui/material";

function Tastimonial() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const tastimonialData = useSelector((state) => state.tastimonial);
  console.log(tastimonialData.tastimonial);

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
            {tastimonialData.tastimonial.map((v, i) => (
              <SwiperSlide key={i}>
                <div className="testimonial-item img-border-radius bg-light rounded p-4">
                  <div className="position-relative">
                    <i
                      className="fa fa-quote-right fa-2x text-secondary position-absolute"
                      style={{ bottom: 30, right: 0 }}
                    />
                    <div className="mb-4 pb-4 border-bottom border-secondary">
                      <p className="mb-0">{v.description}</p>
                    </div>
                    <div className="d-flex align-items-center flex-nowrap">
                      <div className="bg-secondary rounded">
                        <img
                          src={`../public/assets/img/${v.tastimonial_image}`}
                          className="img-fluid rounded"
                          style={{ width: 100, height: 100 }}
                          alt=""
                        />
                      </div>
                      <div className="ms-4 d-block">
                        <h4 className="text-dark">{v.name}</h4>
                        <p className="m-0 pb-3">{v.profession}</p>

                        <div className="d-flex pe-5">
                          <Rating
                            name="size-medium"
                            className="text-primary"
                            defaultValue={v.half_rating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Tastimonial End */}
    </div>
  );
}

export default Tastimonial;
