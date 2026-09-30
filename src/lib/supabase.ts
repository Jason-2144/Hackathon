import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  POLAR_LOCATIONS,
  RESEARCH_ITEMS,
  POLAR_DATASETS,
  EXPEDITIONS,
  EXPEDITION_REPORTS,
  MEDIA_ITEMS,
  INSTITUTIONAL_ACTIVITIES,
  DEMO_SCIENCE_STORIES,
  DEMO_GENERATED_OUTREACH
} from '../data/polarData';
import {
  PolarLocation,
  ResearchItem,
  PolarDataset,
  Expedition,
  ExpeditionReport,
  MediaItem,
  InstitutionalActivity,
  ScienceStory,
  GeneratedOutreachItem,
  ReviewStatus
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

// 2. Storage keys
const STORAGE_KEYS = {
  LOCATIONS: 'polaris_locations_v2',
  RESEARCH: 'polaris_research_v2',
  DATASETS: 'polaris_datasets_v2',
  EXPEDITIONS: 'polaris_expeditions_v2',
  REPORTS: 'polaris_reports_v2',
  MEDIA: 'polaris_media_v2',
  ACTIVITIES: 'polaris_activities_v2',
  STORIES: 'polaris_stories_v2',
  OUTREACH: 'polaris_outreach_v2',
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

// 3. Unified Polar Science & Dissemination Repository
export class PolarRepository {
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
    saveToStore(STORAGE_KEYS.LOCATIONS, [newLoc, ...current]);
    this.notify();
  }

  // Research Publications
  public static getResearch(): ResearchItem[] {
    return getStoredOrInitial(STORAGE_KEYS.RESEARCH, RESEARCH_ITEMS);
  }
  public static getResearchById(id: string): ResearchItem | undefined {
    return this.getResearch().find(item => item.id === id);
  }
  public static addResearch(newResearch: ResearchItem): void {
    const current = this.getResearch();
    saveToStore(STORAGE_KEYS.RESEARCH, [newResearch, ...current]);
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
    saveToStore(STORAGE_KEYS.DATASETS, [newDataset, ...current]);
    this.notify();
  }

  // Expeditions
  public static getExpeditions(): Expedition[] {
    return getStoredOrInitial(STORAGE_KEYS.EXPEDITIONS, EXPEDITIONS);
  }
  public static getExpeditionById(id: string): Expedition | undefined {
    return this.getExpeditions().find(exp => exp.id === id);
  }
  public static addExpedition(newExp: Expedition): void {
    const current = this.getExpeditions();
    saveToStore(STORAGE_KEYS.EXPEDITIONS, [newExp, ...current]);
    this.notify();
  }

  // Expedition Reports
  public static getExpeditionReports(): ExpeditionReport[] {
    return getStoredOrInitial(STORAGE_KEYS.REPORTS, EXPEDITION_REPORTS);
  }
  public static getExpeditionReportById(id: string): ExpeditionReport | undefined {
    return this.getExpeditionReports().find(r => r.id === id);
  }
  public static addExpeditionReport(newReport: ExpeditionReport): void {
    const current = this.getExpeditionReports();
    saveToStore(STORAGE_KEYS.REPORTS, [newReport, ...current]);
    this.notify();
  }

  // Media
  public static getMedia(): MediaItem[] {
    return getStoredOrInitial(STORAGE_KEYS.MEDIA, MEDIA_ITEMS);
  }
  public static getMediaById(id: string): MediaItem | undefined {
    return this.getMedia().find(m => m.id === id);
  }
  public static addMedia(newMedia: MediaItem): void {
    const current = this.getMedia();
    saveToStore(STORAGE_KEYS.MEDIA, [newMedia, ...current]);
    this.notify();
  }

  // Institutional Activities
  public static getActivities(): InstitutionalActivity[] {
    return getStoredOrInitial(STORAGE_KEYS.ACTIVITIES, INSTITUTIONAL_ACTIVITIES);
  }
  public static getActivityById(id: string): InstitutionalActivity | undefined {
    return this.getActivities().find(a => a.id === id);
  }
  public static addActivity(newAct: InstitutionalActivity): void {
    const current = this.getActivities();
    saveToStore(STORAGE_KEYS.ACTIVITIES, [newAct, ...current]);
    this.notify();
  }

  // Stories
  public static getStories(): ScienceStory[] {
    return getStoredOrInitial(STORAGE_KEYS.STORIES, DEMO_SCIENCE_STORIES);
  }
  public static addStory(newStory: ScienceStory): void {
    const current = this.getStories();
    saveToStore(STORAGE_KEYS.STORIES, [newStory, ...current]);
    this.notify();
  }

  // Generated Outreach Content & Review Workflow
  public static getOutreachItems(): GeneratedOutreachItem[] {
    return getStoredOrInitial(STORAGE_KEYS.OUTREACH, DEMO_GENERATED_OUTREACH);
  }
  public static getOutreachItemById(id: string): GeneratedOutreachItem | undefined {
    return this.getOutreachItems().find(item => item.id === id);
  }
  public static addOutreachItem(item: GeneratedOutreachItem): void {
    const current = this.getOutreachItems();
    saveToStore(STORAGE_KEYS.OUTREACH, [item, ...current]);
    this.notify();
  }
  public static updateOutreachStatus(
    id: string,
    status: ReviewStatus,
    notes?: string,
    channels?: string[]
  ): void {
    const current = this.getOutreachItems();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          reviewStatus: status,
          reviewNotes: notes !== undefined ? notes : item.reviewNotes,
          publishedChannels: channels || item.publishedChannels,
          publishedAt: status === 'published' ? new Date().toISOString().split('T')[0] : item.publishedAt,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    });
    saveToStore(STORAGE_KEYS.OUTREACH, updated);
    this.notify();
  }
  public static updateOutreachContent(id: string, title: string, content: string): void {
    const current = this.getOutreachItems();
    const updated = current.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title,
          content,
          updatedAt: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    });
    saveToStore(STORAGE_KEYS.OUTREACH, updated);
    this.notify();
  }

  // Deep Relational Resolver: get complete Expedition Bundle
  public static getExpeditionBundle(expeditionId: string) {
    const expedition = this.getExpeditionById(expeditionId);
    if (!expedition) return null;

    const reports = this.getExpeditionReports().filter(r => r.expeditionId === expedition.id || expedition.reportIds?.includes(r.id));
    const publications = this.getResearch().filter(p => p.relatedExpeditionId === expedition.id || expedition.publicationIds?.includes(p.id));
    const datasets = this.getDatasets().filter(d => d.relatedExpeditionId === expedition.id || expedition.datasetIds?.includes(d.id));
    const media = this.getMedia().filter(m => m.relatedExpeditionId === expedition.id || expedition.mediaIds?.includes(m.id));
    const activities = this.getActivities().filter(a => a.relatedExpeditionId === expedition.id || expedition.activityIds?.includes(a.id));

    return {
      expedition,
      reports,
      publications,
      datasets,
      media,
      activities,
      researchers: expedition.researchers || []
    };
  }

  // Reset to seed data
  public static resetToSeed(): void {
    saveToStore(STORAGE_KEYS.LOCATIONS, POLAR_LOCATIONS);
    saveToStore(STORAGE_KEYS.RESEARCH, RESEARCH_ITEMS);
    saveToStore(STORAGE_KEYS.DATASETS, POLAR_DATASETS);
    saveToStore(STORAGE_KEYS.EXPEDITIONS, EXPEDITIONS);
    saveToStore(STORAGE_KEYS.REPORTS, EXPEDITION_REPORTS);
    saveToStore(STORAGE_KEYS.MEDIA, MEDIA_ITEMS);
    saveToStore(STORAGE_KEYS.ACTIVITIES, INSTITUTIONAL_ACTIVITIES);
    saveToStore(STORAGE_KEYS.STORIES, DEMO_SCIENCE_STORIES);
    saveToStore(STORAGE_KEYS.OUTREACH, DEMO_GENERATED_OUTREACH);
    this.notify();
  }
}
