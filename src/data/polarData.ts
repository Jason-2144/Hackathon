import {
  PolarLocation,
  ResearchItem,
  PolarDataset,
  Expedition,
  MediaItem,
  ScienceStory,
  AIResponse,
  InstitutionalActivity,
  ExpeditionReport,
  GeneratedOutreachItem
} from '../types/polar';

export const POLAR_LOCATIONS: PolarLocation[] = [
  {
    id: 'loc-thwaites',
    name: 'Thwaites Glacier',
    region: 'Antarctica',
    category: 'Glacier',
    coordinates: { lat: -75.5, lng: -106.75, elevationMeters: 550 },
    summary: 'A fast-moving ice stream in West Antarctica draining into the Amundsen Sea. Nicknamed the "Doomsday Glacier" due to its potential to trigger catastrophic sea-level rise if its grounding line collapses.',
    scientificSignificance: 'Thwaites Glacier acts as a linchpin for the West Antarctic Ice Sheet. It currently contributes approximately 4% of global sea-level rise, discharging more than 50 billion tons of ice annually.',
    operatingCountry: 'International (US NSF / UK NERC ITGC Collaboration)',
    keyFindings: [
      'Sub-ice cavity ocean temperature is over 1.5°C above freezing point at the grounding zone.',
      'Grounding line has retreated over 14 kilometers inland since 1996.',
      'Unpinned floating ice shelf heavily crevassed with accelerated rift propagation.'
    ],
    currentStatus: 'Critical Observation',
    relatedResearchIds: ['res-thwaites-grounding', 'res-antarctic-ice-sheet-mass'],
    relatedDatasetIds: ['data-grace-mass-balance', 'data-ice-velocity-sentinel'],
    relatedMediaIds: ['med-thwaites-icefin', 'med-glacier-radar'],
    relatedExpeditionIds: ['exp-itgc-thwaites'],
    temperatureAnomalyC: 2.1,
    iceVelocityMetersPerYear: 3200,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loc-bharati',
    name: 'Bharati Antarctic Research Station',
    region: 'Antarctica',
    category: 'Research Station',
    coordinates: { lat: -69.41, lng: 76.19, elevationMeters: 35 },
    summary: "India's state-of-the-art permanent Antarctic research facility on the Larsemann Hills, operated by NCPOR under the Ministry of Earth Sciences (MoES). Built with 134 modular ISO containers with zero-effluent discharge.",
    scientificSignificance: 'Hub for atmospheric profiling, satellite telemetry reception in polar orbits, paleoclimate ice core analysis, and geological reconstruction of Gondwanaland rifting.',
    establishedYear: 2012,
    operatingCountry: 'India (Ministry of Earth Sciences - MoES / NCPOR)',
    keyFindings: [
      'Continuous ozone sonde and aerosol optical depth profiling in Queen Mary Land.',
      'Paleoclimate sediment cores revealing Indo-Antarctic rift dynamics from 120 Ma.',
      'Real-time direct reception of Earth observation satellite telemetry in near-polar orbit.'
    ],
    currentStatus: 'Active Monitoring',
    relatedResearchIds: ['res-gondwana-breakup', 'res-antarctic-aerosols'],
    relatedDatasetIds: ['data-bharati-met', 'data-grace-mass-balance'],
    relatedMediaIds: ['med-bharati-life', 'med-antarctic-twilight'],
    relatedExpeditionIds: ['exp-indian-antarctic-44'],
    temperatureAnomalyC: 0.8,
    thumbnailUrl: 'https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loc-mcmurdo',
    name: 'McMurdo Station',
    region: 'Antarctica',
    category: 'Research Station',
    coordinates: { lat: -77.85, lng: 166.67, elevationMeters: 24 },
    summary: 'The largest research community in Antarctica, situated on the bare volcanic rock of Ross Island. Serves as the primary logistics hub for deep field camps across the continent.',
    scientificSignificance: 'Continuous observation site since 1956 for cosmic ray physics, volcanology (Mount Erebus), microbial ecology in ice-covered lakes, and polar genomics.',
    establishedYear: 1956,
    operatingCountry: 'United States (US Antarctic Program / NSF)',
    keyFindings: [
      'Discovery of extremophilic cold-adapted sulfur-metabolizing microbes beneath Taylor Glacier.',
      'Long-term sea ice biological succession logs in McMurdo Sound over 60 years.'
    ],
    currentStatus: 'Active Monitoring',
    relatedResearchIds: ['res-ross-sea-ecology', 'res-antarctic-ice-sheet-mass'],
    relatedDatasetIds: ['data-antarctic-seaice-extent'],
    relatedMediaIds: ['med-polar-diver'],
    temperatureAnomalyC: 1.4,
    thumbnailUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loc-jakobshavn',
    name: 'Jakobshavn Isbræ (Sermeq Kujalleq)',
    region: 'Arctic',
    category: 'Glacier',
    coordinates: { lat: 69.17, lng: -49.83, elevationMeters: 120 },
    summary: 'One of the fastest discharging outlet tidewater glaciers on Earth, draining roughly 6.5% of the Greenland Ice Sheet into Ilulissat Icefjord.',
    scientificSignificance: 'A critical bellwether for polar ocean warming. Calving dynamics here produce roughly 35 billion tonnes of icebergs per year into Disko Bay.',
    operatingCountry: 'Greenland / Denmark (GEUS Collaboration)',
    keyFindings: [
      'Flow velocities exceeding 40 meters per day observed during peak summer discharge.',
      'Complex sub-surface ocean thermal intrusions modulating calving grounding terminus stability.'
    ],
    currentStatus: 'Critical Observation',
    relatedResearchIds: ['res-greenland-ice-melt', 'res-arctic-amplification'],
    relatedDatasetIds: ['data-ice-velocity-sentinel', 'data-arctic-seaice-extent'],
    relatedMediaIds: ['med-jakobshavn-calving'],
    temperatureAnomalyC: 2.8,
    iceVelocityMetersPerYear: 14500,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loc-ny-alesund',
    name: 'Ny-Ålesund Research Base (Himadri Arctic Station)',
    region: 'Arctic',
    category: 'Climate Observatory',
    coordinates: { lat: 78.92, lng: 11.93, elevationMeters: 12 },
    summary: 'The northernmost year-round civilian research settlement in the world, in Svalbard, Norway. Houses India\'s Himadri Arctic Station operated by MoES / NCPOR alongside 10 international institutes.',
    scientificSignificance: 'Key reference station for Arctic Amplification research, black carbon pollution transport from Eurasia, greenhouse gas monitoring, and fjord marine biology.',
    establishedYear: 1968,
    operatingCountry: 'International / India Himadri Station (MoES / NCPOR)',
    keyFindings: [
      'Arctic warming rate recorded at 4x the global average rate since 1979.',
      'Intrusion of warmer Atlantic Water replacing cold Arctic fjord regimes.'
    ],
    currentStatus: 'Active Monitoring',
    relatedResearchIds: ['res-arctic-amplification'],
    relatedDatasetIds: ['data-arctic-seaice-extent'],
    relatedMediaIds: ['med-svalbard-balloon'],
    temperatureAnomalyC: 3.2,
    thumbnailUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loc-weddell-wildlife',
    name: 'Weddell Sea Emperor Colony',
    region: 'Antarctica',
    category: 'Wildlife Habitat',
    coordinates: { lat: -74.2, lng: -44.5, elevationMeters: 0 },
    summary: 'A breeding territory on fast sea ice for Emperor Penguins, monitored by satellite guano staining and robotic marine floats.',
    scientificSignificance: 'Emperor penguins depend strictly on stable land-fast sea ice for breeding from April to December.',
    operatingCountry: 'Antarctic Treaty International Protected Area',
    keyFindings: [
      'Breeding failures documented when regional fast ice experienced premature melt in 2022-2023.',
      'Foraging ranges recorded up to 600 kilometers under multi-year sea ice pack.'
    ],
    currentStatus: 'Critical Observation',
    relatedResearchIds: ['res-emperor-breeding-failure', 'res-antarctic-sea-ice-minimum'],
    relatedDatasetIds: ['data-antarctic-seaice-extent'],
    relatedMediaIds: ['med-emperor-family'],
    temperatureAnomalyC: 1.7,
    thumbnailUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loc-mosaic-site',
    name: 'MOSAiC Arctic Drift Sector',
    region: 'Arctic',
    category: 'Expedition Site',
    coordinates: { lat: 85.05, lng: 135.2, elevationMeters: 0 },
    summary: 'The historic drift corridor of the German research icebreaker RV Polarstern, frozen into Arctic sea ice for 389 days.',
    scientificSignificance: 'Unprecedented cross-disciplinary data on coupled atmosphere-ice-ocean-ecosystem feedback loops.',
    establishedYear: 2019,
    operatingCountry: 'Alfred Wegener Institute (20 Nations Consortium)',
    keyFindings: [
      'Sea ice is thinner and moving 50% faster along the Transpolar Drift Stream.',
      'Warm summer clouds trap significant longwave radiation accelerating top-down melt.'
    ],
    currentStatus: 'Historical Site',
    relatedResearchIds: ['res-mosaic-atmosphere', 'res-arctic-amplification'],
    relatedDatasetIds: ['data-arctic-seaice-extent'],
    relatedMediaIds: ['med-polarstern-night'],
    relatedExpeditionIds: ['exp-mosaic-arctic'],
    temperatureAnomalyC: 2.6,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80'
  }
];

