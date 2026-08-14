/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  Users2, 
  Star, 
  Sparkles, 
  Stethoscope, 
  Activity, 
  Brain, 
  Compass, 
  HeartHandshake, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Calendar,
  Sparkle
} from 'lucide-react';
import { SAMPLE_STORIES, SAMPLE_SERVICES, TARGET_GROUPS } from '../sampleData';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

// Custom combined Face & Bone anatomical graphic for Physical Well-being
function FaceAndBoneIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {/* Face profile & Craniofacial outline on left */}
      <path d="M12 4C8.5 4 6 7 6 11C6 14.5 7.5 17 9 18.5L9.5 21C9.8 22.5 11 24 13 24.5H15" />
      <path d="M10 11.5H10.01" strokeWidth="3" />
      <path d="M9 15C10 15.5 11.5 15.5 12.5 15" />
      
      {/* Orthopedic Bone / Skeletal element on right */}
      <path d="M22 6C23 6 24 6.8 24 7.8C24 8.5 23.5 9.1 22.8 9.4C23.5 9.7 24 10.3 24 11C24 12 23 12.8 22 12.8L18 13.5L18 18.5L22 19.2C23 19.2 24 20 24 21C24 21.7 23.5 22.3 22.8 22.6C23.5 22.9 24 23.5 24 24.2C24 25.2 23 26 22 26C21 26 20.2 25.2 20.2 24.2C20.2 23.8 20.4 23.4 20.7 23.1L16 22L16 10L20.7 8.9C20.4 8.6 20.2 8.2 20.2 7.8C20.2 6.8 21 6 22 6Z" fill="currentColor" fillOpacity="0.15" />
      
      {/* Joint / Vertebra dot indicator */}
      <circle cx="16" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function HomeView({ setCurrentTab }: HomeViewProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(SAMPLE_SERVICES[0].id);

  return (
    <div className="pb-20 font-sans space-y-20 md:space-y-24">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F0F7FF] via-white to-[#EEF9EE] overflow-hidden min-h-[640px] flex items-center">
        {/* Abstract organic background accents */}
        <div className="absolute top-0 right-0 w-[55%] h-full bg-[#129E36]/5 rounded-bl-[120px] -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#0066CC]/5 rounded-full blur-2xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#129E36]/10 text-[#129E36] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#129E36]" /> 80G Certified Non-Profit Organization
            </div>
            
            <h1 className="text-3.5xl md:text-5xl lg:text-5.5xl font-extrabold tracking-tight leading-[1.12] text-[#0A2E5C]">
              Transforming Lives <br />
              <span className="text-[#129E36]">Through Care,</span> <br />
              <span className="text-[#0066CC]">Rehabilitation &amp; Inclusion</span>
            </h1>

            {/* Cursive italic script */}
            <p className="font-script text-3.5xl text-[#FF8C00] font-semibold leading-relaxed tracking-wide drop-shadow-xs">
              Supporting Every Ability, Every Age
            </p>

            <div className="flex items-center gap-3 py-1">
              <span className="h-1 w-10 bg-[#0066CC] rounded-full" />
              <Heart className="w-4 h-4 text-[#FF8C00] fill-[#FF8C00]" />
              <span className="h-1 w-10 bg-[#129E36] rounded-full" />
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
              DAD Foundation provides holistic healthcare, rehabilitation, emotional wellness, and lifelong support to differently abled children, adults, and senior citizens—helping every individual live with dignity, independence, and hope.
            </p>

            {/* Hero CTA Buttons requested */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setCurrentTab('donation')}
                className="bg-[#129E36] hover:bg-[#0E7F2B] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-white fill-white" />
                Donate Now
              </button>
              
              <button 
                onClick={() => setCurrentTab('volunteer')}
                className="bg-white border-2 border-[#0A2E5C] text-[#0A2E5C] hover:bg-[#0A2E5C]/5 px-8 py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02]"
              >
                <Users2 className="w-4 h-4 text-[#0A2E5C]" />
                Become a Volunteer
              </button>
            </div>

            {/* Explore Services link moved lower in hero */}
            <div className="pt-1">
              <button 
                onClick={() => setCurrentTab('programs')}
                className="text-xs font-bold text-[#0066CC] hover:text-[#0A2E5C] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
              >
                <span>Explore Our Services &amp; Clinical Offerings</span>
                <ChevronRight className="w-4 h-4 text-[#0066CC] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Right Media: Cerebral Palsy Child Therapy Photo */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md md:max-w-xl">
              
              {/* Photo component with authentic pediatric physical therapy */}
              <div className="relative overflow-hidden aspect-[4/3] rounded-[44px] shadow-2xl border-4 border-white bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80" 
                  alt="Pediatric therapist working with a child with cerebral palsy during physical rehabilitation therapy" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Genuine therapy caption badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#129E36] animate-pulse" />
                  <span className="text-[11px] font-bold text-[#0A2E5C]">Cerebral Palsy Therapy &amp; Mobility Session</span>
                </div>

                <div className="absolute -bottom-1 left-0 right-0 h-10 bg-[#F1F6F2] opacity-70 filter blur-xs" />
              </div>

              {/* Overlapping dark blue card */}
              <div className="absolute -bottom-8 -left-4 md:-left-8 bg-[#0A2E5C] text-white p-6 md:p-7 rounded-3xl max-w-[280px] md:max-w-[320px] shadow-2xl space-y-3 border border-white/10 z-20">
                <h3 className="font-extrabold text-sm md:text-base tracking-tight border-b border-white/10 pb-2">
                  Holistic Healthcare.
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300 font-semibold">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#0066CC]" /> 👶 Differently abled children</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#129E36]" /> ♿ Persons with disabilities</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" /> 👨 Adults in rehabilitation</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 👴 Senior citizens &amp; healthy ageing</li>
                </ul>
                <div className="pt-1 flex justify-between items-center">
                  <span className="text-[#EEF9EE] font-extrabold text-xs tracking-wide bg-[#129E36]/30 px-2.5 py-1 rounded">
                    Every life matters.
                  </span>
                  <Heart className="w-4 h-4 text-[#FF8C00] fill-[#FF8C00]" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Target Focus Groups Section - Fast mission understanding */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3.5 py-1 rounded-full">
            Who We Serve
          </span>
          <h2 className="text-2xl md:text-3.5xl font-extrabold text-[#0A2E5C] tracking-tight">
            Empowering Every Stage of Life &amp; Ability
          </h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500">
            Dedicated clinical programs and compassionate support tailored to the unique journey of each community we touch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TARGET_GROUPS.map((group) => (
            <div 
              key={group.id}
              onClick={() => setCurrentTab('programs')}
              className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src={group.image} 
                    alt={group.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm text-sm font-bold flex items-center gap-1.5 text-[#0A2E5C]">
                    <span>{group.emoji}</span>
                    <span className="text-xs">{group.title}</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block ${group.tagColor}`}>
                    {group.subtitle}
                  </span>
                  <h3 className="font-extrabold text-[#0A2E5C] text-base group-hover:text-[#129E36] transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <div className="text-xs font-bold text-[#0066CC] group-hover:text-[#0A2E5C] inline-flex items-center gap-1">
                  View Programs <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Holistic Care & 5 Pillars of Mission (with Face & Bone anatomical graphic in Physical Well-being) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-14 shadow-sm space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3 py-1 rounded-full">
                Our Mission
              </span>
              <h2 className="text-2xl md:text-3.5xl font-extrabold text-[#0A2E5C] tracking-tight leading-tight">
                Holistic Care. Whole Person. Better Tomorrow.
              </h2>
            </div>
            <div>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                We take a holistic approach that nurtures the physical, mental, emotional, and social well-being of every individual. From children to adults and seniors, our care is personalized, compassionate, and focused on helping each person thrive in life.
              </p>
            </div>
          </div>

          {/* 5 pillars with custom anatomical graphics */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 pt-4 border-t border-slate-100">
            
            {/* Physical Well-being with Craniofacial & Bone/Skeletal Anatomy Graphic */}
            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-[#0066CC]/5 transition-colors border border-slate-100/80">
              <div className="p-3.5 bg-[#0066CC]/10 rounded-full text-[#0066CC]">
                <FaceAndBoneIcon className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-[#0A2E5C]">Physical Well-being</span>
              <span className="text-[10px] font-semibold text-slate-500">Craniofacial &amp; Orthopedic Bone Care</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-[#129E36]/5 transition-colors border border-slate-100/80">
              <div className="p-3.5 bg-[#129E36]/10 rounded-full text-[#129E36]">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-[#0A2E5C]">Mental Well-being</span>
              <span className="text-[10px] font-semibold text-slate-500">Cognitive &amp; Autism Support</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-[#FF8C00]/5 transition-colors border border-slate-100/80">
              <div className="p-3.5 bg-[#FF8C00]/10 rounded-full text-[#FF8C00]">
                <Heart className="w-6 h-6 fill-[#FF8C00]/20" />
              </div>
              <span className="text-xs font-extrabold text-[#0A2E5C]">Emotional Well-being</span>
              <span className="text-[10px] font-semibold text-slate-500">Counseling &amp; Family Care</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-[#0066CC]/5 transition-colors border border-slate-100/80">
              <div className="p-3.5 bg-[#0066CC]/10 rounded-full text-[#0066CC]">
                <Users2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-[#0A2E5C]">Social Well-being</span>
              <span className="text-[10px] font-semibold text-slate-500">Community &amp; Inclusive Circles</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl bg-slate-50/70 hover:bg-amber-50 transition-colors border border-slate-100/80">
              <div className="p-3.5 bg-amber-50 rounded-full text-amber-600">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold text-[#0A2E5C]">Life Skills &amp; Independence</span>
              <span className="text-[10px] font-semibold text-slate-500">Assistive Devices &amp; Autonomy</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button 
              onClick={() => setCurrentTab('about')}
              className="inline-flex items-center gap-2 px-7 py-3 bg-slate-50 border border-slate-200 hover:border-slate-350 text-[#0A2E5C] rounded-full font-bold text-xs transition-all cursor-pointer hover:scale-[1.01]"
            >
              Learn More About Our Philosophy <ChevronRight className="w-4 h-4 text-[#0A2E5C]" />
            </button>
          </div>

        </div>
      </section>

      {/* Comprehensive Services Section (Structured by the 4 required categories with all bullet points) */}
      <section className="bg-slate-50/90 border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3.5 py-1 rounded-full">
              Full Spectrum Support
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A2E5C] tracking-tight">Our Services</h2>
            <p className="text-xs md:text-sm font-semibold text-slate-500">
              Dedicated medical screenings, multi-disciplinary therapy, pediatric intervention, elder care, and outreach initiatives.
            </p>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {SAMPLE_SERVICES.map((srv) => {
              const isSelected = activeCategoryTab === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveCategoryTab(srv.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                    isSelected 
                      ? 'bg-[#0A2E5C] text-white shadow-md scale-[1.02]' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span>{srv.emoji}</span>
                  <span>{srv.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Deep Dive */}
          {(() => {
            const currentService = SAMPLE_SERVICES.find(s => s.id === activeCategoryTab) || SAMPLE_SERVICES[0];
            return (
              <div className="bg-white rounded-3xl border border-slate-100 p-8 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-5 space-y-5">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-100 shadow-sm">
                    <img 
                      src={currentService.image} 
                      alt={currentService.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0A2E5C]/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                      <span>{currentService.emoji}</span>
                      <span>{currentService.category}</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                    {currentService.description}
                  </p>

                  <div className="pt-2">
                    <button 
                      onClick={() => setCurrentTab('programs')}
                      className="bg-[#129E36] hover:bg-[#0E7F2B] text-white px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Explore In Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Specific Service Bullet Points requested verbatim */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-xl md:text-2xl font-extrabold text-[#0A2E5C] tracking-tight">
                    {currentService.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentService.items.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-slate-50/80 hover:bg-[#129E36]/5 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-3 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#129E36] shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-slate-700 leading-snug">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })()}

          {/* All 4 Services Grid for complete visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {SAMPLE_SERVICES.map((srv) => (
              <div 
                key={srv.id}
                onClick={() => {
                  setActiveCategoryTab(srv.id);
                  setCurrentTab('programs');
                }}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{srv.emoji}</span>
                    <span className="text-[10px] font-extrabold uppercase text-[#129E36] bg-[#129E36]/10 px-2.5 py-0.5 rounded-full">
                      {srv.items.length} Programs
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#0A2E5C] text-sm group-hover:text-[#129E36] transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <ul className="space-y-1 text-[11px] font-semibold text-slate-500">
                    {srv.items.slice(0, 3).map((it, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <div className="w-1 h-1 rounded-full bg-[#129E36]" />
                        <span className="truncate">{it}</span>
                      </li>
                    ))}
                    {srv.items.length > 3 && (
                      <li className="text-[10px] text-[#0066CC] font-bold pt-1">
                        + {srv.items.length - 3} more programs...
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-2 text-[11px] font-extrabold uppercase tracking-wider text-[#0066CC] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Full Category <ChevronRight className="w-3.5 h-3.5 text-[#0066CC]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3 py-1 rounded-full">
            Empowering Journeys
          </span>
          <h2 className="text-3xl font-extrabold text-[#0A2E5C] tracking-tight">
            Stories of Hope &amp; Transition
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {SAMPLE_STORIES.map((st, i) => (
            <div 
              key={i} 
              className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-xs hover:shadow-sm transition-shadow flex flex-col md:flex-row gap-6 items-center"
            >
              <img 
                src={st.image} 
                alt={st.title} 
                referrerPolicy="no-referrer"
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#129E36]/10 shrink-0" 
              />
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase text-[#129E36] bg-[#129E36]/15 px-2.5 py-1 rounded-full">
                  {st.context}
                </span>
                <h3 className="text-lg font-bold text-[#0A2E5C] font-sans">{st.title}</h3>
                <p className="text-xs font-bold italic text-slate-650 leading-relaxed">
                  "{st.quote}"
                </p>
                <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#0A2E5C] rounded-[36px] p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left element: hand-heart shape illustration / info */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-full scale-110">
                <HeartHandshake className="w-8 h-8 text-[#FF8C00] fill-transparent" />
              </div>
              <h3 className="font-extrabold text-lg md:text-xl leading-snug tracking-tight text-white max-w-xs">
                Together, we can create a world where every ability is valued and every life thrives.
              </h3>
            </div>

            {/* Middle element: the solid CTA blocks */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-center">
              <button 
                onClick={() => setCurrentTab('donation')}
                className="bg-[#129E36] hover:bg-[#0E7F2B] text-white w-full max-w-[220px] py-3.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-white fill-white" />
                Donate Now
              </button>
              <button 
                onClick={() => setCurrentTab('volunteer')}
                className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white w-full max-w-[220px] py-3.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <Users2 className="w-3.5 h-3.5 text-white" />
                Become a Volunteer
              </button>
            </div>

            {/* Right element: detailed explanation */}
            <div className="lg:col-span-4 space-y-2 text-center lg:text-left">
              <p className="text-xs md:text-sm font-semibold text-sky-100 leading-relaxed">
                Your support helps us provide holistic care and opportunities for differently abled children, adults and senior citizens.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Heart className="w-4 h-4 text-[#FF8C00] fill-[#FF8C00]" />
              </div>
            </div>

          </div>

          {/* Abstract background blur accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#129E36]/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0066CC]/10 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none" />
        </div>
      </section>

    </div>
  );
}
