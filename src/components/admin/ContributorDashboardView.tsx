import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { ResearchItem, PolarDataset, PolarLocation, MediaItem } from '../../types/polar';
import {
  PlusCircle,
  FileText,
  Database,
  Film,
  MapPin,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface ContributorDashboardViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const ContributorDashboardView: React.FC<ContributorDashboardViewProps> = ({ onNavigate }) => {
  const [activeForm, setActiveForm] = useState<'research' | 'dataset' | 'location' | 'media'>('research');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  // 1. Research
  const [researchTitle, setResearchTitle] = useState('');
  const [researchAbstract, setResearchAbstract] = useState('');
  const [researchAuthors, setResearchAuthors] = useState('');
  const [researchInstitution, setResearchInstitution] = useState('');
  const [researchRegion, setResearchRegion] = useState<'Antarctica' | 'Arctic'>('Antarctica');
  const [researchDoi, setResearchDoi] = useState('10.1038/s41586-026-');

  // 2. Dataset
  const [datasetTitle, setDatasetTitle] = useState('');
  const [datasetDesc, setDatasetDesc] = useState('');
  const [datasetProvider, setDatasetProvider] = useState('');
  const [datasetRegion, setDatasetRegion] = useState<'Antarctica' | 'Arctic' | 'Global Polar'>('Antarctica');

  // 3. Location
  const [locationName, setLocationName] = useState('');
  const [locationCategory, setLocationCategory] = useState<any>('Research Station');
  const [locationLat, setLocationLat] = useState('-70.0');
  const [locationLng, setLocationLng] = useState('45.0');
  const [locationSummary, setLocationSummary] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researchTitle || !researchAbstract) return;

    const newItem: ResearchItem = {
      id: `res-${Date.now()}`,
      title: researchTitle,
      abstract: researchAbstract,
      authors: researchAuthors ? researchAuthors.split(',').map((a) => a.trim()) : ['Polar Science Contributor'],
      institution: researchInstitution || 'National Polar Science Institute',
      year: 2026,
      region: researchRegion,
      category: 'Glaciology & Ocean Dynamics',
      contentType: 'Research Paper',
      doi: researchDoi || '10.1038/polaris-contributed',
      peerReviewed: true,
      citationCount: 0,
      topics: ['Cryosphere', 'Field Observation', 'Polaris Contributed'],
      keyTakeaway: researchAbstract.slice(0, 100) + '...',
      readingTimeMin: 6,
    };

    PolarRepository.addResearch(newItem);
    setResearchTitle('');
    setResearchAbstract('');
    setResearchAuthors('');
    setResearchInstitution('');
    showToast('Research record successfully published to Knowledge Repository!');
  };

  const handleSubmitDataset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!datasetTitle || !datasetDesc) return;

    const newDataset: PolarDataset = {
      id: `data-${Date.now()}`,
      title: datasetTitle,
      description: datasetDesc,
      provider: datasetProvider || 'Open Polar Consortium',
      region: datasetRegion,
      temporalCoverage: '2024 - 2026',
      updateFrequency: 'Monthly Automated',
      parameters: ['Cryospheric Sensor Readings', 'Surface Albedo Anomaly'],
      fileFormat: 'NetCDF-4 / CSV',
      fileSizeMb: 120,
      downloadUrl: '#download',
      sampleDataPoints: [
        { label: 'Baseline Mean', value: 2.1, unit: 'units' },
        { label: 'Current Telemetry', value: 1.85, unit: 'units', anomaly: -0.25 },
      ],
    };

    PolarRepository.addDataset(newDataset);
    setDatasetTitle('');
    setDatasetDesc('');
    setDatasetProvider('');
    showToast('Polar dataset registered and indexed!');
  };

  const handleSubmitLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !locationSummary) return;

    const newLoc: PolarLocation = {
      id: `loc-${Date.now()}`,
      name: locationName,
      region: parseFloat(locationLat) < 0 ? 'Antarctica' : 'Arctic',
      category: locationCategory,
      coordinates: {
        lat: parseFloat(locationLat) || -70.0,
        lng: parseFloat(locationLng) || 0.0,
        elevationMeters: 50,
      },
      summary: locationSummary,
      scientificSignificance: 'Site contributed through the POLARIS science outreach protocol.',
      operatingCountry: 'International Scientific Collaboration',
      keyFindings: ['Field instruments logging real-time meteorology and ice displacement.'],
      currentStatus: 'Active Monitoring',
      relatedResearchIds: [],
      relatedDatasetIds: [],
      relatedMediaIds: [],
      temperatureAnomalyC: 1.2,
      thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    };

    PolarRepository.addLocation(newLoc);
    setLocationName('');
    setLocationSummary('');
    showToast('Location pin plotted on Polar Stereographic Map!');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all repository records back to verified initial seed data?')) {
      PolarRepository.resetToSeed();
      showToast('Repository reset to verified scientific seed data.');
    }
  };

  const researchCount = PolarRepository.getResearch().length;
  const datasetsCount = PolarRepository.getDatasets().length;
  const locationsCount = PolarRepository.getLocations().length;
  const storiesCount = PolarRepository.getStories().length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-950/90 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 shadow-2xl animate-fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Researcher & Institutional Contributor Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contributor Dashboard
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Register new cryospheric research papers, sensor datasets, satellite feeds, or polar field observation coordinates.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
          title="Reset database to seed records"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {/* Repository Overview Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-slate-400">Research Papers</div>
          <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">{researchCount}</div>
          <div className="text-[10px] text-slate-500">Peer-reviewed</div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-slate-400">Polar Datasets</div>
          <div className="text-2xl font-bold font-mono text-emerald-300 mt-1">{datasetsCount}</div>
          <div className="text-[10px] text-slate-500">Open telemetry</div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-slate-400">Mapped Locations</div>
          <div className="text-2xl font-bold font-mono text-amber-300 mt-1">{locationsCount}</div>
          <div className="text-[10px] text-slate-500">Antarctic & Arctic</div>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="text-[10px] font-mono uppercase text-slate-400">Public Stories</div>
          <div className="text-2xl font-bold font-mono text-purple-300 mt-1">{storiesCount}</div>
          <div className="text-[10px] text-slate-500">Science outreach</div>
        </div>
      </div>

      {/* Submission Tabs & Forms */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
          <button
            onClick={() => setActiveForm('research')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeForm === 'research'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Add Research Paper</span>
          </button>

          <button
            onClick={() => setActiveForm('dataset')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeForm === 'dataset'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Add Dataset</span>
          </button>

          <button
            onClick={() => setActiveForm('location')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeForm === 'location'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950 border border-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Add Polar Location</span>
          </button>
        </div>

        {/* 1. Research Form */}
        {activeForm === 'research' && (
          <form onSubmit={handleSubmitResearch} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Research Paper Title *
              </label>
              <input
                type="text"
                required
                value={researchTitle}
                onChange={(e) => setResearchTitle(e.target.value)}
                placeholder="e.g. Sub-ice Shelf Thermal Profiling in the Amundsen Sea Embayment"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Authors (comma separated)
                </label>
                <input
                  type="text"
                  value={researchAuthors}
                  onChange={(e) => setResearchAuthors(e.target.value)}
                  placeholder="e.g. Dr. Jane Doe, Dr. Alex Smith"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Institution / University
                </label>
                <input
                  type="text"
                  value={researchInstitution}
                  onChange={(e) => setResearchInstitution(e.target.value)}
                  placeholder="e.g. British Antarctic Survey / NCPOR"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Target Polar Region
                </label>
                <select
                  value={researchRegion}
                  onChange={(e) => setResearchRegion(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Antarctica">Antarctica (South Pole)</option>
                  <option value="Arctic">Arctic (North Pole)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">DOI</label>
                <input
                  type="text"
                  value={researchDoi}
                  onChange={(e) => setResearchDoi(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Scientific Abstract *
              </label>
              <textarea
                required
                rows={3}
                value={researchAbstract}
                onChange={(e) => setResearchAbstract(e.target.value)}
                placeholder="Comprehensive scientific findings, methodologies, and cryospheric implications..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Research Record</span>
            </button>
          </form>
        )}

        {/* 2. Dataset Form */}
        {activeForm === 'dataset' && (
          <form onSubmit={handleSubmitDataset} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Dataset Name *
              </label>
              <input
                type="text"
                required
                value={datasetTitle}
                onChange={(e) => setDatasetTitle(e.target.value)}
                placeholder="e.g. Southern Ocean Daily Thermohaline Salinity Arrays (2020-2026)"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Data Provider
                </label>
                <input
                  type="text"
                  value={datasetProvider}
                  onChange={(e) => setDatasetProvider(e.target.value)}
                  placeholder="e.g. NSIDC / ESA Copernicus / NASA JPL"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Region
                </label>
                <select
                  value={datasetRegion}
                  onChange={(e) => setDatasetRegion(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Antarctica">Antarctica</option>
                  <option value="Arctic">Arctic</option>
                  <option value="Global Polar">Global Polar</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Telemetry Parameters & Description *
              </label>
              <textarea
                required
                rows={3}
                value={datasetDesc}
                onChange={(e) => setDatasetDesc(e.target.value)}
                placeholder="Describe parameters (salinity, conductivity, radar backscatter, albedo)..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Dataset</span>
            </button>
          </form>
        )}

        {/* 3. Location Form */}
        {activeForm === 'location' && (
          <form onSubmit={handleSubmitLocation} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Site / Feature Name *
              </label>
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Princess Elisabeth Antarctica Station"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">Category</label>
                <select
                  value={locationCategory}
                  onChange={(e) => setLocationCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Research Station">Research Station</option>
                  <option value="Glacier">Glacier</option>
                  <option value="Climate Observatory">Climate Observatory</option>
                  <option value="Wildlife Habitat">Wildlife Habitat</option>
                  <option value="Expedition Site">Expedition Site</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Latitude (e.g. -71.95)
                </label>
                <input
                  type="text"
                  value={locationLat}
                  onChange={(e) => setLocationLat(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono uppercase text-slate-300">
                  Longitude (e.g. 23.34)
                </label>
                <input
                  type="text"
                  value={locationLng}
                  onChange={(e) => setLocationLng(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase text-slate-300">
                Site Summary & Scientific Operations *
              </label>
              <textarea
                required
                rows={3}
                value={locationSummary}
                onChange={(e) => setLocationSummary(e.target.value)}
                placeholder="Overview of research facilities, glacial dynamics, or wildlife populations at this coordinate..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plot Location on Polar Map</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
