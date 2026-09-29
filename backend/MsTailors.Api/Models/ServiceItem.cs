using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MsTailors.Api.Models;

public class ServiceItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("slug")]
    public string Slug { get; set; } = string.Empty;

    [BsonElement("category")]
    public string Category { get; set; } = string.Empty; // BespokeSuits, GroomAndWeddings, ShirtsAndTrousers, SuitRentals, Uniforms

    [BsonElement("tagline")]
    public string Tagline { get; set; } = string.Empty;

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("detailedFeatures")]
    public List<string> DetailedFeatures { get; set; } = new();

    [BsonElement("startingPriceLkr")]
    public decimal StartingPriceLkr { get; set; }

    [BsonElement("estimatedDays")]
    public int EstimatedDays { get; set; } // Turnaround in days

    [BsonElement("imageUrl")]
    public string ImageUrl { get; set; } = string.Empty;

    [BsonElement("iconName")]
    public string IconName { get; set; } = "Scissors";

    [BsonElement("isActive")]
    public bool IsActive { get; set; } = true;

    [BsonElement("order")]
    public int Order { get; set; } = 0;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
