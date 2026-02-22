import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import uuid from 'react-native-uuid';
import { Plant, PlantFormData } from '../types';
import { plantsStorage } from '../services/plantsStorage';
import { calculateNextWatering } from '../utils';
import {
  scheduleWateringNotification,
  cancelPlantNotification,
} from '../../../shared/notifications';

export const PLANTS_QUERY_KEY = ['plants'] as const;

export const usePlants = () => {
  return useQuery({
    queryKey: PLANTS_QUERY_KEY,
    queryFn: plantsStorage.getAll,
  });
};

export const useAddPlant = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (formData: PlantFormData): Promise<Plant> => {
      const now = new Date().toISOString();
      const nextWatering = calculateNextWatering(now, formData.wateringIntervalDays);

      const plant: Plant = {
        id: uuid.v4() as string,
        ...formData,
        lastWateredAt: now,
        nextWateringAt: nextWatering,
        createdAt: now,
      };

      const notificationId = await scheduleWateringNotification(
        plant,
        t('notifications.wateringTitle', { name: plant.name }),
        t('notifications.wateringBody', { name: plant.name })
      );

      if (notificationId) {
        plant.notificationId = notificationId;
      }

      return plantsStorage.add(plant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANTS_QUERY_KEY });
    },
  });
};

export const useWaterPlant = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (plant: Plant): Promise<Plant> => {
      if (plant.notificationId) {
        await cancelPlantNotification(plant.notificationId);
      }

      const now = new Date().toISOString();
      const nextWatering = calculateNextWatering(now, plant.wateringIntervalDays);

      const updatedPlant: Plant = {
        ...plant,
        lastWateredAt: now,
        nextWateringAt: nextWatering,
        notificationId: undefined,
      };

      const notificationId = await scheduleWateringNotification(
        updatedPlant,
        t('notifications.wateringTitle', { name: plant.name }),
        t('notifications.wateringBody', { name: plant.name })
      );

      if (notificationId) {
        updatedPlant.notificationId = notificationId;
      }

      return plantsStorage.update(updatedPlant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANTS_QUERY_KEY });
    },
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (plant: Plant): Promise<void> => {
      if (plant.notificationId) {
        await cancelPlantNotification(plant.notificationId);
      }
      await plantsStorage.remove(plant.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLANTS_QUERY_KEY });
    },
  });
};
