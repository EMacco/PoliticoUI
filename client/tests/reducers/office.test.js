import reducer from '@reducers/office';

const state = {
  offices: []
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it('should handle SET_GOVERNMENT_OFFICES action', () => {
    const newState = reducer(state, {
      type: 'SET_GOVERNMENT_OFFICES',
      payload: [{
        officeName: 'Office of the Governor'
      }]
    });

    expect(newState).toEqual({
      ...state,
      offices: [{
        officeName: 'Office of the Governor'
      }]
    });
  });

  it('should handle CLEAR_OFFICES action', () => {
    const newState = reducer(state, {
      type: 'CLEAR_OFFICES'
    });

    expect(newState).toEqual({
      ...state,
      offices: []
    });
  });
});
