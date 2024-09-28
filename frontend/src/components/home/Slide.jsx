import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Countdown from "react-countdown";
import { Box, Typography, Button, Divider, styled } from "@mui/material";
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

// Styling for the main component
const Component = styled(Box)`
  margin-top: 10px;
  background-color: #ffffff;
`;

const Deal = styled(Box)`
  padding: 15px 20px;
  display: flex;
`;

const Timer = styled(Box)`
  display: flex;
  margin-left: 10px;
  align-items: center;
  color: #7f7f7f;
`;

const DealText = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  margin-right: 25px;
  line-height: 32px;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #2874f0;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
`;

const ProductContainer = styled(Box)`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
`;

// Styling for the product image
const Image = styled("img")({
  width: "auto",
  height: 150,
  marginBottom: "10px", // Space between image and text
});

// Styling for product text
const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
  line-height: 1.5;
  word-wrap: break-word; // To prevent overflow of long text
`;

const Slide = ({ products, title, timer }) => {
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <Box variant="span">
        {hours} : {minutes} : {seconds} Left
      </Box>
    );
  };

  return (
    <Component>
      <Deal>
        <DealText>{title}</DealText>
        {timer && (
          <Timer>
            <img
              src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg"
              alt="timer"
              style={{ width: "24px" }}
            />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Timer>
        )}
        <ViewAllButton variant="contained" color="primary">
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            View All
          </Link>
        </ViewAllButton>
      </Deal>
      <Divider />
      <Carousel
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
      >
        {products.map((product) => (
          <Link
            key={product._id}
            to={`productDetail/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <ProductContainer>
              <Image src={product.url} alt="product" />
              <Text style={{ fontWeight: 600, color: "#212121" }}>
                {product.title.shortTitle}
              </Text>
              <Text style={{ color: "green" }}>{product.discount}</Text>
              <Text style={{ color: " #212121", opacity: 0.6 }}>
                {product.tagline}
              </Text>
            </ProductContainer>
          </Link>
        ))}
      </Carousel>
    </Component>
  );
};

export default Slide;
