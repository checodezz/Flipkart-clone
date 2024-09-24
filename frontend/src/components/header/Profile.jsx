import { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  styled,
  ClickAwayListener,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Component = styled(Menu)`
  margin-top: 5px;
`;

const Logout = styled(Typography)`
  font-size: 14px;
  margin-left: 20px;
  display: flex;
  align-items: center; /* Align the text and icon vertically */
`;

const StyledIcon = styled(PowerSettingsNewIcon)`
  margin-right: 8px; /* Add margin to move the icon */
`;

const Profile = ({ account, setAccount }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutUser = () => {
    setAccount("");
  };

  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ marginTop: 2, cursor: "pointer" }}>
          {account}
        </Typography>
        <Component anchorEl={open} open={Boolean(open)} onClose={handleClose}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuItem
              onClick={() => {
                handleClose();
                logoutUser();
              }}
            >
              <Logout>
                <StyledIcon color="primary" fontSize="small" />
                Logout
              </Logout>
            </MenuItem>
          </ClickAwayListener>
        </Component>
      </Box>
    </>
  );
};

export default Profile;
