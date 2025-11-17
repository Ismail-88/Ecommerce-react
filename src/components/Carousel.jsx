import React, {  useEffect } from "react";
import { DataContext, getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category";

const Carousel = () => {
//   const { data, fetchAllProducts } = useContext(DataContext);
  const { data, fetchAllProducts } = getData();

  const SamplePrevArrow = (props) => {
    const { className, onClick, style } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowLeft
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            left: "50px"
          }}
          onMouseOver={"this.style.backgroundColor=#555"}
        />
      </div>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick, style } = props;
    return (
      <div
        onClick={onClick}
        className={`arrow ${className}`}
        style={{ zIndex: 3 }}
      >
        <AiOutlineArrowRight
          className="arrows"
          style={{
            ...style,
            display: "block",
            borderRadius: "50px",
            background: "#f53347",
            color: "white",
            position: "absolute",
            padding: "2px",
            right: "50px"
          }}
          onMouseOver={"this.style.backgroundColor=#555"}
        />
      </div>
    );
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  var settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    pauseOnHover: false,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow to="next" />,
    prevArrow: <SamplePrevArrow to="prev" />,
  };

  return (
    <div>
      <Slider {...settings} className="overflow-hidden">
        {data?.slice(20, 27).map((item, index) => {
          return (
            <div
              key={index}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] 
              z-10"
            >
              <div className=" max-w-7xl mx-auto flex flex-col md:flex-row my-20 md:my-0 gap-10 justify-around h-[600px] items-center px-4 ">
                <div className="  md:space-y-6 space-y-3">
                  <h3 className="text-red-500 font-semibold font-sans txt-sm">
                    Powering your world with the Best in Electronics
                  </h3>
                  <h1 className="md:text-4xl text-xl font-bold line-clamp-3 md:w-[500px] text-white">
                    {item.title}
                  </h1>
                  <p className="md:w-[500px] line-clamp-3 text-gray-400 pr-7">
                    {item.description}
                  </p>
                  <button className="bg-gradient-to-r from-red-500 to-purple-500 px-3 py-2 rounded-md cursor-pointer text-white mt-2">
                    Shop Now
                  </button>
                </div>
                <div>
                  <img
                    src={item.images}
                    alt={item.title}
                    className="rounded-full w-[550px] h-[550px] shadow-xl shadow-red-400 transition-all"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      <Category/>
    </div>
  );
};

export default Carousel;
