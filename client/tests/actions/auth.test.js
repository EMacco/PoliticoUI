import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loginUser, registerUser, logoutUser } from '@actions/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  auth: {},
  dashboard: {},
  parties: {},
  offices: {}
});

const newUser = {
  firstname: 'John',
  lastname: 'Doe',
  email: 'testing@testing.com',
  phone: '08088293829',
  password: 'password'
};

const history = { push: jest.fn() };

describe('Auth actions', () => {
  it('should dispatch SET_CURRENT_USER on successful registration', async () => {
    store.dispatch(registerUser(newUser));
    await expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch SET_CURRENT_USER, CLEAR_CURRENT_PROFILE, CLEAR_DASHBOARD, CLEAR_PARTIES, and CLEAR_OFFICES', () => {
    store.dispatch(logoutUser(history));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should dispatch SET_CURRENT_USER on successful login', async () => {
    await store.dispatch(loginUser({ email: 'testing@testing.com', password: 'password' }));
    expect(store.getActions()).toMatchSnapshot();
  });
});
