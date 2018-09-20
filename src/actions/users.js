import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
// code handles any errors received from API, if error contains JSON
// we decode and return rejected promise contained decoded err obj
// if error is just text, (err from pssport or express), create new err obj 
// and return rejected promist
import {normalizeResponseErrors} from './utils';

export const registerUser = user => dispatch => {
    // here we make a POST request to /users endpoint
    // pass user info as req body
    // when we receive response, call utility method normalizeResponseErrors
    // found in utils.js
    // catch block take any validation error returned by server and convert 
    // into redux form SubmissionErrors so appropiate message appears to user
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};
