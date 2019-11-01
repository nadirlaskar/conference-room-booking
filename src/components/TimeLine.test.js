import React from 'react';
import ReactDOM from 'react-dom';
import TimeLine from './TimeLine';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeLine />, div);
  ReactDOM.unmountComponentAtNode(div);
});
