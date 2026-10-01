"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Calendar, Clock, CheckCircle2, MessageCircle } from "lucide-react";
import { createAppointment, getWhatsAppInquiryUrl } from "@/lib/api";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialLook?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  initialService,
  initialLook,
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    email: "",
    serviceType: initialService || "Bespoke Suit",
    fittingLocation: "InStudioPanadura",
    appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    preferredTimeSlot: "10:00 AM - 11:30 AM",
    fabricInterest: initialLook ? `Inquiry based on look: ${initialLook}` : "Super 130s Wool / Italian Mill",
    specialNotes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const serviceOptions = [
    "Bespoke Two-Piece / Three-Piece Suit",
    "Groom & Wedding Party Consultation",
    "Luxury Black-Tie Suit Rental",
    "Executive Bespoke Shirts & Trousers",
    "Corporate & Institutional Uniforms",
    "Master Alteration & Garment Resculpting",
  ];

  const timeSlots = [
    "10:00 AM - 11:30 AM",
    "12:00 PM - 01:30 PM",
    "02:30 PM - 04:00 PM",
    "04:30 PM - 06:00 PM",
    "06:00 PM - 07:30 PM",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const result = await createAppointment({
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
      fittingLocation: formData.fittingLocation,
      appointmentDate: formData.appointmentDate,
      preferredTimeSlot: formData.preferredTimeSlot,
      fabricInterest: formData.fabricInterest,
      specialNotes: formData.specialNotes,
    });

    setLoading(false);

    if (result.success && result.data) {
      setSubmittedRef(result.data.referenceCode || "MST-CONFIRMED");
    } else {
      setErrorMsg(result.error || "Unable to submit booking. Please connect via WhatsApp.");
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setErrorMsg(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: "spring", stiffness: 380, damping: 25, mass: 0.7 }}
        className="card-luxury w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl border border-blue/50 shadow-blue-glow-lg relative bg-black/95 backdrop-blur-2xl"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-obsidian-border flex items-center justify-between sticky top-0 bg-obsidian-card z-10">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden border border-blue/40 shadow-blue-glow shrink-0 bg-black p-0.5">
              <Image
                src="/logo.jpg"
                alt="MS Tailors Logo"
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-blue uppercase font-bold block mb-0.5">
                Atelier Private Fitting
              </span>
              <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">
                Book Your Sartorial Consultation
              </h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-obsidian-elevated border border-obsidian-border text-silk-silver hover:text-white flex items-center justify-center transition-colors shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-7">
          {submittedRef ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-blue/15 border-2 border-blue flex items-center justify-center text-blue mx-auto mb-6 shadow-blue-glow">
                <CheckCircle2 className="w-8 h-8 text-blue" />
              </div>
              <span className="text-blue uppercase tracking-[0.25em] text-xs font-bold block mb-2">
                Booking Request Confirmed
              </span>
              <h4 className="text-2xl font-display font-bold text-white mb-2">
                We Await Your Visit at MS Tailors
              </h4>
              <p className="text-sm text-silk-muted max-w-md mx-auto mb-6">
                Your consultation request has been logged in our master atelier schedule. Our master tailor will review your details.
              </p>

              {/* Reference Ticket Box */}
              <div className="max-w-xs mx-auto p-4 rounded-xl bg-black border border-blue/40 shadow-blue-glow mb-8">
                <div className="text-[10px] uppercase text-silk-muted tracking-wider">Booking Reference</div>
                <div className="font-mono text-xl font-bold text-blue tracking-widest mt-1">
                  {submittedRef}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppInquiryUrl(
                    `Hello MS Tailors, I just submitted an appointment booking with Reference Code: ${submittedRef}. Please confirm availability.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Atelier on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-gradient text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-blue-glow"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium">
                    Full Name <span className="text-blue">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Ruwan Mendis"
                    className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium">
                    WhatsApp / Phone <span className="text-blue">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. client@example.com"
                  className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium">
                  Bespoke Service Required
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-obsidian-card">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fitting Location Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-silk-silver mb-2 font-medium">
                  Fitting Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.fittingLocation === "InStudioPanadura"
                        ? "bg-blue/15 border-blue shadow-blue-glow"
                        : "bg-black border-obsidian-border hover:border-blue/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fittingLocation"
                      value="InStudioPanadura"
                      checked={formData.fittingLocation === "InStudioPanadura"}
                      onChange={() => setFormData({ ...formData, fittingLocation: "InStudioPanadura" })}
                      className="mt-1 text-blue"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Panadura Studio Atelier</div>
                      <div className="text-[11px] text-silk-muted">No. 28 Station Road, Panadura</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      formData.fittingLocation === "TravelingTailor"
                        ? "bg-blue/15 border-blue shadow-blue-glow"
                        : "bg-black border-obsidian-border hover:border-blue/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="fittingLocation"
                      value="TravelingTailor"
                      checked={formData.fittingLocation === "TravelingTailor"}
                      onChange={() => setFormData({ ...formData, fittingLocation: "TravelingTailor" })}
                      className="mt-1 text-blue"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Traveling Master Tailor</div>
                      <div className="text-[11px] text-silk-muted">Private home or office (Colombo/Western Prov.)</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue" />
                    <span>Preferred Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2.5 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-obsidian-card">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1.5 font-medium">
                  Style or Fabric Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Upcoming wedding on December 15th, looking for a double-breasted tuxedo in Vitale Barberis wool..."
                  className="w-full bg-black border border-obsidian-border focus:border-blue px-3.5 py-2 rounded-xl text-base sm:text-sm text-white outline-none transition-colors"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-gradient text-white font-bold tracking-widest uppercase text-xs sm:text-sm rounded-xl shadow-blue-glow hover:shadow-blue-glow-lg transition-all disabled:opacity-50"
                >
                  {loading ? "Scheduling Atelier Session..." : "Confirm Consultation Request"}
                </button>
                <p className="text-[11px] text-center text-silk-muted mt-3">
                  No payment required for initial styling consultation. We will confirm your slot via WhatsApp or telephone.
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
