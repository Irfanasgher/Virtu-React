jQuery(document).ready(function ($) {
  $(".app-slider").slick({
    dots: true,
    prevArrow: false,
    nextArrow: false,
    infinite: true,
    speed: 300,
    swipeToSlide: true,
    slidesToShow: 3,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: "60px",
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "40px",
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: true,
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "40px",
          slidesToScroll: 1,
        },
      },
    ],
  });
});

// $(".open-menu").on("click", function () {
//   $("body").addClass("noscroll");
// });
// $(".close-menu").on("click", function () {
//   alert(123);
//   $("body").removeClass("noscroll");
//   $(".header-menu").collapse("show");
// });

// $(".navbar-collapse a").on("click", function () {
//   $(".navbar-collapse").collapse("hide");
//   $("body").removeClass("noscroll");
// });
