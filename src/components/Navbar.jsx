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
import {logoutUser} from '../redux/actions'
import { Link, NavLink, withRouter } from 'react-router-dom'


class Navbar extends React.Component {


handleOnClickLogout = () => {
    this.props.logoutUser()
}
      
render() {
    return(
        <div className={`ui inverted teal menu`}>
                <Link to="/" className="item">
                <h2 className="ui header">
                <i className={`paint brush icon`} />
                <div className="content">ma+hLab</div>
                </h2>
            </Link>
            <NavLink to="/posts" activeClassName="active item" className="item">
            <h3 className="ui header">Connect()</h3>
            </NavLink>
            <NavLink exact to="/scratchpads/new" activeClassName="active item" className="item">
            <h3 className="ui header">ScratchPad</h3>
            </NavLink>
            <NavLink exact to="/login" activeClassName="active item" className="item">
            <h3 className="ui header">Login</h3>
            </NavLink>
            <NavLink exact to="/" activeClassName="active item" className="item" onClick = {this.handleOnClickLogout}>
            <h3 className="ui header">Logout</h3>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="active item" className="item">
            <h3 className="ui header">MyAccount</h3>
            </NavLink>
    </div>
)}
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps,{logoutUser})(Navbar))
