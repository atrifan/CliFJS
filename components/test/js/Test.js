/**
 * Created by alexandru.trifan on 19.09.2015.
 */
define([], function () {
    function Test() {}

    Test.prototype.init = function () {

    }

    Test.prototype.start = function () {

        this._root = this.context.getRoot();

        this.context.insert(this._root, {
            component: {
                name: "user",
                view: "register"
            },
            context : {
                hasTitle: true,
                title: "Register",
                fields: [
                    {
                        view: 'input',
                        type: 'text',
                        textToShow: 'User Name',
                        requestKey: 'userName',
                        value: 'Enter User Name'
                    },
                    {
                        textToShow: 'Do you agree?',
                        requestKey: 'agreeement',
                        view: 'checkbox'
                    }
                ]
            }
        }).then(function(Controller) {
            console.log(Controller);
        });
    };

    return Test;
});