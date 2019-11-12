import React, { Component } from 'react';
import './style.css';
import { Route, BrowserRouter } from "react-router-dom";
import UsersList from './Pages/UsersList/UsersList';
import NavBar from './Shared/NavBar/NavBar';
import UserFormPage from './Pages/UserFormPage/UserFormPage';
import PostsPage from './Pages/PostsPage/PostsPage';
import RecentActivityBar from './Shared/RecentActivityBar/RecentActivityBar';
import UserView from './Pages/UserView/UserView';

class App extends Component {
  state = {
    recentActivities: []
  }

  activitiesCounter = 0;

  removeActivity() {
    let updatedActivities = this.state.recentActivities;
    updatedActivities.shift();

    this.setState({recentActivities: updatedActivities});
  }

  addActivity(activity) {
    let updatedActivities = this.state.recentActivities;
    updatedActivities.push({type: activity, key: this.activitiesCounter++});
    
    this.setState({recentActivities: updatedActivities});

    setTimeout(() => {
      this.removeActivity();
    }, 5000);
  }

render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Route render={props => <RecentActivityBar {...props} activities={this.state.recentActivities} />} />

          <Route component={NavBar} />
          <Route path="/userslist" render={props => <UsersList {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/newuser" render={props => <UserFormPage {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/edituser" render={props => <UserFormPage {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/viewuser" render={props => <UserView {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
          <Route path="/" exact render={props => <PostsPage {...props} reportActivity={activity => {this.addActivity(activity)}} />} />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
