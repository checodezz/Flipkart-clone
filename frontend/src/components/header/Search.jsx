import { Box, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
const Search = () => {
  return (
    <SearchContainer>
      <InputSearchBase placeholder="Search for Products, Brands and More" />
      <SearchIconWrapper>
        <SearchIcon fontSize="medium" />
      </SearchIconWrapper>
    </SearchContainer>
  );
};

export default Search;
