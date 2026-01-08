import { useEffect, useState } from "react";
import "../styles/Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    image: "/c1.webp",
  },
  {
    image: "/c2.webp",
  },
  {
    image: "/c3.webp",
  },
  {
    image: "/c4.webp",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="carousel">
      {/* SLIDES */}
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide.image} alt="banner" />
          </div>
        ))}
      </div>

      {/* ARROWS */}
      <button className="arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* INDICATORS */}
      <div className="indicators">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
