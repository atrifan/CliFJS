define([
    "js/controllers/CallController",
    "js/controllers/ContactsController",
    "js/controllers/ContactDetailController",
    "js/util/context"
], function (CallController, ContactsController, ContactDetailController, Context) {
    jQuery.extend(CallController.prototype, Context.prototype);
    jQuery.extend(ContactDetailController.prototype, Context.prototype);
    jQuery.extend(ContactsController.prototype, Context.prototype);

    var controllers = {
        "Caller": CallController,
        "PhoneContacts": ContactsController,
        "ContactDetail": ContactDetailController
    };

    return controllers;

});




