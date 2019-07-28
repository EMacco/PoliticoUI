import React from 'react';
import { AuthHeader } from '@components/layouts/AuthHeader';

const props = {
  auth: {
    user: { firstname: 'Emmanuel', lastname: 'Okwara', isadmin: true },
    isAuthenticated: true
  },
  logoutUser: () => {}
};

const setup = () => {
  const wrapper = shallow(<AuthHeader {...props} />);
  return wrapper;
};

describe('<AuthHeader />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should logout', () => {
    const logoutBtn = wrapper.find('span').first();
    logoutBtn.simulate('click');
    expect(logoutBtn.exists()).toBe(true);
  })

  it('should render the Auth Header component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('AuthHeader')).toBeTruthy();
  });
});
