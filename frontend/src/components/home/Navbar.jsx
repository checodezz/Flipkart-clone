import { Box, styled, Typography } from "@mui/material";
import { navData } from "../../constants/data";

const Component = styled(Box)(({ theme }) => ({
  display: " flex",
  padding: "0 30px 0 30px",
  justifyContent: "space-between",
  overflow: "overlay",
  background: "white",
  [theme.breakpoints.down("lg")]: { margin: 0 },
}));

const Container = styled(Box)`
  padding: 12px 8px;
  text-align: center;
`;

const Text = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
`;

const Navbar = () => {
  return (
    <Component>
      {navData.map((data) => (
        <Container key={data.url}>
          <img src={data.url} alt="nav" style={{ width: "64px" }} />
          <Text>{data.text}</Text>
        </Container>
      ))}
    </Component>
  );
};

export default Navbar;
