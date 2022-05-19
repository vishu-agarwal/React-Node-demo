import { ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import theme from "../Theme";

export default function UnauthorisedPage() {
    return (
        <Box
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
                backgroundColor: "#b2ebf3",
                width: "100%",
                height: "100%",
            }}
        >

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
                    src={require("./denie.gif")}
                    alt="Page No Found..."
                    height={"100%"}
                    width={700}
                    align="center"
                />
            </Box>
        </Box>

    );
}
