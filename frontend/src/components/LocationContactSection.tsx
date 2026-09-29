"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react";
import { MS_TAILORS_CONTACT, getWhatsAppInquiryUrl, createInquiry } from "@/lib/api";
import { ParallaxBackground, Card3D } from "@/components/Motion3D";

export default function LocationContactSection() {
  const [inquiryForm, setInquiryForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    subject: "Bespoke Tailoring Inquiry",
    message: "",
    preferredContactMethod: "WhatsApp",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await createInquiry(inquiryForm);
    setLoading(false);

    if (res.success) {
      setSent(true);
    } else {
      setErrorMsg(res.error || "Failed to submit inquiry. Please call or WhatsApp us directly.");
    }
  };

  return (
    <section id="contact" className="py-28 bg-black relative overflow-hidden border-t border-obsidian-border">
      {/* 3D Visible Parallax Atelier Architecture Background */}
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?auto=format&fit=crop&w=2200&q=85"
        alt="MS Tailors Panadura Atelier"
        opacity={0.65}
        speed={0.16}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue tracking-[0.25em] text-xs font-bold uppercase block mb-3">
            Visit Our Atelier
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white drop-shadow-md">
            The Panadura Showroom & Atelier
          </h2>
          <div className="w-20 h-0.5 bg-blue mx-auto mt-6 shadow-blue-glow" />
          <p className="mt-6 text-silk-silver text-base sm:text-lg font-light">
            Conveniently situated along Galle Road in Panadura, welcoming clients from Moratuwa, Wadduwa, Kalutara, Colombo, and across Sri Lanka.
          </p>
        </div>

        {/* 2-Column Split: Contact & Map on Left, Quick Inquiry Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Map with 3D Tilt */}
          <div className="lg:col-span-6 space-y-6">
            <Card3D intensity={6} glare={true}>
              <div className="card-luxury p-7 sm:p-8 rounded-sm space-y-6 bg-black/85 backdrop-blur-md hover:border-blue/70">
                <h3 className="font-display font-bold text-2xl text-white mb-4 border-b border-white/10 pb-4">
                  Atelier Coordinates
                </h3>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-blue/40 flex items-center justify-center text-blue shrink-0 mt-0.5 shadow-blue-glow">
                  <MapPin className="w-5 h-5 text-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Atelier Address</h4>
                  <p className="text-xs text-silk-muted leading-relaxed mt-0.5">
                    {MS_TAILORS_CONTACT.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-blue/40 flex items-center justify-center text-blue shrink-0 mt-0.5 shadow-blue-glow">
                  <Phone className="w-5 h-5 text-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Telephone Hotline</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                    <a
                      href={`tel:${MS_TAILORS_CONTACT.phoneRaw}`}
                      className="text-xs text-silk-silver hover:text-blue transition-colors font-medium"
                    >
                      Landline: {MS_TAILORS_CONTACT.phoneDisplay}
                    </a>
                    <a
                      href={`tel:${MS_TAILORS_CONTACT.hotlineMobileRaw}`}
                      className="text-xs text-blue hover:underline font-semibold"
                    >
                      Mobile: {MS_TAILORS_CONTACT.hotlineMobileDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">WhatsApp Concierge</h4>
                  <p className="text-xs text-silk-muted mt-0.5 mb-2">
                    Instant answers for measurement appointments, fabric questions, and rental bookings.
                  </p>
                  <a
                    href={getWhatsAppInquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 text-xs font-semibold hover:bg-emerald-900/40 transition-colors"
                  >
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-black border border-blue/40 flex items-center justify-center text-blue shrink-0 mt-0.5 shadow-blue-glow">
                  <Clock className="w-5 h-5 text-blue" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Fitting Hours</h4>
                  <p className="text-xs text-silk-silver mt-0.5 leading-relaxed">
                    {MS_TAILORS_CONTACT.hours}
                  </p>
                </div>
              </div>
            </div>
            </Card3D>

            {/* Embedded Visual Map Preview */}
            <div className="card-luxury rounded-sm overflow-hidden p-2 border border-white/10 bg-black/85 backdrop-blur-md">
              <div className="relative h-64 w-full rounded-sm overflow-hidden bg-obsidian-elevated">
                <iframe
                  title="MS Tailors Panadura Location Map"
                  src={MS_TAILORS_CONTACT.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Inquiry Form with 3D Tilt */}
          <div className="lg:col-span-6">
            <Card3D intensity={6} glare={true}>
              <div className="card-luxury p-7 sm:p-8 rounded-sm bg-black/85 backdrop-blur-md hover:border-blue/70">
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Send Direct Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-silk-silver font-light mb-6">
                  Have questions regarding wedding packages, custom uniform contracts, or rental dates? Send our master tailors a direct message.
                </p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-white mb-2">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-silk-muted max-w-sm mx-auto mb-6">
                    Thank you. A representative from our Panadura atelier will reply via {inquiryForm.preferredContactMethod} shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setInquiryForm({
                        customerName: "",
                        phone: "",
                        email: "",
                        subject: "Bespoke Tailoring Inquiry",
                        message: "",
                        preferredContactMethod: "WhatsApp",
                      });
                    }}
                    className="px-5 py-2.5 bg-obsidian-surface border border-blue/40 text-blue text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-blue hover:text-white transition-all shadow-blue-glow"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                      Your Name <span className="text-blue">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.customerName}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, customerName: e.target.value })}
                      placeholder="e.g. Priyantha Fernando"
                      className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-sm text-sm text-white outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                        Phone / WhatsApp <span className="text-blue">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="+94 7X XXX XXXX"
                        className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-sm text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="client@example.com"
                        className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-sm text-sm text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      value={inquiryForm.subject}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, subject: e.target.value })}
                      placeholder="e.g. Wedding Suit Consultation / Corporate Uniforms"
                      className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-sm text-sm text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Share your requirements, date of your occasion, or any specific styling nuances..."
                      className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2 rounded-sm text-sm text-white outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                      Preferred Reply Channel
                    </label>
                    <div className="flex gap-4">
                      {["WhatsApp", "Phone", "Email"].map((method) => (
                        <label key={method} className="flex items-center gap-2 text-xs text-silk-silver cursor-pointer">
                          <input
                            type="radio"
                            name="contactMethod"
                            value={method}
                            checked={inquiryForm.preferredContactMethod === method}
                            onChange={() => setInquiryForm({ ...inquiryForm, preferredContactMethod: method })}
                            className="text-blue"
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-blue-gradient text-white font-bold tracking-widest uppercase text-xs sm:text-sm rounded-sm shadow-blue-glow hover:shadow-blue-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? "Transmitting..." : "Send Message to Atelier"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
}
