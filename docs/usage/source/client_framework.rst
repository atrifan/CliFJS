---------------------
Client side framework
---------------------

This is an implementation of a client side framework written from scratch, providing an easy
way to create and design decoupled components with html css and javascript and easily aggregate inside your
page providing also an api of intercomponent communication.


..............
Implementation
..............

The implementation is designed to work on any type of plain static HTTP server.

Technologies:
    - Javascript
    - Handlebars.js - templating engine
    - promise.js
    - jQuerry
    - node.js + express.js - a personal implementation of a static server written in javascript.

The last part is not mandatory, it can be ran on a simple apache server. The reason I implemented
the static server is because I use a variable for temperature that can be set and retrieved.

If the application is ran on apache - the temperature will be retrieved from a static file,
and will send a POST request to the server that won't change the static file but will pop up an
alert.


.....
Usage
.....

Here I will describe how you should design your components and serve them to the client. For further
description of the frameworks api please check the doc/dev/ folder.

========
Starting
========

In the ``folder`` components you have to create a folder representing the component's name. In the
created folder you have to have a meta.json file which represents a basic configuration for that
component an 3 folders: ``css``, ``template``, ``js``. The ``meta.json`` must look like this:

.. code-block:: javascript
    :linenos:

    {
        "view": "index.html"
        "controller": "index",
        "css": ["index.css"]
    }

- **view** key represents the html file which is the template for your component
- **controller** key represents the name of the controller from the js folder
- **css** key represents an array of .css files from the css folder that you use for that component

========
Template
========

The template folder should contain a .html file representing the view for that component. You
don't have to right <head> <body> <html> tags inside this html you just design the layout for
your component.

==========
Controller
==========

The controller folder should contain a .js file and the name of the file should be added in the meta.json
of the component. If you have for example ``button.js`` in your controller folder than in the ``meta.json``
in the **controller** property you will have ``button``.

The controller should be designed in a standard way following this signature:

.. code-block:: javascript
    :linenos:

    define([], function () {

        /**
         * The name of the constructor
         */
        function ControllerName() {}

        /**
         * Init method, you must not do DOM logic here, you can instantiate some variables
         * but not depending on the DOM elements.
         */
        ControllerName.prototype.init = function () {


        };

        /**
         * Start method, here you would add your DOM prelucration and other type of logic
         */
        ControllerName.prototype.start = function () {

        }

        /**
         * Destroy method, this is the method called when the component is removed from page
         * you can also set some logic here, Currently this is not working.
         */
        ControllerName.prototype.destroy = function () {

        };

        return ControllerName;
    })

The 3 methods init, start and destroy are **mandatory** because the client framework invokes a lifecycle
for the controller, apart from this you can add what other methods you want.

The controller is also injected by the framework and set on the ``this`` of the component
with the following properties:

- **context.getRoot()** - provides a jQuery object representing the container of the component. For each
  component a container will be generated with an unique id, and the containts of that component are insert
  in the generated container.

- **context.getComponent(sid)** - this is a method with which you can grab a component from inside your
  application and use it's controller. The method returns a promise so you must always use it like this:
.. code-block:: javascript
    :linenos:

    define([], function () {
        function Controller(){}

        Controller.prototype.init = function () {};

        Controller.prototype.start = function () {
            this.context.getComponent('button').then(function (button) {
                alert(button.value());
            }
        }
    });

- **emit(evt, data)** - the controller can emit events

- **context.messaging.messageSubscribe(evt, handler)** - the controller subscribes to a message queue provided
  by the framework

- **context.messaging.messagePublish(evt, data)** - the controller can publish a message on the message queue
  provided by the framework

- **context.messaging.messageUnsubscribe(evt, handler)** - the controller can unsubscribe from a message in the
  message queue.

===
CSS
===

In the ``css`` folder from your component's folder you must have a .css file which you later declare in
the controller`s ``meta.json``.

======================
Aggregating components
======================

The framework also uses handlebars templating engine that the framework can process, so it is easy to
reuse other components/aggregate.

******************************
Agregation in other components
******************************

If you are in the component's template folder in the html file you should use
{{component name="nameOfComponent" sid="uniqueSid" [other parameters used in the template]}}
So if you have a template like this:

.. code-block:: javascript
    :linenos:

    <div class="button" value="{{value}}"">
        {{label}}
    </div>


And you aggregate it in another component that has a html like this:

.. code-block:: javascript
    :linenos:

    <div class="test">
        {{component name="button" sid="button" value="myValue" label="customLabel"}}
    </div>

If this component was requested in the browser than the content in the browser will look like this:

.. code-block:: javascript
    :linenos:

    <div class="test">
        <div class="button" value="myValue"">
            customLabel
        </div>
    </div>

**Always remember that the component name must be the name of the folder from the ``components`` folder!**
**The sid must be unique throughout the page** - This restriction will be removed in the future

*************************
Aggregation in index.html
*************************

If you want to aggregate components in the index.html that you serve - this representing the applications index
that is accessed by the client, you must use the contains of the <head> tag provided in my example and in the body
you must always have something like this:

.. code-block:: javascript
	:linenos:
	
	<div class="myClass" type="x-handlebars-template">
    		{{component name="button" sid="button"}}
	</div>

The flow works as described in the previous aggregation example, and this usage is only necessary in the
index.html of the application that you want to server to the clients not also in other components.

The **type="x-handlebars-template"** is mandatory otherwise the framework will not know that there you want
to aggregate a component.

**A component's html must never be accessed directly from the browsers url, components must always be served
via the application's index.html**


.....
Tests
.....

- The framework was tested in IE8+, FF, Chrome and it worked in all 3 although I have a small issue in IE8,
this doesn't affect the usage. Recomended browsers: FF 15+, Chrome 24+.

- Also I wrote some UT with mocha, sinon and expect in BDD style but I did not attach them to the project.


............
Known issues
............

- the sid property from handlebars must really be unique otherwise the expected behaviour is mallformed.
- if a css/html/js from a component is not found or the meta.json is incorrect than no error message will be
  displayed to the client.

............
Installation
............

If you want to run my static express server you must install node.js 0.8.24+ and than go in the project's root
(where you unzip the project) enter cmd if windows or in terminall run npm install -d, afterwards in the terminal
go to the server folder and run node server.js and you are ready to test - the server runs on port 8080.

Access the application like so:
http://localhost:8080/public/templates/

If you want to use it in apache please go in the public/templates/index.html and change the server variable in the
<head> tag.

.........
Doc tools
.........

The generation of documentation has been done with jsdoc and sphinx rst.




