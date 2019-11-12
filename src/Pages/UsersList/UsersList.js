import React, { Component } from 'react';
import axios from 'axios';
import Button from '../../Shared/Button/Button';

class UsersList extends Component {
    state = { 
        usersList: []
     }

    componentDidMount() {
        this.getUsersList();
    }

    getUsersList() {
        const url = "http://localhost:5000/treative/allUsers"
        axios.get(url)
        .then(res => {
            console.log(res);
            const newUsersList = res.data;
            this.setState({usersList: newUsersList})

        }, err => {
            this.props.reportActivity("error");
        });
    }

    deleteUser(id) {
        const url = "http://localhost:5000/treative/user/" + id

        axios({
            method: 'delete',
            url: url,
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        }).then(res => {
            this.getUsersList();
            this.props.reportActivity("userDelete");
        },err => {
            this.props.reportActivity("error");
        });
    }

    render() { 
        let usersToDisplay = [];
        this.state.usersList.forEach(el => {
            usersToDisplay.push(<tr key={el.id}>

                <td>{el.firstName}</td>
                <td>{el.lastName}</td>
                <td>{el.email}</td>

                <td><i className="fas fa-eye" onClick={() => {this.props.history.push("viewuser/" + el.id)}}/></td>
                <td><i className="fas fa-edit" onClick={() => {this.props.history.push("edituser/" + el.id)}}/></td>
                <td><i className="fas fa-trash-alt" onClick={() => {this.deleteUser(el.id)}}/></td>

            </tr>);
        });

        return ( 
            <div className="UsersList page">
                <table>
                    <tbody>
                        <tr className="header">
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Email</td>
                        </tr>
                        {usersToDisplay}
                    </tbody>
                </table>
                <Button className="green" onClickHandler={() => {this.props.history.push("newuser")}}>Create New</Button>
            </div>
         );
    }
}
 
export default UsersList;