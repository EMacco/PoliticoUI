import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

Enzyme.configure({ adapter: new Adapter() });
