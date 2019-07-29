import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Routes, { refreshPage } from '@components/App';

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

  it('should refresh page', () => {
    localStorage.jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJFbW1hbnVlbCIsImxhc3RuYW1lIjoiT2t3YXJhIiwib3RoZXJuYW1lIjoiTmR1a2EiLCJlbWFpbCI6ImVtbWE0cmVhbDM3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGdBZUFla3RWdE9xMWJkbHIuQ1hISnVHb2xTVjVTbDIvLms2VjY3NS9Qd1h0dWJjUy5QaC9tIiwicGhvbmVudW1iZXIiOiIwODEyNDE4NTMyMCIsInBhc3Nwb3J0dXJsIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG40cG9rb3YwL2ltYWdlL3VwbG9hZC92MTU2MjI0OTQ0My9wdGU5Z3k0dnlxdWZhYmRzY2pmMi5qcGciLCJpc2FkbWluIjp0cnVlLCJwYXJ0eWlkIjoyfSwiaWF0IjoxNTY0MzYwNTE0LCJleHAiOjE1NjQzNjQxMTR9.PGzgzP7XC3mFLy98uchP3frG77Avh0EH5XiD_R-MrTc';
    refreshPage()
  });

  it('should render the Routes component correctly', () => {
    const shallowWrapper = shallow(<Routes />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
