// using a higher-order component(HOC) requiresLogin
// used to add behavior to existing components by wrapping them in outer component
// don't need to repeat logic by copy same behavior into many components
// samples we already use are connect and reduxForm

import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

// a function that returns another function that returns the wrapping react component
// the 2nd function takes wrapped component as an arg
export default () => Component => {
    function RequiresLogin(props) {
        // passThroughProps contains any extra props passed to wrapping component 
        // not relevant to login process
        const {authenticating, loggedIn, error, ...passThroughProps} = props;
        if (authenticating) {
            // in process of auth, a message logging in appears
            return <div>Logging in...</div>;
        } else if (!loggedIn || error) {
            // if there was an error in auth, then user redirected to login 
            // form on landing page
            return <Redirect to="/" />;
        }

        return <Component {...passThroughProps} />;
    }

    // convention that display name of HOC looks similar to 
    // HigherOrderComponentName(ComponentName)
    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    // props relevant to login process injected into wrapping component by 
    // connecting it to the store
    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.error
    });
    // return the connected version of wrapping component from HOC func
    return connect(mapStateToProps)(RequiresLogin);
};
