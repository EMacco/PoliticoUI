import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchInterestedOffice, fetchPageVotes } from '@actions/dashboard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  auth: {},
  dashboard: {},
  parties: {},
  offices: {}
});

const userDetails = {
  user: {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    email: 'testing@testing.com',
    phone: '08088293829',
    password: 'password'
  }
};

describe('Dashboard actions', () => {
  it('should dispatch SET_INTERESTED_OFFICE on successful fetch', async () => {
    await store.dispatch(fetchInterestedOffice(userDetails));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch SET_USER_VOTES on successful fetch of user votes', async () => {
    await store.dispatch(fetchPageVotes({ id: 1 }));
    expect(store.getActions()).toMatchSnapshot();
  });
});
