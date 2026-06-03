/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Fingerprint, Key, HardDrive } from 'lucide-react';

export function PrivacyTermsView() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-12 pb-20 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B7330] bg-[#1B7330]/10 px-3 py-1 rounded-full">Compliance Framework</span>
        <h1 className="text-3xl font-extrabold text-[#0A2240] tracking-tight">Privacy Policy &amp; Terms</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 max-w-xl mx-auto leading-relaxed">
          Transparent guidelines safeguarding donor transactions, participant lists, and clinical records.
        </p>
      </div>

      {/* Grid: Safety mechanisms */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col gap-3">
          <div className="p-2.5 bg-[#1B7330]/10 text-[#1B7330] rounded-xl w-fit"><Key className="w-5 h-5" /></div>
          <h4 className="text-sm font-extrabold text-[#0A2240]">Transaction Encryption</h4>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">All payment logs utilize direct TLS 1.3 encryption bridges to Stripe and Razorpay.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col gap-3">
          <div className="p-2.5 bg-[#1B7330]/10 text-[#1B7330] rounded-xl w-fit"><Fingerprint className="w-5 h-5" /></div>
          <h4 className="text-sm font-extrabold text-[#0A2240]">Zero-PII Sharing</h4>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">We do not sell. We never bundle patient histories or donor contact data with third parties.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col gap-3">
          <div className="p-2.5 bg-[#1B7330]/10 text-[#1B7330] rounded-xl w-fit"><HardDrive className="w-5 h-5" /></div>
          <h4 className="text-sm font-extrabold text-[#0A2240]">Durable Persistence</h4>
          <p className="text-xs font-semibold text-slate-500 leading-relaxed">Personal data in Firestore is protected by comprehensive server-side security rules.</p>
        </div>
      </section>

      {/* Legal copy */}
      <section className="bg-white rounded-[32px] border border-slate-100 p-8 space-y-6 font-semibold text-xs md:text-sm text-slate-500 leading-relaxed font-sans shadow-xs">
        
        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-[#0A2240]">1. Terms of Sponsorship</h3>
          <p>
            By supporting our clinics with funding, you verify that all funds are rightfully sourced under statutory non-profit rules. No donation is refundable once a verified tax Receipt Number has been formulated by our 80G accounting API.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-[#0A2240]">2. Voluntarism Code of Ethics</h3>
          <p>
            Approved volunteers are representatives of DAD Foundation and must operate in compliance with physical, emotional and moral safety guidelines. Any breach of confidentiality regarding patient medical diagnostic charts will trigger immediate dismissal.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-extrabold text-[#0A2240]">3. Regulatory Governing</h3>
          <p>
            Operating indices, transparent transaction audits and resource allocations comply with standard non-profit charters. For queries regarding our transparent database structure, please write us at <strong>info@dadfoundation.org</strong>.
          </p>
        </div>

      </section>

    </div>
  );
}
