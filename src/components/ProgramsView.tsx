/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAMPLE_SERVICES } from '../sampleData';
import { Stethoscope, Activity, Sparkles, Heart, ArrowRight } from 'lucide-react';

interface ProgramsViewProps {
  setCurrentTab: (tab: string) => void;
}

export function ProgramsView({ setCurrentTab }: ProgramsViewProps) {
  const [selectedService, setSelectedService] = useState<typeof SAMPLE_SERVICES[0] | null>(null);

  const getIcon = (tag: string) => {
    switch (tag) {
      case 'Stethoscope': return <Stethoscope className="w-4 h-4 text-[#0066CC]" />;
      case 'Activity': return <Activity className="w-4 h-4 text-[#FF8C00]" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-[#129E36]" />;
      default: return <Heart className="w-4 h-4 text-[#0A2E5C]" />;
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'bg-[#129E36]/10 text-[#129E36] border-[#129E36]/20';
      case 'blue': return 'bg-[#0066CC]/10 text-[#0066CC] border-[#0066CC]/20';
      case 'indigo': return 'bg-[#0A2E5C]/10 text-[#0A2E5C] border-[#0A2E5C]/15';
      default: return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-6 font-sans">
      
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3 py-1 rounded-full">What We Render</span>
        <h1 className="text-4xl font-extrabold text-[#0A2E5C] tracking-tight">Our Primary Initiatives</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          Comprehensive medical programs designed exclusively to support physical mobility, cognitive growth, and wholesome social inclusion for children and seniors.
        </p>
      </section>

      {/* Services Grid list cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {SAMPLE_SERVICES.map((s, idx) => (
          <div 
            key={idx} 
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs flex flex-col sm:flex-row gap-6 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="w-full sm:w-48 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0 border border-slate-100">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex flex-col justify-between space-y-4 py-1">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${getBadgeColor(s.color)}`}>
                    {getIcon(s.icon)}
                    {s.title}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-[#0A2E5C] tracking-tight group-hover:text-[#129E36] transition-colors">{s.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500 leading-relaxed line-clamp-3">{s.description}</p>
              </div>
              <button 
                onClick={() => setSelectedService(s)}
                className="text-xs font-bold text-[#0066CC] hover:text-[#0A2E5C] flex items-center gap-1.5 cursor-pointer"
              >
                Expand Operations Plan <ArrowRight className="w-3.5 h-3.5 text-[#0066CC]" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Specialty Programs Expansion Modal Selector */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-8 space-y-6 shadow-2xl relative border border-slate-100 overflow-hidden">
            <h3 className="text-xl font-extrabold text-[#0A2E5C]">{selectedService.title} Details</h3>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
              {selectedService.details}
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs font-semibold text-slate-500 space-y-2">
              <p className="font-bold text-[#0A2E5C] border-b border-slate-150 pb-1.5 mb-1.5 font-sans">Operational Protocols:</p>
              <p>&bull; Periodic mobile van visits tracked recursively via operational dashboards.</p>
              <p>&bull; Rigorous transparent vetting criteria ensuring support reaches destitute backgrounds.</p>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-150 text-slate-500 rounded-full text-xs font-bold cursor-pointer"
              >
                Close Details
              </button>
              <button 
                onClick={() => {
                  setSelectedService(null);
                  setCurrentTab('donation');
                }}
                className="px-5 py-2.5 bg-[#129E36] hover:bg-[#0E7F2B] text-white rounded-full text-xs font-bold cursor-pointer"
              >
                Sponsor Initiative
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program metrics section */}
      <section className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-2">
          <h3 className="text-lg font-extrabold text-[#0A2E5C]">Personalized Patient Portals</h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            Every child’s therapeutic recovery is catalogued in our tracking logs. If you are a registered volunteer or healthcare provider, coordinate treatment timelines directly within the secure directory.
          </p>
        </div>
        <button 
          onClick={() => setCurrentTab('volunteer')}
          className="bg-[#0A2E5C] text-white hover:bg-[#0066CC] px-6 py-3 rounded-full font-bold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Join Medical Camps
        </button>
      </section>

    </div>
  );
}
