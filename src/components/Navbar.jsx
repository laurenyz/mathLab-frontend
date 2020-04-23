import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, NavLink, withRouter } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// function ButtonAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" className={classes.title}>
//             ma+hLab
//           </Typography>
//           <NavLink to = "/scratchpads/new">
//             <Button onClick = {handleOnClickScratchPad} color="inherit">ScratchPad</Button>
//           </NavLink>
//           <NavLink to = "/posts">
//             <Button color="inherit">Connect()</Button>
//           </NavLink>
//           <NavLink to = "/login">
//             <Button color="inherit">Login</Button>
//           </NavLink>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

// export default withRouter(ButtonAppBar)

class Navbar extends React.Component {

handleOnClickConnect = () => {
    window.location = 'http://localhost:3001/posts'
}

handleOnClickScratchPad = () => {
    window.location = `http://localhost:3001/scratchpads/new`
}

handleOnClickMathLab = () => {
    window.location = 'http://localhost:3001/'
}

handleOnClickLogin = () => {
    window.location = 'http://localhost:3001/login'
}

render() {
    return(
        <div>
            <button onClick = {this.handleOnClickConnect}>Connect()</button>
            <button onClick = {this.handleOnClickScratchPad}>ScratchPad</button>
            <button onClick = {this.handleOnClickMathLab}>ma+hLab</button>
            <button onClick = {this.handleOnClickLogin}>Login</button>
        </div>
)}

}

export default Navbar