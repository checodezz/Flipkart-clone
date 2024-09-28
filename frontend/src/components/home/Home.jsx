import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import { Box, styled } from "@mui/material";
import { useEffect } from "react";

const Component = styled(Box)`
  padding: 10px;
  background: #f2f2f2;
`;

const Home = () => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Component>
        <Banner />
        <MidSlide products={products} title="Deal of the Day" timer={true} />
        <MidSection />
        <Slide products={products} title="Discounts for You" timer={false} />
        <Slide products={products} title="Suggested Items" timer={false} />
        <Slide products={products} title="Top Selection" timer={false} />
        <Slide products={products} title="Trending Offers" timer={false} />
        <Slide products={products} title="Season's Top Picks" timer={false} />
        <Slide
          products={products}
          title="Top Deals on Accessories"
          timer={false}
        />
      </Component>
    </>
  );
};

export default Home;
