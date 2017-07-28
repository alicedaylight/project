(function () {
    angular
        .module("WebAppMaker", ['ngRoute', 'wbdvDirectives', 'textAngular']);
     // console.log('loginController');
})();
// Notes
// -app js is only going to declare the module and any other dependencies it might have
// build application based off several other dependencies
// empty array [] means no dependencies
// app js is only delcaring module and somewhere else the controller is reading
// the module that has been declared and adding that controller to the framework

// notice in here the .module has two paramaters meaning that it is a write()
// notice in .module inside of login.controllerclient.js it only has one parameter
// meaning that it is a read()

// inside of logincontrollerclient.js... .module is reading in the module,
// which has been creating by app.js and then adding itself "LoginController"
// to the WebAppMaker framework


// 2 arguments because we want it to be a write()
// I want to get a hold of the WebAppMaker module
// 'nameOfController'


// server side code
console.log('server side app');