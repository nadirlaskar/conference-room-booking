import React from 'react';
import ReactDOM from 'react-dom';
import Calender from './Calender';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calender />, div);
  ReactDOM.unmountComponentAtNode(div);
});
