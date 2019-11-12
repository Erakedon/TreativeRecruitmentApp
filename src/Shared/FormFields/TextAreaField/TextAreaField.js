import React from 'react';

const TextAreaField = props => {
    
    let errorMessageDivs = [];
    props.errorMessages.forEach((message,i) => {
        errorMessageDivs.push(<div className="errorMessage" key={i} >{props.name + " " + message}</div>);
    });

    return ( 
        <div className={"TextAreaField FormField " + props.status}>
            <label>{props.name}</label>
            <textarea   
                rows="4"
                value={props.value}
                onChange={({target: {value}}) => {props.onChangeHandler(value)}}
                onBlur={({target: {value}}) => {props.onBlurHandler(value)}}/>
            {errorMessageDivs}
        </div>
     );
}
 
export default TextAreaField;