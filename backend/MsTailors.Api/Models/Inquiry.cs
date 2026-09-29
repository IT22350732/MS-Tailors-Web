using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MsTailors.Api.Models;

public class Inquiry
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("customerName")]
    public string CustomerName { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("phone")]
    public string Phone { get; set; } = string.Empty;

    [BsonElement("subject")]
    public string Subject { get; set; } = string.Empty;

    [BsonElement("message")]
    public string Message { get; set; } = string.Empty;

    [BsonElement("inquiryType")]
    public string InquiryType { get; set; } = "General"; // General, WeddingConsultation, CorporateUniforms, SuitRental, CustomLook

    [BsonElement("preferredContactMethod")]
    public string PreferredContactMethod { get; set; } = "WhatsApp"; // WhatsApp, Phone, Email

    [BsonElement("status")]
    public string Status { get; set; } = "New"; // New, InProgress, Responded, Closed

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
