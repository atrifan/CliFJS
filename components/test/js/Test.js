/**
 * Created by alexandru.trifan on 19.09.2015.
 */
define(['validator'], function (Validator) {
    function Test() {}

    Test.prototype.init = function () {

    }

    Test.prototype.start = function () {

        this._root = this.context.getRoot();

        Validator.get().email('trifan.alex.criss@gmail.com');
        this.context.insert(this._root, {
            component: {
                name: "user",
                view: "register"
            },
            context : {
                clientValidate: true,
                hasTitle: true,
                title: "Register",
                fields: [
                    {
                        view: 'input',
                        type: 'text',
                        textToShow: 'User Name',
                        requestKey: 'userName',
                        value: 'Enter User Name',
                        validationType: 'notNull'
                    },
                    {
                        view: 'input',
                        type: 'text',
                        textToShow: 'E-mail',
                        requestKey: 'eMail',
                        value: 'enter email',
                        validationType: 'email'
                    },
                    {
                        textToShow: 'Do you agree?',
                        requestKey: 'agreeement',
                        view: 'checkbox',
                        validationType: 'truth'
                    }
                ]
            }
        }).then(function(Controller) {
            console.log(Controller);
        });
    };

    return Test;
});