export const EXPEDITION_REPORTS: ExpeditionReport[] = [
  {
    id: 'rep-isea-44-cruise',
    expeditionId: 'exp-indian-antarctic-44',
    reportNumber: 'MoES-ISEA-44-CR-01',
    title: 'Integrated Scientific Cruise & Ice Sheet Profiling Report: 44th Indian Antarctic Expedition',
    leadAuthor: 'Dr. Rahul Mohan',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences (MoES)',
    date: '2025-04-12',
    summary: 'Comprehensive mission report documenting station resupply at Maitri and Bharati, deep ice core drilling in Queen Maud Land, and oceanographic CTD transects across the Southern Ocean.',
    methodology: 'Shallow and deep ice-coring electro-mechanical drill systems, underway acoustic Doppler current profiling, and radiosonde meteorological balloons.',
    keyFindings: [
      'Recovered 120m ice core preserving 850 years of atmospheric deposition chemistry.',
      'Deployed 6 autonomous profiling Argo floats in the Antarctic Circumpolar Current.',
      'Completed zero-carbon microgrid expansion at Bharati Station.'
    ],
    sections: [
      {
        title: '1. Executive Mission Summary',
        content: 'The 44th Indian Scientific Expedition to Antarctica successfully fulfilled all MoES mandates, achieving continuous logistics, scientific station maintenance at Maitri and Bharati, and high-latitude Southern Ocean observation.'
      },
      {
        title: '2. Cryospheric & Ice Core Recoveries',
        content: 'High-elevation drilling at 72°S on the inland ice sheet yielded continuous ice cores down to bedrock-proximal strata, recording trace element transport from the Indian Ocean sector.'
      },
      {
        title: '3. Station Renewable Microgrid Upgrades',
        content: 'Installation of vertical-axis wind turbine arrays at Bharati Station reduced diesel generator consumption by 24% during summer and shoulder seasons.'
      }
    ],
    relatedDatasetIds: ['data-bharati-met', 'data-grace-mass-balance'],
    relatedMediaIds: ['med-bharati-life', 'med-antarctic-twilight'],
    downloadUrl: '#report-pdf-download'
  },
  {
    id: 'rep-itgc-icefin-report',
    expeditionId: 'exp-itgc-thwaites',
    reportNumber: 'ITGC-MELT-2024-R4',
    title: 'Sub-Ice Shelf Cavity Exploration and Grounding Zone Oceanography at Thwaites Glacier',
    leadAuthor: 'Dr. Britney E. Schmidt',
    institution: 'International Thwaites Glacier Collaboration (ITGC / NSF / NERC)',
    date: '2024-03-01',
    summary: 'Technical and scientific cruise report on deploying the Icefin autonomous underwater vehicle through 600 meters of ice shelf into the grounding zone cavity of Thwaites Glacier.',
    methodology: 'Hot water drill hole access, miniature AUV imaging, salinity and thermal sensors, multi-beam sonar bathymetry.',
    keyFindings: [
      'Direct measurement of ocean temperature at +1.5°C above in-situ freezing point.',
      'Discovery of rapid basal staircase melting along vertical rifts.'
    ],
    sections: [
      {
        title: '1. Field Deployment Logistics',
        content: 'Hot water drilling pierced 587 meters of glacial ice shelf to create a 35cm diameter borehole through which the slender Icefin robot was successfully lowered into the Amundsen Sea cavity.'
      },
      {
        title: '2. Grounding Zone Ocean Dynamic Observations',
        content: 'Underwater camera footage and thermal probes confirmed warm Circumpolar Deep Water intrudes into deep bedrock gutters directly beneath the glacier grounding line.'
      }
    ],
    relatedDatasetIds: ['data-ice-velocity-sentinel', 'data-grace-mass-balance'],
    relatedMediaIds: ['med-thwaites-icefin', 'med-glacier-radar'],
    downloadUrl: '#report-pdf-download'
  },
  {
    id: 'rep-mosaic-annual-summary',
    expeditionId: 'exp-mosaic-arctic',
    reportNumber: 'AWI-MOSAiC-FINAL-2023',
    title: 'MOSAiC Final Expedition Synthesis: One Year Trapped in Central Arctic Sea Ice',
    leadAuthor: 'Prof. Dr. Markus Rex',
    institution: 'Alfred Wegener Institute (AWI) / MOSAiC Consortium',
    date: '2023-10-15',
    summary: 'The capstone institutional expedition report of the largest Arctic research initiative in history, compiling 389 days of coupled ocean-ice-atmosphere measurements.',
    methodology: 'Drifting ice camp with ocean mast, radiation towers, autonomous drone surveys, and airborne research campaigns.',
    keyFindings: [
      'Documented complete seasonal cycle of sea ice growth and decay in central Arctic.',
      'Identified critical winter cloud heating mechanisms.'
    ],
    sections: [
      {
        title: '1. Drift Track Summary',
        content: 'RV Polarstern traversed 3,400 km along the Transpolar Drift stream, ending with breakout into Fram Strait.'
      },
      {
        title: '2. Climate Model Calibration',
        content: 'New parametrization models developed for winter liquid cloud persistence and ice lead heat fluxes.'
      }
    ],
    relatedDatasetIds: ['data-arctic-seaice-extent'],
    relatedMediaIds: ['med-polarstern-night'],
    downloadUrl: '#report-pdf-download'
  }
];

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'res-thwaites-grounding',
    title: 'Heterogeneous Sub-Ice Shelf Melt Rates Driven by Ocean Thermal Cavity Circulation at Thwaites Glacier',
    abstract: 'Using autonomous underwater vehicle (Icefin) observations alongside phase-sensitive radar, this study reveals complex melt geometries and ocean convective plumes beneath the floating ice shelf of Thwaites Glacier, West Antarctica.',
    authors: ['Dr. Britney E. Schmidt', 'Dr. Peter E. Davis', 'Dr. Keith W. Nicholls'],
    institution: 'International Thwaites Glacier Collaboration (ITGC)',
    year: 2024,
    region: 'Antarctica',
    category: 'Glaciology & Ocean Dynamics',
    contentType: 'Research Paper',
    doi: '10.1038/s41586-023-05692-3',
    peerReviewed: true,
    citationCount: 184,
    topics: ['Ice-Ocean Interaction', 'Subglacial Cavities', 'Grounding Zone', 'Sea Level Rise'],
    keyTakeaway: 'Basal melting is suppressed beneath flat ice sections by a thin freshwater layer, but accelerated along steep crevasses and vertical faces, threatening structural unpinning.',
    datasetIds: ['data-ice-velocity-sentinel', 'data-grace-mass-balance'],
    relatedExpeditionId: 'exp-itgc-thwaites',
    relatedMediaIds: ['med-thwaites-icefin', 'med-glacier-radar'],
    readingTimeMin: 9
  },
  {
    id: 'res-antarctic-sea-ice-minimum',
    title: 'Record-Low Antarctic Sea Ice Extent Driven by Coupled Atmospheric Anomalies and Subsurface Southern Ocean Warming',
    abstract: 'In recent years, Antarctic sea ice extent experienced unprecedented anomalies falling more than five standard deviations below the 1981-2010 mean. This investigation isolates the role of subsurface ocean heat entrapment and anomalous circumpolar westerlies.',
    authors: ['Dr. Edward Doddridge', 'Dr. Ariaan Purich', 'Dr. Matthew H. England'],
    institution: 'Australian Centre for Excellence in Antarctic Science (ACEAS)',
    year: 2025,
    region: 'Antarctica',
    category: 'Climate & Sea Ice',
    contentType: 'Research Paper',
    doi: '10.1038/s41558-024-02058-w',
    peerReviewed: true,
    citationCount: 96,
    topics: ['Southern Ocean', 'Sea Ice Anomaly', 'Atmospheric Rivers', 'Polynyas'],
    keyTakeaway: 'The Southern Ocean has entered an altered regime characterized by reduced winter sea ice recovery, potentially signaling a regime shift in polar energy balance.',
    datasetIds: ['data-antarctic-seaice-extent'],
    relatedExpeditionId: 'exp-indian-antarctic-44',
    readingTimeMin: 7
  },
  {
    id: 'res-arctic-amplification',
    title: 'Four-Fold Accelerated Warming of the Arctic Relative to the Global Average Since 1979',
    abstract: 'Through observational reanalysis and satellite passive microwave radiometry, we demonstrate that the Arctic region has warmed at a rate four times faster than the rest of the planet over the satellite era, twice as fast as previously reported by CMIP6 ensemble averages.',
    authors: ['Dr. Mika Rantanen', 'Dr. Alexey Yu. Karpechko', 'Dr. Antti Lipponen'],
    institution: 'Finnish Meteorological Institute & University of Helsinki',
    year: 2023,
    region: 'Arctic',
    category: 'Atmospheric Physics',
    contentType: 'Research Paper',
    doi: '10.1038/s43247-022-00498-3',
    peerReviewed: true,
    citationCount: 412,
    topics: ['Arctic Amplification', 'Albedo Feedback', 'Polar Vortex', 'Energy Transport'],
    keyTakeaway: 'Previous climate simulations systematically underestimated Arctic warming rates; the positive albedo feedback loop has entered an accelerated trajectory.',
    datasetIds: ['data-arctic-seaice-extent'],
    relatedExpeditionId: 'exp-mosaic-arctic',
    readingTimeMin: 6
  },
  {
    id: 'res-emperor-breeding-failure',
    title: 'Catastrophic Breeding Failure of Emperor Penguins in the Bellingshausen and Weddell Seas Due to Sea Ice Loss',
    abstract: 'High-resolution Sentinel-2 satellite imagery tracked Emperor penguin breeding sites across Antarctica. In regional sectors where fast ice broke up prematurely before chicks fledged their waterproof feathers, mortality rates reached near 100%.',
    authors: ['Dr. Peter T. Fretwell', 'Dr. Aileen Boutet', 'Dr. Philip N. Trathan'],
    institution: 'British Antarctic Survey (BAS)',
    year: 2024,
    region: 'Antarctica',
    category: 'Polar Ecology',
    contentType: 'Research Paper',
    doi: '10.1038/s43247-023-00927-x',
    peerReviewed: true,
    citationCount: 147,
    topics: ['Species Conservation', 'Fast Ice Dependents', 'Emperor Penguins', 'Biodiversity'],
    keyTakeaway: 'Without rapid emissions reductions, over 90% of Emperor penguin colonies are projected to be quasi-extinct by the end of the 21st century.',
    datasetIds: ['data-antarctic-seaice-extent'],
    relatedMediaIds: ['med-emperor-family'],
    readingTimeMin: 5
  },
  {
    id: 'res-gondwana-breakup',
    title: 'Geochemical Provenance and Crustal Rifting Signatures of the Larsemann Hills, East Antarctica',
    abstract: 'Field investigations and isotopic zircon dating from the Larsemann Hills collected near Bharati Station reveal metamorphic events documenting the assembly and subsequent breakup of the Gondwana supercontinent along the Indo-Antarctic conjugate margin.',
    authors: ['Dr. Thamban Meloth', 'Dr. Shridhar Jawak', 'Dr. Rasik Ravindra'],
    institution: 'National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, India',
    year: 2024,
    region: 'Antarctica',
    category: 'Geology & Geophysics',
    contentType: 'Research Paper',
    doi: '10.1016/j.precamres.2023.107214',
    peerReviewed: true,
    citationCount: 38,
    topics: ['Gondwana', 'Continental Drift', 'Zircon Dating', 'East Antarctica'],
    keyTakeaway: 'Crustal suture zones in East Antarctica align directly with the Eastern Ghats belt in India, providing definitive physical proof of ancient continental continuity.',
    datasetIds: ['data-bharati-met'],
    relatedExpeditionId: 'exp-indian-antarctic-44',
    relatedMediaIds: ['med-bharati-life'],
    readingTimeMin: 8
  },
  {
    id: 'res-mosaic-atmosphere',
    title: 'Atmospheric Boundary Layer Dynamics and Cloud-Radiation Feedbacks During the Central Arctic MOSAiC Expedition',
    abstract: 'Continuous radiosonde soundings and lidar profiles gathered from the drift camp of RV Polarstern elucidate the formation of mixed-phase Arctic clouds and their paradoxical warming effect during the dark polar winter.',
    authors: ['Dr. Matthew D. Shupe', 'Dr. Markus Rex', 'Dr. Benjamin Brooks'],
    institution: 'MOSAiC Consortium / Alfred Wegener Institute (AWI)',
    year: 2024,
    region: 'Arctic',
    category: 'Atmospheric Physics',
    contentType: 'Scientific Report',
    doi: '10.1175/BAMS-D-21-0028.1',
    peerReviewed: true,
    citationCount: 88,
    topics: ['MOSAiC', 'Arctic Clouds', 'Boundary Layer', 'Sea Ice Freeze'],
    keyTakeaway: 'Liquid water droplets persist in Arctic clouds even at temperatures down to -30°C, acting as an insulating blanket that impedes winter sea ice thickness growth.',
    datasetIds: ['data-arctic-seaice-extent'],
    relatedExpeditionId: 'exp-mosaic-arctic',
    relatedMediaIds: ['med-polarstern-night'],
    readingTimeMin: 10
  }
];

