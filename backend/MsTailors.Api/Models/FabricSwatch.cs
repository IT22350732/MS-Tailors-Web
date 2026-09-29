using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MsTailors.Api.Models;

public class FabricSwatch
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("code")]
    public string Code { get; set; } = string.Empty;

    [BsonElement("millOrigin")]
    public string MillOrigin { get; set; } = string.Empty; // Vitale Barberis Canonico (Italy), Scabal (England), Loro Piana (Italy), Dormeuil (UK)

    [BsonElement("country")]
    public string Country { get; set; } = string.Empty; // Italy, United Kingdom, Ireland

    [BsonElement("composition")]
    public string Composition { get; set; } = string.Empty; // 100% Super 150s Merino Wool, Wool & Silk Blend, Pure Irish Linen

    [BsonElement("weave")]
    public string Weave { get; set; } = string.Empty; // Twill, Herringbone, Birdseye, Sharkskin, Glen Check

    [BsonElement("weightGsm")]
    public int WeightGsm { get; set; } // 240, 280, 320, 360

    [BsonElement("season")]
    public string Season { get; set; } = "All Seasons"; // Spring/Summer, Autumn/Winter, All Seasons

    [BsonElement("textureImageUrl")]
    public string TextureImageUrl { get; set; } = string.Empty;

    [BsonElement("colorHex")]
    public string ColorHex { get; set; } = "#1E293B";

    [BsonElement("colorFamily")]
    public string ColorFamily { get; set; } = "Navy"; // Navy, Charcoal, Black, Earth, Olive, Pattern

    [BsonElement("inStock")]
    public bool InStock { get; set; } = true;

    [BsonElement("isFeatured")]
    public bool IsFeatured { get; set; } = false;

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
