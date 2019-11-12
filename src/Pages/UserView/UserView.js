import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../Shared/Post/Post';
import UserModel from '../../Models/UserModel';

class UserView extends Component {
    state = { 
        postsList: [],
        userData: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: ""
        }
     }

    componentDidMount() {
        this.getUserPostsList();
        this.getUserData();
    }

    getUserId() {
        return this.props.location.pathname.split("/")[2];
    }

    getUserPostsList() {
        const url = "https://rujewitpltest.herokuapp.com/treative/userPosts/" + this.getUserId();
        axios.get(url)
        .then(res => {
            console.log(res);
            const newUsersList = res.data;
            this.setState({postsList: newUsersList})

        }, err => {
            this.props.reportActivity("error");
        });
    }
    
    getUserData() {
        const url = "https://rujewitpltest.herokuapp.com/treative/user/" + this.getUserId();
        axios.get(url)
        .then(res => {
            this.setState({userData: res.data});
            console.log(this.state);

        }, err => {
            this.props.reportActivity("error");
        });
    }

    render() { 
        let userPostsToDisplay = [];

        this.state.postsList.forEach((post,i) => {
            userPostsToDisplay.push(<Post 
            key={i} postData={post} 
            reportActivity={a => {this.props.reportActivity(a)}}
            reloadPosts={() => {this.getUserPostsList()}} />);
        });

        let userData = [];

        UserModel.forEach(el => {
            userData.push(
            <div className="data" key={el.name}>
                <div className="type">{el.displayName}</div>
                <div className="value">{this.state.userData[el.name]}</div>
            </div>);
        });

        return ( 
            <div className="UserView">
                <div className="userData">
                    {userData}
                </div>
                <div className="posts">
                    {userPostsToDisplay}
                </div>
            </div>
         );
    }
}
 
export default UserView;