export const POLAR_DATASETS: PolarDataset[] = [
  {
    id: 'data-bharati-met',
    title: 'Larsemann Hills Atmospheric & Ozone Profiling Time-Series',
    description: 'High-frequency meteorological soundings, ultraviolet radiation indices, and aerosol optical depth records continuously logged at Bharati Station.',
    provider: 'National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences (MoES)',
    region: 'Antarctica',
    temporalCoverage: '2012 - 2026 (Daily)',
    updateFrequency: 'Hourly automated feed',
    parameters: ['Surface Temperature (°C)', 'Ozone Column Density (DU)', 'Wind Speed & Gusts (knots)', 'Direct Solar Irradiance'],
    fileFormat: 'CSV / NetCDF-4',
    fileSizeMb: 320,
    downloadUrl: '#dataset-download',
    relatedExpeditionId: 'exp-indian-antarctic-44',
    relatedPublicationIds: ['res-gondwana-breakup'],
    sampleDataPoints: [
      { label: 'Jan 2024 Mean Temp', value: -1.4, unit: '°C', anomaly: 0.6 },
      { label: 'Jul 2024 Winter Low', value: -28.6, unit: '°C', anomaly: 1.2 },
      { label: 'Oct 2024 Ozone Minimum', value: 135, unit: 'DU', anomaly: -18 },
      { label: 'Jan 2025 Mean Temp', value: -0.9, unit: '°C', anomaly: 0.9 },
      { label: 'Jan 2026 Mean Temp', value: -1.1, unit: '°C', anomaly: 0.7 }
    ]
  },
  {
    id: 'data-antarctic-seaice-extent',
    title: 'Antarctic Sea Ice Extent Daily Passive Microwave Index (1979 - 2026)',
    description: 'High-precision continuous record of daily Southern Ocean sea ice coverage derived from SMMR, SSM/I, and SSMIS sensor radiance data.',
    provider: 'National Snow and Ice Data Center (NSIDC) / NASA Goddard',
    region: 'Antarctica',
    temporalCoverage: '1979 - 2026 (Daily Updates)',
    updateFrequency: 'Daily automated ingestion',
    parameters: ['Sea Ice Extent (Million sq km)', 'Sea Ice Area', 'Regional Sector Breakdown', 'Anomaly relative to 1981-2010 mean'],
    fileFormat: 'NetCDF-4 / CSV / GeoTIFF',
    fileSizeMb: 420,
    downloadUrl: '#dataset-download',
    relatedExpeditionId: 'exp-indian-antarctic-44',
    relatedPublicationIds: ['res-antarctic-sea-ice-minimum', 'res-emperor-breeding-failure'],
    sampleDataPoints: [
      { label: 'Feb 2020 (Summer Min)', value: 2.68, unit: 'M km²', anomaly: -0.42 },
      { label: 'Feb 2021 (Summer Min)', value: 2.54, unit: 'M km²', anomaly: -0.56 },
      { label: 'Feb 2022 (Record Low)', value: 1.98, unit: 'M km²', anomaly: -1.12 },
      { label: 'Feb 2023 (Historic Min)', value: 1.79, unit: 'M km²', anomaly: -1.31 },
      { label: 'Feb 2024 (Record Low)', value: 1.83, unit: 'M km²', anomaly: -1.27 },
      { label: 'Feb 2025 (Current)', value: 1.88, unit: 'M km²', anomaly: -1.22 },
      { label: 'Feb 2026 (Preliminary)', value: 1.85, unit: 'M km²', anomaly: -1.25 }
    ]
  },
  {
    id: 'data-arctic-seaice-extent',
    title: 'Arctic Sea Ice September Minimum & Multi-Decadal Trend Analysis',
    description: 'Northern Hemisphere sea ice extent indices highlighting rapid summer ice retreat, multi-year ice decline, and seasonal melt duration.',
    provider: 'Copernicus Climate Change Service (C3S) / NSIDC',
    region: 'Arctic',
    temporalCoverage: '1979 - 2026',
    updateFrequency: 'Monthly aggregated',
    parameters: ['September Extent (Million sq km)', 'Multi-year Ice Age Distribution', 'Ice Thickness (CryoSat-2/ICESat-2)'],
    fileFormat: 'GeoTIFF / NetCDF / GeoJSON',
    fileSizeMb: 680,
    downloadUrl: '#dataset-download',
    relatedExpeditionId: 'exp-mosaic-arctic',
    relatedPublicationIds: ['res-arctic-amplification', 'res-mosaic-atmosphere'],
    sampleDataPoints: [
      { label: '1980 Mean', value: 7.67, unit: 'M km²', anomaly: 1.25 },
      { label: '1990 Mean', value: 6.46, unit: 'M km²', anomaly: 0.04 },
      { label: '2000 Mean', value: 6.32, unit: 'M km²', anomaly: -0.10 },
      { label: '2010 Mean', value: 4.87, unit: 'M km²', anomaly: -1.55 },
      { label: '2020 Mean', value: 3.92, unit: 'M km²', anomaly: -2.50 },
      { label: '2024 Mean', value: 4.28, unit: 'M km²', anomaly: -2.14 },
      { label: '2025 Mean', value: 4.19, unit: 'M km²', anomaly: -2.23 }
    ]
  },
  {
    id: 'data-grace-mass-balance',
    title: 'GRACE & GRACE Follow-On Satellite Gravity Ice Sheet Mass Balance',
    description: 'Monthly changes in total ice sheet mass over Greenland and Antarctica measured via gravimetric twin-satellite tracking.',
    provider: 'NASA Jet Propulsion Laboratory (JPL) / GFZ German Research Centre',
    region: 'Global Polar',
    temporalCoverage: '2002 - 2026',
    updateFrequency: 'Quarterly release',
    parameters: ['Cumulative Mass Anomaly (Gigatonnes)', 'Equivalent Sea Level Rise Contribution (mm)', 'Spatial Mass Flux Grid (1°x1°)'],
    fileFormat: 'NetCDF-4 / ASCII Grid',
    fileSizeMb: 850,
    downloadUrl: '#dataset-download',
    relatedExpeditionId: 'exp-itgc-thwaites',
    relatedPublicationIds: ['res-thwaites-grounding'],
    sampleDataPoints: [
      { label: 'Antarctica Loss Rate', value: -148, unit: 'Gt/year', anomaly: -32 },
      { label: 'Greenland Loss Rate', value: -274, unit: 'Gt/year', anomaly: -48 },
      { label: 'Global SLR Contribution', value: 1.2, unit: 'mm/year', anomaly: 0.3 }
    ]
  },
  {
    id: 'data-ice-velocity-sentinel',
    title: 'Sentinel-1 InSAR & Landsat-8/9 Grounding Line Velocity Maps',
    description: 'High-spatial-resolution radar interferometry mapping surface ice displacement across Antarctic outlet glaciers and ice shelves.',
    provider: 'European Space Agency (ESA) & USGS',
    region: 'Antarctica',
    temporalCoverage: '2014 - 2026',
    updateFrequency: 'Bi-weekly automated interferometric processing',
    parameters: ['Horizontal Flow Velocity (m/yr)', 'Strain Rates', 'Rifting Rates'],
    fileFormat: 'Cloud Optimized GeoTIFF (COG)',
    fileSizeMb: 1420,
    downloadUrl: '#dataset-download',
    relatedExpeditionId: 'exp-itgc-thwaites',
    relatedPublicationIds: ['res-thwaites-grounding'],
    sampleDataPoints: [
      { label: 'Thwaites Fast Stream', value: 3200, unit: 'm/year', anomaly: 450 },
      { label: 'Pine Island Gl. Trunk', value: 3950, unit: 'm/year', anomaly: 310 },
      { label: 'Jakobshavn Isbræ', value: 14200, unit: 'm/year', anomaly: 1200 }
    ]
  }
];

