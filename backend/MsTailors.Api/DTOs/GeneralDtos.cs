namespace MsTailors.Api.DTOs;

public class LookbookDto
{
    public string? Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string FabricDetails { get; set; } = string.Empty;
    public string LapelStyle { get; set; } = string.Empty;
    public string FitType { get; set; } = string.Empty;
    public decimal? PriceLkr { get; set; }
    public bool IsRental { get; set; }
    public decimal? RentalPricePerDayLkr { get; set; }
    public List<string> AvailableSizes { get; set; } = new();
    public string ImageUrl { get; set; } = string.Empty;
    public List<string> GalleryUrls { get; set; } = new();
    public List<string> Tags { get; set; } = new();
    public bool IsFeatured { get; set; }
    public int Order { get; set; }
}

public class FabricDto
{
    public string? Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string MillOrigin { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Composition { get; set; } = string.Empty;
    public string Weave { get; set; } = string.Empty;
    public int WeightGsm { get; set; }
    public string Season { get; set; } = "All Seasons";
    public string TextureImageUrl { get; set; } = string.Empty;
    public string ColorHex { get; set; } = "#1E293B";
    public string ColorFamily { get; set; } = "Navy";
    public bool InStock { get; set; } = true;
    public bool IsFeatured { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class ServiceDto
{
    public string? Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> DetailedFeatures { get; set; } = new();
    public decimal StartingPriceLkr { get; set; }
    public int EstimatedDays { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string IconName { get; set; } = "Scissors";
    public bool IsActive { get; set; } = true;
    public int Order { get; set; }
}

public class CreateInquiryRequest
{
    public string CustomerName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string InquiryType { get; set; } = "General";
    public string PreferredContactMethod { get; set; } = "WhatsApp";
}

public class UpdateInquiryStatusRequest
{
    public string Status { get; set; } = "New";
}
