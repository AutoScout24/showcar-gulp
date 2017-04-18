module.exports = function (config) {
    window.__karma__.loaded = function () {}; //  prevent of execution mocha  https://zerokspot.com/weblog/2013/07/12/delay-test-execution-in-karma/
    var quixote = require('quixote');
    var assert = require('chai').assert;
    var frame;
    var deviceWidth = config.testingWidth;
    var runTests = function (browserWidth, index) {
        frame = quixote.createFrame({
            src: config.url,     // karma url with port
            width: browserWidth
        }, function () {
            if (index === 0) {
                setTimeout(function () {
                    window.__karma__.start(); //execute mocha
                }, 2000); // browserStack - safari extra timeout
            }
        });
        describe('Device width: ' + browserWidth, function () {
            config.files.forEach(function (file) {
                file.module(frame, assert, browserWidth);
            });
        });
        after(function () {
            frame.remove();
        });
    };
    deviceWidth.forEach(runTests);
}