export const EXPEDITIONS: Expedition[] = [
  {
    id: 'exp-indian-antarctic-44',
    name: '44th Indian Scientific Expedition to Antarctica (ISEA 44)',
    vesselOrTeam: 'Chartered Ice-Class Vessel MV Vasiliy Golovnin',
    leadScientist: 'Dr. Rahul Mohan',
    institution: 'Ministry of Earth Sciences (MoES) / NCPOR, India',
    startDate: '2024-12-15',
    endDate: '2025-04-10',
    status: 'Completed',
    objective: 'Resupply Maitri and Bharati research stations, extract deep ice cores from Queen Maud Land, and deploy oceanographic conductivity-temperature-depth (CTD) mooring arrays across the Southern Ocean.',
    region: 'Antarctica',
    routeCoordinates: [
      { lat: -33.92, lng: 18.42, label: 'Cape Town Staging Port' },
      { lat: -69.41, lng: 76.19, label: 'Bharati Station (Larsemann Hills)' },
      { lat: -70.76, lng: 11.73, label: 'Maitri Station (Schirmacher Oasis)' }
    ],
    milestones: [
      'Successfully extracted 120-meter high-altitude ice core from Queen Maud Land plateau.',
      'Commissioned new renewable microgrid combining vertical-axis wind turbines at Bharati Station.',
      'Conducted Southern Ocean marine biological sampling of Antarctic krill (Euphausia superba).'
    ],
    findingsSummary: 'Established baseline trace metal deposition logs in Antarctic precipitation and validated regional climate models with direct sounding balloons.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&w=800&q=80',
    reportIds: ['rep-isea-44-cruise'],
    publicationIds: ['res-gondwana-breakup', 'res-antarctic-sea-ice-minimum'],
    datasetIds: ['data-bharati-met', 'data-antarctic-seaice-extent'],
    mediaIds: ['med-bharati-life', 'med-antarctic-twilight'],
    activityIds: ['act-moes-flagoff-44', 'act-polar-conf-2025', 'act-antarctica-day'],
    researchers: [
      { name: 'Dr. Rahul Mohan', role: 'Expedition Leader & Chief Scientist', institution: 'NCPOR / MoES', specialization: 'Micropaleontology & Southern Ocean Oceanography' },
      { name: 'Dr. Shridhar Jawak', role: 'Lead Cryospheric Geophysicist', institution: 'NCPOR / MoES', specialization: 'Satellite Remote Sensing & GIS' },
      { name: 'Dr. Thamban Meloth', role: 'Senior Ice Core Specialist', institution: 'NCPOR / MoES', specialization: 'Paleoclimatology & Glaciochemistry' },
      { name: 'Capt. Arun Sharma', role: 'Station Operations Commander', institution: 'Indian Army Corps of Engineers', specialization: 'High-Altitude Polar Logistics' }
    ]
  },
  {
    id: 'exp-itgc-thwaites',
    name: 'International Thwaites Glacier Collaboration (ITGC)',
    vesselOrTeam: 'RV Nathaniel B. Palmer / Twin Otter Field Logistics',
    leadScientist: 'Dr. Ted Scambos & Dr. David Vaughan',
    institution: 'US NSF & UK NERC Collaboration (International)',
    startDate: '2018-11-01',
    endDate: '2026-03-31',
    status: 'Ongoing',
    objective: 'Deploy deep hot-water ice drills, autonomous submersibles (Icefin/Ran), and geophysical sensor grids to determine if Thwaites will collapse within decades or centuries.',
    region: 'Antarctica',
    routeCoordinates: [
      { lat: -53.16, lng: -70.91, label: 'Punta Arenas Departure Hub' },
      { lat: -71.5, lng: -100.2, label: 'Amundsen Sea Ice Edge' },
      { lat: -75.5, lng: -106.75, label: 'Thwaites Grounding Zone Drill Site' }
    ],
    milestones: [
      'Drilled 600m borehole through floating tongue to deploy Icefin AUV.',
      'Mapped sub-shelf topography and warm ocean water entry conduits.',
      'Installed GPS ground arrays logging grounding line tidal migration.'
    ],
    findingsSummary: 'Revealed warm Circumpolar Deep Water (CDW) pooling in submarine troughs, causing rapid basal incision along glacier shear margins.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    reportIds: ['rep-itgc-icefin-report'],
    publicationIds: ['res-thwaites-grounding'],
    datasetIds: ['data-ice-velocity-sentinel', 'data-grace-mass-balance'],
    mediaIds: ['med-thwaites-icefin', 'med-glacier-radar'],
    activityIds: ['act-itgc-science-meeting'],
    researchers: [
      { name: 'Dr. Britney E. Schmidt', role: 'Lead Submersible Investigator', institution: 'Cornell University / ITGC', specialization: 'Robotics & Cryosphere Interface' },
      { name: 'Dr. Peter E. Davis', role: 'Physical Oceanographer', institution: 'British Antarctic Survey (BAS)', specialization: 'Sub-ice shelf circulation' },
      { name: 'Dr. Ted Scambos', role: 'US Lead Coordinator', institution: 'University of Colorado Boulder', specialization: 'Glaciology & Remote Sensing' }
    ]
  },
  {
    id: 'exp-mosaic-arctic',
    name: 'MOSAiC: Multidisciplinary drifting Observatory for the Study of Arctic Climate',
    vesselOrTeam: 'Research Vessel Polarstern (AWI)',
    leadScientist: 'Prof. Dr. Markus Rex',
    institution: 'Alfred Wegener Institute (AWI, Germany)',
    startDate: '2019-09-20',
    endDate: '2020-10-12',
    status: 'Completed',
    objective: 'Freeze an icebreaker into the central Arctic sea ice pack for a full 13-month annual cycle to measure energy budgets, ecosystem dynamics, and atmospheric boundary physics.',
    region: 'Arctic',
    routeCoordinates: [
      { lat: 69.96, lng: 23.27, label: 'Tromsø Departure' },
      { lat: 85.05, lng: 135.2, label: 'Freeze-in floe anchor site' },
      { lat: 89.99, lng: 0.0, label: 'North Pole Drift Sector' },
      { lat: 79.5, lng: 5.0, label: 'Fram Strait Breakout' }
    ],
    milestones: [
      '389 days drifting locked in multi-year sea ice pack.',
      'Over 60 scientific institutions from 20 nations participating in rotation.',
      'Over 150 Terabytes of raw continuous climate system measurements gathered.'
    ],
    findingsSummary: 'First year-round comprehensive empirical budget of the Arctic climate system, confirming accelerated ice thinning and complex winter cloud warming.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    reportIds: ['rep-mosaic-annual-summary'],
    publicationIds: ['res-arctic-amplification', 'res-mosaic-atmosphere'],
    datasetIds: ['data-arctic-seaice-extent'],
    mediaIds: ['med-polarstern-night'],
    activityIds: ['act-mosaic-data-portal'],
    researchers: [
      { name: 'Prof. Dr. Markus Rex', role: 'Expedition Head', institution: 'Alfred Wegener Institute', specialization: 'Atmospheric Physics & Polar Climatology' },
      { name: 'Dr. Matthew Shupe', role: 'Atmosphere Team Co-Lead', institution: 'CIRES / NOAA', specialization: 'Cloud Microphysics' }
    ]
  }
];

