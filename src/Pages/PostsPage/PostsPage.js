import React, { Component } from 'react';
import axios from 'axios';
import AddPost from './../../Shared/AddPost/AddPost';
import Post from '../../Shared/Post/Post';

class PostsPage extends Component {
    state = { 
        postsList: []
     }

    componentDidMount() {
        this.getPostsList();
    }

    getPostsList() {
        const url = "https://rujewitpltest.herokuapp.com/treative/allPosts"
        axios.get(url)
        .then(res => {
            const newPostsList = res.data;
            this.setState({postsList: newPostsList});
        }, err => {
            this.props.reportActivity("error");
        });
    }

    render() {
        let postsToDisplay = [];
        
        this.state.postsList.forEach((post, i) => {
            postsToDisplay.push(<Post 
            key={i} postData={post} 
            reloadPosts={() => {this.getPostsList()}} 
            reportActivity={a => {this.props.reportActivity(a)}} />)
        });
        
        return ( 
            <div className="PostsPage page">
            <AddPost reloadPosts={() => {this.getPostsList()}} reportActivity={a => {this.props.reportActivity(a)}} />
            {postsToDisplay}
            </div>
         );
    }
}
 
export default PostsPage;