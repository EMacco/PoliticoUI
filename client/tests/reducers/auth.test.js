import reducer from '@reducers/authReducer';

const state = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it('should handle SET_CURRENT_USER action', () => {
    const newState = reducer(state, {
      type: 'SET_CURRENT_USER',
      payload: {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'testing@testing.com',
        phone: '08088293829',
        password: 'password'
      }
    });

    expect(newState).toEqual({
      ...state,
      isAuthenticated: true,
      user: {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'testing@testing.com',
        phone: '08088293829',
        password: 'password'
      }
    });
  });

  it('should handle GET_ERRORS action', () => {
    const newState = reducer(state, {
      type: 'GET_ERRORS',
      payload: { global: 'Invalid token' }
    });

    expect(newState).toEqual({
      ...state,
      errors: { global: 'Invalid token' }
    });
  });

  it('should handle CLEAR_CURRENT_PROFILE action', () => {
    const newState = reducer(state, {
      type: 'CLEAR_CURRENT_PROFILE'
    });

    expect(newState).toEqual({
      ...state,
      isAuthenticated: false,
      user: {}
    });
  });
});
