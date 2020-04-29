// import React from 'react'
// import {connect} from 'react-redux'
// import {logoutUser} from '../redux/actions'


// class Navbar extends React.Component {

// handleOnClickConnect = () => {
//     window.location = 'http://localhost:3001/posts'
// }

// handleOnClickScratchPad = () => {
//     window.location = `http://localhost:3001/scratchpads/new`
// }

// handleOnClickMathLab = () => {
//     window.location = 'http://localhost:3001/'
// }

// handleOnClickLogin = () => {
//     window.location = 'http://localhost:3001/login'
// }

// handleOnClickMyAccount = () => {
//     window.location = 'http://localhost:3001/profile'
// }

// handleOnClickLogout = () => {
//     window.location = 'http://localhost:3001/'
//     this.props.logoutUser(this.props.user)
// }

// render() {
//     return(
//         <div>
//             <button onClick = {this.handleOnClickConnect}>Connect()</button>
//             <button onClick = {this.handleOnClickScratchPad}>ScratchPad</button>
//             <button onClick = {this.handleOnClickMathLab}>ma+hLab</button>
//             {this.props.user?  <button onClick = {this.handleOnClickMyAccount}>MyAccount</button> : null}
//             {this.props.user?  <button onClick = {this.handleOnClickLogout}>Logout</button> : <button onClick = {this.handleOnClickLogin}>Login</button>}
//         </div>
// )}
// }

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// }

// export default connect(mapStateToProps, {logoutUser})(Navbar)

import React from 'react'
import {connect} from 'react-redux'
import {logoutUser, updateFilterSubject, updateSearchTerm} from '../redux/actions'
import { Link, NavLink, withRouter } from 'react-router-dom'


class Navbar extends React.Component {


handleOnClickLogout = () => {
    this.props.logoutUser()
}

handleOnClickConnect = () => {
    this.props.updateFilterSubject("")
    this.props.updateSearchTerm("")
}
      
render() {
    return(
        <div>
            <Link to="/"><h2>ma+hLab</h2></Link>

            <NavLink to="/posts" onClick = {this.handleOnClickConnect}><h3 >Connect()</h3></NavLink>

            <NavLink exact to={`/scratchpads/${Date.now()}`}><h3>ScratchPad</h3></NavLink>

            {this.props.user? <NavLink exact to="/profile"><h3>MyAccount</h3></NavLink>: null}
           
            {this.props.user? <NavLink exact to="/" onClick = {this.handleOnClickLogout}><h3 className="ui header">Logout</h3></NavLink>: 
            <NavLink exact to="/login" activeClassName="active item" className="item">
            <h3 className="ui header">Login</h3>
            </NavLink>}
            
    </div>
)}
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps,{logoutUser, updateFilterSubject, updateSearchTerm})(Navbar))
