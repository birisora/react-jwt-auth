// when user registers successfully, they are redirected to dashboard
import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    // redirection will also take place if a logged in user directly try
    // to access page by navigating to /register page
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
            <h2>Register for Foo App</h2>
            <RegistrationForm />
            <Link to="/">Login</Link>
        </div>
    );
}

// loggedIn prop is true when user successfully logged in
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
