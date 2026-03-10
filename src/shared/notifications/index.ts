import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { Plant } from '../../features/plants/types';

const DEFAULT_NOTIFICATION_HOUR = 9;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermissions = async (): Promise<boolean> => {
  if (!Device.isDevice) {
    return false;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('watering-reminders', {
      name: 'Watering Reminders',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#52B788',
    });
  }

  return finalStatus === 'granted';
};

export const scheduleWateringNotification = async (
  plant: Plant,
  title: string,
  body: string
): Promise<string | undefined> => {
  try {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return undefined;

    const nextWatering = new Date(plant.nextWateringAt);
    const now = new Date();

    if (nextWatering <= now) {
      nextWatering.setDate(now.getDate());
      nextWatering.setHours(DEFAULT_NOTIFICATION_HOUR, 0, 0, 0);
      if (nextWatering <= now) {
        nextWatering.setDate(now.getDate() + 1);
        nextWatering.setHours(DEFAULT_NOTIFICATION_HOUR, 0, 0, 0);
      }
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { plantId: plant.id },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: nextWatering,
      },
    });

    return notificationId;
  } catch (error) {
    console.error('Failed to schedule notification:', error);
    return undefined;
  }
};

export const cancelPlantNotification = async (notificationId: string): Promise<void> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Failed to cancel notification:', error);
  }
};

export const cancelAllNotifications = async (): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};
