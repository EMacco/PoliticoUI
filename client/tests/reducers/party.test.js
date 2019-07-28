import reducer from '@reducers/party';

const state = {
  parties: []
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual(state);
  });

  it('should handle SET_POLITICAL_PARTIES action', () => {
    const newState = reducer(state, {
      type: 'SET_POLITICAL_PARTIES',
      payload: [{
        partyName: 'All progressive congress'
      }]
    });

    expect(newState).toEqual({
      ...state,
      parties: [{
        partyName: 'All progressive congress'
      }]
    });
  });

  it('should handle CLEAR_PARTIES action', () => {
    const newState = reducer(state, {
      type: 'CLEAR_PARTIES'
    });

    expect(newState).toEqual({
      ...state,
      parties: []
    });
  });
});
