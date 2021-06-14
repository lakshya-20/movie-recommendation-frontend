import React from 'react';
import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Redering App', () => {
  render(<App/>);
});