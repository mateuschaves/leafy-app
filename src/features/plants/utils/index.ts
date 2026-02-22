import { addDays, formatDistanceToNow, isPast, isToday } from 'date-fns';
import { Plant } from '../types';

export const calculateNextWatering = (lastWateredAt: string, intervalDays: number): string => {
  const lastWatered = new Date(lastWateredAt);
  return addDays(lastWatered, intervalDays).toISOString();
};

export const needsWater = (plant: Plant): boolean => {
  const nextWatering = new Date(plant.nextWateringAt);
  return isPast(nextWatering) || isToday(nextWatering);
};

export const getWateringStatus = (plant: Plant): 'overdue' | 'today' | 'upcoming' => {
  const nextWatering = new Date(plant.nextWateringAt);
  if (isPast(nextWatering) && !isToday(nextWatering)) return 'overdue';
  if (isToday(nextWatering)) return 'today';
  return 'upcoming';
};

export const formatNextWatering = (nextWateringAt: string): string => {
  const date = new Date(nextWateringAt);
  if (isPast(date) && !isToday(date)) return 'Overdue';
  return formatDistanceToNow(date, { addSuffix: true });
};
