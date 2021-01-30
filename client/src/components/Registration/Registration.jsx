import React from 'react';
import {withAlert} from "react-alert";

import "../Login/Login.css";
import Preregistration from "./Preregistration";
import UserRegistration from "./UserRegistration/UserRegistration";
import {validatePassword, validatePersonName, validatePhoneNumber, verificationCode} from "../../helpers/validation-helper";

class Registration extends React.Component {

    state = {
        isChose: false,
        nameError: "",
        surnameError: "",
        phoneNumberError: "",
        passwordError: "",
        codeVerificationError: ""
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.registrationError) {
            this.props.alert.error('Пользователь с таким номером уже зарегестрирован. Попробуйте заново!');
        }
        if (this.props.isRegister) {
            this.props.alert.success('Вы успешно зарегестрировались! Войдите в свой аккаунт.');
            this.props.resetRegistration();
            this.setState({nameError: "", surnameError: "", phoneNumberError: "", passwordError: ""});
        }
    }

    componentWillUnmount() {
        this.props.resetRegistration();
    }

    handleCloseRegistrationSection = () => {
        this.setState({isChose: false});
    }

    handleOpenRegistrationSection = (nameField, value) => {
        this.props.editRegistrationFieldHandler(nameField, value);
        this.setState({isChose: true});
    }

    onSubmit = e => {
        e.preventDefault()
        const isValid = this.validate();
        if (isValid) this.props.registrationHandler();
    }

    validate = () => {
        let nameError, surnameError, phoneNumberError, passwordError, codeVerificationError;
        let {name, surname, phone_number, password, isCodeVerified} = this.props.user;

        nameError = validatePersonName(name);
        surnameError = validatePersonName(surname);
        phoneNumberError = validatePhoneNumber(phone_number);
        passwordError = validatePassword(password);
        codeVerificationError = verificationCode(isCodeVerified);

        if (phoneNumberError || nameError || surnameError || passwordError) {
            this.setState({phoneNumberError, nameError, surnameError, passwordError, codeVerificationError});
            return false;
        }
        return true;
    }

    render() {
        let {user, editRegistrationFieldHandler} = this.props;
        let {isChose, nameError, surnameError, phoneNumberError, passwordError, codeVerificationError} = this.state;

        return isChose ? (
            <UserRegistration
                user={user}
                editRegistrationFieldHandler={editRegistrationFieldHandler}
                onSubmit={this.onSubmit}
                handleCloseRegistrationSection={this.handleCloseRegistrationSection}
                nameError={nameError}
                surnameError={surnameError}
                phoneNumberError={phoneNumberError}
                passwordError={passwordError}
                codeVerificationError={codeVerificationError}
            />
        ) : <Preregistration handleOpenRegistrationSection={this.handleOpenRegistrationSection}/>
    }
}

export default withAlert()(Registration);