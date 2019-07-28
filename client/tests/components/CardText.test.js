import React from 'react';
import CardText from '@components/common/CardText';

const props = {
  title: 'Date',
  value: '12th July 2019'
};

const setup = () => {
  const wrapper = shallow(<CardText {...props} />);
  return wrapper;
};

describe('<CardText />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the CardText component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('CardText')).toBeTruthy();
  });
});
