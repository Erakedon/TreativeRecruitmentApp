import React, { Component } from 'react';
import AddComment from './../AddComment/AddComment';

class Post extends Component {
    state = {
        commentsHidden: true
    }
    render() {
        let comments = [];
    
        this.props.postData.comments.forEach((comment, index) => {
                    comments.push(<div className="comment" key={index}>
                        <div className="header">{"Comment by " + comment.name + " (" + comment.email + ")"}</div>
                        <div className="body">{comment.body}</div>
                    </div>);
                });

        comments.push(<AddComment 
        key="addComment" 
        postId={this.props.postData.id} 
        reportActivity={a => {this.props.reportActivity(a)}}
        reloadPosts={() => {this.props.reloadPosts()}} />);
                
        return ( 
            <div className="Post">
                <div className="header">
                    {"Post by " + this.props.postData.posterData.firstName + " " + this.props.postData.posterData.lastName 
                    + " (" + this.props.postData.posterData.email + ")"}
                </div>
                <div className="title">{this.props.postData.title}</div>
                <div className="body">{this.props.postData.body}</div>
                <div className={"comments " + (this.state.commentsHidden ? "hidden" : "")}>
                    {this.state.commentsHidden ? <div /> : comments}                 
                    <div className="commentsToggle" onClick={(() => {this.setState({commentsHidden: !this.state.commentsHidden})})} >
                        {this.state.commentsHidden ? "Show comments" : "Hide comments"}
                        </div>   
                </div>
            </div>
         );
    }
}
 
export default Post;