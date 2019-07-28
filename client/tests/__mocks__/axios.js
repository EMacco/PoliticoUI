const post = url => {
  switch (url) {
    case '/auth/signup':
    case '/auth/login':
      return {
        data: {
          data: [
            {
              user: {
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                email: 'testing@testing.com',
                phone: '08088293829',
                password: 'password'
              },
              token: 'thisisthetoken'
            }
          ]
        }
      };
    case '/office/1/result':
      return {
        data: {
          data: [
            { candidateid: 4, count: '1', officeid: 2 },
            { candidateid: 5, count: '3', officeid: 2 },
            { candidateid: 6, count: '2', officeid: 2 }
          ]
        }
      };
    case '/parties/join':
      return {
        data: {
          data: [
            {
              user: {
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                email: 'testing@testing.com',
                phone: '08088293829',
                password: 'password',
                partyid: 1
              }
            }
          ]
        }
      };
    default:
      return {
        data: {
          data: []
        }
      };
  }
};

const get = url => {
  switch (url) {
    case '/offices/candidates':
      return {
        data: {
          data: [
            { candidateid: 1, date: '2019-03-01T00:00:00.000Z', id: 1, officeid: 1, partyid: 2 }
          ]
        }
      };
    case '/offices/1':
      return {
        data: {
          data: [
            {
              id: 1,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452411/mtuaqvskpzlwlu331g1e.png',
              name: 'office of the president',
              type: 'federal'
            }
          ]
        }
      };
    case '/office/1/user-votes':
      return {
        data: {
          dataa: [
            {
              candidateid: 1,
              createdby: 1,
              createdon: '2019-03-01T00:00:00.000Z',
              id: 1,
              officeid: 1
            }
          ]
        }
      };
    case '/users/1':
      return {
        data: {
          data: [
            {
              id: 1,
              firstname: 'John',
              lastname: 'Doe',
              email: 'testing@testing.com',
              phone: '08088293829',
              password: 'password',
              partyid: 2
            }
          ]
        }
      };
    case '/parties/2':
      return {
        data: {
          data: [
            {
              hqaddress: 'festac lagos',
              id: 2,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452220/ukhkvobjnabok4ymt7g3.jpg',
              name: 'all progressives congress'
            }
          ]
        }
      };
    case '/offices':
      return {
        data: {
          data: [
            {
              id: 1,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452411/mtuaqvskpzlwlu331g1e.png',
              name: 'office of the president',
              type: 'federal'
            },
            {
              id: 2,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551466689/nph9hky2tdup5qs9af5j.png',
              name: 'office of the governor of lagos state',
              type: 'state'
            }
          ]
        }
      };
    case '/parties':
      return {
        data: {
          data: [
            {
              hqaddress: 'festac lagos',
              id: 1,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452104/dggfgdaqi5demtki1dnt.png',
              name: 'peoples democratic party'
            },
            {
              hqaddress: 'festac lagos',
              id: 2,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551452220/ukhkvobjnabok4ymt7g3.jpg',
              name: 'all progressives congress'
            },
            {
              hqaddress: 'lekki, lagos',
              id: 3,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1551466591/aou6cohppt8yckombbsm.png',
              name: 'all progressives grand alliance'
            },
            {
              hqaddress: 'google, universal',
              id: 4,
              logourl:
                'https://res.cloudinary.com/dn4pokov0/image/upload/v1557735076/ogpffpwqi1s8hsuewlah.jpg',
              name: 'node package manager'
            }
          ]
        }
      };

    default:
      return {
        data: {
          data: []
        }
      };
  }
};

const defaults = {
  baseURL: '',
  headers: {
    common: {
      'x-access-token': true
    }
  }
};

export default { post, get, defaults };
