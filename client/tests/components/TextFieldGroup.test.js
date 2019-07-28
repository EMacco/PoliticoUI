import React from 'react';
import TextFieldGroup from '@components/common/TextFieldGroup';

const props = {
  id: '1',
  name: 'email',
  placeholder: 'Email',
  value: '',
  className: '',
  type: 'input',
  onChange: () => {},
  icon: '',
  error: 'Email is required'
};

const setup = () => {
  const wrapper = shallow(<TextFieldGroup {...props} />);
  return wrapper;
};

describe('<TextFieldGroup />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the TextFieldGroup component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('TextFieldGroup')).toBeTruthy();
  });
});