export const INSTITUTIONAL_ACTIVITIES: InstitutionalActivity[] = [
  {
    id: 'act-moes-flagoff-44',
    title: 'MoES Flags Off the 44th Indian Scientific Expedition to Antarctica',
    type: 'Expedition',
    institution: 'Ministry of Earth Sciences (MoES), Government of India',
    date: '2024-12-15',
    location: 'Cape Town Port & National Centre for Polar and Ocean Research (Goa)',
    summary: 'The Ministry of Earth Sciences formally launched the 44th Indian Scientific Expedition to Antarctica comprising 48 scientists, logistics specialists, and environmental observers.',
    description: 'Special emphasis during this expedition is laid on deep ice-coring in Queen Maud Land to reconstruct Indian monsoon teleconnections with the Southern Ocean, and upgrading Bharati Station to high-efficiency green energy microgrids.',
    leadCoordinator: 'Secretary, Ministry of Earth Sciences (MoES) & Director, NCPOR',
    participantsCount: 48,
    status: 'Completed',
    relatedExpeditionId: 'exp-indian-antarctic-44',
    relatedMediaIds: ['med-bharati-life'],
    badgeText: 'MoES Milestone'
  },
  {
    id: 'act-polar-conf-2025',
    title: 'National Polar Science Conference & Climate Outreach Forum (NPSC)',
    type: 'Conference',
    institution: 'National Centre for Polar and Ocean Research (NCPOR) / MoES',
    date: '2025-02-28',
    location: 'NCPOR Campus, Vasco da Gama, Goa',
    summary: 'Three-day symposium bringing together cryospheric glaciologists, atmospheric physicists, and marine ecologists to present latest findings from Antarctica, the Arctic, and the Himalayas.',
    description: 'Over 200 research presentations were delivered on sub-ice lakes, sea-ice minimum anomalies, Antarctic microbiomes, and Himalayan glacier mass balances. Special sessions were dedicated to school science education and teacher outreach modules.',
    leadCoordinator: 'Dr. Thamban Meloth, Director NCPOR',
    participantsCount: 220,
    status: 'Completed',
    relatedExpeditionId: 'exp-indian-antarctic-44',
    relatedPublicationIds: ['res-gondwana-breakup', 'res-antarctic-sea-ice-minimum'],
    badgeText: 'National Symposium'
  },
  {
    id: 'act-antarctica-day',
    title: 'Antarctica Day Public Outreach & Smart Education Broadcast',
    type: 'Outreach Program',
    institution: 'Ministry of Earth Sciences (MoES)',
    date: '2024-12-01',
    location: 'Nationwide Hybrid Broadcast & Vigyan Prasar Hubs',
    summary: 'Commemorating the 1959 signing of the Antarctic Treaty with interactive live video uplinks connecting 15,000 students directly to wintering scientists at Bharati and Maitri stations.',
    description: 'Students engaged in live Q&A sessions on polar blizzards, penguin conservation, and solar observations. The event unveiled the pilot version of the POLARIS science intelligence repository.',
    leadCoordinator: 'MoES Science Outreach Division',
    participantsCount: 15400,
    status: 'Completed',
    relatedMediaIds: ['med-bharati-life', 'med-antarctic-twilight'],
    badgeText: 'Smart Education'
  },
  {
    id: 'act-itgc-science-meeting',
    title: 'International Thwaites Glacier Collaboration Annual Synthesis Meeting',
    type: 'Research Event',
    institution: 'ITGC Consortium (UK NERC / US NSF)',
    date: '2024-09-18',
    location: 'Cambridge, United Kingdom',
    summary: 'Global scientists reviewed autonomous submarine data, ice-penetrating radar grids, and sea level projection simulations.',
    description: 'The conference released updated estimates showing Thwaites grounding line retreat has accelerated past critical submarine bedrock thresholds.',
    leadCoordinator: 'ITGC Science Steering Committee',
    participantsCount: 85,
    status: 'Completed',
    relatedExpeditionId: 'exp-itgc-thwaites',
    relatedPublicationIds: ['res-thwaites-grounding'],
    badgeText: 'International Consortium'
  },
  {
    id: 'act-himadri-winter-plan',
    title: 'MoES Year-Round Arctic Research Expansion at Himadri Station',
    type: 'Institutional Update',
    institution: 'Ministry of Earth Sciences (MoES) / NCPOR',
    date: '2025-06-10',
    location: 'Ny-Ålesund, Svalbard (78°55′N)',
    summary: 'Strategic initiation of continuous year-round winter observation campaigns at India\'s Himadri Arctic Station.',
    description: 'Expanding observation capabilities to record polar night atmospheric chemistry, aerosol deposition from mid-latitudes, and seasonal fjord ice-melt triggers in the European Arctic.',
    leadCoordinator: 'Group Director, Arctic Operations (NCPOR)',
    participantsCount: 16,
    status: 'Upcoming',
    relatedPublicationIds: ['res-arctic-amplification'],
    badgeText: 'Arctic Strategy'
  }
];

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'med-thwaites-icefin',
    title: 'Beneath the "Doomsday Glacier": The Icefin Submersible Mission',
    description: 'Inside the engineering and scientific breakthrough of lowering an autonomous slender robot down a 600-meter borehole to touch the grounding zone of Thwaites Glacier.',
    category: 'Videos',
    type: 'video',
    region: 'Antarctica',
    creator: 'Dr. Britney Schmidt & ITGC Media',
    institution: 'ITGC / Cornell University',
    date: '2024-02-14',
    duration: '14:22',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Submersible', 'Thwaites', 'Grounding Zone', 'Robotics'],
    scientificContext: 'Captures the actual underside of the West Antarctic ice shelf where warm seawater drives accelerated staircase melting.',
    relatedExpeditionId: 'exp-itgc-thwaites',
    relatedLocationId: 'loc-thwaites',
    relatedResearchId: 'res-thwaites-grounding',
    resolution: '4K Ultra HD'
  },
  {
    id: 'med-bharati-life',
    title: 'Life at India\'s Antarctic Research Station: Bharati',
    description: 'An intimate documentary on the scientists, technicians, and chefs who spend 14 months isolated in the Larsemann Hills under polar night and howling blizzards.',
    category: 'Scientist Stories',
    type: 'video',
    region: 'Antarctica',
    creator: 'NCPOR / Ministry of Earth Sciences (MoES)',
    institution: 'Ministry of Earth Sciences (MoES), India',
    date: '2024-06-21',
    duration: '18:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1548695607-9c73430ba065?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Bharati', 'India', 'Station Life', 'Wintering', 'MoES'],
    scientificContext: 'Highlights the human dimension of high-latitude scientific operations and psychological resilience under -40°C blizzards.',
    relatedExpeditionId: 'exp-indian-antarctic-44',
    relatedLocationId: 'loc-bharati',
    relatedActivityId: 'act-moes-flagoff-44',
    resolution: '1080p HD'
  },
  {
    id: 'med-polarstern-night',
    title: 'The Polar Night Over RV Polarstern: 150 Days of Darkness',
    description: 'Ultra-high sensitivity long-exposure time-lapse photography capturing the frozen research vessel surrounded by cracking ice floes under green auroral curtains.',
    category: 'Photography',
    type: 'photo',
    region: 'Arctic',
    creator: 'Esther Horvath / AWI MOSAiC',
    institution: 'Alfred Wegener Institute (AWI)',
    date: '2023-11-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=90',
    tags: ['MOSAiC', 'Aurora Borealis', 'Polar Night', 'Icebreaker'],
    scientificContext: 'Award-winning photojournalism illuminating the harsh realities of Arctic winter science.',
    relatedExpeditionId: 'exp-mosaic-arctic',
    relatedLocationId: 'loc-mosaic-site',
    relatedResearchId: 'res-mosaic-atmosphere',
    resolution: 'High Resolution Raw'
  },
  {
    id: 'med-emperor-family',
    title: 'Guardians of the Weddell Sea: Emperor Penguin Breeding Cycle',
    description: 'Photographic portfolio capturing male Emperor penguins balancing eggs on their feet through -50°C blizzards on Antarctic fast ice.',
    category: 'Wildlife',
    type: 'photo',
    region: 'Antarctica',
    creator: 'British Antarctic Survey Ecology Unit',
    institution: 'British Antarctic Survey (BAS)',
    date: '2024-08-30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1600&q=90',
    tags: ['Penguins', 'Weddell Sea', 'Ecosystem', 'Wildlife'],
    scientificContext: 'Documenting the bio-indicator species that relies entirely on frozen ocean surfaces.',
    relatedLocationId: 'loc-weddell-wildlife',
    relatedResearchId: 'res-emperor-breeding-failure',
    resolution: 'High Resolution Raw'
  },
  {
    id: 'med-jakobshavn-calving',
    title: 'The Anatomy of a Calving Event: Jakobshavn Glacier Sermeq Kujalleq',
    description: 'High-speed drone footage capturing a 1-cubic-kilometer ice skyscraper collapsing into Ilulissat Icefjord in Greenland.',
    category: 'Climate Stories',
    type: 'video',
    region: 'Arctic',
    creator: 'GEUS / Geological Survey of Denmark',
    institution: 'GEUS',
    date: '2024-05-18',
    duration: '08:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Calving', 'Greenland', 'Iceberg', 'Ocean Thermal'],
    scientificContext: 'Direct visual evidence of kinetic glacier discharge transferring land ice directly into sea level rise.',
    relatedLocationId: 'loc-jakobshavn',
    resolution: '4K Ultra HD'
  },
  {
    id: 'med-glacier-radar',
    title: 'Satellite Radar Interferometry: Mapping Ice Velocity From Space',
    description: 'Synthetic Aperture Radar (SAR) visualization animating ice stream flow vectors across the Ross Ice Shelf over a 10-year span.',
    category: 'Satellite Imagery',
    type: 'photo',
    region: 'Antarctica',
    creator: 'European Space Agency (Copernicus Sentinel)',
    institution: 'ESA / Copernicus',
    date: '2024-09-02',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=90',
    tags: ['Radar', 'Satellite', 'InSAR', 'Remote Sensing'],
    scientificContext: 'Demonstrates how spaceborne microwave radar penetrates polar cloud cover to measure millimeter-scale crustal deformation.',
    relatedLocationId: 'loc-thwaites',
    relatedResearchId: 'res-thwaites-grounding',
    resolution: 'Satellite GeoTIFF / 10m'
  }
];

