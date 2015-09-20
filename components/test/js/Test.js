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
                        key: 'UserName',
                        view: 'input',
                        type: 'text',
                        value: 'userName'
                    },
                    {
                        key: 'Select me',
                        view: 'checkbox',
                        label: 'Do you agree?'
                    }
                ]
            }
        })
    }

    return Test;
});