import { STORAGE_KEYS, storage } from '../../../storage';
import { Plant } from '../types';

export const plantsStorage = {
  getAll: async (): Promise<Plant[]> => {
    return (await storage.get<Plant[]>(STORAGE_KEYS.PLANTS)) ?? [];
  },

  save: async (plants: Plant[]): Promise<void> => {
    await storage.set(STORAGE_KEYS.PLANTS, plants);
  },

  getById: async (id: string): Promise<Plant | undefined> => {
    const plants = await plantsStorage.getAll();
    return plants.find((p) => p.id === id);
  },

  add: async (plant: Plant): Promise<Plant> => {
    const plants = await plantsStorage.getAll();
    const updated = [...plants, plant];
    await plantsStorage.save(updated);
    return plant;
  },

  update: async (plant: Plant): Promise<Plant> => {
    const plants = await plantsStorage.getAll();
    const updated = plants.map((p) => (p.id === plant.id ? plant : p));
    await plantsStorage.save(updated);
    return plant;
  },

  remove: async (id: string): Promise<void> => {
    const plants = await plantsStorage.getAll();
    const updated = plants.filter((p) => p.id !== id);
    await plantsStorage.save(updated);
  },
};