export const DEMO_GENERATED_OUTREACH: GeneratedOutreachItem[] = [
  {
    id: 'out-isea44-article',
    sourceId: 'rep-isea-44-cruise',
    sourceTitle: 'Integrated Scientific Cruise & Ice Sheet Profiling Report (ISEA 44)',
    sourceType: 'Expedition Report',
    sourceInstitution: 'Ministry of Earth Sciences (MoES) / NCPOR',
    format: 'website_article',
    formatLabel: 'Website Feature Article',
    title: 'Secrets of the Deep Ice: How Indian Scientists Discovered 850 Years of Climate History in Antarctica',
    content: `From the howling blizzards of the Larsemann Hills to the high plateau of Queen Maud Land, the 44th Indian Scientific Expedition to Antarctica has returned with extraordinary discoveries.

Drilled from more than 100 meters beneath the frozen continent, newly recovered ice cores act like frozen time capsules. By analyzing ancient atmospheric gases trapped in microscopic air bubbles, Indian researchers at NCPOR have uncovered how ancient monsoon cycles directly coincided with shifts in polar ocean currents centuries before the industrial era.

Furthermore, India's Bharati Station achieved an environmental milestone: the commissioning of a zero-emission renewable microgrid combining custom vertical-axis wind turbines designed to withstand wind gusts exceeding 160 kilometers per hour.`,
    reviewStatus: 'published',
    createdAt: '2025-04-18',
    updatedAt: '2025-04-20',
    attachedMediaIds: ['med-bharati-life'],
    attachedDatasetId: 'data-bharati-met',
    reviewNotes: 'Reviewed by MoES Science Communication Board. Approved for open portal publication.',
    reviewedBy: 'MoES Editorial Panel',
    publishedChannels: ['Official MoES Portal', 'Press Information Bureau (PIB)', 'POLARIS Stories'],
    publishedAt: '2025-04-21',
    targetAudience: 'General Public & Educators',
    readingLevel: 'Grade 8 (Accessible)'
  },
  {
    id: 'out-isea44-insta',
    sourceId: 'rep-isea-44-cruise',
    sourceTitle: 'Integrated Scientific Cruise & Ice Sheet Profiling Report (ISEA 44)',
    sourceType: 'Expedition Report',
    sourceInstitution: 'Ministry of Earth Sciences (MoES) / NCPOR',
    format: 'instagram_post',
    formatLabel: 'Instagram Visual Carousel',
    title: 'Instagram Carousel: 5 Things You Didn\'t Know Happened on India\'s 44th Antarctic Expedition',
    content: `❄️ 120 METERS INTO THE ICE SHEET: India\'s 44th Antarctic Expedition just concluded, and the discoveries are mind-blowing! Swipe ➡️ to discover:

1️⃣ Ancient Time Capsules: Scientists drilled deep into the Antarctic plateau to extract 850-year-old ice cores.
2️⃣ Green Power at -40°C: Bharati Station is now partly powered by wind turbines built to survive super-blizzards!
3️⃣ Southern Ocean Floats: 6 robotic ocean floats were dropped into the stormy circumpolar current to measure ocean heat.
4️⃣ Gondwanaland Connection: New rock samples prove India and Antarctica were once stitched together 120 million years ago.

📍 Location: Bharati Station, Larsemann Hills (69°24\'S)
🔬 Led by: Ministry of Earth Sciences & @ncpor_goa

#PolarScience #Antarctica #IndiaInAntarctica #MoES #ClimateResearch #NCPOR #ScienceOutreach`,
    reviewStatus: 'approved',
    createdAt: '2025-04-19',
    updatedAt: '2025-04-22',
    attachedMediaIds: ['med-bharati-life'],
    reviewNotes: 'Verified factually by lead glaciologist. Approved for social dissemination.',
    reviewedBy: 'Dr. Rahul Mohan (Chief Scientist)',
    publishedChannels: ['Instagram @moes_india', 'X @moesgoi'],
    targetAudience: 'Youth & Students',
    readingLevel: 'Accessible'
  },
  {
    id: 'out-thwaites-linkedin',
    sourceId: 'rep-itgc-icefin-report',
    sourceTitle: 'Sub-Ice Shelf Cavity Exploration at Thwaites Glacier',
    sourceType: 'Expedition Report',
    sourceInstitution: 'ITGC Collaboration',
    format: 'linkedin_post',
    formatLabel: 'LinkedIn Scientific Update',
    title: 'Autonomous Robotics in Extreme Cryospheric Environments: The Icefin Breakthrough',
    content: `Engineering resilience meets oceanographic science: Lowering an autonomous robot down a 600-meter borehole through an Antarctic ice shelf is one of the most daring robotic missions ever attempted.

The International Thwaites Glacier Collaboration (ITGC) deployed the Icefin submersible directly into the grounding zone cavity of West Antarctica. The data revealed two critical insights:
1. Warm Circumpolar Deep Water (+1.5°C above in-situ freezing) is actively entering basal troughs.
2. Basal melting is structurally concentrated along vertical crevasses, accelerating shelf unpinning.

This empirical research provides vital ground truth for global sea-level rise models, directly impacting coastal infrastructure planning worldwide.

Read the peer-reviewed dataset and field report on POLARIS: https://polaris.org/repository/rep-itgc-icefin-report

#Oceanography #Robotics #Glaciology #ClimateTech #PolarScience #Geospatial`,
    reviewStatus: 'under_review',
    createdAt: '2025-04-22',
    updatedAt: '2025-04-23',
    attachedMediaIds: ['med-thwaites-icefin'],
    attachedDatasetId: 'data-ice-velocity-sentinel',
    reviewNotes: 'Pending final review by ITGC communications officer.',
    publishedChannels: ['LinkedIn Research Stream'],
    targetAudience: 'Researchers & Engineers',
    readingLevel: 'Professional'
  }
];

