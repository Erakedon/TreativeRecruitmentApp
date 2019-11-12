import React, { Component } from 'react';
import axios from 'axios';
import Validators from './../../Models/Validators';
import TextAreaField from '../FormFields/TextAreaField/TextAreaField';
import TextField from '../FormFields/TextField/TextField';
import Button from '../Button/Button';
import PostModel from './../../Models/PostModel';
import SelectField from './../FormFields/SelectField/SelectField';

class AddPost extends Component {
    state = {         
        form: {},
        errors: {},
        formStatus: {},
        usersList: []
     }
    
    constructor(props) {
        super(props);
        PostModel.forEach(el => {            
            // eslint-disable-next-line
            this.state.form[el.name] = "";
            // eslint-disable-next-line
            this.state.errors[el.name] = [];
            // eslint-disable-next-line
            this.state.formStatus[el.name] = "untouched";
        });
    }

    componentDidMount() {
        this.getUsersList();
    }
    
    getUsersList() {
        const url = "https://rujewitpltest.herokuapp.com/treative/allUsers"
        axios.get(url)
        .then(res => {
            console.log(res);
            const newUsersList = res.data.map(user => {
                return {
                    displayName: user.firstName + " " + user.lastName,
                    value: user.id
                }
            });
            this.setState({usersList: newUsersList})
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

        PostModel.find(el => {
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

        PostModel.forEach(el => {
            if(!this.validateField(this.state.form[el.name], el.name)) noErrors = false;
        });
        
        if(noErrors) {
            this.postPost();
        }
    }

    postPost() {
        const url = "https://rujewitpltest.herokuapp.com/treative/post"
        const dataToSent = this.state.form;
        console.log(dataToSent);
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

            this.props.reloadPosts();
            this.props.reportActivity("postAdd");
        },err => {
            this.props.reportActivity("error");
        });
     
    }

    render() {
        let formFields = [];
        if(this.state.form && this.state.usersList.length > 0)
        PostModel.forEach(field => {
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
                    else if(field.type === "list")
                    formFields.push(
                        <SelectField
                            name={field.displayName}
                            key={field.name}
                            value={this.state.form[field.name]}
                            errorMessages={this.state.errors[field.name]}
                            status={this.state.formStatus[field.name]}
                            onChangeHandler={value => {this.onFieldChange(value,field.name)}}
                            onBlurHandler={value => {this.onFieldBlur(value,field.name)}}
                            options={this.state.usersList}
                         />
                    );
            });

        return ( 
            <div className="AddPost">
                {formFields}
                <div className="buttonContainer">
                    <Button className="green" onClickHandler={() => {this.submitForm()}}>Post</Button>
                </div>
            </div>
         );
    }
}
 
export default AddPost;