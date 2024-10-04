import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slide = ({ products, title, timer }) => {
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className="font-medium">
        {hours} : {minutes} : {seconds} Left
      </span>
    );
  };

  return (
    <div className="mt-3 bg-white">
      {/* Deal Header */}
      <div className="flex p-4 items-center">
        <h2 className="text-xl font-medium mr-6">{title}</h2>
        {timer && (
          <div className="flex items-center text-gray-500 ml-4">
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg"
              alt="timer"
              className="w-6 h-6 mr-2"
            />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </div>
        )}
        <Link
          to="/products"
          className="ml-auto bg-blue-600 text-white text-sm py-2 px-4 rounded-sm hover:bg-blue-700"
        >
          VIEW ALL
        </Link>
      </div>
      <hr className="border-t" />
      {/* Product Carousel */}
      <Carousel
        carouselState="active"
        responsive={responsive}
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        centerMode={true}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        customLeftArrow={
          <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-lg w-10 h-20 text-xl text-black flex items-center justify-center">
            &#8249;
          </button>
        }
        customRightArrow={
          <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-lg w-10 h-20 text-xl text-black flex items-center justify-center">
            &#8250;
          </button>
        }
      >
        {products.map((product) => (
          <Link
            key={product._id}
            to={`productDetail/${product._id}`}
            className="text-center p-4 group"
          >
            <div className="flex flex-col items-center space-y-2 mx-9">
              <img
                src={product.url}
                alt="product"
                className="w-auto h-40 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-medium text-gray-900">
                {product.title.shortTitle}
              </span>
              <span className="text-green-600">{product.discount}</span>
              <span className="text-gray-700 opacity-80">
                {product.tagline}
              </span>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
