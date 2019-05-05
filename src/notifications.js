import { Notifications, Permissions } from 'expo';

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;

const INTERVAL = day;

function createStudyReminderLocalNotification () {
	return {
		title: 'Don\'t forget to study!',
		body: 'Practice makes it perfect. Select a deck and practice what you\'d learned!',
		ios: { sound: true },
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		},
	}
}

function getNextNotificationDate () {
	const next = new Date(Date.now() + INTERVAL);

	next.setHours(20);
	next.setMinutes(0);
	next.setSeconds(0);
	next.setMilliseconds(0)

	return next;
}

function getIntervalCategory () {

	if (INTERVAL > month) {
		return 'year';
	} else if (INTERVAL < year && INTERVAL >= month) {
		return 'month';
	} else if (INTERVAL < month && INTERVAL >= week) {
		return 'week';
	} else if (INTERVAL < week && INTERVAL >= day) {
		return 'day';
	} else if (INTERVAL < day && INTERVAL >= hour) {
		return 'hour';
	} else {
		return 'minute';
	}
}

export async function verifyPermissions () {
	const verification = await Permissions.askAsync(Permissions.NOTIFICATIONS);
	const { status } = verification;
	return status === 'granted';
}

export async function clearStudyReminderNotifications () {
	await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setStudyReminderNotification () {
	const hasPermission = await verifyPermissions();

	if (hasPermission) {
		const notif = createStudyReminderLocalNotification();
		const options = {
			time: getNextNotificationDate(),
			repeat: getIntervalCategory()
		}

		await Notifications.scheduleLocalNotificationAsync(notif, options);
	}
}

export async function resetStudyReminderNotifications () {
	await clearStudyReminderNotifications();
	await setStudyReminderNotification();
}