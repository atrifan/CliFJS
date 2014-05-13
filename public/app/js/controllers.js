define([
    "js/controllers/CallController",
    "js/controllers/ContactDetailController",
    "js/util/context"
], function (CallController, ContactDetailController, Context) {

    var controllers = {
        "Caller": CallController,
        "ContactDetail": ContactDetailController
    };

    return controllers;

});




