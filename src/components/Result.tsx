import { Button, Container, List, ListItem, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ClearState } from "../redux/slices";
import { Navigate, useNavigate } from "react-router-dom";
import { countMatchingELements } from "../utils/features";

const result = ["Lol", "Sample", "Ans"];
const words = [
  {
    meaning: "asdfg",
  },
  {
    meaning: "adsfgghtyuj",
  },
];
const Result = () => {
    const {words,result} = useSelector((state:{
        root: StateType 
     })=>state.root);
     const dispatch = useDispatch();
     const navigate = useNavigate();
  const correctAns = countMatchingELements(result,words.map(word=>word.meaning));
  const percentage = (correctAns / words.length) * 100;
  const resetHandler = ():void=>{
    dispatch(ClearState());
    navigate("/")
  }
  return (
    <Container>
      <Typography variant="h3" color={"secondary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography m={"1rem"} variant="h6">
        You got {correctAns} right out of {words.length}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Your Ans
          </Typography>
          <List>
            {result.map((i, idx) => (
              <ListItem key={idx}>
                {idx + 1}-{i}
              </ListItem>
            ))}
          </List>
        </Stack>
      <Stack>
      <Typography m={"1rem 0"} variant="h5">Correct Ans</Typography>
      <List>
        {words.map((i,idx)=>(
            <ListItem key={idx}>
                {idx+1} - {i.meaning}
            </ListItem>
        ))}
      </List>
      </Stack>
      </Stack>
      <Typography m={"1rem"} variant="h5" color={percentage>50?"green":"red"}>
        {percentage>50?"Pass":"Fail"}
      </Typography>
      <Button onClick={resetHandler} sx={{margin:"1rem",backgroundColor:"primary",color: "secondary.main"}} variant="contained" >Reset</Button>
    </Container>
  );
};

export default Result;
