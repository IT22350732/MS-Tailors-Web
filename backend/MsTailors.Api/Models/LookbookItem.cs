using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MsTailors.Api.Models;

public class LookbookItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("category")]
    public string Category { get; set; } = string.Empty; // Bespoke, Wedding, Tuxedos, Blazers, ReadyToWear, Rentals, Uniforms

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("fabricDetails")]
    public string FabricDetails { get; set; } = string.Empty;

    [BsonElement("lapelStyle")]
    public string LapelStyle { get; set; } = string.Empty; // Peak, Notch, Shawl

    [BsonElement("fitType")]
    public string FitType { get; set; } = string.Empty; // Slim Fit, Sartorial Classic, Modern Tailored

    [BsonElement("priceLkr")]
    public decimal? PriceLkr { get; set; }

    [BsonElement("isRental")]
    public bool IsRental { get; set; } = false;

    [BsonElement("rentalPricePerDayLkr")]
    public decimal? RentalPricePerDayLkr { get; set; }

    [BsonElement("availableSizes")]
    public List<string> AvailableSizes { get; set; } = new(); // 36R, 38R, 40R, 42R, etc.

    [BsonElement("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [BsonElement("galleryUrls")]
    public List<string> GalleryUrls { get; set; } = new();

    [BsonElement("tags")]
    public List<string> Tags { get; set; } = new();

    [BsonElement("isFeatured")]
    public bool IsFeatured { get; set; } = false;

    [BsonElement("order")]
    public int Order { get; set; } = 0;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
