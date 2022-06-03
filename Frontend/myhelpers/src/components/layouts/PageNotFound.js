import { Box } from "@mui/system";
import { Grid} from '@mui/material';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

export default function PageNotFound() {
  const navigate = useNavigate()
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
            src={require("./pagenotfound4.gif")}
            alt="Page No Found..."
            height={"100%"}
            width={"60%"}
            align="center"
        />
        </Box>
        <Grid container style={{ opacity: 1.0, position: "absolute", top: "25%" }} justifyContent="center">
          <Grid item xs={1} sm={1} md={1} align="left" >
          <Button variant="contained" sx={{ backgroundColor: "#163758",height:50 }} fullWidth onClick={() => navigate("/")}><ArrowBackIosRoundedIcon />Back</Button>
          </Grid>
        </Grid>
      </Box>
    
  );
}
