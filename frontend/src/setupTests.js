import React from 'react'
import 'react-dom'
import 'jest-enzyme'
import 'react-dom/test-utils'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.React = React;
global.shallow = shallow;
