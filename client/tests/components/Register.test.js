import React from 'react';
import { Register } from '@components/auth/Register';

const props = {
  errors: {},
  auth: {},
  registerUser: () => {}
};

const setup = () => {
  const wrapper = shallow(<Register {...props} />);
  return wrapper;
};

describe('<Register />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should have an firstname field', () => {
    const field = wrapper.find('TextFieldGroup').first();
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('firstName');
  });

  it('should have an lastname field', () => {
    const field = wrapper.find('TextFieldGroup').at(1);
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('lastName');
  });

  it('should have an phone field', () => {
    const field = wrapper.find('TextFieldGroup').at(2);
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('phoneNumber');
  });

  it('should have an email field', () => {
    const field = wrapper.find('TextFieldGroup').at(3);
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('email');
  });

  it('should have an password field', () => {
    const field = wrapper.find('TextFieldGroup').at(4);
    expect(field.exists()).toBe(true);
    expect(field.props().name).toEqual('password');
  });

  it('should have an login button', () => {
    const field = wrapper.find('button').first();
    expect(field.exists()).toBe(true);
    expect(field.props().children).toEqual('Join Us');
  });

  it('should change texts in firstname, lastname, phone, email and password fields', () => {
    const input = wrapper.find('TextFieldGroup').first();
    input.simulate('change', { target: { value: 'emmanuel' } });
    const input2 = wrapper.find('TextFieldGroup').at(1);
    input2.simulate('change', { target: { value: '08083782783' } });
    const input3 = wrapper.find('TextFieldGroup').at(1);
    input2.simulate('change', { target: { value: 'test@test.com' } });
    const input4 = wrapper.find('TextFieldGroup').at(1);
    input2.simulate('change', { target: { value: 'testingg' } });
    const registerButton = wrapper.find('button').first();
    expect(registerButton.props().disabled).toEqual(false);
  });

  it('should have an button to redirect to login page', () => {
    const field = wrapper.find('Link').at(1);
    expect(field.exists()).toBe(true);
    expect(field.props().children).toEqual('Already have an account?');
  });

  it('should render the Login component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Login')).toBeTruthy();
  });
});
