import React from 'react';
import { shallow } from 'enzyme';

import RecordComponent from '../../components/record_component';

let record = {
  isCollapsed: false,
  name: 'TEST record',
  expiration_date: '2015-06-30',
  dea_number: 'FA0945937',
  npi: '1164634408',
  provider_id: 5077
};

describe('<RecordComponent />', () => {
  const onClickSpy = jasmine.createSpy('onClick');
  const subject = (props) => {
    const completeProps = Object.assign({}, { record: record, onClick: onClickSpy }, props);

    return shallow(
      <RecordComponent
        index={0}
        {...completeProps}
      />
    )
  };

  it('renders with expected class', () => {
    expect(subject().find('.record-component').length).toEqual(1);
  });

  it('renders expected numbers', () => {
    expect(subject().find('.numbered-bullet').text()).toEqual('01');
  });

  it('calls the onClick handler on click', () => {
    subject().find('.record-component').simulate('click');

    expect(onClickSpy).toHaveBeenCalled();

    onClickSpy.calls.reset();
  });

  it('lowercases the name', () => {
    expect(subject().find('.name').text()).toEqual('test record');
  });

  describe('when isCollapsed is false', () => {
    it('record is not expanded', () => {
      expect(subject().find('.collapsed').length).toEqual(0);
    });

    it('hides the details', () => {
      expect(subject().find('.more-details.hide').length).toEqual(1);
    });

    it('displays the arrow to expand', () => {
      expect(subject().find('.expand.hide').length).toEqual(0);
      expect(subject().find('.expand').length).toEqual(1);
    });
  });

  describe('when isCollapsed is true', () => {
    it('record is not expanded', () => {
      record.isCollapsed = true;
      expect(subject({ record: record }).find('.collapsed').length).toEqual(1);
    });

    it('hides the arrow to expand', () => {
      expect(subject().find('.expand.hide').length).toEqual(1);
    });
  });

  describe('when record is expired', () => {
    it('displays the expired state', () => {
      expect(subject().find('.expired-state.expired').length).toEqual(1);
    });
  });

  describe('when record is not expired', () => {
    it('displays the active state', () => {
      const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      record.expiration_date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

      expect(subject({ record: record }).find('.expired-state.active').length).toEqual(1);
    });
  });
});
