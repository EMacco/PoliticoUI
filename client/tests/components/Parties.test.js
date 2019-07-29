import React from 'react';
import { Parties } from '@components/pages/Parties';

const props = {
  fetchPoliticalParties: () => {},
  user: { partyid: 2 },
  parties: [
    {
      hqaddress: 'festac lagos',
      id: 1,
      logourl:
        'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452104/dggfgdaqi5demtki1dnt.png',
      name: 'peoples democratic party',
      partyId: 1,
      partyLogo: '',
      partyName: 'Party Name'
    },
    {
      hqaddress: 'festac lagos',
      id: 2,
      logourl:
        'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452220/ukhkvobjnabok4ymt7g3.jpg',
      name: 'all progressives congress',
      partyId: 2,
      partyLogo: '',
      partyName: 'Party Name'
    },
    {
      hqaddress: 'lekki, lagos',
      id: 3,
      logourl:
        'https://res.cloudinary.com/dn4pokov0/image/upload/v1551466591/aou6cohppt8yckombbsm.png',
      name: 'all progressives grand alliance',
      partyId: 3,
      partyLogo: '',
      partyName: 'Party Name'
    },
    {
      hqaddress: 'google, universal',
      id: 4,
      logourl:
        'https://res.cloudinary.com/dn4pokov0/image/upload/v1557735076/ogpffpwqi1s8hsuewlah.jpg',
      name: 'node package manager',
      partyId: 4,
      partyLogo: '',
      partyName: 'Party Name'
    }
  ]
};

const setup = () => {
  const wrapper = shallow(<Parties {...props} />);
  return wrapper;
};

describe('<Parties />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the Parties component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Parties')).toBeTruthy();
  });
});
