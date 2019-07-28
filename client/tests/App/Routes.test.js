import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Routes from '@components/App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Routes', () => {
  let store, history;

  beforeEach(() => {
    store = mockStore({
      auth: {},
      dashboard: {},
      parties: {},
      offices: {}
    });
    history = {
      push: jest.fn()
    };
  });

  it('should render index page', () => {
    const comp = (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Routes dispatch={jest.fn()} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );

    const wrapper = mount(comp);

    expect(wrapper.find('Home')).toBeTruthy();
  });

  it('should render the Routes component correctly', () => {
    const shallowWrapper = shallow(<Routes />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});