import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from 'expo';

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const week = 7 * day;
const month = 30 * day;
const year = 365 * day;

const STUDY_REMINDER_STORAGE_KEY = 'MobileFlashcards:studyreminders';

const NOTIFICATION_HOUR = 20;

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

function getNextNotificationDate (lastStudyDate = new Date(0)) {
	let next;
	const now = new Date();

	if (lastStudyDate < now) {
		const hasStudiedToday = lastStudyDate.getDate() === now.getDate();
		const canBeSetForToday = now.getHours() < NOTIFICATION_HOUR;

		if (hasStudiedToday) {
			next = new Date(now.valueOf() + day);
		} else if (!canBeSetForToday) {
			next = new Date(now.valueOf() + day);
		} else {
			next = new Date();
		}

	}

	next.setHours(NOTIFICATION_HOUR);
	next.setMinutes(0);
	next.setSeconds(0);
	next.setMilliseconds(0)

	return next;
}

function getIntervalCategory () {
	return 'day'
}

async function getLastStudyDate () {
	const dataString = await AsyncStorage.getItem(STUDY_REMINDER_STORAGE_KEY);
	const data = JSON.parse(dataString);

	const { lastStudiedAt } = data;
	return new Date(lastStudiedAt);
}

export async function saveLastStudyNow () {
	await saveLastStudiedDate(new Date())
}

export async function saveLastStudiedDate (date) {
	const entry = { lastStudiedAt: date.valueOf() };
	const entryString = JSON.stringify(entry);
	await AsyncStorage.mergeItem(STUDY_REMINDER_STORAGE_KEY, entryString);
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

	const lastStudiedAt = await getLastStudyDate();

	if (hasPermission) {
		const notif = createStudyReminderLocalNotification();
		const options = {
			time: getNextNotificationDate(lastStudiedAt),
			repeat: getIntervalCategory()
		}

		await Notifications.scheduleLocalNotificationAsync(notif, options);
	}
}

export async function resetStudyReminderNotifications () {
	await clearStudyReminderNotifications();
	await setStudyReminderNotification();
}

export async function init () {
	const data = await AsyncStorage.getItem(STUDY_REMINDER_STORAGE_KEY);

	if (data === null) {
		saveLastStudiedDate(new Date(0))
		const hasPermissions = await verifyPermissions();

		if (hasPermissions) {
			await setStudyReminderNotification()
		}
	}
}