var helper = {
    reload: function (frame, done) {
        function reloadFrame() {
            frame.reload(function () {
                clearTimeout(reloadFrameOneMoreTimeForSlowDevices);
                done();
            });
        }

        reloadFrame();
        var reloadFrameOneMoreTimeForSlowDevices = setTimeout(function () {
            reloadFrame();
        }, 10000)
    },
    click: function (el) { //for consistency
        el.click();
    },
    mouseTouchDown: function (el) {
        var ev;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            ev = document.createEvent('TouchEvent');
            ev.initUIEvent('touchstart', true, true);
        } else {
            ev = document.createEvent('MouseEvent');
            ev.initMouseEvent('mousedown', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        el.dispatchEvent(ev);
    },
    hoverOn: function (el) {
        var ev;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            ev = document.createEvent('TouchEvent');
            ev.initUIEvent('touchstart', true, true);
        } else {
            ev = document.createEvent('MouseEvent');
            ev.initMouseEvent('mouseover', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        el.dispatchEvent(ev);
    },
    hoverOff: function (el) {
        var ev;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            ev = document.createEvent('TouchEvent');
            ev.initUIEvent('touched', true, true);
        } else {
            ev = document.createEvent('MouseEvent');
            ev.initMouseEvent('mouseleave', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        el.dispatchEvent(ev);
    },
    hasClass: function (target, cssClass) {
        return target.classList.contains(cssClass);
    }
};

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
                file.module(frame, assert, browserWidth, helper);
            });
        });
        after(function () {
            frame.remove();
        });
    };
    deviceWidth.forEach(runTests);
}