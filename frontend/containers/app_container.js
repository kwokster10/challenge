import React, { Component, PropTypes } from 'react';

import RecordsContainer from './records_container';

export default class AppContainer extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="header">
          <div className="header-top">Simple</div>
          <div className="header-caps">DEA</div>
        </div>
        {
          window.DEA && window.DEA.success ?
            <RecordsContainer
              records={window.DEA.success}
            /> :
            <div className="error">
              { window.DEA && window.DEA.error && window.DEA.error.message }
            </div>
        }
      </div>
    )
  }
}
