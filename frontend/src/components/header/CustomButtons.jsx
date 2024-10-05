import { useState, useContext } from "react";
import {
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
  Divider,
  styled,
  useMediaQuery,
} from "@mui/material";
import {
  ShoppingCart,
  ArrowDropDown,
  Notifications,
  Support,
  Storefront,
  AdUnits,
  Download,
  ExitToApp,
  AccountCircle,
} from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../login/LoginDialog";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import {
  ADVERTISE_ON_FLIPKART,
  BECOME_SELLER_URL,
  CUSTOMER_CARE,
  DOWNLOAD_APP_URL,
  NOTIFICATION_PREF_URL,
} from "../../constants/data";
import { useTheme } from "@mui/material/styles";

const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& > *": {
    marginRight: "40px !important",
    fontSize: 16,
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
    margin: "10px 15px",
    "& > *": {
      background: "lightgrey",
      margin: "10px 0",
      borderRadius: "5px",
      padding: "10px",
      "&:hover": {
        background: "#d3d3d3",
        transform: "scale(1.02)",
      },
    },
  },
}));

const LoginButton = styled(Button)`
  text-transform: none;
  padding: 5px 30px;
  border-radius: 1px;
  box-shadow: none;
  height: 32px;
  font-weight: 550;
`;

const CustomButtons = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { account, setAccount } = useContext(DataContext);

  const theme = useTheme();
  const isMediumOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const openDialog = (event) => {
    setOpen(true);
    event.stopPropagation();
  };
  const handleDropdownOpen = (event) => setAnchorEl(event.currentTarget);
  const handleDropdownClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAccount(null);
    handleDropdownClose();
  };

  return (
    <Wrapper>
      {account ? (
        <Box display="flex" alignItems="center">
          <AccountCircle fontSize="small" sx={{ marginRight: 1 }} />{" "}
          <Profile account={account} setAccount={setAccount} />
        </Box>
      ) : (
        <LoginButton
          onClick={openDialog}
          style={{
            background: "white",
            marginRight: 40,
          }}
        >
          Login
        </LoginButton>
      )}

      {!isMediumOrSmaller && (
        <>
          <Button
            variant="text"
            endIcon={<ArrowDropDown />}
            onClick={handleDropdownOpen}
            style={{ textTransform: "none", color: "white" }}
          >
            More
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={handleDropdownClose}>
              <a
                href={NOTIFICATION_PREF_URL}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Notifications
                  fontSize="small"
                  sx={{ color: "blue", marginRight: 1 }}
                />
                Notification Preferences
              </a>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDropdownClose}>
              <a
                href={BECOME_SELLER_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Storefront
                  fontSize="small"
                  sx={{ color: "blue", marginRight: 1 }}
                />
                Sell on Flipkart
              </a>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDropdownClose}>
              <a
                href={CUSTOMER_CARE}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Support
                  fontSize="small"
                  sx={{ color: "blue", marginRight: 1 }}
                />
                24x7 Customer Care
              </a>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDropdownClose}>
              <a
                href={ADVERTISE_ON_FLIPKART}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AdUnits
                  fontSize="small"
                  sx={{ color: "blue", marginRight: 1 }}
                />
                Advertise
              </a>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleDropdownClose}>
              <a
                href={DOWNLOAD_APP_URL}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Download
                  fontSize="small"
                  sx={{ color: "blue", marginRight: 1 }}
                />
                Download App
              </a>
            </MenuItem>

            {account && (
              <>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ExitToApp
                    fontSize="small"
                    sx={{ color: "blue", marginRight: 1 }}
                  />
                  <Typography>Logout</Typography>
                </MenuItem>
              </>
            )}
          </Menu>
        </>
      )}

      <Link
        to="/cart"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ShoppingCart />
        <Typography>Cart</Typography>
      </Link>

      <LoginDialog open={open} setOpen={setOpen} />
    </Wrapper>
  );
};

export default CustomButtons;
