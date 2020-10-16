import { DateTime, Duration } from 'luxon';
import { TimeSegment } from '@myin-work/cloud-shared';

export class TimeUtils {

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

}