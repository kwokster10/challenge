import React, { Component, PropTypes } from 'react';

import { isExpired } from '../utils/date_helper.js';

export default class RecordComponent extends Component {
  expiredState(itemDate) {
    return isExpired(itemDate) ? 'expired' : 'active';
  }

  render() {
    const { record, index, onClick } = this.props;

    return (
      <div
        id={index}
        className={`record-component ${record.isCollapsed ? 'collapsed' : ''}`}
        onClick={onClick}>
        <div className="numbered-bullet">{index < 9 ? '0' : '' }{index + 1}</div>
        <div className="details">
          <p className="name">{record.name.toLowerCase()}</p>
          <div className={`expired-state ${this.expiredState(record.expiration_date)}`}>
            {this.expiredState(record.expiration_date)}
          </div>
          <div className={`more-details ${record.isCollapsed ? '' : 'hide'}`}>
            <p>
              <span className="details-info">DEA #:</span>
              {record.dea_number}
            </p>
            <p>
              <span className="details-info">NPI:</span>
              {record.npi}
            </p>
            <p>
              <span className="details-info">Expires:</span>
              {record.expiration_date}
            </p>
            <p>
              <span className="details-info">Provider ID:</span>
              {record.provider_id}
            </p>
          </div>
          <div className={`expand ${record.isCollapsed ? 'hide' : ''}`}/>
        </div>
      </div>
    )
  }
}

RecordComponent.propTypes = {
  record: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired
};
