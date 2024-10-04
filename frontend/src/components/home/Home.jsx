import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSection from "./MidSection";
import { Box, styled } from "@mui/material";
import { useEffect } from "react";

const Component = styled(Box)`
  padding: 10px;
  background: #f2f2f2;
`;

const Image = styled("img")(({ theme }) => ({
  marginTop: 10,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    objectFit: "cover",
    height: "120px",
  },
}));

const getRandomProducts = (products, count) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Home = () => {
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const url =
    "https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50";

  // Generate different product sets for each slide
  const dealOfTheDay = getRandomProducts(products, 5); // Adjust the count as needed
  const discountsForYou = getRandomProducts(products, 5);
  const suggestedItems = getRandomProducts(products, 5);
  const topSelection = getRandomProducts(products, 5);
  const trendingOffers = getRandomProducts(products, 5);

  return (
    <>
      <Navbar />
      <Component>
        <Banner />
        <Slide
          products={discountsForYou}
          title="Deal of the Day"
          timer={false}
        />
        <Slide
          products={suggestedItems}
          title="Suggested Items"
          timer={false}
        />
        <MidSection />

        <Slide
          products={trendingOffers}
          title="Trending Offers"
          timer={false}
        />
        <Image src={url} alt="covid" />
        <Slide products={topSelection} title="Suggested Items" timer={false} />
      </Component>
    </>
  );
};

export default Home;
