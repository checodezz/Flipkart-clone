import { useState, useContext } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../login/LoginDialog";
import Profile from "./Profile";

const Wrapper = styled(Box)`
  display: flex;
  margin: 0 3% 0 auto;
  & > button,
  & > p,
  & > div {
    margin-right: 40px;
    font-size: 16px;
    align-items: center;
  }
`;

const Container = styled(Box)`
  display: flex;
`;

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #ffff;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
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
        Become a Seller
      </Typography>
      <Typography style={{ marginTop: " 3px" }}>More</Typography>
      <Container>
        <ShoppingCart />
        <Typography>Cart</Typography>
      </Container>
      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;
