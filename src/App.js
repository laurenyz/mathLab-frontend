import React from 'react'
import {Route, Switch, withRouter, Redirect} from "react-router-dom"
import './App.css'
import Navbar from './components/Navbar'
import Homescreen from './components/Homescreen'
import ScratchPadContainer from './containers/ScratchPadContainer'
import PostsContainer from './containers/PostsContainer'
import PostShowPage from './containers/PostShowPage'
import ProfilePage from './containers/ProfilePage'
import NewUserForm from './components/NewUserForm'
import LoginForm from './components/LoginForm'
import NewPostForm from './components/NewPostForm'
import {connect} from 'react-redux'
import {fetchingPosts, fetchUser} from './redux/actions'


class App extends React.Component {

  componentDidMount() {
    console.log("app is mounting")
    this.props.fetchingPosts()
    if (localStorage.getItem('jwt')) {
      console.log("getting user")
      this.props.fetchUser()
    }
  }

  render() {return ( 
    <div>
      <Navbar />
        <Switch>
          <Route exact path = "/" component = {Homescreen} />
          <Route exact path = "/scratchpads/:id" component = {ScratchPadContainer} />
          <Route exact path = "/posts" component = {PostsContainer} />
          <Route exact path = "/posts/new" component = {NewPostForm} />
          <Route exact path = "/posts/:id" render= {(props) => {
                let postId = parseInt(props.match.params.id)
                let foundPost = this.props.posts.find(p => p.id === postId)
                return <PostShowPage post = {foundPost} />
          }} />
          <Route exact path = "/profile" render= {() => (this.props.user ? <ProfilePage /> :<Redirect to="/" /> )}/>
          <Route exact path = "/users/new" render= {() => (this.props.user ? <Redirect to="/profile"/> : <NewUserForm /> )}/>
          <Route exact path = "/login" render= {() => (this.props.user ? <Redirect to="/profile"/> : <LoginForm /> )}/>
        </Switch>
      </div>
  )}
}

const mapStateToProps = state => {
  return ({
    posts: state.posts,
    user: state.user
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    fetchUser: () => {dispatch(fetchUser())},
    fetchingPosts: () => {dispatch(fetchingPosts())},
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

