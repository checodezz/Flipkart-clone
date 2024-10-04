import { useState, useContext } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../login/LoginDialog";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0 3% 0 auto",
  "& > *": {
    marginRight: "40px !important",
    fontSize: 16,
    alignItems: "center",
  },
  [theme.breakpoints.down("lg")]: {
    display: "block",
  },
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  paddingTop: 2,
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #ffff;
  text-transform: none;
  padding: 5px 20px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
  border-radius: 1px;
`;

const CustomButtons = () => {
  const [open, setOpen] = useState(false);

  const { account, setAccount } = useContext(DataContext);

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      {account ? (
        <Profile account={account} setAccount={setAccount} />
      ) : (
        <LoginButton variant="contained" onClick={() => openDialog()}>
          Login
        </LoginButton>
      )}

      <Typography style={{ marginTop: " 3px", width: 135 }}>
        <a
          href="https://seller.flipkart.com/sell-online?utm_source=fkwebsite&utm_medium=websitedirect"
          target="_blank"
        >
          {" "}
          Become a Seller
        </a>
      </Typography>
      <Typography>
        <Link to="/wishlist">
          <FavoriteBorderIcon />
        </Link>
      </Typography>
      <Link style={{ textDecoration: "none" }} to="/cart">
        <Container>
          <ShoppingCart />
          <Typography>Cart</Typography>
        </Container>
      </Link>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;
