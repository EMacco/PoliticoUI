import isEmpty from '../../src/validations/is-empty';

describe('Is-Empty', () => {
  it('should return true', () => {
    const result = isEmpty({});
    expect(result).toBeTruthy();
  });

  it('should return false', () => {
    const result = isEmpty({ name: 'text' });
    expect(result).toBe(false);
  });
});
