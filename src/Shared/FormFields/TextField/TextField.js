import React from 'react';

const TextField = props => {

    let errorMessageDivs = [];
    props.errorMessages.forEach((message,i) => {
        errorMessageDivs.push(<div className="errorMessage" key={i} >{props.name + " " + message}</div>);
    });

    return ( 
        <div className={"TextField FormField " + props.status}>
            <label>{props.name}</label>
            <input type="text" 
                name={props.name}
                value={props.value}
                onChange={({target: {value}}) => {props.onChangeHandler(value)}}
                onBlur={({target: {value}}) => {props.onBlurHandler(value)}} />
            {errorMessageDivs}
        </div>
     );
}
 
export default TextField;