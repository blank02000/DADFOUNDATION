/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Event } from '../types';
import { Calendar, MapPin, Clock, Users, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { useFirebase } from './FirebaseProvider';

export function EventsView() {
  const { user } = useFirebase();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [regStatus, setRegStatus] = useState<Record<string, 'idle' | 'loading' | 'success' | 'err'>>({});
  const [regEmail, setRegEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'events'),
      (snapshot) => {
        const evs: Event[] = [];
        snapshot.forEach((docSnap) => {
          const d = docSnap.data();
          evs.push({
            id: docSnap.id,
            title: d.title,
            description: d.description,
            date: d.date,
            time: d.time,
            location: d.location,
            image: d.image,
            category: d.category,
            registrants: d.registrants || [],
            capacity: d.capacity || 100,
            createdAt: d.createdAt
          });
        });
        setEvents(evs.sort((a,b) => b.date.localeCompare(a.date)));
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        try {
          handleFirestoreError(error, OperationType.LIST, 'events');
        } catch (e) {
          // Handled
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const handleRegister = async (eventId: string, regList: string[]) => {
    const emailToUse = user?.email || regEmail;
    if (!emailToUse || !emailToUse.includes('@')) {
      alert('Please enter a valid email address first.');
      return;
    }

    if (regList.includes(emailToUse)) {
      alert('You have already registered for this healthcare event!');
      return;
    }

    setRegStatus((prev) => ({ ...prev, [eventId]: 'loading' }));
    const ref = doc(db, 'events', eventId);

    try {
      await updateDoc(ref, {
        registrants: arrayUnion(emailToUse)
      });
      setRegStatus((prev) => ({ ...prev, [eventId]: 'success' }));
      setRegEmail('');
    } catch (err) {
      console.error(err);
      setRegStatus((prev) => ({ ...prev, [eventId]: 'err' }));
      try {
        handleFirestoreError(err, OperationType.UPDATE, `events/${eventId}`);
      } catch (logErr) {
        // Handled
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#006e1c] bg-emerald-50 px-3 py-1 rounded">Outreach Campaigns</span>
        <h1 className="text-3xl font-extrabold text-[#001836] tracking-tight">Upcoming Camps &amp; Events</h1>
        <p className="text-sm font-medium text-gray-500 leading-relaxed">
          Join our clinical programs, diagnostic camps, and therapy seminars. All registrations are recorded safely in our database.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm font-semibold text-gray-500">
          Syncing campaign calendars from Firestore...
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-sm font-semibold text-gray-500">
          No upcoming campaigns registered at present. Please check back soon or sign in as admin to append.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => {
            const isRegistered = user?.email ? ev.registrants.includes(user.email) : false;
            const currentRegStatus = regStatus[ev.id] || 'idle';

            return (
              <div key={ev.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <div className="h-48 relative">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-emerald-950/90 text-[#94f990] text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-emerald-900/60">
                    {ev.category}
                  </span>
                </div>

                <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-extrabold text-[#001836] leading-snug tracking-tight">{ev.title}</h3>
                    <p className="text-xs font-semibold text-gray-500 leading-relaxed line-clamp-3">{ev.description}</p>
                    
                    {/* Event Metadata grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Date: {ev.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Time: {ev.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">Loc: {ev.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Registrations Form widget */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between items-center text-xs font-semibold text-gray-400">
                      <span>Registrants: <strong className="text-[#001836] font-extrabold">{ev.registrants.length}</strong> / {ev.capacity}</span>
                      <span>Status: <strong className={ev.registrants.length >= ev.capacity ? 'text-rose-500 font-bold' : 'text-[#006e1c] font-bold'}>
                        {ev.registrants.length >= ev.capacity ? 'Camp Full' : 'Open'}
                      </strong></span>
                    </div>

                    {isRegistered ? (
                      <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs font-bold justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>You are registered to attend this camp!</span>
                      </div>
                    ) : ev.registrants.length >= ev.capacity ? (
                      <button disabled className="w-full bg-gray-100 text-gray-400 py-2.5 rounded-xl font-bold text-xs cursor-not-allowed">
                        Registration Closed
                      </button>
                    ) : (
                      <div className="space-y-2">
                        {!user && (
                          <input 
                            type="email" 
                            required
                            placeholder="Enter email to sign up"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 px-4 py-2 text-xs font-semibold rounded-xl outline-none"
                          />
                        )}

                        <button
                          onClick={() => handleRegister(ev.id, ev.registrants)}
                          disabled={currentRegStatus === 'loading'}
                          className="w-full bg-[#001836] hover:bg-[#006e1c] text-white py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {currentRegStatus === 'loading' ? 'Processing...' : 'Register to Attend'}
                        </button>

                        {currentRegStatus === 'success' && (
                          <p className="text-[11px] text-emerald-600 font-bold text-center">Registration recorded successfully!</p>
                        )}
                        {currentRegStatus === 'err' && (
                          <p className="text-[11px] text-rose-600 font-bold text-center">Error saving registration.</p>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
