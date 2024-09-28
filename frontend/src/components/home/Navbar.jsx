import { Box, styled, Typography } from "@mui/material";
import { navData } from "../../constants/data";

const Component = styled(Box)(({ theme }) => ({
  display: " flex",
  margin: "65px 10px 0 10px",
  padding: "0 50px 0 50px",
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
  font-weight: 600;
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
