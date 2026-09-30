import React, { useState } from 'react';
import { PolarRepository } from '../../lib/supabase';
import { InstitutionalActivity, ActivityType } from '../../types/polar';
import {
  Building,
  Calendar,
  MapPin,
  Users,
  Compass,
  Video,
  Sparkles,
  ArrowRight,
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
      {/* 1. Header */}
      <div className="border-b border-slate-300 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#003366]">
            Official Institutional Ledger · Ministry of Earth Sciences (MoES)
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#002244] tracking-tight mt-1">
            Institutional Activities & Outreach Programs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Official chronological chronicle of polar expedition flag-offs, international Antarctic Treaty conferences, national student outreach seminars, and institutional achievements.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 border border-slate-300 bg-white p-1 text-xs self-start md:self-auto font-mono">
          <span className="text-slate-500 pl-2">Status:</span>
          {['All', 'Completed', 'Upcoming'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
                selectedStatus === st
                  ? 'bg-[#002244] text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Type Filter Strip */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs border-b border-slate-200">
        <span className="text-slate-500 font-mono text-[11px] mr-2 shrink-0">Filter Event Type:</span>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1 font-medium whitespace-nowrap cursor-pointer transition-colors border ${
              selectedType === t
                ? 'bg-[#002244] text-white border-[#001730] font-semibold'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 3. Chronological Institutional Ledger Table */}
      <div className="overflow-x-auto border border-slate-300 bg-white">
        <table className="inst-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity Title & Scope</th>
              <th>Category</th>
              <th>Organization</th>
              <th>Location</th>
              <th>Lead Coordinator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((act) => (
              <tr key={act.id}>
                <td className="font-mono text-xs text-slate-600 whitespace-nowrap">
                  {act.date}
                </td>
                <td>
                  <div className="font-bold text-[#002244] text-xs sm:text-sm">{act.title}</div>
                  <div className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {act.summary}
                  </div>
                  {act.participantsCount && (
                    <div className="text-[10px] font-mono text-emerald-800 mt-1">
                      Participation: {act.participantsCount.toLocaleString()} researchers & students engaged
                    </div>
                  )}
                </td>
                <td>
                  <span className="ds-badge ds-badge-neutral text-[10px]">
                    {act.type}
                  </span>
                </td>
                <td className="text-xs text-slate-700 font-medium">
                  {act.institution}
                </td>
                <td className="text-xs text-slate-600 font-mono whitespace-nowrap">
                  {act.location}
                </td>
                <td className="text-xs text-slate-700">
                  {act.leadCoordinator}
                </td>
                <td>
                  <div className="flex flex-col gap-1 text-xs">
                    <button
                      onClick={() =>
                        onNavigate('studio', {
                          sourceId: act.id,
                          sourceType: 'Activity',
                        })
                      }
                      className="text-xs font-semibold text-[#004c99] hover:underline cursor-pointer whitespace-nowrap text-left"
                    >
                      Draft Press Release →
                    </button>
                    {act.relatedExpeditionId && (
                      <button
                        onClick={() =>
                          onNavigate('expeditions', { expeditionId: act.relatedExpeditionId })
                        }
                        className="text-[11px] font-mono text-slate-500 hover:text-slate-900 cursor-pointer text-left"
                      >
                        Expedition Dossier
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
