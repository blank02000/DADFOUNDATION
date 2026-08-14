/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAMPLE_SERVICES } from '../sampleData';
import { 
  Stethoscope, 
  Activity, 
  Heart, 
  Users2, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';

interface ProgramsViewProps {
  setCurrentTab: (tab: string) => void;
}

export function ProgramsView({ setCurrentTab }: ProgramsViewProps) {
  const [selectedService, setSelectedService] = useState<typeof SAMPLE_SERVICES[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = SAMPLE_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.id === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-6 font-sans">
      
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3.5 py-1 rounded-full">
          Comprehensive Clinical &amp; Community Care
        </span>
        <h1 className="text-3.5xl md:text-5xl font-extrabold text-[#0A2E5C] tracking-tight">
          Our Services &amp; Programs
        </h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          Holistic healthcare, pediatric early intervention, specialized disability rehabilitation, geriatric elder support, and grassroots community outreach.
        </p>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#0A2E5C] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Services ({SAMPLE_SERVICES.length})
            </button>
            {SAMPLE_SERVICES.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedCategory(s.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === s.id
                    ? 'bg-[#0A2E5C] text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{s.emoji}</span>
                <span>{s.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search therapy, cleft, camps..."
              className="w-full bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#129E36]"
            />
          </div>

        </div>
      </section>

      {/* Services Grid list cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredServices.map((s) => (
          <div 
            key={s.id} 
            className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-6 md:p-8 group space-y-6"
          >
            <div className="space-y-6">
              
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2.5 bg-slate-50 rounded-2xl border border-slate-100">{s.emoji}</span>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#129E36]">
                      {s.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-extrabold text-[#0A2E5C] tracking-tight group-hover:text-[#129E36] transition-colors">
                      {s.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Photo & Description snippet */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shrink-0">
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="sm:col-span-8">
                  <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </div>

              {/* Bulleted List of Services */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Capabilities &amp; Interventions ({s.items.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {s.items.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-50/70 p-2.5 rounded-xl border border-slate-100/80 flex items-start gap-2 text-xs font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#129E36] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom action row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setSelectedService(s)}
                className="text-xs font-bold text-[#0066CC] hover:text-[#0A2E5C] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Full Clinical Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0066CC]" />
              </button>

              <button 
                onClick={() => setCurrentTab('donation')}
                className="bg-[#129E36] hover:bg-[#0E7F2B] text-white px-5 py-2 rounded-full text-xs font-bold shadow-xs hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Heart className="w-3 h-3 text-white fill-white" />
                <span>Sponsor Care</span>
              </button>
            </div>

          </div>
        ))}
      </section>

      {/* Specialty Programs Expansion Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-[32px] max-w-2xl w-full p-8 space-y-6 shadow-2xl relative border border-slate-100 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedService.emoji}</span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#129E36]">
                    {selectedService.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0A2E5C]">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              {selectedService.details}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A2E5C]">
                All Programs Included in this Division:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2 text-xs font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#129E36] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F0F7FF] p-4 rounded-2xl border border-[#0066CC]/15 space-y-1.5 text-xs text-slate-600">
              <p className="font-bold text-[#0A2E5C] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0066CC]" /> Quality &amp; Transparency Assurance
              </p>
              <p className="text-[11px] text-slate-500">
                All procedures and rehabilitation treatments are overseen by certified medical specialists, therapists, and community health officers under DAD Foundation's verified 80G non-profit charter.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setSelectedService(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-xs font-bold cursor-pointer transition-colors"
              >
                Close Window
              </button>
              <button 
                onClick={() => {
                  setSelectedService(null);
                  setCurrentTab('donation');
                }}
                className="px-6 py-2.5 bg-[#129E36] hover:bg-[#0E7F2B] text-white rounded-full text-xs font-bold cursor-pointer transition-all shadow-sm flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
                Sponsor this Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Volunteer / Consultation banner */}
      <section className="bg-gradient-to-r from-[#0A2E5C] to-[#0066CC] rounded-[32px] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        <div className="max-w-xl space-y-2 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#EEF9EE] bg-white/10 px-3 py-1 rounded-full inline-block">
            Medical &amp; Field Outreach
          </span>
          <h3 className="text-xl md:text-2xl font-extrabold text-white">
            Need a Medical Consultation or Want to Join a Camp?
          </h3>
          <p className="text-xs md:text-sm text-sky-100 leading-relaxed font-medium">
            We welcome partner healthcare professionals, therapists, social workers, and enthusiastic volunteers to support our clinical drives.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button 
            onClick={() => setCurrentTab('volunteer')}
            className="bg-[#129E36] hover:bg-[#0E7F2B] text-white px-6 py-3 rounded-full font-bold text-xs transition-all shadow-sm cursor-pointer hover:scale-[1.02]"
          >
            Become a Volunteer
          </button>
          <button 
            onClick={() => setCurrentTab('contact')}
            className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded-full font-bold text-xs transition-colors cursor-pointer"
          >
            Contact Helpdesk
          </button>
        </div>
      </section>

    </div>
  );
}

