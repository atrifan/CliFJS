/**
 * Created by atrifan on 10/28/2015.
 */
define(['socket.io'], function (io) {
    function SocketRegistry() {

        var protocol = window.location.protocol + '//',
            hostname = window.location.host;

        this._shouldReconnect = false;

        this._baseUrl = protocol + hostname;
    };

    SocketRegistry._instance = null;
    SocketRegistry.get = function () {
        return SocketRegistry._instance ||
            (SocketRegistry._instance = new SocketRegistry());
    };

    SocketRegistry.prototype.registerSocket = function (channel) {
        var self = this;
        if(channel.charAt(0) != "/") {
            channel = "/" + channel;
        }


        var socket = io.connect(this._baseUrl + channel, {
            'reconnect': true,
            'query': 'bal_uid=' + (new Date()).getTime()
        });

        socket.isConnected = socket.isConnected || false;

        socket.on('connect', function () {
            socket.isConnected = true;
        });

        socket.on('reconnect', function () {
            socket.isConnected = true;
        });

        // Ensure that emit calls always operate
        // after the socket is properly connected.
        var _emit = socket.emit;
        /*socket.emit = function() {
         //console.log(arguments);
         //console.log(socket.isConnected);
         if (socket.isConnected && !self._shouldReconnect) {
         _emit.apply(this, arguments);
         } else {
         if(self._shouldReconnect) {
         self._shouldReconnect = false;
         socket.socket.reconnect();
         }

         var args = Array.prototype.slice.call(arguments);

         socket.once('connect', function () {
         alert(args);
         _emit.apply(this, args);
         });
         }
         };
         */
        socket.on('disconnect', function (event) {
            self._shouldReconnect = true;
        });

        return socket;

    };

    return SocketRegistry;

});
