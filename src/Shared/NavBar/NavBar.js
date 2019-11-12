import React, { Component } from 'react';

class NavBar extends Component {
    state = {  }

    getPageLocation() {
        return this.props.location.pathname.split("/")[1];
    }

    redirectToUrl(url) {
        this.props.history.push(url);
    }



    render() { 
        return ( 
            <div className="NavBar">
                <div className={"back " + (
                    this.getPageLocation() === "" || this.getPageLocation() === "userslist" ? "hidden" : "")}
                    onClick={() => {this.props.history.goBack()}}>
                    <i className="far fa-arrow-alt-circle-left"></i>
                </div>
                <div className="locations">
                    <div className={"location " + (this.getPageLocation() === "" ? "active" : "")}
                    onClick={() => {this.redirectToUrl("/")}} >Posts</div>
                    <div className={"location " + (this.getPageLocation() === "userslist" ? "active" : "")}
                    onClick={() => {this.redirectToUrl("/userslist")}} >Users</div>
                </div>
            </div>
         );
    }
}
 
export default NavBar;