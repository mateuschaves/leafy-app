export interface Plant {
  id: string;
  name: string;
  description: string;
  wateringIntervalDays: number;
  lastWateredAt: string; // ISO date string
  nextWateringAt: string; // ISO date string
  emoji: string;
  notificationId?: string;
  createdAt: string;
}

export type PlantFormData = Omit<Plant, 'id' | 'lastWateredAt' | 'nextWateringAt' | 'createdAt' | 'notificationId'>;

export interface CatalogPlant {
  id: string;
  name: string;
  nameKey?: string;
  description: string;
  descriptionKey?: string;
  wateringIntervalDays: number;
  emoji: string;
  category: 'succulents' | 'tropical' | 'herbs' | 'flowering';
}
