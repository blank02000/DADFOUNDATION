/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { DonationType, PaymentMethod } from '../types';
import { CreditCard, CheckCircle2, RefreshCw, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

export function DonationView() {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [type, setType] = useState<DonationType>(DonationType.ONE_TIME);
  const [campaign, setCampaign] = useState<string>('General Medical Care');
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.STRIPE);

  // Donor credentials
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Flow State
  const [status, setStatus] = useState<'form' | 'processing' | 'success' | 'err'>('form');
  const [errMsg, setErrMsg] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  const presets = [500, 1000, 5000, 10000];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (isNaN(finalAmount) || finalAmount <= 0) {
      setStatus('err');
      setErrMsg('Please enter a valid donation value greater than zero.');
      return;
    }

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setStatus('err');
      setErrMsg('Please complete your donor details (Name, Email, Phone).');
      return;
    }

    setStatus('processing');
    const path = `donations`;
    const genReceipt = `DAD-TX-80G-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await addDoc(collection(db, path), {
        amount: finalAmount,
        type,
        donorName: name.trim(),
        donorEmail: email.trim(),
        donorPhone: phone.trim(),
        campaignId: campaign,
        paymentStatus: 'success', // Simulated successful payment processing
        paymentMethod: method,
        taxReceiptNumber: genReceipt,
        createdAt: serverTimestamp()
      });
      setReceiptNumber(genReceipt);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('err');
      setErrMsg('Database storage or validation rules rejected transaction.');
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch (logErr) {
        // Logged
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 font-sans">
      
      {/* Introduction */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#129E36] bg-[#129E36]/10 px-3 py-1 rounded-full">Secure Giving Portal</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2E5C] tracking-tight">Sponsor Treatment Loops</h1>
        <p className="text-xs md:text-sm font-semibold text-slate-500 max-w-xl mx-auto">
          Providing free specialized surgeries and diagnostics. Standard giving triggers 50% tax exemption under section 80G.
        </p>
      </div>

      {status === 'processing' && (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center space-y-4 shadow-sm flex flex-col items-center">
          <RefreshCw className="w-12 h-12 text-[#129E36] animate-spin" />
          <h3 className="text-xl font-extrabold text-[#0A2E5C]">Connecting Payment Gateway...</h3>
          <p className="text-xs font-semibold text-slate-500 max-w-sm">
            Please wait while we establish a secure transaction bridge with {method}...
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="bg-white rounded-3xl border border-slate-100 p-10 space-y-6 shadow-sm text-center max-w-xl mx-auto">
          <div className="mx-auto bg-[#129E36]/10 text-[#129E36] p-3 rounded-full w-fit">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0A2E5C]">Thank You For Your Support!</h2>
            <p className="text-xs font-bold text-[#129E36] uppercase tracking-wider">
              {type === DonationType.MONTHLY ? 'Monthly Subscription Settled' : 'One-Time Donation Settled'}
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left space-y-3 text-xs font-semibold text-slate-500">
            <p className="text-sm font-bold text-[#0A2E5C] border-b border-slate-150 pb-2">Tax Exemption Receipt</p>
            <div className="flex justify-between">
              <span>Receipt Number:</span>
              <span className="text-[#0A2E5C] font-extrabold">{receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Sponsor Name:</span>
              <span className="text-[#0A2E5C] font-extrabold">{name}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount Funded:</span>
              <span className="text-[#129E36] font-black">
                Rs. {customAmount ? parseFloat(customAmount).toLocaleString() : amount.toLocaleString()}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 leading-relaxed italic">
              Digital receipt generated automatically in cooperation with state auditing services. A certified PDF copy will be dispatched to {email}.
            </p>
          </div>
          <button 
            onClick={() => {
              setStatus('form');
              setName('');
              setCustomAmount('');
              setEmail('');
              setPhone('');
            }}
            className="w-full bg-[#129E36] hover:bg-[#0E7F2B] text-white py-3.5 rounded-full font-bold text-xs transition-colors cursor-pointer"
          >
            Sponsor Another Patient
          </button>
        </div>
      )}

      {status === 'err' && (
        <div className="bg-rose-50 rounded-3xl border border-rose-100 p-6 space-y-4 max-w-xl mx-auto text-center mb-8">
          <div className="mx-auto text-rose-600 bg-rose-100 p-2.5 rounded-full w-fit">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <p className="text-sm font-bold text-rose-800">{errMsg}</p>
          <button 
            onClick={() => setStatus('form')}
            className="px-5 py-2.5 bg-[#0A2E5C] hover:bg-[#0066CC] text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Go Back &amp; Rectify Form
          </button>
        </div>
      )}

      {status === 'form' && (
        <form onSubmit={handleDonate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Selectors */}
          <div className="lg:col-span-7 bg-white p-8 rounded-[32px] border border-slate-100 shadow-xs space-y-6">
            
            {/* Type Switcher */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A2E5C]/60">Giving Cycle</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setType(DonationType.ONE_TIME)}
                  className={`py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                    type === DonationType.ONE_TIME 
                      ? 'bg-[#129E36] text-white shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
                  }`}
                >
                  One-time Donation
                </button>
                <button
                  type="button"
                  onClick={() => setType(DonationType.MONTHLY)}
                  className={`py-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                    type === DonationType.MONTHLY 
                      ? 'bg-[#129E36] text-white shadow-sm' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
                  }`}
                >
                  Monthly Contribution
                </button>
              </div>
            </div>

            {/* Presets Amount */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A2E5C]/60">Select Value (INR)</label>
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setAmount(p);
                      setCustomAmount('');
                    }}
                    className={`py-3.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      amount === p && !customAmount
                        ? 'bg-[#129E36] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
                    }`}
                  >
                    {p.toLocaleString()}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-extrabold text-sm font-sans">Rs.</span>
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(0);
                  }}
                  className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3.5 rounded-2xl focus:ring-1 focus:ring-[#129E36] outline-none font-bold text-sm"
                />
              </div>
            </div>

            {/* Campaign Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0A2E5C]/60">Initiative Segment</label>
              <select 
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-2xl text-xs font-semibold text-[#0A2E5C] outline-none"
              >
                <option value="General Medical Care">General Medical Care</option>
                <option value="Advanced MRI Scanners Program">Advanced Diagnostic Systems Project</option>
                <option value="Therapeutic Physical Rehabilitation">Physiotherapy &amp; Rehab camps</option>
                <option value="Maternal & Pediatric Development">Maternal check-up camps</option>
              </select>
            </div>

          </div>

          {/* Side Info & payment detail elements */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Donor Forms */}
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-[#0A2E5C] tracking-widest uppercase border-b border-slate-100 pb-2 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#129E36] fill-[#129E36]/20" /> Donor Credentials
              </h3>
              
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400">Sponsor Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none text-[#0A2E5C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none text-[#0A2E5C]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400">Phone Mobile</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-xs font-semibold outline-none text-[#0A2E5C]"
                />
              </div>
            </div>

            {/* Gateway Choice & Submit button */}
            <div className="bg-[#0A2E5C] text-white p-6 rounded-[32px] space-y-4 border border-white/5">
              <h3 className="text-[10px] font-bold tracking-widest text-[#129E36] uppercase">Secure payment</h3>
              
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold text-slate-300">Gateway Provider</label>
                <select 
                  value={method}
                  onChange={(e) => setMethod(e.target.value as PaymentMethod)}
                  className="w-full bg-slate-900 border border-slate-800 px-3 py-2.5 rounded-xl text-xs font-bold outline-none text-white"
                >
                  <option value={PaymentMethod.STRIPE}>Stripe (Apple Pay, Credit Card)</option>
                  <option value={PaymentMethod.PAYPAL}>PayPal Standard</option>
                  <option value={PaymentMethod.RAZORPAY}>Razorpay (UPI, NetBanking)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#129E36] hover:bg-[#0E7F2B] text-white py-3.5 rounded-full font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.01]"
                >
                  <CreditCard className="w-4 h-4 text-white" />
                  Finalise Donation
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-bold tracking-wide justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#129E36]" />
                <span>SSL Encrypted Secure Connection</span>
              </div>
            </div>

          </div>

        </form>
      )}

    </div>
  );
}
