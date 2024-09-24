import { useState, useContext } from "react";
import { Height, Password, ShuffleOnSharp } from "@mui/icons-material";
import {
  Box,
  Dialog,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";

import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
const Component = styled(Box)`
  height: 75vh;
  width: 90vh;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  height: 83%;
  width: 28%;
  padding: 45px 35px;
  & > p,
  & h5 {
    color: #ffff;
    font-weight: 600;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #ffff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your orders, wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here! ",
    subHeading: "Sign up with your mobile number to get started",
  },
};

const signUpInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const loginInitial = {
  username: "",
  password: "",
};

const LoginDialog = ({ open, setOpen }) => {
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [signup, setSignup] = useState(signUpInitialValues);
  const [login, setLogin] = useState(loginInitial);
  const [error, setError] = useState(false);
  const { setAccount } = useContext(DataContext);

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError(false);
  };

  const toggleSignUp = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    console.log(response);
    if (!response) return;
    handleClose();
    setAccount(signup.firstname);
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    const response = await authenticateLogin(login);
    console.log(response.data.data);
    if (response.status === 200) {
      handleClose();
      setAccount(response.data.data.firstname);
    } else {
      setError(true);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: "20px" }}>
              {account.subHeading}
            </Typography>
          </Image>

          {account.view === "login" ? (
            <Wrapper>
              <TextField
                variant="standard"
                label="Enter Username"
                name="username"
                onChange={(e) => onValueChange(e)}
              />
              {error && (
                <Error>Please enter valid username and password.</Error>
              )}
              <TextField
                variant="standard"
                name="password"
                label="Enter Password"
                onChange={(e) => onValueChange(e)}
              />
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy{" "}
                Policy.
              </Text>
              <LoginButton onClick={() => loginUser()}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={() => toggleSignUp()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                name="firstname"
                onChange={(e) => onInputChange(e)}
                label="Enter Firstname"
              />
              <TextField
                variant="standard"
                name="lastname"
                onChange={(e) => onInputChange(e)}
                label="Enter Lastname"
              />
              <TextField
                variant="standard"
                name="username"
                onChange={(e) => onInputChange(e)}
                label="Enter Username"
              />
              <TextField
                variant="standard"
                name="email"
                onChange={(e) => onInputChange(e)}
                label="Enter Email"
              />
              <TextField
                variant="standard"
                name="password"
                onChange={(e) => onInputChange(e)}
                label="Enter Password"
              />
              <TextField
                variant="standard"
                name="phone"
                onChange={(e) => onInputChange(e)}
                label="Enter Phone"
              />
              <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
