import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { InstitutionalActivity, ActivityType } from '../../types/polar';
import {
  Building,
  Calendar,
  MapPin,
  Users,
  Compass,
  Award,
  Video,
  FileText,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface InstitutionalActivitiesViewProps {
  onNavigate: (tab: any, params?: any) => void;
}

export const InstitutionalActivitiesView: React.FC<InstitutionalActivitiesViewProps> = ({
  onNavigate,
}) => {
  const activities = PolarRepository.getActivities();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const types: (string | ActivityType)[] = [
    'All',
    'Expedition',
    'Conference',
    'Outreach Program',
    'Research Event',
    'Announcement',
    'Workshop',
    'Scientific Achievement',
    'Institutional Update',
  ];

  const filteredActivities = activities.filter((act) => {
    if (selectedType !== 'All' && act.type !== selectedType) return false;
    if (selectedStatus !== 'All' && act.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-widest uppercase mb-1">
            <Building className="w-3.5 h-3.5 text-sky-400" />
            <span>Ministry of Earth Sciences (MoES) & Institutional Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Institutional Activities
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            Chronicle of polar expedition flag-offs, international scientific conferences, national outreach forums, Smart Education broadcasts, and institutional achievements.
          </p>
        </div>

        {/* Status quick chips */}
        <div className="flex items-center gap-1 self-start md:self-auto bg-slate-900 border border-slate-800 p-0.5 rounded text-xs">
          {['All', 'Completed', 'Upcoming'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer text-xs font-medium ${
                selectedStatus === st
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs by Activity Type */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedType === t
                ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Timeline / Activities Feed */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:h-full before:w-px before:bg-slate-800">
        {filteredActivities.map((act) => (
          <div key={act.id} className="relative pl-10 sm:pl-16 group">
            {/* Timeline Node Icon */}
            <div className="absolute left-2 sm:left-4 top-4 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border border-sky-400 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            </div>

            {/* Activity Card */}
            <div className="bg-[#0b101d] hover:bg-[#0e1526] border border-slate-800 hover:border-slate-700 rounded-lg p-5 sm:p-6 space-y-4 shadow transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="ds-badge ds-badge-neutral">
                    {act.type}
                  </span>
                  {act.badgeText && (
                    <span className="ds-badge ds-badge-accent text-[10px]">
                      {act.badgeText}
                    </span>
                  )}
                  <span className="text-slate-400 text-[11px]">{act.date}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{act.location}</span>
                </div>
              </div>

              {/* Title & Organization */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white group-hover:text-sky-200 transition-colors">
                  {act.title}
                </h3>
                <div className="text-xs font-mono text-slate-400">
                  Organized by: <span className="text-slate-200 font-medium">{act.institution}</span>
                </div>
              </div>

              {/* Summary and Description */}
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p className="font-medium text-slate-200">{act.summary}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{act.description}</p>
              </div>

              {/* Co-ordinators & Participants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-900/90 rounded border border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Lead Coordinator:</span>
                  <span className="text-slate-200">{act.leadCoordinator}</span>
                </div>
                {act.participantsCount && (
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Participants Engaged:</span>
                    <span className="text-emerald-400 font-medium">{act.participantsCount.toLocaleString()} Students & Researchers</span>
                  </div>
                )}
              </div>

              {/* Connected Scientific Entities & Actions */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  {act.relatedExpeditionId && (
                    <button
                      onClick={() => onNavigate('expeditions', { expeditionId: act.relatedExpeditionId })}
                      className="text-sky-400 hover:underline flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Connected Expedition →</span>
                    </button>
                  )}
                  {act.relatedMediaIds && act.relatedMediaIds.length > 0 && (
                    <button
                      onClick={() => onNavigate('media')}
                      className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono text-[11px]"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Event Photography/Video →</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() =>
                    onNavigate('studio', {
                      sourceId: act.id,
                      sourceType: 'Activity',
                    })
                  }
                  className="ds-btn-primary text-xs py-1.5 px-3"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>Generate Outreach Article</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
