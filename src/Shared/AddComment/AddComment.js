import React, { Component } from 'react';
import axios from 'axios';
import CommentModel from './../../Models/CommentModel';
import Validators from './../../Models/Validators';
import TextAreaField from '../FormFields/TextAreaField/TextAreaField';
import TextField from '../FormFields/TextField/TextField';
import Button from '../Button/Button';

class AddComment extends Component {
    state = {         
        form: {},
        errors: {},
        formStatus: {}
     }
    
    constructor(props) {
        super(props);
        CommentModel.forEach(el => {            
            // eslint-disable-next-line
            this.state.form[el.name] = "";
            // eslint-disable-next-line
            this.state.errors[el.name] = [];
            // eslint-disable-next-line
            this.state.formStatus[el.name] = "untouched";
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

    getCleanForm() {
        let cleanForm = {
            form: {},
            errors: {},
            formStatus: {}
        };
        CommentModel.forEach(el => {            
            cleanForm.form[el.name] = "";
            cleanForm.errors[el.name] = [];
            cleanForm.formStatus[el.name] = "untouched";
        });

        return cleanForm;
    }

    validateField(value, field) {
        let errorMessages = [];

        CommentModel.find(el => {
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

        CommentModel.forEach(el => {
            if(!this.validateField(this.state.form[el.name], el.name)) noErrors = false;
        });
        
        if(noErrors) {
            this.postComment();
        }
    }

    postComment() {
        const url = "https://rujewitpltest.herokuapp.com/treative/comment/" + this.props.postId
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
            this.props.reportActivity("commentAdd");
        },err => {
            this.props.reportActivity("error");
        });
     
    }

    render() {
        let formFields = [];
        if(this.state.form)
            CommentModel.forEach(field => {
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
            <div className="AddComment">
                {/* <div className="header">Add comment</div> */}
                {formFields}
                <div className="buttonContainer">
                    <Button className="green" onClickHandler={() => {this.submitForm()}}>Add comment</Button>
                </div>
            </div>
         );
    }
}
 
export default AddComment;