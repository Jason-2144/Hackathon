import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  POLAR_LOCATIONS,
  RESEARCH_ITEMS,
  POLAR_DATASETS,
  EXPEDITIONS,
  MEDIA_ITEMS,
  DEMO_SCIENCE_STORIES
} from '../data/polarData';
import {
  PolarLocation,
  ResearchItem,
  PolarDataset,
  Expedition,
  MediaItem,
  ScienceStory
} from '../types/polar';

// 1. Supabase Client Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 2. Local Reactive Store for immediate, offline, and hackathon demo responsiveness
const STORAGE_KEYS = {
  LOCATIONS: 'polaris_locations_v1',
  RESEARCH: 'polaris_research_v1',
  DATASETS: 'polaris_datasets_v1',
  EXPEDITIONS: 'polaris_expeditions_v1',
  MEDIA: 'polaris_media_v1',
  STORIES: 'polaris_stories_v1',
};

function getStoredOrInitial<T>(key: string, initial: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Local storage access fallback for ${key}`, err);
    return initial;
  }
}

function saveToStore<T>(key: string, data: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Could not save to ${key}`, err);
  }
}

// 3. Unified Polar Data Repository
export class PolarRepository {
  // Listeners for live UI updates
  private static listeners: Array<() => void> = [];

  public static subscribe(fn: () => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private static notify() {
    this.listeners.forEach(fn => fn());
  }

  // Locations
  public static getLocations(): PolarLocation[] {
    return getStoredOrInitial(STORAGE_KEYS.LOCATIONS, POLAR_LOCATIONS);
  }

  public static getLocationById(id: string): PolarLocation | undefined {
    return this.getLocations().find(loc => loc.id === id);
  }

  public static addLocation(newLoc: PolarLocation): void {
    const current = this.getLocations();
    const updated = [newLoc, ...current];
    saveToStore(STORAGE_KEYS.LOCATIONS, updated);
    this.notify();
  }

  // Research
  public static getResearch(): ResearchItem[] {
    return getStoredOrInitial(STORAGE_KEYS.RESEARCH, RESEARCH_ITEMS);
  }

  public static getResearchById(id: string): ResearchItem | undefined {
    return this.getResearch().find(item => item.id === id);
  }

  public static addResearch(newResearch: ResearchItem): void {
    const current = this.getResearch();
    const updated = [newResearch, ...current];
    saveToStore(STORAGE_KEYS.RESEARCH, updated);
    this.notify();
  }

  // Datasets
  public static getDatasets(): PolarDataset[] {
    return getStoredOrInitial(STORAGE_KEYS.DATASETS, POLAR_DATASETS);
  }

  public static getDatasetById(id: string): PolarDataset | undefined {
    return this.getDatasets().find(d => d.id === id);
  }

  public static addDataset(newDataset: PolarDataset): void {
    const current = this.getDatasets();
    const updated = [newDataset, ...current];
    saveToStore(STORAGE_KEYS.DATASETS, updated);
    this.notify();
  }

  // Expeditions
  public static getExpeditions(): Expedition[] {
    return getStoredOrInitial(STORAGE_KEYS.EXPEDITIONS, EXPEDITIONS);
  }

  public static addExpedition(newExp: Expedition): void {
    const current = this.getExpeditions();
    const updated = [newExp, ...current];
    saveToStore(STORAGE_KEYS.EXPEDITIONS, updated);
    this.notify();
  }

  // Media
  public static getMedia(): MediaItem[] {
    return getStoredOrInitial(STORAGE_KEYS.MEDIA, MEDIA_ITEMS);
  }

  public static addMedia(newMedia: MediaItem): void {
    const current = this.getMedia();
    const updated = [newMedia, ...current];
    saveToStore(STORAGE_KEYS.MEDIA, updated);
    this.notify();
  }

  // Stories ("Turn Science Into a Story")
  public static getStories(): ScienceStory[] {
    return getStoredOrInitial(STORAGE_KEYS.STORIES, DEMO_SCIENCE_STORIES);
  }

  public static addStory(newStory: ScienceStory): void {
    const current = this.getStories();
    const updated = [newStory, ...current];
    saveToStore(STORAGE_KEYS.STORIES, updated);
    this.notify();
  }

  // Reset to seed data
  public static resetToSeed(): void {
    saveToStore(STORAGE_KEYS.LOCATIONS, POLAR_LOCATIONS);
    saveToStore(STORAGE_KEYS.RESEARCH, RESEARCH_ITEMS);
    saveToStore(STORAGE_KEYS.DATASETS, POLAR_DATASETS);
    saveToStore(STORAGE_KEYS.EXPEDITIONS, EXPEDITIONS);
    saveToStore(STORAGE_KEYS.MEDIA, MEDIA_ITEMS);
    saveToStore(STORAGE_KEYS.STORIES, DEMO_SCIENCE_STORIES);
    this.notify();
  }
}
