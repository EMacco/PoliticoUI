import React from 'react';
import { Login } from '@components/auth/Login';

const props = {
  errors: {},
  auth: {},
  loginUser: () => {}
};

const setup = () => {
  const wrapper = shallow(<Login {...props} />);
  return wrapper;
};

describe('<Login />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should have an email field', () => {
    const field = wrapper.find('TextFieldGroup').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('email');
  });

  it('should have an password field', () => {
    const field = wrapper.find('TextFieldGroup').at(1);
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('password');
  });

  it('should have an login button', () => {
    const field = wrapper.find('button').first();
    expect(field.exists()).toBe(true);
    expect(field.props().children).toEqual('Login');
  });

  it('should change text in email and password fields', () => {
    const input = wrapper.find('TextFieldGroup').first();
    input.simulate('change', { target: { value: 'test@test.com' } });
    const input2 = wrapper.find('TextFieldGroup').at(1);
    input2.simulate('change', { target: { value: 'emmanuel' } });
    const loginButton = wrapper.find('button').first();
    expect(loginButton.props().disabled).toEqual(false);
  });

  it('should render the Login component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Login')).toBeTruthy();
  });
});
