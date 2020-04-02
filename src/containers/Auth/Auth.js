import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setformIsValid] = useState(false);
    const [isSignup, setisSignup] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            //322: if not buildingBurger and try to redirect to another page(like checkout):
            onSetAuthRedirectPath('/');
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

    //#region Handler
    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for (let controlName in updatedControls) {
            formIsValid = updatedControls[controlName].valid && formIsValid;
        }

        setControls(updatedControls);
        setformIsValid(formIsValid);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value,
            controls.password.value,
            isSignup);
    }

    const switchAuthModeHandler = () => {
        setisSignup(!isSignup);
    }
    //#endregion

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valueType={formElement.id}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p style={{ fontSize: '1em', fontStyle: 'italic', color: 'red' }}>
                {props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            <form onSubmit={submitHandler}>
                {form}
                <Button
                    disabled={!formIsValid}
                    btnType="Success" >SUBMIT</Button>
            </form>
            {errorMessage}
            <Button
                btnType="Danger"
                clicked={switchAuthModeHandler}>
                SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
            </Button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);