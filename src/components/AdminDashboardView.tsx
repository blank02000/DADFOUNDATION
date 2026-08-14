/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useFirebase } from './FirebaseProvider';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Donation, Volunteer, VolunteerStatus } from '../types';
import { Heart, Users, CheckCircle, XCircle, ShieldAlert, Award, BarChart3, Database } from 'lucide-react';

export function AdminDashboardView() {
  const { user, isAdmin } = useFirebase();

  // Firestore Collections State
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states to create fresh blogs
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('Healthcare');
  const [blogImage, setBlogImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuCeoRs6SnykewVsXw_qRZZ-yKR7W23O1T5NuyFXosQbndTbma6suhmVSMqIN8GHvupZs_Nq-NIvouXfvhRPFy75n-ugY6q3zUqIrD346PC-AEo-rpohtcFUXUshsZ82MubrqroSCip0FYVVZK_FxJ58xlEgTOdwlEgzutOfFTXh4hTqplsDF__Aol6jXRaYW_ow-dCE42qBosltdU132UOweRZ3W0FDzJ4sYFv-Rbn7tXLnwtas94AzOG_lhooDnwtj2zSOZ-ZO-CYM');
  const [blogStatus, setBlogStatus] = useState<'idle' | 'saving' | 'success' | 'err'>('idle');

  // Form states to create fresh events
  const [evTitle, setEvTitle] = useState('');
  const [evDesc, setEvDesc] = useState('');
  const [evDate, setEvDate] = useState('');
  const [evTime, setEvTime] = useState('');
  const [evLoc, setEvLoc] = useState('');
  const [evCat, setEvCat] = useState('Healthcare');
  const [evCap, setEvCap] = useState(60);
  const [evImage, setEvImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDNASX8ZqHT5TpnYZr6tgLT6BfI1aCWP0dzF7BX7r_qPhgdLX4Hx5iuq2qoimDmNrlxVnSbIv-K3kBm1Oomu575dOfoBjKLRgqFYlOiuYTJ84YMZuMems-asmhGAaHZIa3k9M6s3w88KqpJVhyohV8sA5P6KujdALci8IFJCYjg7oASH-ZAnzmKhi7ljlnRk6I835Tcy7MNrP8wrRa63VNgk8FRkdzF8XVOVOQs78RZDKoGCCkA0Mrh1N4c4HZNTDRPCLtvFXm9mP5H');
  const [evStatus, setEvStatus] = useState<'idle' | 'saving' | 'success' | 'err'>('idle');

  useEffect(() => {
    if (!isAdmin) return;

    // Subscribing to direct Donations path
    const unsubDonations = onSnapshot(
      collection(db, 'donations'),
      (snap) => {
        const list: Donation[] = [];
        snap.forEach((d) => {
          const data = d.data();
          list.push({
            id: d.id,
            amount: data.amount,
            type: data.type,
            donorName: data.donorName,
            donorEmail: data.donorEmail,
            donorPhone: data.donorPhone,
            campaignId: data.campaignId,
            paymentStatus: data.paymentStatus,
            paymentMethod: data.paymentMethod,
            taxReceiptNumber: data.taxReceiptNumber,
            createdAt: data.createdAt,
            isTest: data.isTest ?? true,
            notes: data.notes || data.statusDescription
          });
        });
        setDonations(list);
      },
      (error) => {
        console.error('Donations listener error:', error);
      }
    );

    // Subscribing to direct Volunteers vetting path
    const unsubVolunteers = onSnapshot(
      collection(db, 'volunteers'),
      (snap) => {
        const list: Volunteer[] = [];
        snap.forEach((v) => {
          const data = v.data();
          list.push({
            id: v.id,
            userId: data.userId,
            name: data.name,
            email: data.email,
            phone: data.phone,
            skills: data.skills,
            areasOfInterest: data.areasOfInterest,
            status: data.status,
            appliedAt: data.appliedAt,
            hoursContributed: data.hoursContributed || 0
          });
        });
        setVolunteers(list);
        setLoading(false);
      },
      (error) => {
        console.error('Volunteers listener error:', error);
        setLoading(false);
      }
    );

    return () => {
      unsubDonations();
      unsubVolunteers();
    };
  }, [isAdmin]);

  const updateVolunteerStatus = async (volId: string, nextStatus: VolunteerStatus) => {
    const docRef = doc(db, 'volunteers', volId);
    try {
      await updateDoc(docRef, {
        status: nextStatus
      });
    } catch (error) {
      console.error(error);
      try {
        handleFirestoreError(error, OperationType.UPDATE, `volunteers/${volId}`);
      } catch (logErr) {
        // Handled
      }
    }
  };

  const incrementHours = async (volId: string, currentHrs: number) => {
    const docRef = doc(db, 'volunteers', volId);
    try {
      await updateDoc(docRef, {
        hoursContributed: currentHrs + 5
      });
    } catch (error) {
      console.error(error);
      try {
        handleFirestoreError(error, OperationType.UPDATE, `volunteers/${volId}`);
      } catch (logErr) {
        // Handled
      }
    }
  };

  const saveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim() || !blogSummary.trim()) {
      setBlogStatus('err');
      return;
    }

    setBlogStatus('saving');
    const path = `blogs`;
    try {
      await addDoc(collection(db, path), {
        title: blogTitle.trim(),
        summary: blogSummary.trim(),
        content: blogContent.trim(),
        category: blogCategory,
        authorName: user?.displayName || 'Administrator',
        authorId: user?.uid || 'admin',
        image: blogImage,
        createdAt: serverTimestamp()
      });
      setBlogStatus('success');
      setBlogTitle('');
      setBlogSummary('');
      setBlogContent('');
    } catch (error) {
      console.error(error);
      setBlogStatus('err');
      try {
        handleFirestoreError(error, OperationType.CREATE, path);
      } catch (e) {
        // Logged
      }
    }
  };

  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim() || !evDesc.trim() || !evDate || !evLoc.trim()) {
      setEvStatus('err');
      return;
    }

    setEvStatus('saving');
    const path = `events`;
    try {
      await addDoc(collection(db, path), {
        title: evTitle.trim(),
        description: evDesc.trim(),
        date: evDate,
        time: evTime || '09:00 AM - 05:00 PM',
        location: evLoc.trim(),
        image: evImage,
        category: evCat,
        registrants: [],
        capacity: Number(evCap),
        createdAt: serverTimestamp()
      });
      setEvStatus('success');
      setEvTitle('');
      setEvDesc('');
      setEvDate('');
      setEvTime('');
      setEvLoc('');
    } catch (error) {
      console.error(error);
      setEvStatus('err');
      try {
        handleFirestoreError(error, OperationType.CREATE, path);
      } catch (e) {
        // Logged
      }
    }
  };

  const totalFunded = donations.reduce((sum, d) => sum + d.amount, 0);

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center space-y-6 font-sans">
        <ShieldAlert className="w-16 h-16 text-[#1B7330] mx-auto" />
        <h2 className="text-2xl font-extrabold text-[#0A2240] tracking-tight">Administrative Clearance Required</h2>
        <p className="text-xs font-semibold text-slate-500 leading-relaxed">
          This panel is restricted exclusively to authorized auditors and operations staff of the DAD Foundation.
        </p>
        <p className="text-xs bg-slate-50 text-[#0A2240] p-4 rounded-xl border border-slate-150 font-bold leading-normal">
          Authorized demo clearance: Sign out and sign back in securely with the matching administrator email (<strong className="underline text-[#1B7330]">shiyadshubh2000@gmail.com</strong>) to launch administrative triggers.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12 pb-20 font-sans">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">Governance Mode</span>
          <h1 className="text-3xl font-extrabold text-[#0A2240] tracking-tight">Executive Control Centre</h1>
        </div>
        <div className="flex p-3 bg-[#1B7330]/15 text-[#1B7330] font-bold text-xs rounded-xl border border-[#1B7330]/20 items-center gap-2">
          <Database className="w-4 h-4 text-[#1B7330]" /> Live DB Sync Mode
        </div>
      </div>

      {/* Metrics Board Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start justify-between">
          <div className="space-y-1 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Funds Raised</span>
            <span className="text-xl font-extrabold text-[#0A2240] block tracking-tight">Rs. {totalFunded.toLocaleString()}</span>
          </div>
          <Heart className="w-8 h-8 text-[#1B7330] fill-[#1B7330]/10" />
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start justify-between">
          <div className="space-y-1 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Givers Logged</span>
            <span className="text-xl font-extrabold text-[#0A2240] block tracking-tight">{donations.length} Payments</span>
          </div>
          <Award className="w-8 h-8 text-[#1B7330]" />
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start justify-between">
          <div className="space-y-1 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vetted Helpers</span>
            <span className="text-xl font-extrabold text-[#0A2240] block tracking-tight">
              {volunteers.filter(v => v.status === VolunteerStatus.APPROVED).length} Vetted
            </span>
          </div>
          <Users className="w-8 h-8 text-[#1B7330]" />
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex items-start justify-between">
          <div className="space-y-1 font-sans">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicants queue</span>
            <span className="text-xl font-extrabold text-[#0A2240] block tracking-tight">
              {volunteers.filter(v => v.status === VolunteerStatus.PENDING).length} pending
            </span>
          </div>
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
      </section>

      {/* Grid lower layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left lists (donations + volunteers vetting) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Volunteer Queue management */}
          <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-xs">
            <div className="bg-[#0A2240] text-white px-6 py-4.5 flex justify-between items-center border-b border-white/5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider">Volunteer Vetting Desk</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1B7330] text-white px-3 py-1 rounded-full">Applicants: {volunteers.length}</span>
            </div>

            {loading ? (
              <p className="text-xs p-6 text-slate-450 text-center">Loading volunteer tables...</p>
            ) : volunteers.length === 0 ? (
              <p className="text-xs p-8 text-slate-400 text-center font-semibold leading-relaxed">
                Applicants register database is empty. Volunteers apply in real-time under Get Involved.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {volunteers.map((vol) => (
                  <div key={vol.id} className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1 font-sans">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#0A2240]">{vol.name}</h4>
                        <span className={`text-[8px] uppercase font-extrabold px-2 py-0.5 rounded-full ${
                          vol.status === VolunteerStatus.APPROVED ? 'bg-[#1B7330]/15 text-[#1B7330]' :
                          vol.status === VolunteerStatus.REJECTED ? 'bg-rose-50 text-rose-800' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {vol.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-semibold">{vol.email} • {vol.phone}</p>
                      <p className="text-[10px] text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full font-semibold w-fit">
                        Interest: {vol.areasOfInterest} — Skills: {vol.skills}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {vol.status === VolunteerStatus.PENDING && (
                        <>
                          <button
                            onClick={() => updateVolunteerStatus(vol.id, VolunteerStatus.APPROVED)}
                            className="bg-[#1B7330] hover:bg-[#145A24] text-white p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateVolunteerStatus(vol.id, VolunteerStatus.REJECTED)}
                            className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {vol.status === VolunteerStatus.APPROVED && (
                        <button
                          onClick={() => incrementHours(vol.id, vol.hoursContributed)}
                          className="bg-slate-50 hover:bg-slate-100 text-[#0A2240] border border-slate-150 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors"
                        >
                          Log Hours ({vol.hoursContributed} hrs)
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Donations records audits */}
          <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-xs">
            <div className="bg-[#0A2240] text-white px-6 py-4.5 flex justify-between items-center border-b border-white/5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider">Donations Audit Book</h3>
              <span className="text-[10px] bg-[#1B7330] text-white font-bold uppercase px-3 py-1 rounded-full">Rs. {totalFunded.toLocaleString()}</span>
            </div>

            {donations.length === 0 ? (
              <p className="text-xs p-8 text-slate-400 text-center font-bold">
                Audit is currently blank. Giver transactions sync directly once submitted.
              </p>
            ) : (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="bg-slate-50 font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4">Receipt Num</th>
                      <th className="p-4">Sponsor Details</th>
                      <th className="p-4">Campaign</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-650">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono font-extrabold text-[#0A2240]">{d.taxReceiptNumber}</td>
                        <td className="p-4">
                          <p className="font-extrabold text-[#0A2240]">{d.donorName}</p>
                          <p className="text-[10px] text-slate-400">{d.donorEmail}</p>
                        </td>
                        <td className="p-4">{d.campaignId}</td>
                        <td className="p-4">
                          <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            Test (No ₹ Transferred)
                          </span>
                        </td>
                        <td className="p-4 text-right text-[#1B7330] font-black">Rs. {d.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Right Publish column (create books + create camps) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Form: Publish Blog article */}
          <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#0A2240] uppercase tracking-wider border-b border-slate-100 pb-2">
              Publish Research Guide
            </h3>

            {blogStatus === 'success' && (
              <div className="bg-[#1B7330]/10 text-[#1B7330] border border-[#1B7330]/20 p-3 rounded-xl text-xs font-bold text-center">
                Article Published Successfully!
              </div>
            )}

            <form onSubmit={saveBlogPost} className="space-y-3 font-sans">
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-400">Handbook Title</label>
                <input 
                  type="text" 
                  required
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  placeholder="e.g. Range of Motion Physiotherapy" 
                  className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] focus:border-[#1B7330]/50"
                />
              </div>

              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-400">Brief Summary</label>
                <input 
                  type="text" 
                  required
                  value={blogSummary}
                  onChange={(e) => setBlogSummary(e.target.value)}
                  placeholder="Summarise article contents..." 
                  className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] focus:border-[#1B7330]/50"
                />
              </div>

              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-400">Core Handbook Markdown Contents</label>
                <textarea 
                  required
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="Type full article contents..." 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] resize-none focus:border-[#1B7330]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Category</label>
                  <select 
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-2 text-xs rounded-xl outline-none font-extrabold text-[#0A2240]"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Caregiver Support">Caregiver Support</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Image Link</label>
                  <select 
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240]"
                  >
                    <option value="https://lh3.googleusercontent.com/aida-public/AB6AXuCeoRs6SnykewVsXw_qRZZ-yKR7W23O1T5NuyFXosQbndTbma6suhmVSMqIN8GHvupZs_Nq-NIvouXfvhRPFy75n-ugY6q3zUqIrD346PC-AEo-rpohtcFUXUshsZ82MubrqroSCip0FYVVZK_FxJ58xlEgTOdwlEgzutOfFTXh4hTqplsDF__Aol6jXRaYW_ow-dCE42qBosltdU132UOweRZ3W0FDzJ4sYFv-Rbn7tXLnwtas94AzOG_lhooDnwtj2zSOZ-ZO-CYM">Doctor Patient</option>
                    <option value="https://lh3.googleusercontent.com/aida-public/AB6AXuB6eNoL2EehtWbcrXOoHzt0TRZVFlzNJJmPUL-6XCl0ld6IFXiqRq9f2nmEgtbXfYPyd5CFmMbf1q127fxuvPGZQnbpEeIvIlk-C1f3NwmZJUbmr0Mj3UdTbjfOcWp9SBwLbC9IhL5iqk8zBRC72cXYw0gZmSZ974ALe76no-MwXQu9Dvg_m2cNko5tWgOEoIUPABhjpSwuXXnGkSD2zgurX5VtQBimLU3huG9PfGdphdt4BjaWFXRjvCK76kOTQjKz8CIscxxVYVTH">Patient Rehab</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={blogStatus === 'saving'}
                className="w-full bg-[#1B7330] hover:bg-[#145A24] text-white py-2.5 rounded-full text-xs font-bold transition-transform cursor-pointer hover:scale-[1.01]"
              >
                {blogStatus === 'saving' ? 'Publishing...' : 'Publish Guide'}
              </button>
            </form>
          </div>

          {/* Form: Publish Medical Camp */}
          <div className="bg-white rounded-[32px] border border-slate-100 p-6 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#0A2240] uppercase tracking-wider border-b border-slate-100 pb-2">
              Publish Medical Camp
            </h3>

            {evStatus === 'success' && (
              <div className="bg-[#1B7330]/10 text-[#1B7330] border border-[#1B7330]/20 p-3 rounded-xl text-xs font-bold text-center">
                Camp Scheduled Successfully!
              </div>
            )}

            <form onSubmit={saveEvent} className="space-y-3 font-sans">
              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-400">Treatment Camp Title</label>
                <input 
                  type="text" 
                  required
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  placeholder="e.g. Free Pediatric Alignment Camp" 
                  className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] focus:border-[#1B7330]/50"
                />
              </div>

              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-400">Brief Descriptions</label>
                <input 
                  type="text" 
                  required
                  value={evDesc}
                  onChange={(e) => setEvDesc(e.target.value)}
                  placeholder="Provide brief details..." 
                  className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] focus:border-[#1B7330]/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Date Indices</label>
                  <input 
                    type="date" 
                    required
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-2 text-xs rounded-xl outline-none font-extrabold text-[#0A2240]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400">Campaign Hours</label>
                  <input 
                    type="text" 
                    value={evTime}
                    onChange={(e) => setEvTime(e.target.value)}
                    placeholder="09:00 AM - 04:00 PM" 
                    className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] focus:border-[#1B7330]/50"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[10px] font-bold text-slate-400">Physical Venue Address</label>
                <input 
                  type="text" 
                  required
                  value={evLoc}
                  onChange={(e) => setEvLoc(e.target.value)}
                  placeholder="Center sector, Mumbai" 
                  className="w-full bg-slate-50 border border-slate-100 px-3 py-2 text-xs rounded-xl outline-none font-semibold text-[#0A2240] focus:border-[#1B7330]/50"
                />
              </div>

              <button
                type="submit"
                disabled={evStatus === 'saving'}
                className="w-full bg-[#1B7330] hover:bg-[#145A24] text-white py-2.5 rounded-full text-xs font-bold transition-transform cursor-pointer hover:scale-[1.01]"
              >
                {evStatus === 'saving' ? 'Publishing...' : 'Schedule Camp'}
              </button>
            </form>
          </div>

        </div>

      </section>

    </div>
  );
}
