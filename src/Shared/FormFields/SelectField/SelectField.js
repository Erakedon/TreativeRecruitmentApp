import React from 'react';

const SelectField = props => {
    
    let errorMessageDivs = [];
    props.errorMessages.forEach((message,i) => {
        errorMessageDivs.push(<div className="errorMessage" key={i} >{props.name + " " + message}</div>);
    });

    let optionsToDisplay = [];
    props.options.forEach(option => {
        optionsToDisplay.push(<option value={option.value} key={option.value}>{option.displayName}</option>);
    });

    return ( 
        <div className={"SelectField FormField " + props.status}>
            <label>{props.name}</label>
            <select   
                value={props.value}
                onChange={({target: {value}}) => {props.onChangeHandler(value)}}
                onBlur={({target: {value}}) => {props.onBlurHandler(value)}}>
                    <option value="">--select user--</option>
                    {optionsToDisplay}
                </select>
            {errorMessageDivs}
        </div>
     );
}
 
export default SelectField;