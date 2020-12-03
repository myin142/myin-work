import { TimeUtils } from './time-utils';
import { DateTime } from 'luxon';
import { TimeSegment } from '@myin-work/cloud-shared';

describe('Time Utils', () => {
  it('date to time', () => {
    expect(TimeUtils.dateToTime(new Date(2020, 0, 0, 10, 30))).toEqual('10:30');
  });

  describe('Time to Date', () => {
    it('handle null', () => {
      expect(TimeUtils.timeToDate(null)).toEqual(null);
    });

    it('handle invalid', () => {
      expect(TimeUtils.timeToDate('')).toEqual(null);
    });

    it('convert from time format', () => {
      const expected = DateTime.fromObject({ hour: 1, minute: 30 }).toJSDate();
      expect(TimeUtils.timeToDate('01:30')).toEqual(expected);
    });

    it('convert from time format with date', () => {
      const date = new Date(2020, 0, 1);
      const expected = DateTime.fromObject({
        year: 2020,
        month: 1,
        day: 1,
        hour: 1,
        minute: 30,
      }).toJSDate();
      expect(TimeUtils.timeToDate('01:30', date)).toEqual(expected);
    });
  });

  describe('Get End Date', () => {
    it('handle null', () => {
      expect(TimeUtils.getEndDate(null)).toEqual(null);
    });

    it('handle start undefined', () => {
      expect(TimeUtils.getEndDate({ start: null })).toEqual(null);
    });

    it('get end date', () => {
      expect(TimeUtils.getEndDate({ start: '08:00', end: '10:00' })).toEqual(
        DateTime.fromObject({ hour: 10 }).toJSDate()
      );
    });

    it('get start + 1 hour if end not defined', () => {
      expect(TimeUtils.getEndDate({ start: '08:00' })).toEqual(
        DateTime.fromObject({ hour: 9 }).toJSDate()
      );
    });

    it('get end date with date', () => {
      const date = new Date(2020, 0, 1);
      const expected = DateTime.fromObject({
        year: 2020,
        month: 1,
        day: 1,
        hour: 10,
      }).toJSDate();
      expect(
        TimeUtils.getEndDate({ start: '08:00', end: '10:00' }, date)
      ).toEqual(expected);
    });

    it('get start + 1 hour with date', () => {
      const date = new Date(2020, 0, 1);
      const expected = DateTime.fromObject({
        year: 2020,
        month: 1,
        day: 1,
        hour: 9,
      }).toJSDate();
      expect(TimeUtils.getEndDate({ start: '08:00' }, date)).toEqual(expected);
    });
  });

  describe('Get Start Time', () => {
    it('get start time', () => {
      const times: TimeSegment[] = [
        { start: '10:00' },
        { start: '12:00' },
        { start: '08:00' },
      ];
      expect(TimeUtils.getStartTime({ dayId: '', times })).toEqual('08:00');
    });
  });

  describe('Get End Time', () => {
    it('get end time', () => {
      const times: TimeSegment[] = [
        { start: '10:00' },
        { start: '12:00', end: '15:00' },
        { start: '08:00', end: '13:00' },
      ];
      expect(TimeUtils.getEndTime({ dayId: '', times })).toEqual('15:00');
    });
  });

  describe('Get Total Duration', () => {
    it('get total duration', () => {
      const times: TimeSegment[] = [
        { name: '1', start: '10:00' },
        { name: '2', start: '12:00', end: '15:00' },
        { name: '3', start: '08:00', end: '13:00' },
      ];
      expect(
        TimeUtils.getTotalDuration({ dayId: '', times }).toFormat('hh:mm')
      ).toEqual('07:00');
    });
  });
});
