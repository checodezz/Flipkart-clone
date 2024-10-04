import { useState, useContext } from "react";
import { Dialog } from "@mui/material"; // Keep this for Dialog usage
import { authenticateSignup, authenticateLogin } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

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
      <div className="flex h-[65vh] w-[90vh]">
        <div className="bg-[#2874f0] bg-[url('https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png')] bg-center bg-no-repeat bg-[85%] h-[100%] w-[38%] p-[20px]">
          <h5 className="text-white font-semibold text-xl">
            {account.heading}
          </h5>
          <p className="mt-5 text-white">{account.subHeading}</p>
        </div>

        {account.view === "login" ? (
          <div className="flex flex-col p-[25px]">
            <input
              className="border-b border-gray-400 p-2 focus:outline-none"
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={onValueChange}
            />
            {error && (
              <p className="text-[#ff6161] text-xs font-semibold mt-2">
                Please enter valid username and password.
              </p>
            )}
            <input
              className="border-b border-gray-400 p-2 focus:outline-none mt-4"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={onValueChange}
            />
            <p className="text-gray-500 text-xs mt-3">
              By continuing, you agree to Flipkart's Terms of Use and Privacy
              Policy.
            </p>
            <button
              className="bg-[#fb641b] text-white h-[48px] rounded-md mt-4"
              onClick={loginUser}
            >
              Login
            </button>
            <p className="text-center mt-4">OR</p>
            <button className="bg-white text-[#2874f0] h-[48px] rounded-md mt-4 shadow-sm">
              Request OTP
            </button>
            <p
              className="text-[#2874f0] text-sm font-semibold text-center cursor-pointer mt-4"
              onClick={toggleSignUp}
            >
              New to Flipkart? Create an account
            </p>
          </div>
        ) : (
          <div className="flex flex-col p-[25px]">
            <input
              className="border-b border-gray-400 p-2 focus:outline-none"
              type="text"
              placeholder="Enter Firstname"
              name="firstname"
              onChange={onInputChange}
            />
            <input
              className="border-b border-gray-400 p-2 focus:outline-none mt-4"
              type="text"
              placeholder="Enter Lastname"
              name="lastname"
              onChange={onInputChange}
            />
            <input
              className="border-b border-gray-400 p-2 focus:outline-none mt-4"
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={onInputChange}
            />
            <input
              className="border-b border-gray-400 p-2 focus:outline-none mt-4"
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={onInputChange}
            />
            <input
              className="border-b border-gray-400 p-2 focus:outline-none mt-4"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={onInputChange}
            />
            <input
              className="border-b border-gray-400 p-2 focus:outline-none mt-4"
              type="text"
              placeholder="Enter Phone"
              name="phone"
              onChange={onInputChange}
            />
            <button
              className="bg-[#fb641b] text-white h-[48px] rounded-md mt-4"
              onClick={signupUser}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default LoginDialog;
