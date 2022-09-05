import React from "react";
import Slider from "react-slick";
var settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  swipeToSlide: true,
  autoplay: true,
  arrows: false,
  centerPadding: "60px",
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        dots: true,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '20px',
        slidesToScroll: 1
      },
    },
  ],
};
const Slider1 = () => {
  const data = [
    {
      id: 1,
      image: "images/app1.jpg",
    },
    {
      id: 2,
      image: "images/app2.jpg",
    },
    {
      id: 3,
      image: "images/app3.jpg",
    },
    {
      id: 4,
      image: "images/app4.jpg",
    },
    {
      id: 5,
      image: "images/app5.jpg",
    },
    {
      id: 6,
      image: "images/app6.jpg",
    },
    {
      id: 7,
      image: "images/app7.jpg",
    },
    {
      id: 8,
      image: "images/app8.jpg",
    },
    {
      id: 9,
      image: "images/app9.jpg",
    },
    {
      id: 10,
      image: "images/app10.jpg",
    },
  ];
  return (
    <section className="app-showcase" id="showcase">
      <div className="container">
        <h2>App Showcase</h2>
        <div className="regular center slider app-slider slick-initialized slick-slider slick-dotted">
          <Slider {...settings}>
            {data.map((item, index) => {
              return (
                <div key={index} className="regular center slider">
                  <img
                    className="img-fluid"
                    // style={{ maxWidth: "96%" }}
                    src={item.image}
                    alt="slider"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};
export default Slider1;
