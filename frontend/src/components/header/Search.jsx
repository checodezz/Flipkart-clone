import { Box, InputBase, List, ListItem, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/features/products/productSlice";
import { Link } from "react-router-dom";
const SearchContainer = styled(Box)`
  background: #fff;
  width: 38%;
  border-radius: 2px;
  margin-left: 15px;
  display: flex;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
  color: lightgrey;
  padding: 5px;
  margin-top: 3px;
  margin-right: 10px;
  display: flex;
`;

const ListWrapper = styled(List)`
  position: absolute;
  background: #ffffff;
  color: #000;
  margin-top: 36px;
`;

const Search = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);

  const getText = (text) => {
    setText(text);
  };
  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for Products, Brands and More"
        value={text}
        onChange={(e) => getText(e.target.value)}
      />
      <SearchIconWrapper>
        <SearchIcon fontSize="medium" />
      </SearchIconWrapper>

      {text && (
        <ListWrapper>
          {products
            .filter((product) =>
              product.title.longTitle.toLowerCase().includes(text.toLowerCase())
            )
            .map((product) => (
              <ListItem>
                <Link
                  to={`productDetail/${product._id}`}
                  onClick={() => setText("")}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {product.title.longTitle}
                </Link>
              </ListItem>
            ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;
