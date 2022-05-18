import { ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import theme from "../Theme";

export default function PageNotFound() {
  return (
    <ThemeProvider  >
      {/* theme={theme}> */}
      <Box
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: "#f3dfab",
          width: "100%",
          height: "100%",
        }}
      >
        <Typography
          direction="row"
          alignItems="center"
          justifyContent="center"
          fontSize="50px"
          fontWeight="600"
          color="primary.dark"
          align="center"
        >
          Page Not Found
        </Typography>
        <Box
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginLeft="25%"
         // paddingTop="45px"
          paddingBottom="45px"
          align="center"
        >
          <img
            src={require("./pagenotfound4.gif")}
            alt="Page No Found..."
            height={500}
            width={700}
            align="center"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
