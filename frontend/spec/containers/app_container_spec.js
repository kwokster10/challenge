import React from 'react';
import { shallow } from 'enzyme';

import AppContainer from '../../containers/app_container';
import RecordsComponent from '../../containers/records_container';

window = {
  DEA: {}
};

describe('<AppContainer />', () => {
  const subject = () => {
    return shallow(<AppContainer />)
  };

  it('renders with expected class', () => {
    expect(subject().find('.app-container').length).toEqual(1);
  });

  describe('when response is success', () => {
    it('renders the records component', () => {
      window.DEA.success = [];
      window.DEA.error = null;

      expect(subject().find(RecordsComponent).length).toEqual(1);
    });
  });

  describe('when response is failure', () => {
    it('renders an error message', () => {
      window.DEA.success = null;
      window.DEA.error = {
        message: 'An error occurred.',
        response: ''
      };

      expect(subject().find('.error').text()).toEqual('An error occurred.');
    });
  });
});
