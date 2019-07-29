import React from 'react';
import { UserHome } from '@components/pages/UserHome';

const props = {
  fetchInterestedOffice: () => {},
  auth: {},
  interest: {
    officeId: 1,
    officeName: 'Office',
    image: '',
    numberOfCandidates: 4,
    electionDate: '5th May'
  },
  fetchPageVotes: () => {},
  votes: [
    {
      partyLogo: '',
      name: 'John',
      partyName: 'Party',
      officeName: 'Office',
      result: 5,
      resultStyle: 'won',
      resultString: 'won'
    }
  ],
  user: { partyid: 2 }
};

const setup = () => {
  const wrapper = shallow(<UserHome {...props} />);
  return wrapper;
};

describe('<UserHome />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should render the UserHome component correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('UserHome')).toBeTruthy();
  });
});
