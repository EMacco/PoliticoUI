import React from 'react';
import Card from '@components/layouts/Card';

const props = {
  name: 'emma',
  image: '',
  content: [
    {
      type: 'link',
      title: 'test',
      value: 'This is the value',
      officeId: 1,
      officeName: 'Office name',
      numberOfCandidates: 4,
      hidden: false,
      text: 'Hahaha',
      style: '',
      onClick: () => {},
      id: 1,
      key: 1
    },
    {
      type: 'button',
      title: 'test',
      value: 'This is the value',
      officeId: 1,
      officeName: 'Office name',
      numberOfCandidates: 4,
      hidden: false,
      text: 'Hahaha',
      style: '',
      onClick: () => {},
      id: 1,
      key: 2
    },
    {
      type: 'span',
      title: 'test',
      value: 'This is the value',
      officeId: 1,
      officeName: 'Office name',
      numberOfCandidates: 4,
      hidden: false,
      text: 'Hahaha',
      style: '',
      onClick: () => {},
      id: 1,
      key: 3
    },
    {
      title: 'test',
      value: 'This is the value',
      officeId: 1,
      officeName: 'Office name',
      numberOfCandidates: 4,
      hidden: false,
      text: 'Hahaha',
      style: '',
      onClick: () => {},
      id: 1,
      key: 4
    },
    {
      type: 'empty',
      title: 'test',
      value: 'This is the value',
      officeId: 1,
      officeName: 'Office name',
      numberOfCandidates: 4,
      hidden: false,
      text: 'Hahaha',
      style: '',
      onClick: () => {},
      id: 1
    }
  ],
  hidden: 'false'
};

const setup = () => {
  const wrapper = shallow(<Card {...props} />);
  return wrapper;
};

describe('<Card />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the Card component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Card')).toBeTruthy();
  });
});
