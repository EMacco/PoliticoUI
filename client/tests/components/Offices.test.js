import React from 'react';
import { Offices } from '@components/pages/Offices';

const props = {
  fetchGovernmentOffices: () => {},
  user: { partyid: 2 },
  offices: [
    {
      id: 1,
      logourl:
        'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452411/mtuaqvskpzlwlu331g1e.png',
      name: 'office of the president',
      type: 'federal',
      officeId: 1,
      officeLogo: '',
      officeName: '',
      officeType: 'state',
      electionDate: 'June 9th',
      count: 3,
      candidateStatus: 'Approved candidate',
      officeBtn: 'won',
      alreadyApplied: true
    },
    {
      id: 2,
      logourl:
        'https://res.cloudinary.com/dn4pokov0/image/upload/v1551466689/nph9hky2tdup5qs9af5j.png',
      name: 'office of the governor of lagos state',
      type: 'state',
      officeId: 1,
      officeLogo: '',
      officeName: '',
      officeType: 'state',
      electionDate: 'June 9th',
      count: 3,
      candidateStatus: '',
      officeBtn: 'won',
      alreadyApplied: true
    }
  ]
};

const setup = () => {
  const wrapper = shallow(<Offices {...props} />);
  return wrapper;
};

describe('<Offices />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the Offices component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Offices')).toBeTruthy();
  });
});
