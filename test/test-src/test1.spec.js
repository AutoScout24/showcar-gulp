import { add } from './module';
import subtract from '../js-src/subtract';

describe('Test suite 1', function() {
    it('1 = 1', function() {
        expect(1).to.equal(1);
    });
});

describe('Test suite 3', () => {
    it('5=5', () => {
        expect(5).to.equal(5);
    });

    it('async', done => {
        setTimeout(() => {
            expect(6).to.equal(6);
            done();
        });
    });

    it('module', () => {
        debugger;
        expect(add(3, 4)).to.equal(7);
    });

    it('subtract', () => {
        expect(subtract(8, 3)).to.equal(5);
    });
});
