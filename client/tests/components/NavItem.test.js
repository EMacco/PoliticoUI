import React from 'react';
import NavItem from '@components/common/NavItem';

const props = {
  name: 'Home',
  path: '/'
};

const setup = () => {
  const wrapper = shallow(<NavItem {...props} />);
  return wrapper;
};

describe('<NavItem />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the NavItem component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('NavItem')).toBeTruthy();
  });
});
