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
  relatedExpeditionIds?: string[];
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
  | 'Expedition Record'
  | 'Expedition Report'
  | 'Institutional Activity';

export interface ResearchItem {
  id: string;
  title: string;
  abstract: string;
  authors: string[];
  institution: string; // e.g. Ministry of Earth Sciences (MoES) / NCPOR
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
  relatedExpeditionId?: string;
  relatedMediaIds?: string[];
  readingTimeMin: number;
}

export interface PolarDataset {
  id: string;
  title: string;
  description: string;
  provider: string; // e.g. MoES / NCPOR, NASA JPL, NSIDC, ESA Copernicus, BAS
  region: PolarRegion;
  temporalCoverage: string;
  updateFrequency: string;
  parameters: string[];
  fileFormat: string;
  fileSizeMb: number;
  downloadUrl?: string;
  relatedExpeditionId?: string;
  relatedPublicationIds?: string[];
  sampleDataPoints: {
    label: string;
    value: number;
    unit: string;
    anomaly?: number;
  }[];
}

export interface Researcher {
  name: string;
  role: string;
  institution: string;
  specialization: string;
  avatarUrl?: string;
}

export interface ExpeditionReport {
  id: string;
  expeditionId: string;
  reportNumber: string; // e.g. MoES-ISEA-44-CR-01
  title: string;
  leadAuthor: string;
  institution: string;
  date: string;
  summary: string;
  methodology: string;
  keyFindings: string[];
  sections: { title: string; content: string }[];
  relatedDatasetIds: string[];
  relatedMediaIds: string[];
  downloadUrl?: string;
}

export interface Expedition {
  id: string;
  name: string;
  vesselOrTeam: string;
  leadScientist: string;
  institution: string; // e.g. Ministry of Earth Sciences (MoES) / NCPOR
  startDate: string;
  endDate: string;
  status: 'Completed' | 'Ongoing' | 'Planned';
  objective: string;
  region: PolarRegion;
  routeCoordinates: { lat: number; lng: number; label: string }[];
  milestones: string[];
  findingsSummary: string;
  thumbnailUrl: string;
  // Relationships per official specification
  reportIds: string[];
  publicationIds: string[];
  datasetIds: string[];
  mediaIds: string[];
  activityIds: string[];
  researchers: Researcher[];
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: 'Videos' | 'Photography' | 'Scientist Stories' | 'Expeditions' | 'Satellite Imagery' | 'Wildlife' | 'Climate Stories';
  type: 'video' | 'photo' | 'audio';
  region: PolarRegion;
  creator: string;
  institution: string;
  date: string;
  duration?: string;
  thumbnailUrl: string;
  mediaUrl: string;
  tags: string[];
  scientificContext: string;
  // Metadata connections
  relatedExpeditionId?: string;
  relatedLocationId?: string;
  relatedResearchId?: string;
  relatedActivityId?: string;
  resolution?: string;
}

export type ActivityType =
  | 'Expedition'
  | 'Conference'
  | 'Research Event'
  | 'Outreach Program'
  | 'Announcement'
  | 'Workshop'
  | 'Scientific Achievement'
  | 'Institutional Update';

export interface InstitutionalActivity {
  id: string;
  title: string;
  type: ActivityType;
  institution: string; // e.g. Ministry of Earth Sciences (MoES)
  date: string;
  location: string;
  summary: string;
  description: string;
  leadCoordinator: string;
  participantsCount?: number;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  relatedExpeditionId?: string;
  relatedPublicationIds?: string[];
  relatedMediaIds?: string[];
  badgeText?: string;
}

export type ReviewStatus = 'draft' | 'ai_generated' | 'under_review' | 'approved' | 'published';

export type OutreachFormat =
  | 'website_article'
  | 'public_article'
  | 'student_explanation'
  | 'instagram_post'
  | 'linkedin_post'
  | 'x_post'
  | 'youtube_description'
  | 'video_script'
  | 'infographic_content';

export interface GeneratedOutreachItem {
  id: string;
  sourceId: string;
  sourceTitle: string;
  sourceType: 'Expedition Report' | 'Publication' | 'Dataset' | 'Activity' | 'Expedition';
  sourceInstitution: string;
  format: OutreachFormat;
  formatLabel: string;
  title: string;
  content: string;
  reviewStatus: ReviewStatus;
  createdAt: string;
  updatedAt: string;
  attachedMediaIds: string[];
  attachedDatasetId?: string;
  reviewNotes?: string;
  reviewedBy?: string;
  publishedChannels: string[];
  publishedAt?: string;
  targetAudience: string;
  readingLevel: string;
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
  reviewStatus?: ReviewStatus;
  attachedMediaIds?: string[];
  attachedDatasetId?: string;
  sourceInstitution?: string;
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
