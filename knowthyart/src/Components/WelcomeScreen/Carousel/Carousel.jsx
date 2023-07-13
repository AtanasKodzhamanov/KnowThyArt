import React, { useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = ({ images }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const scrollAmount = 1;
    let scrollLeft = 0;

    const step = () => {
      scrollLeft += scrollAmount;
      if (scrollLeft >= carousel.scrollWidth / 2) {
        scrollLeft = 0;
      }
      carousel.scrollLeft = scrollLeft;
      requestAnimationFrame(step);
    };

    step();
  }, []);

  return (
    <div ref={carouselRef} className="carousel">
      <div className="carousel-images">
        {images.map((src, i) => (
          <img key={i} src={src} alt="" />
        ))}
        {images.map((src, i) => (
          <img key={i + images.length} src={src} alt="" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
