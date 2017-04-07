import React, { Component, PropTypes } from 'react';
import RecordComponent from '../components/record_component';

import { isExpired } from '../utils/date_helper.js';

export default class RecordsContainer extends Component {
  resetState(props) {
    return {
      records: props.records.map(function(record) {
        record.isCollapsed = false;
        return record;
      }),
      currentlyOpened: null,
      onlyExpired: false
    };
  }

  constructor(props) {
    super(props);

    this.state = this.resetState(props);

    this.onClick = this.onClick.bind(this);
    this.toggleState = this.toggleState.bind(this);
  }

  onClick(e) {
    const openedIndex = this.state.currentlyOpened;
    const nextOpenedIndex = e.currentTarget.id;

    if (openedIndex === nextOpenedIndex) return;

    let records = this.state.records;

    // remove currently open child
    if (openedIndex) {
      records[openedIndex] = Object.assign(
        {},
        records[openedIndex],
        { isCollapsed: false }
      )
    }

    // open clicked child
    records[nextOpenedIndex] = Object.assign(
      {},
      records[nextOpenedIndex],
      { isCollapsed: true }
    );

    this.setState({
      records: records,
      currentlyOpened: nextOpenedIndex
    });
  }

  toggleState() {
    if (!this.state.onlyExpired) {
      this.setState({
        records: this.state.records.filter((record) => {
          return isExpired(record.expiration_date);
        }),
        onlyExpired: true
      });
    } else {
      this.setState(this.resetState(this.props));
    }
  }

  renderEmptyRecord() {
    return (
      <div className="record-component">
        <div className="numbered-bullet">00</div>
        <div className="details">
          <p className="name">No records found</p>
          <div className="expired-state expired">
            expired
          </div>
        </div>
      </div>
    )
  }

  renderRecords() {
    return (
      this.state.records.map((record, index)=> {
        return (
          <RecordComponent
            key={record.provider_id}
            index={index}
            record={record}
            onClick={this.onClick}
          />
        )
      })
    )
  }

  render() {
    return (
      <div className="records-container">
        <div className="expired-button-container">
          <div
            className="expired-button"
            onClick={this.toggleState}>
            show {this.state.onlyExpired ? 'all' : 'expired'}
          </div>
        </div>
        <div className="records-collection">
          {
            this.state.records.length > 0 ? this.renderRecords() : this.renderEmptyRecord()
          }
        </div>
      </div>
    )
  }
}

RecordsContainer.propTypes = {
  records: React.PropTypes.array.isRequired,
};
