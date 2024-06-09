import { AppBar, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"
const styles = {
    color:"#1F51FF",
    margin:"0.25rem",
    textDecoration:"none",
}
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography color={"secondary"} variant="h5" mr={"auto"} textTransform={"uppercase"} fontWeight={"600"}>WordWise</Typography>
        <Link style={styles} to={"/"}>Home</Link>
        <Link style={styles}to={"/login"}>Login</Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