export const DEMO_SCIENCE_STORIES: ScienceStory[] = [
  {
    id: 'story-isea44-flagship',
    sourceResearchId: 'res-gondwana-breakup',
    title: 'How India and Antarctica Once Shared a Single Mountain Range',
    originalScientificHeadline: 'Geochemical Provenance and Crustal Rifting Signatures of the Larsemann Hills, East Antarctica (MoES / NCPOR)',
    scientificSummary: 'Field investigations and isotopic zircon dating from the Larsemann Hills collected near Bharati Station reveal metamorphic events documenting the assembly and subsequent breakup of the Gondwana supercontinent along the Indo-Antarctic conjugate margin.',
    studentExplanation: 'Did you know that millions of years ago, India and Antarctica were best friends joined together in one giant supercontinent called Gondwanaland? When Indian scientists at Bharati Station picked up rocks from the icy hills, they found the exact same mineral fingerprints that you find in the Eastern Ghats mountains along the coast of India!',
    publicStory: 'On a rocky promontory overlooking the icy Southern Ocean, Indian researchers at Bharati Station walk on rocks that hold the birth certificate of our modern planet. Over 120 million years ago, India and Antarctica were welded together. As continental drift pulled them apart, India drifted northward across the equator while Antarctica froze at the South Pole. Today, through continuous research conducted by the Ministry of Earth Sciences, scientists are matching the geological fingerprints of both continents, unlocking secrets about how our planet changes over deep time.',
    socialMediaThread: [
      '🇮🇳 1/4 Did you know India and Antarctica were once stitched together? Field rocks collected by MoES researchers at Bharati Station share the exact same zircon age fingerprints as the Eastern Ghats in India.',
      '🧭 2/4 120 million years ago, tectonic forces broke the Gondwanaland supercontinent apart. India sailed north to crash into Asia and form the Himalayas, while Antarctica drifted to the frozen pole.',
      '🔬 3/4 The 44th Indian Antarctic Expedition has gathered pristine sediment cores to reconstruct the exact ancient rifting timelines.',
      '📖 4/4 Explore the open report and geological logs on POLARIS: https://polaris.org/repository/rep-isea-44-cruise'
    ],
    keyMetaphor: 'Two puzzle pieces split by an ocean, retaining the identical grain of wood',
    targetAudience: 'General Public',
    readingLevel: 'Grade 8 (Accessible to non-specialists)',
    createdDate: '2025-04-20',
    author: 'MoES Science Outreach Desk',
    reviewStatus: 'published',
    sourceInstitution: 'Ministry of Earth Sciences (MoES) / NCPOR'
  },
  {
    id: 'story-thwaites-cork',
    sourceResearchId: 'res-thwaites-grounding',
    title: 'The Giant Ice Cork Holding Back the Ocean',
    originalScientificHeadline: 'Heterogeneous Sub-Ice Shelf Melt Rates Driven by Ocean Thermal Cavity Circulation at Thwaites Glacier',
    scientificSummary: 'Oceanographic observations beneath the floating ice shelf of Thwaites Glacier demonstrate that warm Circumpolar Deep Water enters sub-ice troughs, inducing basal ablation along vertical crevasse faces and threatening grounding-line unpinning.',
    studentExplanation: 'Imagine Antarctica has a giant bottle of water, and Thwaites Glacier is the cork plugged into the neck. Deep under the ocean, warm ocean water is like someone running warm water over the cork, melting its base and wiggling it loose. If the cork pops out, millions of gallons of water behind it can pour into the ocean!',
    publicStory: 'Miles away from any human city, an ice stream the size of Great Britain is slowly coming undone. For years, scientists worried that Thwaites Glacier was melting evenly from the bottom. But when an underwater robotic torpedo named Icefin swam beneath 600 meters of solid ice, it found something far more dramatic: the ice is being sliced by warm ocean currents carving steep underwater canyons. If Thwaites collapses entirely, it holds enough ice to raise global sea levels by over two feet—and could unlock neighboring ice sheets that could raise the oceans by up to ten feet.',
    socialMediaThread: [
      '🧵 1/4 Beneath 600 meters of Antarctic ice, an autonomous robot just touched the grounding line of Thwaites Glacier—and what it saw changes our understanding of sea-level rise.',
      '🧊 2/4 Thwaites isn\'t just melting flat like an ice cube. Warm seawater (+1.5°C) is carving deep vertical crevasses into its base, creating structural weak points that fracture under tension.',
      '🌊 3/4 Why does this matter to you? Thwaites currently causes ~4% of global sea-level rise. If its grounding zone slips off the seabed ridge, coastal cities worldwide will feel the surge.',
      '🔬 4/4 Explore the open dataset and satellite radar velocity maps on POLARIS: https://polaris.org/explore/thwaites'
    ],
    keyMetaphor: 'A wine bottle cork being dissolved by warm currents from below',
    targetAudience: 'General Public',
    readingLevel: 'Grade 8 (Accessible to non-specialists)',
    createdDate: '2024-03-12',
    author: 'POLARIS Science Outreach Desk',
    reviewStatus: 'published',
    sourceInstitution: 'International Thwaites Glacier Collaboration'
  }
];

