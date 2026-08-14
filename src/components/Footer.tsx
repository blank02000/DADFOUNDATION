/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { LogoIcon } from './Logo';
import { 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Facebook,
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'err'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('err');
      setErrMsg('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    const path = `newsletter`;
    try {
      await addDoc(collection(db, path), {
        email: email.trim(),
        subscribedAt: serverTimestamp()
      });
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('err');
      setErrMsg('Subscription error.');
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (logErr) {
        // handled
      }
    }
  };

  return (
    <footer className="bg-[#0A2E5C] text-slate-300 font-sans border-t border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 px-6 py-16 max-w-7xl mx-auto">
        
        {/* Column 1: Brand details & Newsletter (Lg: col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-0.5 bg-white/5 border border-white/10 rounded-full">
              <LogoIcon size={38} className="w-9.5 h-9.5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white font-sans">
                DAD <span className="text-[#129E36]">FOUNDATION</span>
              </span>
              <span className="text-[9px] block uppercase font-bold tracking-widest text-[#129E36] mt-0.5">
                Care. Support. Empower.
              </span>
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-400 leading-relaxed">
            Empowering differently abled individuals of all ages to live healthy, independent and meaningful lives.
          </p>

          {/* Inline Newsletter */}
          <div className="space-y-2.5 pt-2">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Newsletter Updates</h5>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full bg-slate-900 border border-slate-800 rounded-l-xl pl-3 pr-10 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#129E36]/50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#129E36] hover:bg-[#0E7F2B] px-3.5 rounded-r-xl transition-colors cursor-pointer text-white flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {status === 'success' && (
                <p className="text-[#9DDF8C] text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled successfully!
                </p>
              )}
              {status === 'err' && (
                <p className="text-rose-400 text-[11px] font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errMsg}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Column 2: Quick Links (Lg: col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs font-bold">
            <li>
              <button onClick={() => setCurrentTab('about')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('programs')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Our Services
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('resources')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Resources
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('volunteer')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Get Involved
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('contact')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Get Involved (Lg: col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
            Get Involved
          </h4>
          <ul className="space-y-2 text-xs font-bold">
            <li>
              <button onClick={() => setCurrentTab('volunteer')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Volunteer
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('donation')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Donate
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('volunteer')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Corporate Partnership
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('volunteer')} className="hover:text-[#129E36] transition-colors cursor-pointer text-slate-400">
                Fundraise
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us (Lg: col-span-4) */}
        <div className="lg:col-span-4 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white border-b border-slate-800 pb-2">
            Contact Us
          </h4>
          <ul className="space-y-3 text-xs font-semibold text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#129E36] shrink-0 mt-0.5" />
              <span>123 Hope Avenue, City, State - S60001</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#129E36] shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#129E36] shrink-0" />
              <span className="hover:text-white transition-colors">info@dadfoundation.org</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#129E36] shrink-0" />
              <span className="hover:text-white transition-colors">www.dadfoundation.org</span>
            </li>
          </ul>

          <div className="h-px bg-slate-800 my-4" />

          {/* Social icons + 80G badge */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-white">Follow Us</h5>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-900 hover:bg-[#129E36] text-slate-400 hover:text-white rounded-full transition-all">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-slate-900 hover:bg-[#129E36] text-slate-400 hover:text-white rounded-full transition-all">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-slate-900 hover:bg-[#129E36] text-slate-400 hover:text-white rounded-full transition-all">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-2 bg-slate-900 hover:bg-[#129E36] text-slate-400 hover:text-white rounded-full transition-all">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#9DDF8C] mb-1">
                80G Certified
              </p>
              <p className="text-[11px] text-slate-500 font-bold leading-normal">
                Your contribution is fully tax exempted under Section 80G rules.
              </p>
            </div>
          </div>

        </div>

      </div>

      <div className="border-t border-slate-900/60 py-6 px-6 text-center text-slate-500 text-xs font-semibold">
        <p>&copy; 1994 - 2026 DAD Foundation. Vetted with Compassion.</p>
      </div>
    </footer>
  );
}
