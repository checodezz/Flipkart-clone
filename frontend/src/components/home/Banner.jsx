import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from "../../constants/data";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Custom left arrow
const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg w-10 h-24 flex items-center justify-center text-black text-2xl hover:bg-gray-100 border-none"
      onClick={onClick}
    >
      &#8249; {/* Left arrow symbol */}
    </button>
  );
};

// Custom right arrow
const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg w-10 h-24 flex items-center justify-center text-black text-2xl hover:bg-gray-100 border-none"
      onClick={onClick}
    >
      &#8250; {/* Right arrow symbol */}
    </button>
  );
};

// Banner component
const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        carouselstate="active"
        responsive={responsive}
        swipeable={false}
        draggable={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        slidesToSlide={1}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {bannerData.map((data) => (
          <img
            key={data.id}
            src={data.url}
            alt="banner"
            className="w-full h-72 object-cover" // Tailwind classes for image styling
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
