import React from 'react';
import { shallow } from 'enzyme';

import RecordsContainer from '../../containers/records_container';
import RecordComponent from '../../components/record_component';

describe('<RecordsContainer />', () => {
  const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const futureDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  const records = [
    {
      expiration_date: '2015-06-30',
      provider_id: 5077
    },
    {
      expiration_date: futureDate,
      provider_id: 5000
    }
  ];

  const subject = (props) => {
    return shallow(<RecordsContainer {...props}/>)
  };

  const wrapper = subject({records: records});

  it('renders with expected text', () => {
    expect(wrapper.find('.records-container').length).toEqual(1);
  });

  describe('when records exists', () => {
    it('renders the expected amount of RecordComponent', () => {
      expect(wrapper.find(RecordComponent).length).toEqual(2);
    });
  });

  describe('when there are no records', () => {
    it('renders empty records message', () => {
      expect(subject({records: []}).find('.numbered-bullet').text()).toEqual('00');
      expect(subject({records: []}).find('.name').text()).toEqual('No records found');
    });
  });

  describe('when show expired is clicked', () => {
    it('shows only expired records', () => {
      expect(wrapper.find('.expired-button').text()).toEqual('show expired');

      wrapper.find('.expired-button').simulate('click');

      expect(wrapper.find(RecordComponent).length).toEqual(1);
      expect(wrapper.find(RecordComponent).prop('record')).toEqual(records[0]);
    });

    describe('when show all is clicked', () => {
      it('shows all records', () => {
        expect(wrapper.find('.expired-button').text()).toEqual('show all');

        wrapper.find('.expired-button').simulate('click');

        expect(wrapper.find(RecordComponent).length).toEqual(2);
      });
    });
  });
});
