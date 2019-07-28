import React from 'react';
import CardLink from '@components/common/CardLink';

const props = {
  officeId: 1,
  officeName: 'Office Name',
  numberOfCandidates: 4
};

const setup = () => {
  const wrapper = shallow(<CardLink {...props} />);
  return wrapper;
};

describe('<CardLink />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the CardLink component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('CardLink')).toBeTruthy();
  });
});
