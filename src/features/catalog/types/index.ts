export type PlantCategory = 'all' | 'succulents' | 'tropical' | 'herbs' | 'flowering';

export interface CatalogPlant {
  id: string;
  name: string;
  description: string;
  wateringIntervalDays: number;
  emoji: string;
  category: Exclude<PlantCategory, 'all'>;
}
