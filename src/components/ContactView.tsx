/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, MessageSquare } from 'lucide-react';

export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'Is there any direct fee for surgical procedures under DAD Foundation?', a: 'No, every surgery, therapy diagnostics, orthotic alignment, and counseling segment is fully cost-free for families who satisfy critical threshold economic criteria.' },
    { q: 'How is the Section 80G tax benefit applied to my sponsorships?', a: 'All successful donations generate a formal state-registered receipt file immediately containing the foundation’s unique 80G registration license. You can claim a 50% tax deduction on your contributions.' },
    { q: 'Where are the remote medical units deployed?', a: 'We serve multiple villages weekly across states. We publish current routes and calendars inside our camp schedules.' },
    { q: 'Can volunteers track their hours to obtain official credentials?', a: 'Yes! Registered volunteers can log task codes and hours. These are verified by senior administrators to release official certification papers.' }
  ];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-16 pb-20 font-sans">
      
      {/* Intro Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">Reach Support</span>
        <h1 className="text-3xl font-extrabold text-[#0A2240] tracking-tight">Connect With Our Center</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 leading-relaxed">
          Need details regarding patient admission? Want to audit recent administrative expenditure charts? Email us directly or submit the secure form below.
        </p>
      </section>

      {/* Grid: Contact forms vs support coordinates */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Support Coordinates details */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0A2240] border-b border-slate-100 pb-3">
              Office Locations
            </h3>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-[#1B7330]/10 text-[#1B7330] rounded-xl shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Headquarters Location</h4>
                <p className="text-xs font-semibold text-[#0A2240] leading-relaxed">
                  DAD Foundation Healthcare Wing, <br />
                  Dr. Sarah Corridor, Worli, Mumbai - 400018
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-slate-100 text-[#0A2240] rounded-xl shrink-0 border border-slate-200/50">
                <Phone className="w-5 h-5 text-[#1B7330]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medical Helpdesk</h4>
                <p className="text-xs font-semibold text-[#0A2240]">
                  +91-22-2490-4100 / 011 <br />
                  (Response lines available 09:00 AM - 06:00 PM)
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-3 bg-slate-100 text-[#0A2240] rounded-xl shrink-0 border border-slate-200/50">
                <Mail className="w-5 h-5 text-[#1B7330]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiry Mailbox</h4>
                <p className="text-xs font-semibold text-[#0A2240]">
                  info@dadfoundation.org <br />
                  support@dadfoundation.org
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1B7330]/5 rounded-2xl border border-[#1B7330]/10 p-6 space-y-2">
            <h4 className="text-xs font-bold text-[#1B7330] uppercase">Emergency Medical support</h4>
            <p className="text-[11px] font-semibold text-slate-500 leading-relaxed">
              If you represent an orphan center seeking reconstructive orthopedic therapy loops, communicate with Dr Jenkins directly inside <strong>info@dadfoundation.org</strong>.
            </p>
          </div>
        </div>

        {/* Support Request Form */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-[32px] border border-slate-100 p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-bold text-[#0A2240] tracking-tight flex items-center gap-2 border-b border-slate-100 pb-3">
            <MessageSquare className="w-5 h-5 text-[#1B7330]" /> Deliver Digital Support Inquiry
          </h3>

          {submitted ? (
            <div className="bg-[#1B7330]/10 text-[#1B7330] border border-[#1B7330]/20 p-6 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#1B7330] mx-auto" />
              <p className="text-sm font-bold">Inquiry Transmitted Successfully!</p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Thank you for reaching out. A compliance officer has been assigned to coordinate with your request within 24 working hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#0A2240] hover:bg-[#06162b] text-white py-2 px-5 rounded-full text-xs font-bold font-sans cursor-pointer"
              >
                Submit New Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#0A2240] outline-none focus:border-[#1B7330]/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">Mailbox</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. liam@smith.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#0A2240] outline-none focus:border-[#1B7330]/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400">Your message</label>
                <textarea
                  required
                  placeholder="Explain your patient query, sponsorship needs, or CSR collaboration guidelines..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#0A2240] outline-none resize-none focus:border-[#1B7330]/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1B7330] hover:bg-[#145A24] text-white py-3 rounded-full font-bold text-xs transition-transform flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01]"
              >
                <Send className="w-3.5 h-3.5 text-white" /> Transmit Secure Message
              </button>
            </form>
          )}
        </div>

      </section>

      {/* FAQs Section */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-[#0A2240] tracking-tight">Frequently Asked Queries</h2>
          <p className="text-xs font-semibold text-slate-500">Clear guides answering community questions.</p>
        </div>

        <div className="max-w-4xl mx-auto divide-y divide-slate-100 border border-slate-100 rounded-[32px] overflow-hidden bg-white shadow-xs">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left font-bold text-sm text-[#0A2240] hover:text-[#1B7330] transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#1B7330] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs font-semibold text-slate-500 leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
