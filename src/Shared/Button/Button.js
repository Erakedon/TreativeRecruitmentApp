import React from 'react';

const Button = props => {
    return ( 
        <div className={"Button " + props.className} onClick={() => {props.onClickHandler()}}>
            {props.children}
        </div>
     );
}
 
export default Button;