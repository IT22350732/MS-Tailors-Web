"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Layers,
  Inbox,
  Sparkles,
  Scissors,
  LogOut,
  Plus,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Appointment, LookbookItem, FabricSwatch, Inquiry, DashboardStats, UserSession } from "@/lib/types";
import { API_BASE, formatLkr, FALLBACK_LOOKBOOK, FALLBACK_FABRICS, getWhatsAppInquiryUrl } from "@/lib/api";

export default function AdminPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "admin", password: "Admin@MsTailors2026" });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "lookbook" | "fabrics" | "inquiries">("overview");

  // Data states
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lookbookItems, setLookbookItems] = useState<LookbookItem[]>(FALLBACK_LOOKBOOK);
  const [fabrics, setFabrics] = useState<FabricSwatch[]>(FALLBACK_FABRICS);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filter states
  const [appointmentFilter, setAppointmentFilter] = useState<string>("All");

  // New item modals / forms
  const [showAddLookbook, setShowAddLookbook] = useState(false);
  const [newLook, setNewLook] = useState<Partial<LookbookItem>>({
    title: "",
    category: "Bespoke",
    description: "",
    fabricDetails: "Super 130s Pure Wool (Italy)",
    lapelStyle: "Peak Lapel",
    fitType: "Sartorial Slim",
    priceLkr: 95000,
    isRental: false,
    rentalPricePerDayLkr: 14000,
    availableSizes: ["38R", "40R", "42R"],
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    tags: ["Bespoke", "New Arrival"],
    isFeatured: true,
  });

  // Check stored session
  useEffect(() => {
    const saved = localStorage.getItem("mstailors_admin_session");
    if (saved) {
      try {
        setSession(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("mstailors_admin_session");
      }
    }
  }, []);

  // Fetch admin data when session is active
  useEffect(() => {
    if (session) {
      fetchAdminData();
    }
  }, [session, activeTab, appointmentFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      if (!res.ok) {
        // Fallback for demo if server is offline
        if (loginForm.username === "admin" && loginForm.password === "Admin@MsTailors2026") {
          const mockSession: UserSession = {
            token: "demo-jwt-token-mstailors",
            username: "admin",
            email: "atelier@mstailors.lk",
            fullName: "Master Tailor — MS Tailors",
            role: "Admin",
          };
          setSession(mockSession);
          localStorage.setItem("mstailors_admin_session", JSON.stringify(mockSession));
          setLoginLoading(false);
          return;
        }
        throw new Error("Invalid username or password");
      }

      const data = await res.json();
      const userSession: UserSession = {
        token: data.token,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      };
      setSession(userSession);
      localStorage.setItem("mstailors_admin_session", JSON.stringify(userSession));
    } catch (err: any) {
      // Demo fallback if backend is offline
      if (loginForm.username === "admin" && loginForm.password === "Admin@MsTailors2026") {
        const mockSession: UserSession = {
          token: "demo-jwt-token-mstailors",
          username: "admin",
          email: "atelier@mstailors.lk",
          fullName: "Master Tailor — MS Tailors",
          role: "Admin",
        };
        setSession(mockSession);
        localStorage.setItem("mstailors_admin_session", JSON.stringify(mockSession));
      } else {
        setLoginError(err.message || "Failed to log in.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem("mstailors_admin_session");
  };

  const fetchAdminData = async () => {
    setLoadingData(true);
    const headers = { Authorization: `Bearer ${session?.token}` };

    try {
      // 1. Stats
      const statsRes = await fetch(`${API_BASE}/dashboard/stats`, { headers });
      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s);
      }

      // 2. Appointments
      const appUrl = appointmentFilter === "All"
        ? `${API_BASE}/appointments`
        : `${API_BASE}/appointments?status=${appointmentFilter}`;
      const appRes = await fetch(appUrl, { headers });
      if (appRes.ok) {
        const apps = await appRes.json();
        setAppointments(apps);
      }

      // 3. Lookbook
      const lookRes = await fetch(`${API_BASE}/lookbook`);
      if (lookRes.ok) {
        const looks = await lookRes.json();
        if (looks.length > 0) setLookbookItems(looks);
      }

      // 4. Fabrics
      const fabRes = await fetch(`${API_BASE}/fabrics`);
      if (fabRes.ok) {
        const fabs = await fabRes.json();
        if (fabs.length > 0) setFabrics(fabs);
      }

      // 5. Inquiries
      const inqRes = await fetch(`${API_BASE}/inquiries`, { headers });
      if (inqRes.ok) {
        const inqs = await inqRes.json();
        setInquiries(inqs);
      }
    } catch (err) {
      console.warn("Could not fetch remote admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`${API_BASE}/appointments/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      // Update local state
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLookbook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/lookbook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify(newLook),
      });
      if (res.ok) {
        const created = await res.json();
        setLookbookItems((prev) => [created, ...prev]);
        setShowAddLookbook(false);
      } else {
        // Local simulation
        const fakeCreated: LookbookItem = {
          ...newLook as LookbookItem,
          id: String(Date.now()),
          order: 0,
        };
        setLookbookItems((prev) => [fakeCreated, ...prev]);
        setShowAddLookbook(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!session) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-4">
        <div className="card-luxury w-full max-w-md p-8 rounded-sm border border-gold/40 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian-surface mx-auto mb-4 shadow-gold-glow">
              <span className="font-display font-bold text-gold text-2xl">MS</span>
            </div>
            <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold block mb-1">
              Atelier Management Console
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-silk-ivory">
              MS Tailors — Panadura
            </h1>
            <p className="text-xs text-silk-muted mt-2">
              Sign in to manage appointments, lookbook items, customer inquiries, and fabric swatches.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-sm mb-6">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                Username or Email
              </label>
              <input
                type="text"
                required
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                className="w-full bg-obsidian border border-obsidian-border focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-silk-ivory outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-silk-silver mb-1 font-medium">
                Password
              </label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full bg-obsidian border border-obsidian-border focus:border-gold px-3.5 py-2.5 rounded-sm text-sm text-silk-ivory outline-none transition-colors"
              />
            </div>

            <div className="p-3 rounded-sm bg-obsidian-surface border border-gold/20 text-[11px] text-silk-muted">
              <span className="text-gold font-semibold block mb-0.5">Default Admin Credentials:</span>
              Username: <span className="text-silk-ivory font-mono">admin</span> | Password: <span className="text-silk-ivory font-mono">Admin@MsTailors2026</span>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gold-gradient text-obsidian font-bold tracking-widest uppercase text-xs rounded-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
            >
              {loginLoading ? "Authenticating Master Key..." : "Enter Atelier CMS"}
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-silk-muted hover:text-gold transition-colors">
                ← Return to Public Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-obsidian text-silk-pearl flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-obsidian-card border-b border-obsidian-border px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center bg-obsidian-surface">
              <span className="font-display font-bold text-gold text-sm">MS</span>
            </div>
            <div>
              <span className="font-display text-base font-bold tracking-wider text-silk-ivory">
                MS TAILORS
              </span>
              <span className="text-[10px] text-gold tracking-widest block font-sans">
                Atelier CMS Console
              </span>
            </div>
          </Link>
          <span className="hidden sm:inline text-obsidian-border">|</span>
          <span className="hidden sm:inline text-xs text-silk-muted">
            Logged in as <strong className="text-silk-ivory">{session.fullName}</strong> ({session.role})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-obsidian border border-obsidian-border text-xs text-silk-silver hover:text-gold transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={fetchAdminData}
            className="p-2 rounded-sm bg-obsidian border border-obsidian-border text-silk-silver hover:text-gold transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? "animate-spin text-gold" : ""}`} />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-red-950/30 border border-red-500/40 text-red-300 text-xs hover:bg-red-900/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-obsidian-border pb-4 mb-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "overview"
                ? "bg-gold text-obsidian shadow-gold-glow"
                : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Overview & KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "appointments"
                ? "bg-gold text-obsidian shadow-gold-glow"
                : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments ({appointments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("lookbook")}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "lookbook"
                ? "bg-gold text-obsidian shadow-gold-glow"
                : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Lookbook Catalog ({lookbookItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("fabrics")}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "fabrics"
                ? "bg-gold text-obsidian shadow-gold-glow"
                : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40"
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Fabric Mills ({fabrics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === "inquiries"
                ? "bg-gold text-obsidian shadow-gold-glow"
                : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Customer Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card-luxury p-6 rounded-sm border-l-4 border-l-gold">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase text-silk-muted tracking-wider">Bookings</span>
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <div className="text-3xl font-display font-bold text-silk-ivory">
                  {stats?.appointments.total ?? appointments.length}
                </div>
                <div className="text-xs text-gold mt-1">
                  {stats?.appointments.pending ?? 0} Pending Confirmation
                </div>
              </div>

              <div className="card-luxury p-6 rounded-sm border-l-4 border-l-emerald-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase text-silk-muted tracking-wider">Inquiries</span>
                  <Inbox className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-display font-bold text-silk-ivory">
                  {stats?.inquiries.total ?? inquiries.length}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  {stats?.inquiries.pending ?? 0} New Messages
                </div>
              </div>

              <div className="card-luxury p-6 rounded-sm border-l-4 border-l-blue-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase text-silk-muted tracking-wider">Lookbook Items</span>
                  <Layers className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-3xl font-display font-bold text-silk-ivory">
                  {lookbookItems.length}
                </div>
                <div className="text-xs text-blue-400 mt-1">
                  {lookbookItems.filter((i) => i.isRental).length} Rental Ready Looks
                </div>
              </div>

              <div className="card-luxury p-6 rounded-sm border-l-4 border-l-purple-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase text-silk-muted tracking-wider">European Fabrics</span>
                  <Scissors className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-3xl font-display font-bold text-silk-ivory">
                  {fabrics.length}
                </div>
                <div className="text-xs text-purple-400 mt-1">
                  Italy, UK & Ireland Mills
                </div>
              </div>
            </div>

            {/* Recent Appointments & Inquiries Quick View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div className="card-luxury p-6 rounded-sm">
                <div className="flex items-center justify-between mb-4 border-b border-obsidian-border pb-3">
                  <h3 className="font-display font-bold text-lg text-silk-ivory">
                    Recent Consultation Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-xs text-gold hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <p className="text-xs text-silk-muted py-6 text-center">
                    No appointment requests logged yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map((app) => (
                      <div
                        key={app.id || app.referenceCode}
                        className="p-3 rounded-sm bg-obsidian-surface border border-obsidian-border flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-silk-ivory">{app.customerName}</div>
                          <div className="text-silk-muted text-[11px]">
                            {app.serviceType} • {new Date(app.appointmentDate).toLocaleDateString()} ({app.preferredTimeSlot})
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-sm font-semibold text-[10px] uppercase ${
                            app.status === "Confirmed"
                              ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                              : app.status === "Completed"
                              ? "bg-blue-950/60 border border-blue-500/40 text-blue-400"
                              : "bg-amber-950/60 border border-amber-500/40 text-amber-400"
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Inquiries */}
              <div className="card-luxury p-6 rounded-sm">
                <div className="flex items-center justify-between mb-4 border-b border-obsidian-border pb-3">
                  <h3 className="font-display font-bold text-lg text-silk-ivory">
                    Customer Inquiries Feed
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs text-gold hover:underline flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <p className="text-xs text-silk-muted py-6 text-center">
                    No customer inquiries received yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {inquiries.slice(0, 5).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3 rounded-sm bg-obsidian-surface border border-obsidian-border flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-silk-ivory">{inq.customerName}</div>
                          <div className="text-silk-muted text-[11px]">
                            {inq.subject} • via {inq.preferredContactMethod}
                          </div>
                        </div>
                        <a
                          href={getWhatsAppInquiryUrl(`Hello ${inq.customerName}, regarding your inquiry with MS Tailors:`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-[10px] rounded-sm flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS MANAGEMENT */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-display font-bold text-silk-ivory">
                  Atelier Appointments & Bookings
                </h2>
                <p className="text-xs text-silk-muted">
                  Manage private fitting slots, customer contacts, and appointment confirmations.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-2">
                {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setAppointmentFilter(status)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-medium uppercase tracking-wider transition-all ${
                      appointmentFilter === status
                        ? "bg-gold text-obsidian font-bold shadow-gold-glow"
                        : "bg-obsidian-surface border border-obsidian-border text-silk-silver hover:border-gold/40"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointments Table */}
            <div className="card-luxury rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-obsidian-elevated border-b border-obsidian-border text-silk-muted uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Ref / Client</th>
                    <th className="p-3.5">Service & Location</th>
                    <th className="p-3.5">Date & Slot</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-border">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-silk-muted">
                        No appointments found matching filter.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((app) => (
                      <tr key={app.id || app.referenceCode} className="hover:bg-obsidian-surface/60 transition-colors">
                        <td className="p-3.5">
                          <span className="font-mono text-gold font-bold block">{app.referenceCode || "MST-PENDING"}</span>
                          <span className="text-silk-ivory font-semibold">{app.customerName}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="text-silk-ivory">{app.serviceType}</div>
                          <div className="text-[11px] text-silk-muted">
                            {app.fittingLocation === "InStudioPanadura" ? "Panadura Studio" : "Traveling Tailor"}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="text-silk-ivory">{new Date(app.appointmentDate).toLocaleDateString()}</div>
                          <div className="text-[11px] text-silk-muted">{app.preferredTimeSlot}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="text-silk-ivory">{app.phone}</div>
                          {app.email && <div className="text-[11px] text-silk-muted">{app.email}</div>}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-sm text-[10px] uppercase font-bold tracking-wider inline-block ${
                              app.status === "Confirmed"
                                ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400"
                                : app.status === "Completed"
                                ? "bg-blue-950/60 border border-blue-500/40 text-blue-400"
                                : app.status === "Cancelled"
                                ? "bg-red-950/60 border border-red-500/40 text-red-400"
                                : "bg-amber-950/60 border border-amber-500/40 text-amber-400"
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5">
                          {app.id && app.status !== "Confirmed" && (
                            <button
                              onClick={() => handleUpdateAppointmentStatus(app.id!, "Confirmed")}
                              className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/60 rounded-sm font-semibold"
                            >
                              Confirm
                            </button>
                          )}
                          {app.id && app.status === "Confirmed" && (
                            <button
                              onClick={() => handleUpdateAppointmentStatus(app.id!, "Completed")}
                              className="px-2.5 py-1 bg-blue-950/60 border border-blue-500/50 text-blue-400 hover:bg-blue-900/60 rounded-sm font-semibold"
                            >
                              Complete
                            </button>
                          )}
                          {app.id && app.status !== "Cancelled" && (
                            <button
                              onClick={() => handleUpdateAppointmentStatus(app.id!, "Cancelled")}
                              className="px-2.5 py-1 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-sm"
                            >
                              Cancel
                            </button>
                          )}
                          <a
                            href={getWhatsAppInquiryUrl(
                              `Hello ${app.customerName}, this is MS Tailors Panadura confirming your bespoke appointment for ${new Date(app.appointmentDate).toLocaleDateString()} at ${app.preferredTimeSlot}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-2 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded-sm"
                            title="Direct WhatsApp Client"
                          >
                            <MessageCircle className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LOOKBOOK CATALOG */}
        {activeTab === "lookbook" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-silk-ivory">
                  Lookbook & Rental Catalog
                </h2>
                <p className="text-xs text-silk-muted">
                  Showcase bespoke looks, wedding tuxedos, and rental ready ensembles.
                </p>
              </div>
              <button
                onClick={() => setShowAddLookbook(true)}
                className="px-4 py-2 bg-gold-gradient text-obsidian text-xs font-bold uppercase tracking-wider rounded-sm shadow-gold-glow flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Look</span>
              </button>
            </div>

            {/* Lookbook Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lookbookItems.map((item) => (
                <div key={item.id || item.title} className="card-luxury rounded-sm overflow-hidden flex flex-col justify-between">
                  <div className="relative h-56 bg-obsidian-elevated">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded-sm bg-obsidian/90 text-gold text-[10px] font-bold uppercase">
                        {item.category}
                      </span>
                      {item.isRental && (
                        <span className="px-2 py-0.5 rounded-sm bg-blue-950/90 text-blue-300 text-[10px] font-bold uppercase">
                          Rental
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-silk-ivory text-base mb-1">{item.title}</h3>
                    <p className="text-xs text-silk-muted line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-obsidian-border text-xs">
                      <span className="text-silk-muted">{item.fabricDetails.split("(")[0]}</span>
                      {item.priceLkr && <span className="text-gold font-bold">{formatLkr(item.priceLkr)}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Lookbook Modal */}
            {showAddLookbook && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
                <div className="card-luxury w-full max-w-lg p-6 rounded-sm border border-gold/40 shadow-2xl relative">
                  <h3 className="font-display font-bold text-xl text-silk-ivory mb-4 border-b border-obsidian-border pb-3">
                    Add Lookbook Item
                  </h3>
                  <form onSubmit={handleCreateLookbook} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-silk-silver mb-1 font-medium">Title</label>
                      <input
                        type="text"
                        required
                        value={newLook.title}
                        onChange={(e) => setNewLook({ ...newLook, title: e.target.value })}
                        placeholder="e.g. Sovereign Black Tie Dinner Suit"
                        className="w-full bg-obsidian border border-obsidian-border px-3 py-2 rounded-sm text-silk-ivory outline-none focus:border-gold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-silk-silver mb-1 font-medium">Category</label>
                        <select
                          value={newLook.category}
                          onChange={(e) => setNewLook({ ...newLook, category: e.target.value })}
                          className="w-full bg-obsidian border border-obsidian-border px-3 py-2 rounded-sm text-silk-ivory outline-none focus:border-gold"
                        >
                          <option value="Bespoke">Bespoke</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Tuxedos">Tuxedos</option>
                          <option value="Rentals">Rentals</option>
                          <option value="Uniforms">Uniforms</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-silk-silver mb-1 font-medium">Price (LKR)</label>
                        <input
                          type="number"
                          value={newLook.priceLkr || ""}
                          onChange={(e) => setNewLook({ ...newLook, priceLkr: Number(e.target.value) })}
                          placeholder="e.g. 110000"
                          className="w-full bg-obsidian border border-obsidian-border px-3 py-2 rounded-sm text-silk-ivory outline-none focus:border-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-silk-silver mb-1 font-medium">Image URL</label>
                      <input
                        type="url"
                        required
                        value={newLook.imageUrl}
                        onChange={(e) => setNewLook({ ...newLook, imageUrl: e.target.value })}
                        className="w-full bg-obsidian border border-obsidian-border px-3 py-2 rounded-sm text-silk-ivory outline-none focus:border-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-silk-silver mb-1 font-medium">Description</label>
                      <textarea
                        rows={2}
                        value={newLook.description}
                        onChange={(e) => setNewLook({ ...newLook, description: e.target.value })}
                        className="w-full bg-obsidian border border-obsidian-border px-3 py-2 rounded-sm text-silk-ivory outline-none focus:border-gold"
                      />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newLook.isRental}
                        onChange={(e) => setNewLook({ ...newLook, isRental: e.target.checked })}
                        className="text-gold"
                      />
                      <span className="text-silk-silver">Enable as Suit Rental Option</span>
                    </label>

                    <div className="flex gap-3 pt-3 border-t border-obsidian-border">
                      <button
                        type="button"
                        onClick={() => setShowAddLookbook(false)}
                        className="flex-1 py-2.5 bg-obsidian-surface border border-obsidian-border text-silk-silver hover:text-white rounded-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-gold-gradient text-obsidian font-bold rounded-sm shadow-gold-glow"
                      >
                        Publish Look
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: FABRIC MILLS */}
        {activeTab === "fabrics" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-silk-ivory">
                Fabric Mills & Swatches
              </h2>
              <p className="text-xs text-silk-muted">
                Curate Italian, English, and Irish mill swatches available for bespoke clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fabrics.map((fab) => (
                <div key={fab.code} className="card-luxury p-5 rounded-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-gold text-xs">{fab.code}</span>
                      <span className="text-[10px] text-silk-muted uppercase bg-obsidian px-2 py-0.5 rounded-sm border border-obsidian-border">
                        {fab.country}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-silk-ivory text-base mb-1">{fab.name}</h3>
                    <p className="text-xs text-gold/80 mb-2">{fab.millOrigin}</p>
                    <p className="text-xs text-silk-muted font-light mb-3">{fab.description}</p>
                  </div>
                  <div className="pt-3 border-t border-obsidian-border flex items-center justify-between text-xs">
                    <span className="text-silk-silver">{fab.composition}</span>
                    <span className="text-silk-muted font-mono">{fab.weightGsm} GSM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-silk-ivory">
                Customer Direct Inquiries
              </h2>
              <p className="text-xs text-silk-muted">
                Incoming messages from the website and direct WhatsApp inquiries.
              </p>
            </div>

            <div className="card-luxury rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-obsidian-elevated border-b border-obsidian-border text-silk-muted uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Contact Details</th>
                    <th className="p-3.5">Subject & Message</th>
                    <th className="p-3.5">Channel</th>
                    <th className="p-3.5 text-right">Quick Reply</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian-border">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-silk-muted">
                        No inquiries recorded yet.
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-obsidian-surface/60 transition-colors">
                        <td className="p-3.5 font-semibold text-silk-ivory">{inq.customerName}</td>
                        <td className="p-3.5">
                          <div className="text-silk-ivory">{inq.phone}</div>
                          {inq.email && <div className="text-[11px] text-silk-muted">{inq.email}</div>}
                        </td>
                        <td className="p-3.5 max-w-sm">
                          <div className="font-medium text-silk-ivory">{inq.subject}</div>
                          <div className="text-silk-muted text-[11px] line-clamp-2">{inq.message}</div>
                        </td>
                        <td className="p-3.5 text-gold font-medium">{inq.preferredContactMethod}</td>
                        <td className="p-3.5 text-right">
                          <a
                            href={getWhatsAppInquiryUrl(
                              `Hello ${inq.customerName}, thank you for contacting MS Tailors Panadura regarding "${inq.subject}". How may our master tailors assist you today?`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-sm text-xs font-semibold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
