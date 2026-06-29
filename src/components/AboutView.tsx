/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SAMPLE_TEAM } from '../sampleData';
import { Award, Target, Calendar, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
}

export function AboutView({ setCurrentTab }: AboutViewProps) {
  const milestones = [
    { year: '1994', title: 'Registration & On-the-ground clinics', desc: 'The DAD Foundation registered its first mobile health van serving rural sectors.' },
    { year: '2005', title: '50-Bed Specialty Healthcare Center', desc: 'Established dedicated maternity and infant developmental pediatric wards.' },
    { year: '2018', title: '1 Million Beneficiaries Reached', desc: 'Sustained full integration across multiple states supporting complex corrective orthopedic programs.' },
    { year: '2026', title: 'Radical Open-book Auditing', desc: 'Delivered an interactive transparency model tracking 92% direct field funds allocation.' }
  ];

  return (
    <div className="space-y-20 pb-20 max-w-7xl mx-auto px-6 font-sans">
      
      {/* Intro Heritage */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3 py-1 rounded-full">Our Heritage</span>
        <h1 className="text-4xl font-extrabold text-[#0A2E5C] tracking-tight">DAD Foundation Story</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          From a tiny single-clinic corridor, the DAD Foundation has stood as a bastion of safety, medicine, and human dignity for differently abled individuals of all ages.
        </p>
      </section>

      {/* Story Details Bento elements */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-[#0A2E5C] tracking-tight">Our Mission &amp; Purpose</h2>
          <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
            Our mission is simple: to deliver complete holistic healthcare models, therapy supports, mental wellness setups, and developmental aid completely cost-free, enabling vulnerable individuals to live with ultimate hope and independence.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 border border-slate-100 rounded-3xl space-y-3 bg-white shadow-xs">
              <div className="text-[#0066CC] font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                <Target className="w-4 h-4 text-[#0066CC]" /> Vision Link
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
                A world where every physical disability is met with advanced surgical solutions and caring hearts.
              </p>
            </div>
            <div className="p-6 border border-slate-100 rounded-3xl space-y-3 bg-white shadow-xs">
              <div className="text-[#129E36] font-bold flex items-center gap-2 text-xs uppercase tracking-widest">
                <Award className="w-4 h-4 text-[#129E36]" /> Integrity Standard
              </div>
              <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
                92% of funds directly support families, verified through publicly downloadable annual audits.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[340px] rounded-3xl overflow-hidden shadow-sm border border-slate-150">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjLFLwvfg2fy92u6jLGWjZl1HFSOYQ0DsBgY6D4WOA__uzXIlwGXo4ZvteIH9rz5IrpgJLiC7zyef0JRtud4G64HtoSk3Rei2p_3NI-C8WvtWU4yWoKKbHHoSnMajHUkDO34wjbVxTXyCuTvZfT1vixq-b55XvCd5s_FEYP9ZcAvXnBmDmjQvWhb6AV-ksFDHkoHpZ1aH5E-LArS--J79UgqHfMgaceqjHAcJsVzi6riGvr7_N7Mobb_KZZgUqfZEshxAY9klhLunQ" 
            alt="Wheelchair kid with caregiver" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Timeline of Progress */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-[#0A2E5C] tracking-tight">Our Journey of Impact</h2>
          <p className="text-xs font-semibold text-slate-500">Tracing key historical steps over thirty years.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-extrabold text-[#0066CC]">{m.year}</span>
                <Calendar className="w-4 h-4 text-[#0066CC]" />
              </div>
              <h3 className="text-sm font-extrabold text-[#0A2E5C]">{m.title}</h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team Directory */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2 font-sans">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-2.5 py-1 rounded-full">Leadership</span>
          <h2 className="text-3xl font-extrabold text-[#0A2E5C] tracking-tight">Meet the Visionaries</h2>
          <p className="text-xs font-semibold text-slate-500">Our dedicated board members and healthcare coordinators</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SAMPLE_TEAM.map((tm, keyId) => (
            <div key={keyId} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-64 overflow-hidden relative bg-slate-50">
                <img src={tm.image} alt={tm.name} className="w-full h-full object-cover filter brightness-[0.98] contrast-[1.02]" />
              </div>
              <div className="p-6 text-center space-y-1">
                <h4 className="text-base font-extrabold text-[#0A2E5C]">{tm.name}</h4>
                <p className="text-xs font-bold text-[#129E36] uppercase tracking-widest">{tm.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Transparency Callout */}
      <section className="bg-[#129E36]/5 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#129E36]/10">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-lg font-extrabold text-[#0A2E5C] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#129E36]" /> Radical Financial Honesty
          </h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            As a public charity, we commit to audit clearances. Download our 80G documentation, IRS equivalent compliance frameworks, and certified expenditure metrics directly on our Knowledge Library tab.
          </p>
        </div>
        <button 
          onClick={() => setCurrentTab('resources')}
          className="bg-[#0A2E5C] text-white hover:bg-[#0066CC] px-6 py-3.5 rounded-full font-bold text-xs transition-colors cursor-pointer shrink-0 whitespace-nowrap hover:scale-[1.02]"
        >
          View Governance Audits
        </button>
      </section>

    </div>
  );
}