export const PRESET_AI_KNOWLEDGE: Record<string, AIResponse> = {
  thwaites: {
    query: 'Tell me about Thwaites Glacier.',
    simpleExplanation: 'Thwaites Glacier is a massive Antarctic ice river—about the size of Florida or the United Kingdom—flowing into the ocean. Scientists call it the "Doomsday Glacier" because it acts like a giant dam holding back the entire West Antarctic Ice Sheet. If it collapses, global coastlines could flood by several feet.',
    scientificExplanation: 'Thwaites is a marine-terminating glacier experiencing retrograde bed slope instability (Marine Ice Sheet Instability - MISI). The bedrock beneath it slopes downwards toward the interior of Antarctica. As warm Circumpolar Deep Water (CDW) infiltrates the sub-ice cavity, the grounding line retreats into progressively deeper water, increasing ice discharge exponentially in a self-reinforcing feedback loop.',
    keyFacts: [
      'Discharges over 50 billion tons of ice annually into the Amundsen Sea.',
      'Its grounding zone has retreated more than 14 kilometers inland since 1996.',
      'Direct collapse would raise sea level by ~65 cm (2.1 ft), and destabilize surrounding ice for an additional ~3 meters (10 ft).'
    ],
    relatedData: [
      { metric: 'Ice Velocity', value: '3,200 m/year', trend: 'increasing', context: 'Fast-flowing trunk observed via Sentinel-1 InSAR' },
      { metric: 'Sub-ice Water Temp', value: '+1.5°C above freezing', trend: 'increasing', context: 'Logged by Icefin autonomous submersible' },
      { metric: 'Annual Mass Loss', value: '-75 Gt/year', trend: 'increasing', context: 'GRACE-FO satellite gravimetry balance' }
    ],
    sources: [
      { title: 'Heterogeneous Sub-Ice Shelf Melt Rates (Schmidt et al.)', institution: 'Nature / ITGC', year: 2024, urlOrDoi: '10.1038/s41586-023-05692-3', confidenceScore: 0.99 },
      { title: 'Sub-ice shelf ocean circulation and basal melt (Davis et al.)', institution: 'Nature Geoscience', year: 2023, urlOrDoi: '10.1038/s41561-023-01124-x', confidenceScore: 0.98 },
      { title: 'Widespread grounding line retreat in West Antarctica (Rignot et al.)', institution: 'Geophysical Research Letters', year: 2022, urlOrDoi: '10.1029/2021GL097000', confidenceScore: 0.97 }
    ],
    suggestedFollowUps: [
      'What happens if Thwaites Glacier collapses completely?',
      'How does the Icefin robot study the glacier underwater?',
      'What is the Marine Ice Sheet Instability (MISI) theory?'
    ]
  },
  melting: {
    query: 'Why is Antarctic ice melting?',
    simpleExplanation: 'While we often think air temperature melts ice from above, in Antarctica the primary culprit is warm ocean water attacking glaciers from below. Changes in wind patterns push deep, warm saltwater onto the shallow continental shelf, where it eats away at the floating ice shelves that support the continent.',
    scientificExplanation: 'The primary driver of Antarctic mass loss is basal melting induced by modified Circumpolar Deep Water (CDW) intrusion. Strengthened westerly winds (linked to ozone depletion and greenhouse warming) alter Ekman transport, shoaling warm saline water masses over the continental shelf troughs in the Amundsen and Bellingshausen seas. Surface air melting is also accelerating on the Antarctic Peninsula due to foehn winds and atmospheric river landfalls.',
    keyFacts: [
      'Over 80% of West Antarctica ice loss occurs from oceanic basal melting rather than surface evaporation or air temperature.',
      'Atmospheric rivers carry intense narrow plumes of tropical moisture that trigger sudden surface flash-melts.',
      'The Southern Ocean absorbs ~75% of excess heat taken up by all global oceans combined.'
    ],
    relatedData: [
      { metric: 'Antarctic Mass Balance', value: '-148 Gt/yr', trend: 'decreasing', context: 'Overall continental mass deficit from GRACE-FO' },
      { metric: 'Southern Ocean Heat Content', value: '+1.4 x 10²² J/decade', trend: 'increasing', context: 'Argo float oceanographic profiling' },
      { metric: 'Sea Ice Minimum', value: '1.79 M km² (2023 Record Low)', trend: 'decreasing', context: 'NSIDC passive microwave satellite record' }
    ],
    sources: [
      { title: 'Record-low Antarctic sea ice extent driven by ocean warming (Doddridge et al.)', institution: 'Nature Climate Change', year: 2025, urlOrDoi: '10.1038/s41558-024-02058-w', confidenceScore: 0.98 },
      { title: 'Ocean forcing of Antarctic ice sheets (Pritchard et al.)', institution: 'Nature', year: 2022, urlOrDoi: '10.1038/nature10968', confidenceScore: 0.96 }
    ],
    suggestedFollowUps: [
      'What is the difference between sea ice and land ice?',
      'How does India study Antarctic ice from Bharati Station?',
      'Can ice shelf melting be reversed?'
    ]
  },
  seaice: {
    query: 'What happens if sea ice disappears?',
    simpleExplanation: 'Sea ice is bright white like a giant solar mirror reflecting sunlight back into space. When it melts, it reveals dark ocean water that absorbs 90% of the sun\'s heat instead of reflecting it. This creates a vicious cycle: warmer water melts more ice, speeding up global warming. It also destroys the homes of polar bears, seals, and penguins.',
    scientificExplanation: 'Loss of sea ice diminishes the planetary surface albedo from ~0.85 (fresh snow/ice) to ~0.06 (open ocean water). This positive ice-albedo feedback is the core mechanism of Arctic Amplification. Furthermore, sea ice rejection of brine during freezing drives the global thermohaline circulation (ocean conveyor belt). Diminished sea ice weakens deep water formation in the North Atlantic and Southern Ocean, fundamentally destabilizing global weather patterns, jet streams, and marine primary productivity.',
    keyFacts: [
      'Multi-year sea ice in the Arctic has dropped by over 75% in volume since 1979.',
      'Antarctic sea ice hit historic all-time satellite record lows in consecutive summers (2022, 2023, 2024, 2025).',
      'Loss of sea ice alters the Polar Jet Stream, contributing to stalled weather extremes (heatwaves, cold snaps) in mid-latitudes.'
    ],
    relatedData: [
      { metric: 'Planetary Albedo Reflection', value: 'Drops from 85% to 6%', trend: 'decreasing', context: 'Radiative forcing shift across Arctic ocean basin' },
      { metric: 'Arctic Summer Minimum', value: '4.19 M km²', trend: 'decreasing', context: 'September satellite average compared to 7.6M in 1980' }
    ],
    sources: [
      { title: 'Four-Fold Accelerated Warming of the Arctic (Rantanen et al.)', institution: 'Communications Earth & Environment', year: 2023, urlOrDoi: '10.1038/s43247-022-00498-3', confidenceScore: 0.99 },
      { title: 'The Arctic Sea Ice Decline: Causes and Consequences (Stroeve & Notz)', institution: 'Current Climate Change Reports', year: 2022, urlOrDoi: '10.1007/s40641-020-00164-3', confidenceScore: 0.97 }
    ],
    suggestedFollowUps: [
      'Does melting sea ice directly raise global sea levels?',
      'How do Emperor penguins survive without sea ice?',
      'What was discovered on the MOSAiC Arctic expedition?'
    ]
  },
  study: {
    query: 'How do scientists study Antarctica?',
    simpleExplanation: 'Scientists use a combination of satellites high in space, robotic submarines swimming under the ice, deep ice core drills that extract ice trapped hundreds of thousands of years ago, and brave teams living year-round at isolated research stations like Bharati, McMurdo, and Halley.',
    scientificExplanation: 'Antarctic scientific observation relies on multi-tiered methodologies: (1) Satellite Remote Sensing using Synthetic Aperture Radar (SAR), laser altimetry (ICESat-2), and gravimetry (GRACE-FO); (2) Autonomous in-situ platforms including ocean profiling Argo floats, Icefin submersibles, and seismic arrays; (3) Paleoclimate ice core extraction (e.g. EPICA core reaching 800,000 years into atmospheric history); and (4) Continuous meteorological and atmospheric soundings from international treaty research stations.',
    keyFacts: [
      'Over 30 nations operate more than 70 year-round and seasonal research stations under the Antarctic Treaty of 1959.',
      'Ice cores contain ancient air bubbles that let scientists directly measure greenhouse gases from hundreds of thousands of years ago.',
      'Antarctica is protected exclusively for peaceful scientific research; all military activity and mineral extraction are banned.'
    ],
    relatedData: [
      { metric: 'Oldest Extracted Ice Core', value: '800,000+ years', trend: 'stable', context: 'EPICA Dome C paleoclimate atmospheric record' },
      { metric: 'Active Research Stations', value: '76 permanent/seasonal', trend: 'stable', context: 'Operated by 30 sovereign nations under COMNAP' }
    ],
    sources: [
      { title: 'Scientific Committee on Antarctic Research (SCAR) Strategic Plan', institution: 'SCAR / ICSU', year: 2024, urlOrDoi: 'scar.org/strategic-plan', confidenceScore: 0.98 },
      { title: 'Decadal Antarctic Ice Sheet Mass Loss (IMBIE Consortium)', institution: 'Earth System Science Data', year: 2023, urlOrDoi: '10.5194/essd-15-3751-2023', confidenceScore: 0.99 }
    ],
    suggestedFollowUps: [
      'Tell me about India\'s Bharati Station.',
      'How does an ice core tell us about past climate?',
      'What is the Antarctic Treaty System?'
    ]
  },
  animals: {
    query: 'What animals live in the Arctic?',
    simpleExplanation: 'The Arctic is home to polar bears, arctic foxes, narwhals (the "unicorns of the sea"), walruses, beluga whales, muskoxen, reindeer, and millions of migratory seabirds. Unlike Antarctica (which is surrounded by ocean), the Arctic has land where indigenous peoples and terrestrial mammals have thrived for thousands of years.',
    scientificExplanation: 'The Arctic marine and terrestrial food web is anchored by sea ice algae and copepods, supporting vast schools of Arctic cod. These feed apex predators such as the Polar Bear, Ringed Seal, and Cetaceans including Bowhead Whales and Narwhals. Terrestrial tundra supports large ungulates exhibiting high insulative morphological adaptations.',
    keyFacts: [
      'Polar bears live ONLY in the Arctic; penguins live almost exclusively in the Southern Hemisphere / Antarctica.',
      'Narwhal tusks are actually an elongated canine tooth with up to 10 million nerve endings used to sense ocean salinity and temperature.',
      'Arctic foxes have specialized circulatory heat exchangers in their paws allowing them to withstand temperatures below -50°C.'
    ],
    relatedData: [
      { metric: 'Polar Bear Subpopulations', value: '19 circumpolar units', trend: 'decreasing', context: 'IUCN Polar Bear Specialist Group census' },
      { metric: 'Caribou Herd Decline', value: '-56% over 20 years', trend: 'decreasing', context: 'Arctic Report Card 2024 (NOAA)' }
    ],
    sources: [
      { title: 'Arctic Biodiversity Assessment (CAFF)', institution: 'Arctic Council', year: 2023, urlOrDoi: 'caff.is/aba-report', confidenceScore: 0.98 },
      { title: 'Sea-ice loss effects on Arctic marine mammals (Laidre et al.)', institution: 'Conservation Biology', year: 2022, urlOrDoi: '10.1111/cobi.13840', confidenceScore: 0.97 }
    ],
    suggestedFollowUps: [
      'How do polar bears hunt using sea ice?',
      'Why aren\'t there penguins in the Arctic?',
      'How is the MOSAiC expedition tracking Arctic marine life?'
    ]
  }
};
