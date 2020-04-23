import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar'
import Homescreen from './components/Homescreen'
import ScratchPadContainer from './containers/ScratchPadContainer';
import PostsContainer from './containers/PostsContainer';
import PostShowPage from './containers/PostShowPage';
import ProfilePage from './containers/ProfilePage';
import NewUserForm from './components/NewUserForm';
import LoginForm from './components/LoginForm';
import NewPostForm from './components/NewPostForm';
import {connect} from 'react-redux'
import {fetchingPosts} from './redux/actions'


class App extends React.Component {

  componentDidMount() {
    this.props.fetchingPosts()
  }

  render() {return ( 
    <div>
      <Navbar />
        <Switch>
          <Route exact path = "/" component = {Homescreen} />
          <Route exact path = "/scratchpads/:id" component = {ScratchPadContainer} />
          <Route exact path = "/posts" component = {PostsContainer} />
          <Route exact path = "/posts/new" component = {NewPostForm} />
          <Route exact path = "/posts/:id" component = {PostShowPage} />
          <Route exact path = "/profile" component = {ProfilePage} />
          <Route exact path = "/users/new" component = {NewUserForm} />
          <Route exact path = "/login" component = {LoginForm} />
        </Switch>
      </div>
  )}
}

const mapDispatchToProps = dispatch => {
  return ({
    fetchingPosts: () => {dispatch(fetchingPosts())}
  })
}

export default withRouter(connect(null, mapDispatchToProps)(App))

