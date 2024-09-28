import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  styled,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Search from "./Search";
import CustomButtons from "./CustomButtons";
import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { useState } from "react";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
  box-shadow: none;
`;

const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration: none;
  color: inherit;
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const PlusImage = styled("img")({
  width: "10px",
  height: "10px",
  marginLeft: "4px",
});

const CustomButtonWrapper = styled("span")(({ theme }) => ({
  margin: "0 5% 0 auto",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    display: "block",
  },
}));

const Header = () => {
  const LOGO_URL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const SUB_URL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const list = () => {
    return (
      <Box style={{ width: 200 }} onClick={handleCloseDrawer}>
        <List>
          <ListItem button>
            <CustomButtons />
          </ListItem>
        </List>
      </Box>
    );
  };

  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: "55px" }}>
        <MenuButton color="inherit" onClick={handleOpenDrawer}>
          <Menu />
        </MenuButton>
        <Drawer open={open} onClose={handleCloseDrawer}>
          {list()}
        </Drawer>
        <Component to="/">
          <img src={LOGO_URL} alt="logo" style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore&nbsp;
              <Box component="span" style={{ color: "#FFE500" }}>
                Plus
              </Box>
            </SubHeading>
            <PlusImage src={SUB_URL} alt="sub-logo" />
          </Box>
        </Component>
        <Search />
        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
