import reducer from '@reducers/dashboard';

const state = {
  interests: {},
  votes: []
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it('should handle SET_INTERESTED_OFFICE action', () => {
    const newState = reducer(state, {
      type: 'SET_INTERESTED_OFFICE',
      payload: {
        officeName: 'Office of the Governor'
      }
    });

    expect(newState).toEqual({
      ...state,
      interests: {
        officeName: 'Office of the Governor'
      }
    });
  });

  it('should handle SET_USER_VOTES action', () => {
    const newState = reducer(state, {
      type: 'SET_USER_VOTES',
      payload: [{ officeName: 'Office of the Governor' }]
    });

    expect(newState).toEqual({
      ...state,
      votes: [{ officeName: 'Office of the Governor' }]
    });
  });

  it('should handle CLEAR_DASHBOARD action', () => {
    const newState = reducer(state, {
      type: 'CLEAR_DASHBOARD'
    });

    expect(newState).toEqual({
      ...state,
      interests: {},
      votes: []
    });
  });
});
