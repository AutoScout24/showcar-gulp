const helper = {
    reload (frame, done) {
        const reloadFrame = () => {
            frame.reload(() => {
                clearTimeout(reloadFrameOneMoreTimeForSlowDevices);
                setTimeout(done, 100); //extra timeout after reload
            });
        }
        reloadFrame();
        const reloadFrameOneMoreTimeForSlowDevices = setTimeout(() => reloadFrame(), 1000)
    },

    click: (el) => el.click(), //for consistency

    mouseTouchDown (el) {
        let ev;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            ev = document.createEvent('TouchEvent');
            ev.initUIEvent('touchstart', true, true);
        } else {
            ev = document.createEvent('MouseEvent');
            ev.initMouseEvent('mousedown', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        el.dispatchEvent(ev);
    },

    hoverOn (el) {
        let ev;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            ev = document.createEvent('TouchEvent');
            ev.initUIEvent('touchstart', true, true);
        } else {
            ev = document.createEvent('MouseEvent');
            ev.initMouseEvent('mouseover', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        el.dispatchEvent(ev);
    },

    hoverOff (el) {
        let ev;
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            ev = document.createEvent('TouchEvent');
            ev.initUIEvent('touched', true, true);
        } else {
            ev = document.createEvent('MouseEvent');
            ev.initMouseEvent('mouseleave', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        el.dispatchEvent(ev);
    },

    hasClass: (target, cssClass) => target.classList.contains(cssClass)
};

module.exports = (config) => {
    require('es6-promise').polyfill();

    window.__karma__.loaded = () => {}; //  prevent of execution mocha
    // https://zerokspot.com/weblog/2013/07/12/delay-test-execution-in-karma/
    const quixote = require('quixote');
    const assert = require('chai').assert;
    let frame;

    const runTests = (browserWidth, index, status) => {
        frame = quixote.createFrame({
            src: config.url,
            width: browserWidth
        }, () => {
            if (index === 0) {
                setTimeout(() => {
                    window.__karma__.start(); //execute mocha
                }, 2000); // browserStack - safari extra timeout
            }
        });

        describe('Device width: ' + browserWidth, () => {
            config.filesSet.forEach(files => {
                files.keys().forEach(key => {
                    files(key)(frame, assert, browserWidth, helper);
                });
            });
        });

        after(() => {
            frame.remove();
            status.resolve();
        });

    };

    const runTest = config.width.map((browserWidth, index) => {
        return new Promise((resolve, reject) => {
            return runTests(browserWidth, index, { resolve, reject })
        })
    });

    Promise.all(runTest)
}