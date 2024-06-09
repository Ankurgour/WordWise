import { Box, Button, Container, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];
const Home = () => {
    const navigate = useNavigate();
    const languageSelectHandler=(language:string):void=>{
        navigate(`/learn?language=${language}`)

    }
   
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Welcome, Begin your journey of learning{" "}
      </Typography>
      <Carousel
        navButtonsAlwaysVisible
        autoPlay={true}
        indicators={true}
      >
        {languages.map((language) => (
          <Box
            key={language.code}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Button
              onClick={() => languageSelectHandler(language.code)}
              variant="contained"
              sx={{ color: "#1F51FF", margin: "1rem", width: "80%" }}
            >
              {language.name}
            </Button>
          </Box>
        ))}
      </Carousel>
      {/* <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((i) => (
          <Button
            onClick={() => languageSelectHandler(i.code)}
            key={i.code}
            variant="contained"
            sx={{ color: "#1F51FF",width:"auto",minWidth:"unset"}}
            
          >
            {i.name}
          </Button>
        ))}
      </Stack> */}
      <Typography textAlign={"center"}>
        Choose one language from above
      </Typography>
    </Container>
  );
};

export default Home;
