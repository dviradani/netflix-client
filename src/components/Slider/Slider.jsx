import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper/modules";
import SliderItem from "../SliderItem/SliderItem";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "./Slider.scss";

const Slider = ({ contentList, title }) => {
  const [loadedContent, setLoadedContent] = useState([]);

  useEffect(() => {
    async function fetchContent() {
      if (typeof contentList === "function") {
        const data = await contentList();
        setLoadedContent(data);
      } else {
        setLoadedContent(contentList);
      }
    }

    fetchContent();
  }, [contentList]);
  return (
    <>
      {loadedContent && loadedContent.length > 0 && (
        <div className="slider-container">
          <h1>{title}</h1>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            breakpoints={{
              480: {
                slidesPerView: 1,
              },
              500: {
                spaceBetween: 4,
                slidesPerGroup: 2,
                slidesPerView: 2,
              },
              1024: {
                spaceBetween: 6,
                slidesPerGroup: 3,
                slidesPerView: 3,
              },
              1280: {
                spaceBetween: 8,
                slidesPerGroup: 4,
                slidesPerView: 4,
              },
              1480: {
                spaceBetween: 10,
                slidesPerGroup: 5,
                slidesPerView: 5,
              },
            }}
            navigation={{
              disabledClass: "disabled_swiper_button",
            }}
            scrollbar={{ draggable: true }}
            loop={true}
          >
            {loadedContent.map((content, i) => (
              <SwiperSlide key={i}>
                <SliderItem content={content} title={title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Slider;
