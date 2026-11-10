/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Building2, 
  Copy, 
  Check, 
  ShieldCheck, 
  Phone, 
  Mail, 
  QrCode, 
  Share2,
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function DonationView() {
  // Amount state for dynamic UPI QR code generator
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');

  // Active view tab: 'all' | 'qr' | 'bank'
  const [activeTab, setActiveTab] = useState<'all' | 'qr' | 'bank'>('all');

  // QR Display mode: 'poster' (Official PNB standee) | 'generator' (Custom amount QR)
  const [qrDisplayMode, setQrDisplayMode] = useState<'poster' | 'generator'>('poster');

  // Copy feedback states
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Preset donation amounts
  const presets = [500, 1000, 2500, 5000, 10000];

  // Official Foundation Account Specifications (Punjab National Bank)
  const bankDetails = {
    accountHolder: 'Differently Abled Development Foundation',
    bankName: 'Punjab National Bank (PNB)',
    accountNumber: '4588002100002279',
    ifscCode: 'PUNB0458800',
    branch: 'H P Secretariat',
    upiId: '9872975927m@pnb',
    transferModes: 'NEFT / RTGS / IMPS / UPI',
    enquiryPhone: '+91 98333 21315',
    pnbHelpdesk: '1800 1800 / 1800 2021'
  };

  const shareableBankText = `DAD Foundation – Donation Account Details
Account Holder: ${bankDetails.accountHolder}
Bank Name: ${bankDetails.bankName}
Account Number: ${bankDetails.accountNumber}
IFSC Code: ${bankDetails.ifscCode}
Branch: ${bankDetails.branch}
UPI ID: ${bankDetails.upiId}
Transfer Modes: ${bankDetails.transferModes}
For donations and enquiries: ${bankDetails.enquiryPhone}`;

  // Effective amount for dynamic QR code
  const effectiveAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
  const validAmount = !isNaN(effectiveAmount) && effectiveAmount > 0 ? effectiveAmount : null;

  // Build standard UPI URI for PNB UPI ID
  const upiUrl = validAmount
    ? `upi://pay?pa=${bankDetails.upiId}&pn=Differently%20Abled%20Development%20Foundation&am=${validAmount}&cu=INR&tn=Donation%20to%20DAD%20Foundation`
    : `upi://pay?pa=${bankDetails.upiId}&pn=Differently%20Abled%20Development%20Foundation&cu=INR&tn=Donation%20to%20DAD%20Foundation`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 font-sans space-y-10">
      
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#129E36]/10 text-[#129E36] text-[11px] font-bold tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Donation &amp; Contribution Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A2E5C] tracking-tight">
          Donation Account Details &amp; QR
        </h1>
        <p className="text-sm md:text-base font-medium text-slate-600 leading-relaxed">
          Make direct contributions securely to the official bank account of{' '}
          <strong className="text-[#0A2E5C]">Differently Abled Development Foundation</strong> or scan our official Punjab National Bank UPI QR code.
        </p>
      </div>

      {/* Mode Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-2xl inline-flex gap-1 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-white text-[#0A2E5C] shadow-sm'
                : 'text-slate-600 hover:text-[#0A2E5C]'
            }`}
          >
            All Payment Options
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-[#129E36] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0A2E5C]'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Scan UPI QR
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bank')}
            className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-[#0A2E5C] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#0A2E5C]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Bank Account Info
          </button>
        </div>
      </div>

      {/* Main Grid: QR Code + Bank Account */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CARD 1: UPI QR CODE SCAN & PAY */}
        {(activeTab === 'all' || activeTab === 'qr') && (
          <div className={`${activeTab === 'qr' ? 'lg:col-span-12 max-w-2xl mx-auto w-full' : 'lg:col-span-6'} bg-white rounded-3xl border-2 border-emerald-100 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden`}>
            
            <div className="absolute top-0 right-0 bg-[#A6192E] text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl">
              PNB Merchant UPI
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#129E36] flex items-center justify-center border border-emerald-200/50 shrink-0">
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0A2E5C]">Scan &amp; Pay via UPI</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Official Punjab National Bank UPI QR Code
                </p>
              </div>
            </div>

            {/* Switch: Official Poster vs Dynamic Amount QR */}
            <div className="flex items-center justify-between bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
              <button
                type="button"
                onClick={() => setQrDisplayMode('poster')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  qrDisplayMode === 'poster'
                    ? 'bg-white text-[#0A2E5C] shadow-xs'
                    : 'text-slate-500 hover:text-[#0A2E5C]'
                }`}
              >
                Official PNB Standee
              </button>
              <button
                type="button"
                onClick={() => setQrDisplayMode('generator')}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  qrDisplayMode === 'generator'
                    ? 'bg-white text-[#129E36] shadow-xs'
                    : 'text-slate-500 hover:text-[#129E36]'
                }`}
              >
                Custom Amount QR
              </button>
            </div>

            {/* View A: Official PNB Standee Image from user's upload */}
            {qrDisplayMode === 'poster' && (
              <div className="space-y-4">
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 flex flex-col items-center">
                  <div className="max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-white">
                    <img 
                      src="/assets/aistudio/WhatsApp_Image_2026-11-06_at_2.30.52_PM_5a851e5a.jpeg" 
                      alt="PNB Merchant QR Code - Differently Abled Development Foundation" 
                      className="w-full h-auto object-contain block"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full max-w-[320px] mt-3 px-1 text-[11px]">
                    <span className="text-slate-500 font-semibold">
                      Merchant: <strong>DAD Foundation</strong>
                    </span>
                    <a
                      href="/assets/aistudio/WhatsApp_Image_2026-11-06_at_2.30.52_PM_5a851e5a.jpeg"
                      download="DAD_Foundation_PNB_QR.jpeg"
                      className="text-[#129E36] hover:text-[#0E7F2B] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Save QR</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* View B: Dynamic Amount Generator QR */}
            {qrDisplayMode === 'generator' && (
              <div className="space-y-4">
                {/* Quick Amount Selector to Pre-fill QR code */}
                <div className="space-y-2 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Select Amount to Pre-fill in QR (₹)
                    </label>
                    {validAmount && (
                      <span className="text-xs font-black text-[#129E36]">
                        ₹{validAmount.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {presets.map((preset) => {
                      const isSelected = selectedAmount === preset && !customAmount;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(preset);
                            setCustomAmount('');
                          }}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#129E36] text-white shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                          }`}
                        >
                          ₹{preset >= 1000 ? `${preset / 1000}k` : preset}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-1">
                    <input
                      type="number"
                      placeholder="Or enter custom amount in INR"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-bold text-[#0A2E5C] outline-none focus:ring-2 focus:ring-[#129E36]"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-emerald-50/30 rounded-2xl border border-emerald-100 shadow-inner space-y-3">
                  <div className="p-3 bg-white rounded-2xl border-2 border-slate-900/10 shadow-md">
                    <QRCodeSVG
                      value={upiUrl}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-[#0A2E5C]">
                      Scan to Donate {validAmount ? `₹${validAmount.toLocaleString('en-IN')}` : 'Any Amount'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      UPI ID: {bankDetails.upiId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* UPI ID with One-Click Copy */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Official PNB UPI ID / VPA
              </label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl">
                <span className="font-mono font-black text-sm text-[#0A2E5C] select-all">
                  {bankDetails.upiId}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(bankDetails.upiId, 'upi-id')}
                  className="inline-flex items-center gap-1.5 bg-[#129E36] hover:bg-[#0E7F2B] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                >
                  {copiedKey === 'upi-id' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy UPI ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Mobile UPI Link Button */}
            <div className="pt-1">
              <a
                href={upiUrl}
                className="w-full bg-[#129E36] hover:bg-[#0E7F2B] text-white py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Open &amp; Pay via UPI App (Mobile)</span>
              </a>
              <p className="text-[10px] text-center text-slate-400 mt-2 font-medium">
                Supports Google Pay • PhonePe • Paytm • BHIM • Amazon Pay • WhatsApp • Cred
              </p>
            </div>

            {/* Helpdesk notice */}
            <div className="border-t border-slate-100 pt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>PNB Helpdesk: <strong>{bankDetails.pnbHelpdesk}</strong></span>
              <span>Enquiries: <strong>{bankDetails.enquiryPhone}</strong></span>
            </div>

          </div>
        )}

        {/* CARD 2: BANK ACCOUNT DETAILS (PUNJAB NATIONAL BANK) */}
        {(activeTab === 'all' || activeTab === 'bank') && (
          <div className={`${activeTab === 'bank' ? 'lg:col-span-12 max-w-3xl mx-auto w-full' : 'lg:col-span-6'} bg-white rounded-3xl border-2 border-blue-100 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden`}>
            
            <div className="absolute top-0 right-0 bg-[#0A2E5C] text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl">
              NEFT • RTGS • IMPS • UPI
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0A2E5C] flex items-center justify-center border border-blue-200/50 shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0A2E5C]">Donation Account Details</h2>
                <p className="text-xs text-slate-500 font-medium">
                  Direct transfer to Punjab National Bank (PNB)
                </p>
              </div>
            </div>

            {/* Bank Spec Fields */}
            <div className="space-y-3">
              
              {/* Account Holder */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Account Holder
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountHolder, 'acc-name')}
                    className="text-[11px] font-bold text-[#0A2E5C] hover:text-[#129E36] inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'acc-name' ? <Check className="w-3 h-3 text-[#129E36]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'acc-name' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-extrabold text-xs sm:text-sm text-[#0A2E5C] break-words">
                  {bankDetails.accountHolder}
                </p>
              </div>

              {/* Bank Name */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Bank Name
                </span>
                <p className="font-bold text-sm text-[#0A2E5C]">
                  {bankDetails.bankName}
                </p>
              </div>

              {/* Account Number */}
              <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Account Number
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankDetails.accountNumber, 'acc-num')}
                    className="text-[11px] font-bold text-[#0A2E5C] hover:text-[#129E36] inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-blue-200 cursor-pointer shadow-2xs"
                  >
                    {copiedKey === 'acc-num' ? <Check className="w-3 h-3 text-[#129E36]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'acc-num' ? 'Copied' : 'Copy Number'}</span>
                  </button>
                </div>
                <p className="font-mono font-black text-lg sm:text-xl text-[#0A2E5C] tracking-wider select-all">
                  {bankDetails.accountNumber}
                </p>
              </div>

              {/* IFSC & Branch Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      IFSC Code
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(bankDetails.ifscCode, 'ifsc')}
                      className="text-[11px] font-bold text-[#0A2E5C] hover:text-[#129E36] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'ifsc' ? <Check className="w-3 h-3 text-[#129E36]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'ifsc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="font-mono font-black text-sm text-[#0A2E5C] select-all">
                    {bankDetails.ifscCode}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Branch
                  </span>
                  <p className="font-bold text-sm text-[#0A2E5C]">
                    {bankDetails.branch}
                  </p>
                </div>
              </div>

              {/* UPI ID & Transfer Modes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      UPI ID
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(bankDetails.upiId, 'upi-field')}
                      className="text-[11px] font-bold text-[#0A2E5C] hover:text-[#129E36] inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'upi-field' ? <Check className="w-3 h-3 text-[#129E36]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'upi-field' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="font-mono font-black text-xs text-[#0A2E5C] select-all">
                    {bankDetails.upiId}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Transfer Modes
                  </span>
                  <p className="font-bold text-xs text-[#0A2E5C]">
                    {bankDetails.transferModes}
                  </p>
                </div>
              </div>

            </div>

            {/* Bank details for sharing card (matches screenshot image_a338f6c3.png) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0A2E5C] flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#129E36]" />
                  Bank details for sharing
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(shareableBankText, 'all-bank')}
                  className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-[#0A2E5C] px-3 py-1 rounded-xl text-xs font-bold border border-slate-200 transition-all cursor-pointer shadow-2xs"
                >
                  {copiedKey === 'all-bank' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#129E36]" />
                      <span>Copied Details!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy All Details</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                For donations and enquiries: <a href="tel:+919833321315" className="font-bold text-[#0A2E5C] hover:text-[#129E36]">{bankDetails.enquiryPhone}</a>
              </p>
            </div>

          </div>
        )}

      </div>

      {/* HELPDESK & ACCOUNTS SUPPORT FOOTNOTE */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-black text-[#0A2E5C] text-sm">
            Questions Regarding Donations or Direct Bank Transfer?
          </h4>
          <p className="font-medium text-slate-500">
            Reach out directly to our donation helpdesk or accounts team for receipts, confirmation, or CSR partnerships.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
          <a
            href="tel:+919833321315"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-[#0A2E5C] font-bold hover:border-[#129E36] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#129E36]" />
            +91 98333 21315
          </a>
          <a
            href="mailto:info@dadfoundation.org"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-[#0A2E5C] font-bold hover:border-[#129E36] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#129E36]" />
            info@dadfoundation.org
          </a>
        </div>
      </div>

    </div>
  );
}
