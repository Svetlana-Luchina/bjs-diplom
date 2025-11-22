'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
ApiConnector.login(data, (response) => {
    console.log(response);
    if (response.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(response.error);
    }
});
}

