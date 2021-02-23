import React from 'react';

import '../css/Button.css';

function Button(props){
    return (
            <button onClick={props.onClick} type = "button" className={`btn-block button ${ props.className }`}>{props.name}</button>
      );
}

export default Button;