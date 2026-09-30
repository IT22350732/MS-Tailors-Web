using MongoDB.Driver;
using MsTailors.Api.Models;

namespace MsTailors.Api.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(MsTailorsDbContext context)
    {
        // 1. Seed Admin User if none exists
        var userCount = await context.Users.CountDocumentsAsync(FilterDefinition<User>.Empty);
        if (userCount == 0)
        {
            var admin = new User
            {
                Username = "admin",
                Email = "Mstailorspdura@gmail.com",
                FullName = "Master Tailor — MS Tailors",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@MsTailors2026"),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow
            };
            await context.Users.InsertOneAsync(admin);
        }

        // 2. Seed Services
        var servicesCount = await context.Services.CountDocumentsAsync(FilterDefinition<ServiceItem>.Empty);
        if (servicesCount == 0)
        {
            var services = new List<ServiceItem>
            {
                new()
                {
                    Title = "Bespoke Two-Piece & Three-Piece Suits",
                    Slug = "bespoke-suits",
                    Category = "Bespoke",
                    Tagline = "Individually drafted patterns, hand-canvassed construction, and artisanal drape.",
                    Description = "Our quintessential bespoke suit is drafted from a unique individual paper pattern cut exclusively for your posture and measurements. Crafted with full floating horsehair canvas, hand-stitched pick lapels, horn buttons, and silk linings.",
                    DetailedFeatures = new List<string>
                    {
                        "Full or Half Floating Canvas Construction",
                        "30+ anatomical body measurements taken",
                        "Multiple basted fittings for millimeter precision",
                        "Choice of 500+ European Super 120s–160s wools",
                        "Functional hand-cut surgeon cuff buttonholes",
                        "Personalized hand-embroidered monogram"
                    },
                    StartingPriceLkr = 85000,
                    EstimatedDays = 21,
                    ImageUrl = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80",
                    IconName = "Scissors",
                    IsActive = true,
                    Order = 1
                },
                new()
                {
                    Title = "Groom & Wedding Ensembles",
                    Slug = "wedding-groom-suits",
                    Category = "Wedding",
                    Tagline = "Sartorial majesty for your momentous occasion in Sri Lanka and abroad.",
                    Description = "A masterclass in celebratory tailoring. Whether you desire an opulent English morning suit, an Italian velvet smoking jacket, or a modern tropical linen wedding three-piece, our atelier ensures you command the celebration with effortless poise.",
                    DetailedFeatures = new List<string>
                    {
                        "Complete groom party coordination & color matching",
                        "Tuxedos, dinner jackets, double-breasted and 3-piece suites",
                        "Fabric weights tailored for Sri Lankan tropical climate",
                        "Matching waistcoats, bespoke silk ties, and pocket squares",
                        "Emergency alteration guarantee before the wedding day"
                    },
                    StartingPriceLkr = 95000,
                    EstimatedDays = 28,
                    ImageUrl = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
                    IconName = "Gem",
                    IsActive = true,
                    Order = 2
                },
                new()
                {
                    Title = "Luxury Suit Rentals (Grooms & Black-Tie)",
                    Slug = "suit-rentals",
                    Category = "Rentals",
                    Tagline = "Premium designer tuxedos and suits tailored to fit for high-society events.",
                    Description = "High-end rental service for weddings, formal galas, school socials, and corporate awards. Every rental suit is precision-altered to your exact frame by our master tailors and sanitized with clinical dry-cleaning before release.",
                    DetailedFeatures = new List<string>
                    {
                        "Complimentary sleeve and trouser hem customization",
                        "Available in slim-cut modern and classic British silhouettes",
                        "Complete package: Jacket, Trouser, Shirt, Bowtie/Tie, Cufflinks",
                        "Flexible 3-day to 7-day rental return periods",
                        "Corporate & wedding groomsmen group rental packages"
                    },
                    StartingPriceLkr = 12500,
                    EstimatedDays = 3,
                    ImageUrl = "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1200&q=80",
                    IconName = "Sparkles",
                    IsActive = true,
                    Order = 3
                },
                new()
                {
                    Title = "Handcrafted Bespoke Shirts & Trousers",
                    Slug = "shirts-and-trousers",
                    Category = "Bespoke",
                    Tagline = "Crisp Egyptian cottons, mother-of-pearl buttons, and tailored comfort.",
                    Description = "The foundation of executive daily luxury. Handcrafted shirts cut with single-needle French seams, reinforced collar stays, and bespoke trousers with side tab adjusters and sartorial pleats.",
                    DetailedFeatures = new List<string>
                    {
                        "100% Giza Egyptian and Sea Island Cotton selections",
                        "18 collar styles and 12 cuff variations",
                        "Side-adjuster Gurkha or Hollywood waistband trousers",
                        "Hand-sewn genuine Mother-of-Pearl buttons",
                        "Pre-washed to eliminate shrinkage variance"
                    },
                    StartingPriceLkr = 14500,
                    EstimatedDays = 10,
                    ImageUrl = "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80",
                    IconName = "Shirt",
                    IsActive = true,
                    Order = 4
                },
                new()
                {
                    Title = "Corporate & Institutional Uniforms",
                    Slug = "corporate-uniforms",
                    Category = "Uniforms",
                    Tagline = "Prestige institutional attire for luxury hotels, banks, and airlines.",
                    Description = "Contract tailoring for premier Sri Lankan corporations, luxury resorts, private security details, and aviation personnel. High-durability stain-resistant blends manufactured to exacting brand guidelines.",
                    DetailedFeatures = new List<string>
                    {
                        "Bulk on-site measurement service across Western Province",
                        "High-tensile, wrinkle-resistant performance fabrics",
                        "Custom embroidered corporate insignia",
                        "Dedicated account manager and serialized fitting cards",
                        "Scalable delivery pipeline from 10 to 1,000+ units"
                    },
                    StartingPriceLkr = 22000,
                    EstimatedDays = 14,
                    ImageUrl = "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80",
                    IconName = "Building2",
                    IsActive = true,
                    Order = 5
                }
            };
            await context.Services.InsertManyAsync(services);
        }

        // 3. Seed Lookbook Items
        var lookbookCount = await context.Lookbook.CountDocumentsAsync(FilterDefinition<LookbookItem>.Empty);
        if (lookbookCount == 0)
        {
            var lookbooks = new List<LookbookItem>
            {
                new()
                {
                    Title = "The Panadura Midnight Tuxedo",
                    Category = "Tuxedos",
                    Description = "Bespoke single-button black-tie tuxedo with silk grosgrain shawl lapel, jetted pockets, and matching side-stripe trousers.",
                    FabricDetails = "Vitale Barberis Canonico Super 130s Pure Wool (260 GSM, Biella, Italy)",
                    LapelStyle = "Shawl Lapel",
                    FitType = "Sartorial Slim",
                    PriceLkr = 110000,
                    IsRental = true,
                    RentalPricePerDayLkr = 15000,
                    AvailableSizes = new List<string> { "38R", "40R", "42R", "44R" },
                    ImageUrl = "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
                    Tags = new List<string> { "Black Tie", "Groom", "Silk Shawl", "Midnight Navy" },
                    IsFeatured = true,
                    Order = 1
                },
                new()
                {
                    Title = "Regent Double-Breasted Chalkstripe Suit",
                    Category = "Bespoke",
                    Description = "Power sartorial suit featuring wide peak lapels, 6x2 button stance, roped shoulder construction, and double forward pleats.",
                    FabricDetails = "Scabal Savile Row Collection Super 140s Wool (280 GSM, Huddersfield, England)",
                    LapelStyle = "Peak Lapel (11 cm)",
                    FitType = "Classic British Drape",
                    PriceLkr = 135000,
                    IsRental = false,
                    AvailableSizes = new List<string> { "Custom Bespoke Pattern" },
                    ImageUrl = "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
                    Tags = new List<string> { "Double Breasted", "Chalkstripe", "Savile Row", "Executive" },
                    IsFeatured = true,
                    Order = 2
                },
                new()
                {
                    Title = "Emerald Velvet Smoking Dinner Jacket",
                    Category = "Wedding",
                    Description = "Decadent deep bottle green cotton velvet evening jacket with quilted silk revers and frogging frog-closure details.",
                    FabricDetails = "English Mill 100% Cotton Velvet (320 GSM, Lancashire, UK)",
                    LapelStyle = "Satin Shawl Collar",
                    FitType = "Modern Tailored",
                    PriceLkr = 95000,
                    IsRental = true,
                    RentalPricePerDayLkr = 16000,
                    AvailableSizes = new List<string> { "38R", "40R", "42R" },
                    ImageUrl = "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80",
                    Tags = new List<string> { "Velvet", "Wedding", "Smoking Jacket", "Emerald" },
                    IsFeatured = true,
                    Order = 3
                },
                new()
                {
                    Title = "Ceylon Tropical Pure Linen Three-Piece",
                    Category = "Wedding",
                    Description = "Relaxed yet profoundly elegant summer wedding suit crafted from breathable Irish linen with unstructured soft shoulders.",
                    FabricDetails = "Spence Bryson 100% Irish Linen (270 GSM, Northern Ireland)",
                    LapelStyle = "Notch Lapel with AMF Stitching",
                    FitType = "Neapolitan Soft Drape",
                    PriceLkr = 88000,
                    IsRental = false,
                    AvailableSizes = new List<string> { "Custom Bespoke" },
                    ImageUrl = "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
                    Tags = new List<string> { "Linen", "Tropical", "Beach Wedding", "Sand Taupe" },
                    IsFeatured = true,
                    Order = 4
                },
                new()
                {
                    Title = "Diplomat Charcoal Prince of Wales Two-Piece",
                    Category = "Bespoke",
                    Description = "The definitive boardroom ensemble with subtle claret overcheck, Milanese hand-worked lapel boutonniere, and horn buttons.",
                    FabricDetails = "Loro Piana Tasmanian Super 150s (250 GSM, Quarona, Italy)",
                    LapelStyle = "Classic Notch Lapel",
                    FitType = "Modern Slim",
                    PriceLkr = 120000,
                    IsRental = false,
                    AvailableSizes = new List<string> { "Custom Bespoke" },
                    ImageUrl = "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
                    Tags = new List<string> { "Prince of Wales", "Corporate", "Charcoal", "Italian Wool" },
                    IsFeatured = false,
                    Order = 5
                },
                new()
                {
                    Title = "Royal Blue Groom Ceremonial Suit (Rental Ready)",
                    Category = "Rentals",
                    Description = "Striking sapphire royal blue three-piece wedding suit with contrast silver-gray patterned waistcoat and matching necktie.",
                    FabricDetails = "High-Sheen Wool Rich Blend (Crease Resistant, 270 GSM)",
                    LapelStyle = "Peak Lapel with Satin Border",
                    FitType = "Tailored Fit",
                    PriceLkr = 75000,
                    IsRental = true,
                    RentalPricePerDayLkr = 13500,
                    AvailableSizes = new List<string> { "36R", "38R", "40R", "42R", "44R", "46R" },
                    ImageUrl = "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=80",
                    Tags = new List<string> { "Rental", "Royal Blue", "Groom", "Three Piece" },
                    IsFeatured = true,
                    Order = 6
                }
            };
            await context.Lookbook.InsertManyAsync(lookbooks);
        }

        // 4. Seed Fabric Swatches
        var fabricCount = await context.Fabrics.CountDocumentsAsync(FilterDefinition<FabricSwatch>.Empty);
        if (fabricCount == 0)
        {
            var fabrics = new List<FabricSwatch>
            {
                new()
                {
                    Name = "VBC Perennial Super 110s Midnight Navy Twill",
                    Code = "VBC-110-NAV",
                    MillOrigin = "Vitale Barberis Canonico (Biella)",
                    Country = "Italy",
                    Composition = "100% Super 110s Virgin Wool",
                    Weave = "2/2 Twill",
                    WeightGsm = 260,
                    Season = "All Seasons",
                    ColorHex = "#121A2B",
                    ColorFamily = "Navy",
                    InStock = true,
                    IsFeatured = true,
                    Description = "The undisputed benchmark for daily luxury suits. Fluid drape with natural crease-recovery and refined luster.",
                    TextureImageUrl = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                },
                new()
                {
                    Name = "Scabal Londoner Charcoal Glen Check",
                    Code = "SCB-LDN-09",
                    MillOrigin = "Scabal (Huddersfield)",
                    Country = "United Kingdom",
                    Composition = "100% Super 140s Pure New Wool",
                    Weave = "Glenurquhart Check",
                    WeightGsm = 280,
                    Season = "Autumn/Winter / Air-Conditioned Boardroom",
                    ColorHex = "#333A42",
                    ColorFamily = "Charcoal",
                    InStock = true,
                    IsFeatured = true,
                    Description = "Woven in the heart of Yorkshire. A subtle, commanding check pattern for executives who appreciate British sartorial heritage.",
                    TextureImageUrl = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
                },
                new()
                {
                    Name = "Loro Piana Zelander Tropical Worsted",
                    Code = "LP-ZEL-104",
                    MillOrigin = "Loro Piana (Quarona)",
                    Country = "Italy",
                    Composition = "100% Selected New Zealand Merino Wool",
                    Weave = "Plain Weave Tropical",
                    WeightGsm = 230,
                    Season = "Tropical / Spring Summer",
                    ColorHex = "#1B2232",
                    ColorFamily = "Navy",
                    InStock = true,
                    IsFeatured = true,
                    Description = "Exceptionally lightweight and open-weave for optimal air permeability in Sri Lankan heat while holding razor-sharp creases.",
                    TextureImageUrl = "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80"
                },
                new()
                {
                    Name = "Spence Bryson Natural Oatmeal Irish Linen",
                    Code = "SB-LIN-220",
                    MillOrigin = "Spence Bryson (Belfast)",
                    Country = "Ireland",
                    Composition = "100% Master of Linen Pure Flax",
                    Weave = "Plain Linen",
                    WeightGsm = 290,
                    Season = "Spring/Summer",
                    ColorHex = "#D7C4A5",
                    ColorFamily = "Earth",
                    InStock = true,
                    IsFeatured = true,
                    Description = "Heavy, crisp Irish linen that softens gracefully over years of wear, developing the characteristic dignified linen rumple.",
                    TextureImageUrl = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"
                },
                new()
                {
                    Name = "Dormeuil Amadeus 365 Royal Oxford Black",
                    Code = "DOR-AMA-01",
                    MillOrigin = "Dormeuil",
                    Country = "United Kingdom / France",
                    Composition = "100% Pure Compact Worsted Wool",
                    Weave = "Sateen Oxford",
                    WeightGsm = 310,
                    Season = "All Seasons",
                    ColorHex = "#0C0D10",
                    ColorFamily = "Black",
                    InStock = true,
                    IsFeatured = false,
                    Description = "The ultimate black-tie fabric. Deep optical black saturation with a secret proprietary British finishing method.",
                    TextureImageUrl = "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&w=600&q=80"
                }
            };
            await context.Fabrics.InsertManyAsync(fabrics);
        }
    }
}
