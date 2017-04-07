window.DEA = window.DEA || {};

// render React Components onto DOM
import React from 'react';
import { render } from 'react-dom';

import AppContainer from './containers/app_container';

window.DEA.app = function() {
  render(
    <AppContainer />,
    document.getElementById('app-container')
  );
};
