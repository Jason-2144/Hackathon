export type PolarRegion = 'Antarctica' | 'Arctic' | 'Global Polar';

export type LocationCategory =
  | 'Glacier'
  | 'Research Station'
  | 'Expedition Site'
  | 'Wildlife Habitat'
  | 'Climate Observatory'
  | 'Oceanographic Zone';

export interface PolarLocation {
  id: string;
  name: string;
  region: PolarRegion;
  category: LocationCategory;
  coordinates: {
    lat: number;
    lng: number;
    elevationMeters?: number;
  };
  summary: string;
  scientificSignificance: string;
  establishedYear?: number;
  operatingCountry?: string;
  keyFindings: string[];
  currentStatus: 'Active Monitoring' | 'Critical Observation' | 'Seasonal Operation' | 'Historical Site';
  relatedResearchIds: string[];
  relatedDatasetIds: string[];
  relatedMediaIds: string[];
  temperatureAnomalyC: number;
  iceVelocityMetersPerYear?: number;
  thumbnailUrl: string;
}

export type ContentType =
  | 'Research Paper'
  | 'Dataset'
  | 'Satellite Data'
  | 'Research Video'
  | 'Photography'
  | 'Scientific Report'
  | 'Expedition Record';

export interface ResearchItem {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  institution: string;
  year: number;
  region: PolarRegion;
  category: string;
  contentType: ContentType;
  doi: string;
  peerReviewed: boolean;
  citationCount: number;
  topics: string[];
  keyTakeaway: string;
  datasetIds?: string[];
  readingTimeMin: number;
}

export interface PolarDataset {
  id: string;
  title: string;
  description: string;
  provider: string; // e.g. NASA JPL, NSIDC, ESA Copernicus, BAS
  region: PolarRegion;
  temporalCoverage: string; // e.g. 1979 - 2026
  updateFrequency: string;
  parameters: string[];
  fileFormat: string; // NetCDF, GeoTIFF, CSV
  fileSizeMb: number;
  downloadUrl?: string;
  sampleDataPoints: {
    label: string;
    value: number;
    unit: string;
    anomaly?: number;
  }[];
}

export interface Expedition {
  id: string;
  name: string;
  vesselOrTeam: string;
  leadScientist: string;
  startDate: string;
  endDate: string;
  status: 'Completed' | 'Ongoing' | 'Planned';
  objective: string;
  region: PolarRegion;
  routeCoordinates: { lat: number; lng: number; label: string }[];
  milestones: string[];
  findingsSummary: string;
  thumbnailUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: 'Videos' | 'Photography' | 'Scientist Stories' | 'Expeditions' | 'Satellite Imagery' | 'Wildlife' | 'Climate Stories';
  type: 'video' | 'photo' | 'audio';
  region: PolarRegion;
  creator: string;
  date: string;
  duration?: string;
  thumbnailUrl: string;
  mediaUrl: string;
  tags: string[];
  scientificContext: string;
}

export interface ScienceStory {
  id: string;
  sourceResearchId: string;
  title: string;
  originalScientificHeadline: string;
  scientificSummary: string;
  studentExplanation: string;
  publicStory: string;
  socialMediaThread: string[];
  keyMetaphor: string;
  targetAudience: 'General Public' | 'High School Students' | 'Science Journalists' | 'Policymakers';
  readingLevel: string;
  createdDate: string;
  author: string;
}

export interface AISource {
  title: string;
  institution: string;
  year: number;
  urlOrDoi: string;
  confidenceScore: number;
}

export interface AIResponse {
  query: string;
  simpleExplanation: string;
  scientificExplanation: string;
  keyFacts: string[];
  relatedData: {
    metric: string;
    value: string;
    trend: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
    context: string;
  }[];
  sources: AISource[];
  suggestedFollowUps: string[];
}
