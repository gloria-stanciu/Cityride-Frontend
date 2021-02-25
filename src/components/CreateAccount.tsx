import React from 'react';

import '../css/CreateAccount.css';
import Button from './Button'
import {useHistory} from 'react-router-dom';

function CreateAccount(){
    const history = useHistory();
    return (
        <div className='title text-center mt-4'>
           CreateAccount
        </div>
      );
}

export default CreateAccount;