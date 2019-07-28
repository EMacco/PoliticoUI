import React from 'react';
import { AuthNav } from '@components/layouts/AuthNav';

const props = {
  auth: {
    user: {
      firstname: '',
      lastname: '',
      phone: '',
      email: ''
    }
  },
  logoutUser: () => {}
};

const setup = () => {
  const wrapper = shallow(<AuthNav {...props} />);
  return wrapper;
};

describe('<AuthNav />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the Auth Navigation component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('AuthNav')).toBeTruthy();
  });
});
