import { DateTime, Duration, Interval } from 'luxon';
import { TimeSegment, WorkTime } from '@myin-work/cloud-shared';

export class TimeUtils {
  public static SUMMARY_BREAK_ID = 'BREAK';

  static timeToDate(time: string, date = new Date()): Date {
    if (time == null) return null;
    let dateTime = DateTime.fromFormat(time, 'HH:mm');
    if (!dateTime.isValid) return null;

    dateTime = dateTime.set({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
    return dateTime.toJSDate();
  }

  static dateToTime(date: Date): string {
    if (date == null) return '';
    return DateTime.fromJSDate(date).toFormat('HH:mm');
  }

  static getEndDate(time: TimeSegment, date = new Date()): Date {
    if (time == null || !time.start) return null;
    const start = DateTime.fromJSDate(this.timeToDate(time.start, date));
    const end = time.end
      ? DateTime.fromJSDate(this.timeToDate(time.end, date))
      : start.plus(Duration.fromObject({ hours: 1 }));
    return end.toJSDate();
  }

  static getEndTime(time: WorkTime): string {
    const sorted = time.times
      .map((t) => TimeUtils.getEndDate(t))
      .filter((t) => t != null)
      .sort((t1, t2) => t2.getTime() - t1.getTime());

    return TimeUtils.dateToTime(sorted[0]);
  }

  static getStartTime(time: WorkTime): string {
    return time.times
      .map((t) => t.start)
      .filter((t) => TimeUtils.timeToDate(t) != null)
      .sort(
        (s1, s2) =>
          TimeUtils.timeToDate(s1).getTime() -
          TimeUtils.timeToDate(s2).getTime()
      )[0];
  }

  static getTotalDuration(
    time: WorkTime,
    condition: (t: TimeSegment) => boolean = () => true
  ): Duration {
    const filteredTimes = time.times.filter((t) => condition(t));
    const durations = filteredTimes.map((t) => {
      let duration = TimeUtils.getDuration(t);
      TimeUtils.findOverlappingIntersections(t, time.times).forEach((i) => {
        duration = duration.minus(i.toDuration());
      });
      return duration;
    });

    return TimeUtils.sumOfDurations(durations);
  }

  static findOverlappingIntersections(
    time: TimeSegment,
    times: TimeSegment[]
  ): Interval[] {
    const interval = TimeUtils.getInterval(time);
    return times
      .filter((t) => t.name !== time.name)
      .map((t) => TimeUtils.getInterval(t))
      .filter((i) => i.isAfter(interval.start) || interval.engulfs(i))
      .map((i) => interval.intersection(i))
      .filter((i) => !!i);
  }

  static getInterval(time: TimeSegment): Interval {
    const start = DateTime.fromISO(time.start);
    const end = TimeUtils.getEndDate(time);
    return Interval.fromDateTimes(start, end);
  }

  static getDuration(time: TimeSegment): Duration {
    const date = DateTime.fromISO(time.start);
    const endDate = TimeUtils.getEndDate(time);
    return DateTime.fromJSDate(endDate).diff(date);
  }

  static sumOfDurations(times: Duration[]): Duration {
    return times.reduce((d1, d2) => d1.plus(d2), Duration.fromMillis(0));
  }

  static getSummaryOfTimes(times: TimeSegment[]): TimeSummary[] {
    const summary: TimeSummary[] = [];
    for (const time of times) {
      let duration = TimeUtils.getDuration(time);

      TimeUtils.findOverlappingIntersections(time, times).forEach((i) => {
        duration = duration.minus(i.toDuration());
      });

      const name = time.break ? this.SUMMARY_BREAK_ID : time.name;
      const existing = summary.find((s) => s.name === name);
      if (existing) {
        existing.duration = existing.duration.plus(duration);
        if (time.comment) {
          existing.comments.push(time.comment);
        }
      } else {
        const comments = time.comment ? [time.comment] : [];
        const obj: TimeSummary = {
          name,
          comments,
          duration,
        };

        if (time.break) {
          obj.break = true;
        }

        summary.push(obj);
      }
    }

    return summary;
  }
}

export interface TimeSummary {
  name: string;
  comments: string[];
  duration: Duration;
  break?: boolean;
}
