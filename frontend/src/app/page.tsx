"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CraftsmanshipStory from "@/components/CraftsmanshipStory";
import ServicesSection from "@/components/ServicesSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import LookbookSection from "@/components/LookbookSection";
import FabricLibrarySection from "@/components/FabricLibrarySection";
import SuitRentalSection from "@/components/SuitRentalSection";
import LocationContactSection from "@/components/LocationContactSection";
import FloatingHotlineBar from "@/components/FloatingHotlineBar";
import Footer from "@/components/Footer";
import AppointmentModal from "@/components/AppointmentModal";
import { ServiceItem, LookbookItem, FabricSwatch } from "@/lib/types";
import { getServices, getLookbook, getFabrics, FALLBACK_SERVICES, FALLBACK_LOOKBOOK, FALLBACK_FABRICS } from "@/lib/api";
import { ScrollProgressBar } from "@/components/Motion3D";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedLook, setSelectedLook] = useState<string | undefined>(undefined);

  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES);
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>(FALLBACK_LOOKBOOK);
  const [fabrics, setFabrics] = useState<FabricSwatch[]>(FALLBACK_FABRICS);

  useEffect(() => {
    // Fetch live data from backend with fallback defaults
    getServices().then((data) => {
      if (data && data.length > 0) setServices(data);
    });

    getLookbook().then((data) => {
      if (data && data.length > 0) setLookbookItems(data);
    });

    getFabrics().then((data) => {
      if (data && data.length > 0) setFabrics(data);
    });
  }, []);

  const handleOpenBooking = () => {
    setSelectedService(undefined);
    setSelectedLook(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithService = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedLook(undefined);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithLook = (lookTitle: string) => {
    setSelectedLook(lookTitle);
    setSelectedService("Bespoke Two-Piece / Three-Piece Suit");
    setIsBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-obsidian text-silk-pearl selection:bg-blue/30 selection:text-white">
      {/* 3D Global Laser Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Sticky Luxury Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section */}
      <Hero onOpenBooking={handleOpenBooking} />

      {/* Craftsmanship & Sartorial Heritage */}
      <CraftsmanshipStory />

      {/* Services Showcase */}
      <ServicesSection
        services={services}
        onOpenBookingWithService={handleOpenBookingWithService}
      />

      {/* 5-Step Process Timeline */}
      <ProcessTimeline />

      {/* Curated Lookbook Portfolio */}
      <LookbookSection
        items={lookbookItems}
        onOpenBookingWithLook={handleOpenBookingWithLook}
      />

      {/* European Fabric & Mill Library */}
      <FabricLibrarySection
        fabrics={fabrics}
        onOpenBooking={handleOpenBooking}
      />

      {/* Suit Rental & Ready-Made Section */}
      <SuitRentalSection onOpenBooking={handleOpenBooking} />

      {/* Panadura Atelier Location & Direct Contact */}
      <LocationContactSection />

      {/* Footer */}
      <Footer />

      {/* Mobile Floating Hotline Bar */}
      <FloatingHotlineBar onOpenBooking={handleOpenBooking} />

      {/* Interactive Consultation & Measurement Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedService}
        initialLook={selectedLook}
      />
    </main>
  );
}
