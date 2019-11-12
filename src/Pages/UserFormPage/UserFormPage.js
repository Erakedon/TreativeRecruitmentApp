import React, { Component } from 'react';
import axios from 'axios';
import UserModel from './../../Models/UserModel';
import TextField from '../../Shared/FormFields/TextField/TextField';
import Validators from './../../Models/Validators';
import Button from '../../Shared/Button/Button';
import TextAreaField from './../../Shared/FormFields/TextAreaField/TextAreaField';

class UserFormPage extends Component {
    state = {         
        form: {},
        errors: {},
        formStatus: {}
     }
    
    constructor(props) {
        super(props);
        UserModel.forEach(el => {            
            // eslint-disable-next-line
            this.state.form[el.name] = "";
            // eslint-disable-next-line
            this.state.errors[el.name] = [];
            // eslint-disable-next-line
            this.state.formStatus[el.name] = "untouched";
        });
    }

    componentDidMount() {
        const urlData = this.getUrlData();
        if(urlData[0] === "edituser")
            this.getUserData(urlData[1]);

    }

    getUrlData() {
        const data = this.props.location.pathname.split("/").slice(1);
        //first element of array is page name, eventual second is user id
        return data;
    }

    getUserData(id) {
        const url = "https://rujewitpltest.herokuapp.com/treative/user/" + id;
        axios.get(url)
        .then(res => {
            let userData = {};

            UserModel.forEach(el => {
                userData[el.name] = res.data[el.name]
            });

            this.setState({form: userData});

        }, err => {
            this.props.reportActivity("error");
        });
    }

    onFieldChange(value, field) {
        let newFormValues = this.state.form;
        newFormValues[field] = value;
        this.setState({form: newFormValues});
    }

    onFieldBlur(value, field) {
        this.validateField(value, field);
    }

    validateField(value, field) {
        let errorMessages = [];

        UserModel.find(el => {
            return el.name === field;
        }).validators.forEach(validatorName => {
            const validator = Validators[validatorName];
            if(!validator.validate(value)) errorMessages.push(validator.errorMessage);
        });

        let newErrorState = this.state.errors;
        newErrorState[field] = errorMessages;
        
        let newFormStatusState = this.state.formStatus;
        newFormStatusState[field] = errorMessages.length > 0 ? "error" : "validated";

        this.setState({
            errors: newErrorState,
            formStatus: newFormStatusState
        });
        return errorMessages.length === 0;
    }

    submitForm() {
        let noErrors = true;

        UserModel.forEach(el => {
            if(!this.validateField(this.state.form[el.name], el.name)) noErrors = false;
        });
        
        if(noErrors) {
            if(this.getUrlData()[0] === "newuser")
                this.postUser();
            else
                this.updateUser();
        }
    }

    postUser() {
        const url = "https://rujewitpltest.herokuapp.com/treative/user"
        const dataToSent = this.state.form;

        axios({
            method: 'post',
            url: url,
            'Content-Type': 'application/json',
            dataType: 'json',
            data: dataToSent,
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        }).then(res => {
            this.props.history.goBack();
            this.props.reportActivity("userAdd");
        },err => {
            this.props.reportActivity("error");
        });
     
    }

    updateUser() {
        const url = "https://rujewitpltest.herokuapp.com/treative/user/" + this.getUrlData()[1];
        const dataToSent = this.state.form;

        axios({
            method: 'put',
            url: url,
            'Content-Type': 'application/json',
            dataType: 'json',
            data: dataToSent,
            headers: {
                'Access-Control-Allow-Origin': "*"
            }
        }).then(res => {
            this.props.history.goBack();
            this.props.reportActivity("userEdit");
        },err => {
            this.props.reportActivity("error");
        });
    }

    render() { 
        // console.log(this.state);

        let formFields = [];
        if(this.state.form)
            UserModel.forEach(field => {
                if(field.type === "textarea")
                    formFields.push(
                        <TextAreaField 
                            name={field.displayName}
                            key={field.name}
                            value={this.state.form[field.name]}
                            errorMessages={this.state.errors[field.name]}
                            status={this.state.formStatus[field.name]}
                            onChangeHandler={value => {this.onFieldChange(value,field.name)}}
                            onBlurHandler={value => {this.onFieldBlur(value,field.name)}}
                        />
                    );
                else if(field.type === "text")
                    formFields.push(
                        <TextField 
                            name={field.displayName}
                            key={field.name}
                            value={this.state.form[field.name]}
                            errorMessages={this.state.errors[field.name]}
                            status={this.state.formStatus[field.name]}
                            onChangeHandler={value => {this.onFieldChange(value,field.name)}}
                            onBlurHandler={value => {this.onFieldBlur(value,field.name)}}
                        />
                    );
            });


        return ( 
            <div className="UserFormPage page">
                <div className="form">
                    {formFields}
                </div>
                <div className="buttons">
                    <Button className="grey" onClickHandler={() => {this.props.history.goBack()}}>Back</Button>
                    {                    
                    this.getUrlData()[0] === "newuser" ?
                        <Button className="green" onClickHandler={() => {this.submitForm()}}>Create</Button>
                        : <Button className="green" onClickHandler={() => {this.submitForm()}}>Edit</Button>
                    }
                </div>

            </div>
         );
    }
}
 
export default UserFormPage;