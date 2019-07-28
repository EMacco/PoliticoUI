import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchGovernmentOffices } from '@actions/office';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  auth: {},
  dashboard: {},
  parties: {},
  offices: {}
});

describe('Offices actions', () => {
  it('should dispatch SET_GOVERNMENT_OFFICES on successful fetch', async () => {
    await store.dispatch(fetchGovernmentOffices(1));
    expect(store.getActions()).toMatchSnapshot();
  });
});
