/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Heart, 
  Users2, 
  Star, 
  Sparkles, 
  Stethoscope, 
  Activity, 
  Brain, 
  Smile, 
  Compass, 
  GraduationCap, 
  HeartHandshake, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { SAMPLE_STORIES } from '../sampleData';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export function HomeView({ setCurrentTab }: HomeViewProps) {
  const serviceCards = [
    {
      title: 'Medical Support',
      desc: 'Comprehensive healthcare, diagnostics, treatments and ongoing health management.',
      icon: Stethoscope,
      bg: 'bg-[#1B7330]/10 text-[#1B7330]',
      border: 'border-[#1B7330]/20'
    },
    {
      title: 'Surgical Support',
      desc: 'Advanced surgical interventions to improve mobility, function and quality of life.',
      icon: Activity,
      bg: 'bg-blue-50 text-blue-600',
      border: 'border-blue-100'
    },
    {
      title: 'Therapy & Rehabilitation',
      desc: 'Physiotherapy, occupational therapy, speech therapy and sensory integration for better independence.',
      icon: HeartHandshake,
      bg: 'bg-[#008080]/10 text-[#008080]',
      border: 'border-[#008080]/20'
    },
    {
      title: 'Emotional Wellness',
      desc: 'Counseling, mental health support and emotional resilience for all age groups.',
      icon: Brain,
      bg: 'bg-purple-50 text-purple-600',
      border: 'border-purple-100'
    },
    {
      title: 'Education & Skills',
      desc: 'Inclusive education, life skills training and vocational development for a brighter future.',
      icon: GraduationCap,
      bg: 'bg-amber-50 text-amber-600',
      border: 'border-amber-100'
    },
    {
      title: 'Community & Inclusion',
      desc: 'Building awareness, creating opportunities and fostering an inclusive and accessible society.',
      icon: Users2,
      bg: 'bg-rose-50 text-rose-600',
      border: 'border-rose-100'
    },
    {
      title: 'Family Support',
      desc: 'Guidance, resources and support for families and caregivers at every stage.',
      icon: Heart,
      bg: 'bg-sky-50 text-sky-600',
      border: 'border-sky-100'
    }
  ];

  return (
    <div className="pb-20 font-sans space-y-24">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#E6EFE9] to-[#F1F6F2] overflow-hidden min-h-[640px] flex items-center">
        {/* Abstract shapes matching the clean curves in the image */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-[#1B7330]/5 rounded-bl-[120px] -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/40 rounded-full blur-2xl -z-10" />

        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-[#1B7330]/10 text-[#1B7330] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> 80G Certified Non-Profit Organization
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[#0A2240]">
              Healing Lives, <br />
              <span className="text-[#1B7330]">Empowering Abilities</span>
            </h1>

            {/* Cursive italic script matching the image */}
            <p className="font-script text-3xl text-[#1B7330] font-semibold leading-relaxed tracking-wide drop-shadow-xs">
              Supporting Every Ability, Every Age
            </p>

            <div className="flex items-center gap-3 py-1">
              <span className="h-1 w-8 bg-[#1B7330] rounded-full" />
              <Heart className="w-4 h-4 text-[#1B7330] fill-[#1B7330]" />
              <span className="h-1 w-8 bg-[#1B7330] rounded-full" />
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-xl font-medium">
              DAD Foundation provides holistic healthcare, rehabilitation, emotional wellness, and lifelong support for differently abled children, adults and seniors—helping every individual live with dignity, independence, and hope.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => setCurrentTab('donation')}
                className="bg-[#0A2240] hover:bg-[#06162b] text-white px-8 py-3.5 rounded-full font-bold text-xs md:text-sm shadow-md hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-white fill-transparent" />
                Explore Our Services
              </button>
              <button 
                onClick={() => setCurrentTab('volunteer')}
                className="bg-white border border-[#1B7330] text-[#1B7330] hover:bg-[#1B7330]/5 px-8 py-3.5 rounded-full font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Users2 className="w-4 h-4" />
                Get Involved
              </button>
            </div>
          </div>

          {/* Hero Right Media with curvy mask and overlapping card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md md:max-w-xl">
              
              {/* Photo component with custom curved mask */}
              <div className="relative overflow-hidden aspect-[4/3] rounded-[48px] shadow-2xl border-4 border-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAiue9ph1BoQj_L9c7UDHcRKV00SmZUbIi9uCssqaH5Yav56hw8HzZGbsRYv76VgR9eHdudnKaqgtgdvE1sGRW6yFmhmKFXyNDXO7elmoXs9qYo42wgT7jE6efctEfXKoAb4XoEjqjVXMYm_fSqgRIz-eD_UcwONd1sz8BBTEJGJiTIaQHbf_9Co-Kh3O6f_Eq7h8i2OjLknP2tcOR-eyUAIgHCoFKwimKzfkWiaa9QZ9YRoT4uGSfEs0OkqPzzp9req0Ndpief5sY" 
                  alt="Inclusive healthcare patient child smiling with therapist" 
                  className="w-full h-full object-cover"
                />
                
                {/* Wavy bottom decorative overlay matching the screenshot */}
                <div className="absolute -bottom-1 left-0 right-0 h-10 bg-[#F1F6F2] opacity-70 filter blur-xs" />
              </div>

              {/* Overlapping dark blue card with green tagline */}
              <div className="absolute -bottom-8 -left-4 md:-left-8 bg-[#0A2240] text-white p-6 md:p-8 rounded-3xl max-w-[280px] md:max-w-[320px] shadow-2xl space-y-3 border border-white/10 z-20">
                <h3 className="font-extrabold text-sm md:text-base tracking-tight border-b border-white/10 pb-2">
                  Holistic health care.
                </h3>
                <ul className="space-y-1 md:space-y-1.5 text-xs text-slate-300 font-semibold">
                  <li className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#1B7330]" /> Every individual.</li>
                  <li className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#1B7330]" /> Every ability.</li>
                  <li className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#1B7330]" /> Every age.</li>
                </ul>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-[#9DDF8C] font-extrabold text-xs md:text-sm tracking-wide bg-[#1B7330]/20 px-2.5 py-1 rounded">
                    Every life matters.
                  </span>
                  <Heart className="w-4 h-4 text-[#1B7330] fill-[#1B7330]" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Hero Icon Circles Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center gap-2.5">
            <div className="p-3 bg-[#1B7330]/10 rounded-full text-[#1B7330] scale-105">
              <Heart className="w-6 h-6 fill-[#1B7330]/20" />
            </div>
            <h4 className="text-sm font-extrabold text-[#0A2240]">Holistic Care</h4>
            <p className="text-[11px] font-semibold text-slate-400">Mind, Body & Spirit</p>
          </div>

          <div className="flex flex-col items-center text-center gap-2.5">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600 scale-105">
              <Users2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-[#0A2240]">Inclusive</h4>
            <p className="text-[11px] font-semibold text-slate-400">for All Ages</p>
          </div>

          <div className="flex flex-col items-center text-center gap-2.5">
            <div className="p-3 bg-indigo-50 rounded-full text-indigo-600 scale-105">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-[#0A2240]">Empowerment</h4>
            <p className="text-[11px] font-semibold text-slate-400">Through Dignity</p>
          </div>

          <div className="flex flex-col items-center text-center gap-2.5">
            <div className="p-3 bg-amber-50 rounded-full text-amber-600 scale-105">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-[#0A2240]">Compassion</h4>
            <p className="text-[11px] font-semibold text-slate-400">Every Step</p>
          </div>

        </div>
      </section>

      {/* Mission Section (Copy and Data verbatim from image screenshot) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-14 shadow-sm space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">
                Our Mission
              </span>
              <h2 className="text-2xl md:text-3.5xl font-extrabold text-[#0A2240] tracking-tight leading-tight">
                Holistic Care. Whole Person. Better Tomorrow.
              </h2>
            </div>
            <div>
              <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                We take a holistic approach that nurtures the physical, mental, emotional, and social well-being of every individual. From children to adults and seniors, our care is personalized, compassionate, and focused on helping each person thrive in life.
              </p>
            </div>
          </div>

          {/* 5 pillars with icons */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 pt-4 border-t border-slate-100">
            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0A2240]">Physical Well-being</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-[#1B7330]/10 rounded-full text-[#1B7330]">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0A2240]">Mental Well-being</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-red-50 rounded-full text-red-500">
                <Heart className="w-5 h-5 fill-red-50" />
              </div>
              <span className="text-xs font-bold text-[#0A2240]">Emotional Well-being</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <Users2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0A2240]">Social Well-being</span>
            </div>

            <div className="flex flex-col items-center text-center gap-2.5 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#0A2240]">Life Skills & Independence</span>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button 
              onClick={() => setCurrentTab('about')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-300 text-[#0A2240] rounded-full font-bold text-xs transition-colors cursor-pointer"
            >
              Learn More About Us <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Services Grid (7 items from image) */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">
              Commitment
            </span>
            <h2 className="text-3xl font-extrabold text-[#0A2240] tracking-tight">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((s, index) => {
              const Icon = s.icon;
              return (
                <div 
                  key={index}
                  onClick={() => setCurrentTab('programs')}
                  className={`bg-white rounded-3xl p-6 border ${s.border} shadow-xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer space-y-4`}
                >
                  <div className="space-y-4">
                    <div className={`p-3 rounded-2xl w-fit ${s.bg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-[#0A2240] tracking-tight group-hover:text-[#1B7330] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] font-extrabold uppercase tracking-wider text-[#1B7330] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1B7330]">
            Empowering Journeys
          </span>
          <h2 className="text-3xl font-extrabold text-[#0A2240] tracking-tight">
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
                className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-[#1B7330]/10 shrink-0" 
              />
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase text-[#1B7330] bg-[#1B7330]/15 px-2.5 py-1 rounded-full">
                  {st.context}
                </span>
                <h3 className="text-lg font-bold text-[#0A2240] font-sans">{st.title}</h3>
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

      {/* Bottom combined banner matching verbatim footer design of the screenshot */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1B7330] rounded-[36px] p-8 md:p-12 text-white relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left element: hand-heart shape illustration / info */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="p-4 bg-white/10 rounded-full scale-110">
                <HeartHandshake className="w-8 h-8 text-white fill-transparent" />
              </div>
              <h3 className="font-extrabold text-lg md:text-xl leading-snug tracking-tight text-white max-w-xs">
                Together, we can create a world where every ability is valued and every life thrives.
              </h3>
            </div>

            {/* Middle element: the solid CTA blocks */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center items-center">
              <button 
                onClick={() => setCurrentTab('donation')}
                className="bg-white text-[#1B7330] hover:bg-slate-50 w-full max-w-[210px] py-3 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-[#1B7330] fill-transparent" />
                Donate Now
              </button>
              <button 
                onClick={() => setCurrentTab('volunteer')}
                className="border border-white/40 hover:border-white/80 hover:bg-white/5 text-white w-full max-w-[210px] py-3 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <Users2 className="w-3.5 h-3.5" />
                Get Involved
              </button>
            </div>

            {/* Right element: detailed explanation */}
            <div className="lg:col-span-4 space-y-2 text-center lg:text-left">
              <p className="text-xs md:text-sm font-semibold text-emerald-100 leading-relaxed">
                Your support helps us provide holistic care and opportunities for differently abled children, adults and seniors.
              </p>
              <div className="flex justify-center lg:justify-start">
                <Heart className="w-4 h-4 text-emerald-300 fill-transparent" />
              </div>
            </div>

          </div>

          {/* Abstract green background bubble overlay */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        </div>
      </section>

    </div>
  );
}
