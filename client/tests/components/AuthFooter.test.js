import React from 'react';
import AuthFooter from '@components/layouts/AuthFooter';

const setup = () => {
  const wrapper = shallow(<AuthFooter />);
  return wrapper;
};

describe('<AuthFooter />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the AuthFooter component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('AuthFooter')).toBeTruthy();
  });
});
