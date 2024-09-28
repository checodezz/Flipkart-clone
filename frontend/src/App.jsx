import "./App.css";
import AllProducts from "./components/products/AllProducts";
import DetailView from "./components/details/DetailView";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
