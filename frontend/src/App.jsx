import "./App.css";
import AllProducts from "./components/products/AllProducts";
import DetailView from "./components/details/DetailView";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/home/Footer";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productDetail/:id" element={<DetailView />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
