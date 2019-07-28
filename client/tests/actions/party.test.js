import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchPoliticalParties, changeUserParty } from '@actions/party';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  auth: {},
  dashboard: {},
  parties: {},
  offices: {}
});

describe('Offices actions', () => {
  it('should dispatch SET_POLITICAL_PARTIES on successful fetch', async () => {
    await store.dispatch(fetchPoliticalParties(1));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch SET_CURRENT_USER on successful change of party', async () => {
    await store.dispatch(changeUserParty(1));
    expect(store.getActions()).toMatchSnapshot();
  });
});
