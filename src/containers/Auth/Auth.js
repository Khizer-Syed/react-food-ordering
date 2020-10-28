import React, {Component} from 'react';
import classes from './Auth.css';
import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import {auth} from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom';
import {setAuthRedirectPath} from "../../store/actions";
import {checkValidity, updateObject} from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
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
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        signUp: true
    };

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onAuthRedirect();
        }
    }

    inputChangedHandler = (event, controlName) => {
      const updatedControls = updateObject(this.state.controls, {
          [controlName]: updateObject(this.state.controls[controlName], {
              value: event.target.value,
              valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
              touched: true
          })
      });
      this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp);
    };

    switchAuthHandler = (event) => {
        event.preventDefault();
        this.setState((prevState) => {
            return {
                signUp: !prevState.signUp
            }
        });
    };

    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(el => {
            return <Input
                key={el.id}
                elementType={el.config.elementType}
                changed={(event) => this.inputChangedHandler(event, el.id)}
                elementConfig={el.config.elementConfig}
                invalid={!el.config.valid}
                touched={el.config.touched}
                value={el.config.value}/>

        });
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        let auth = (
            <form onSubmit={this.submitHandler}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button btnType="Success">SUBMIT</Button>
                <Button btnType="Danger"
                        clicked={this.switchAuthHandler}>SWITCH TO {this.state.signUp ? 'LOGIN' : 'SIGNUP'}</Button>
            </form>
        );

        if (this.props.loading) {
            auth = <Spinner />
        }

        return (
            <div className={classes.Auth}>
                {auth}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burger.building
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
        onAuthRedirect: () => dispatch(setAuthRedirectPath('/'))

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
