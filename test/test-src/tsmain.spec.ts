import subtract from '../ts-src/subtract';

declare var expect;

describe('subtract', () => {
  it('should correctly subtract', () => {
    expect(2).to.equal(subtract(5, 3));
  });
});