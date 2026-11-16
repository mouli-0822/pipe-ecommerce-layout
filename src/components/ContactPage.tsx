import React, { useState } from 'react';
import { Phone, MessageSquare, Calendar, CheckCircle2, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    projectType: 'Aquasafe ISI PVC Pipes (Page 03)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-[#081C34] pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#061527] via-[#081C34] to-[#0B2B4C] text-white py-14 border-b border-sky-400/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-300">
            ORDER SEND TO · OFFICIAL BROCHURE CONTACT DESK
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1.5">
            Contact {COMPANY_INFO.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
            Direct WhatsApp order numbers and office telephone printed on the{' '}
            {COMPANY_INFO.priceListDate} Astral Pipes Price List.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left 5 Columns: Verified Brochure Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-[#081C34] text-white border border-sky-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 bg-sky-500 text-[#04101F] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-sky-300">
                    WHATSAPP ORDER DESK (PRINTED ON BROCHURE)
                  </p>
                  <h2 className="font-display font-bold text-base text-white">
                    Order Send To WhatsApp
                  </h2>
                </div>
              </div>
              <p className="font-mono font-bold text-xl text-sky-300 tracking-wide">
                {COMPANY_INFO.whatsappNumbers[0]}
              </p>
              <p className="font-mono font-bold text-xl text-white tracking-wide mt-1">
                {COMPANY_INFO.whatsappNumbers[1]}
              </p>
              <p className="text-xs text-slate-300 mt-3">
                Send your itemized pipe diameter &amp; fitting list for immediate dispatch
                confirmation.
              </p>
            </div>

            <div className="p-6 bg-sky-50/60 border border-sky-200">
              <div className="flex items-center gap-3 mb-2">
                <Phone className="w-5 h-5 text-sky-600" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#081C34]">
                  Office Landline Telephone
                </h3>
              </div>
              <p className="font-mono font-bold text-lg text-[#081C34]">{COMPANY_INFO.landline}</p>
              <p className="text-xs text-slate-500 mt-1">
                As printed on Pages 03, 04, and 05 of the Astral Pipes Price List.
              </p>
            </div>

            <div className="p-6 bg-white border border-sky-100">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-sky-600" />
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#081C34]">
                  Price List Effective Date
                </h3>
              </div>
              <p className="font-mono font-bold text-base text-sky-700">
                Date : {COMPANY_INFO.priceListDate}
              </p>
              <p className="text-xs text-slate-500 mt-1">{COMPANY_INFO.taglineTamil}</p>
            </div>
          </div>

          {/* Right 7 Columns: Wholesale / Project Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-sky-200 p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-[#081C34]">
              Submit Project Bill of Quantities / Rate Inquiry
            </h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Request bulk dispatch for Astral Aquasafe PVC, SWR Selfit Fittings, CPVC SDR 11/13.5,
              or Cleo 4D Water Tanks.
            </p>

            {submitted ? (
              <div className="p-6 bg-sky-50 border border-sky-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-sky-600 mx-auto" />
                <h3 className="font-display font-bold text-lg text-[#081C34]">
                  Inquiry Logged for {formState.name}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Our wholesale order desk ({COMPANY_INFO.whatsappNumbers[0]} /{' '}
                  {COMPANY_INFO.landline}) has recorded your request for{' '}
                  <strong>{formState.projectType}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#081C34] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#081C34] mb-1.5">
                      Contractor / Dealer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Enter your name or firm"
                      className="w-full px-3.5 py-2.5 border border-sky-200 text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#081C34] mb-1.5">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-sky-200 text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#081C34] mb-1.5">
                    Brochure Division
                  </label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-sky-200 text-xs sm:text-sm bg-white focus:outline-none focus:border-sky-500"
                  >
                    <option>Aquasafe ISI PVC Pipes (Page 03)</option>
                    <option>Foam Core &amp; SWR Selfit Pipes (Page 03)</option>
                    <option>Astral SWR Fittings, Traps &amp; Gullies (Page 04)</option>
                    <option>CPVC SDR 11 &amp; 13.5 Pipes &amp; Valves (Page 05)</option>
                    <option>Sanitaryware, Cleo 4D Tank &amp; Pumps (Page 01)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#081C34] mb-1.5">
                    Required Pipe Sizes, Pressure Ratings &amp; Quantities
                  </label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="List pipe diameters (mm/inch), pressure class (4KG/6KG/10KG/15KG or SDR 11), and required quantities..."
                    className="w-full px-3.5 py-2.5 border border-sky-200 text-xs sm:text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-display font-bold text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Order Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
