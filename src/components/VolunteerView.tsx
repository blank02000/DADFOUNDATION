/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useFirebase } from './FirebaseProvider';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { VolunteerStatus } from '../types';
import { Users, CheckCircle2, AlertTriangle, Send, Heart, Award, ShieldAlert } from 'lucide-react';

export function VolunteerView() {
  const { user, login } = useFirebase();

  // Volunteer Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [areas, setAreas] = useState('Medical Helper Camp');

  // Request State
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const opportunities = [
    { title: 'Therapeutic Helper', desc: 'Assist professional physical therapists during sensory and posture recovery workshops.', timeline: 'Saturdays, weekly' },
    { title: 'Remote Clinic Companion', desc: 'Represent the foundation and assist visiting children with custom mobility aids.', timeline: 'Monthly mobile camps' },
    { title: 'Creative Educator Desk', desc: 'Direct inclusive interactive developmental painting and drawing tasks.', timeline: 'Flexible scheduling' },
    { title: 'Patient Admin Records', desc: 'Support basic clinical record tracking under strict zero-trust privacy compliance.', timeline: 'Weekdays' }
  ];

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setStatus('err');
      setErrMsg('Authentication required. Please sign in via Google to proceed.');
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim() || !skills.trim()) {
      setStatus('err');
      setErrMsg('Please complete the Application Form correctly.');
      return;
    }

    setStatus('loading');
    const path = `volunteers`;
    try {
      await addDoc(collection(db, path), {
        userId: user.uid,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        skills: skills.trim(),
        areasOfInterest: areas,
        status: VolunteerStatus.PENDING,
        hoursContributed: 0,
        appliedAt: serverTimestamp()
      });
      setStatus('success');
      setName('');
      setSkills('');
      setPhone('');
    } catch (err) {
      console.error(err);
      setStatus('err');
      setErrMsg('Failed to submit application. Vetting rules rejected payload.');
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (logErr) {
        // Handled
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-16 pb-20 font-sans">
      
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">Serve The Community</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2240] tracking-tight">Become a Champion of Hope</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          Unlock your talent, professional medical training, or digital skills to empower our core clinical rehabilitation pillars and restore dignity.
        </p>
      </section>

      {/* Grid: Opportunities list vs Register form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Open Opportunities */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="text-lg font-extrabold text-[#0A2240] tracking-tight flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Users className="w-5 h-5 text-[#1B7330]" /> Open Voluntarism Opportunities
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {opportunities.map((op, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-150 shadow-xs space-y-2">
                <span className="bg-[#1B7330]/10 text-[#1B7330] px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase">
                  {op.timeline}
                </span>
                <h3 className="text-base font-extrabold text-[#0A2240]">{op.title}</h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">{op.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-6 bg-white border border-slate-150 rounded-[32px] p-8 shadow-xs space-y-6">
          <h2 className="text-lg font-extrabold text-[#0A2240] tracking-tight flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Award className="w-5 h-5 text-[#1B7330]" /> Submit Volunteer Vetting Application
          </h2>

          {!user ? (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-4">
              <ShieldAlert className="w-10 h-10 text-[#1B7330] mx-auto" />
              <p className="text-xs font-semibold text-slate-500">
                You must login securely with Google to register for volunteer options.
              </p>
              <button 
                onClick={login}
                className="bg-[#1B7330] hover:bg-[#145A24] text-white px-6 py-2.5 rounded-full font-bold text-xs transition-colors cursor-pointer"
              >
                Sign In With Google
              </button>
            </div>
          ) : (
            <>
              {status === 'success' && (
                <div className="bg-[#1B7330]/10 text-[#1B7330] p-6 rounded-2xl border border-[#1B7330]/20 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#1B7330] mx-auto" />
                  <p className="text-sm font-bold">Resilience Call Registered Successful!</p>
                  <p className="text-xs text-slate-500">
                    Your profile will be reviewed by Dr Jenkins &amp; Marcus Thorne. Check back soon for administrative approval!
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-2 bg-[#0A2240] hover:bg-[#06162b] text-white py-2 px-4 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              )}

              {status === 'err' && (
                <div className="bg-rose-50 text-rose-800 p-4 rounded-2xl border border-rose-100 text-center space-y-2">
                  <AlertTriangle className="w-6 h-6 text-rose-600 mx-auto" />
                  <p className="text-xs font-bold">{errMsg}</p>
                  <button onClick={() => setStatus('idle')} className="text-xs font-bold underline cursor-pointer">
                    Try Again
                  </button>
                </div>
              )}

              {['idle', 'loading'].includes(status) && (
                <form onSubmit={handleApply} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none focus:border-[#1B7330]/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400">Direct Email</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@gmail.com"
                        className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none focus:border-[#1B7330]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400">Mobile Contact</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 90000 00000"
                        className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none focus:border-[#1B7330]/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400">Preferred Segment</label>
                      <select 
                        value={areas}
                        onChange={(e) => setAreas(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-xl text-[11px] font-semibold text-[#0A2240] outline-none"
                      >
                        <option value="Physical Therapy Clinic helper">Physical Therapy Clinic helper</option>
                        <option value="Maternal Camp operations setup">Maternal Camp operations setup</option>
                        <option value="Pediatric interaction aide">Pediatric interaction aide</option>
                        <option value="Digital resource hub management">Digital resource hub management</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">List Relevant Skills / Experience</label>
                    <textarea 
                      required
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Explain your medical backgrounds, computer qualifications, or general non-profit helper experiences..."
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none resize-none focus:border-[#1B7330]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#1B7330] hover:bg-[#145A24] text-white py-3 rounded-full font-bold text-xs transition-transform flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {status === 'loading' ? 'Submitting Form...' : 'Submit Application Details'}
                  </button>
                </form>
              )}
            </>
          )}
        </div>

      </section>

      {/* Volunteer Governance Transparent declaration */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex items-start gap-4">
        <Heart className="w-6 h-6 text-[#1B7330] shrink-0 mt-0.5 fill-[#1B7330]/10" />
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-[#0A2240]">Operational Vetting Standard</h3>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">
            All volunteer operations undergo complete validation from our head of operations to satisfy standard non-profit safety parameters. Approved volunteers will receive physical badges and can register hours internally within the Admin board.
          </p>
        </div>
      </section>

    </div>
  );
}
