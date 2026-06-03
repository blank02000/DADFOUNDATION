/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SAMPLE_STORIES } from '../sampleData';
import { Sparkles, Quote, CheckCircle } from 'lucide-react';

export function SuccessStoriesView() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-16 pb-20 font-sans">
      
      {/* Intro Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">Our Impact Metrics</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2240] tracking-tight">Stories of Real Resilience</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          Witness the powerful human outcomes made possible through global sponsorship, expert clinical pediatric surgeries, and relentless rehab loops.
        </p>
      </section>

      {/* Grid: Detailed Stories cards */}
      <section className="grid grid-cols-1 gap-12">
        {SAMPLE_STORIES.map((st, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-xs flex flex-col lg:flex-row gap-10 items-center hover:shadow-sm transition-shadow"
          >
            {/* Visual Frame */}
            <div className="w-full lg:w-96 h-64 lg:h-80 rounded-3xl overflow-hidden relative shrink-0 border border-slate-100">
              <img src={st.image} alt={st.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-[#0A2240]/90 text-[#9DDF8C] text-[9.5px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10">
                {st.context}
              </div>
            </div>

            {/* Stories Text Content details */}
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-[#1B7330] tracking-widest block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#1B7330]" /> Corrective Surgery Milestone Cases
                </span>
                <h2 className="text-2xl md:text-3.5xl font-extrabold text-[#0A2240] tracking-tight font-sans">{st.title}</h2>
              </div>
              
              <div className="relative pl-6 border-l-4 border-[#1B7330]/40">
                <Quote className="w-8 h-8 text-[#1B7330]/10 absolute -left-2 -top-4 -z-10" />
                <p className="text-sm font-bold text-slate-800 italic leading-relaxed">
                  {st.quote}
                </p>
              </div>

              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                {st.description}
              </p>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3 text-[#1B7330]">
                <CheckCircle className="w-5 h-5 shrink-0 text-[#1B7330]" />
                <span className="text-[11px] font-bold text-slate-500">
                  Case authenticated by DAD Foundation clinical panel with explicit guardian consent.
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
}
