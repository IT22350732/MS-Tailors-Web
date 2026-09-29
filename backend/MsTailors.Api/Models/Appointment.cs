using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MsTailors.Api.Models;

public class Appointment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("referenceCode")]
    public string ReferenceCode { get; set; } = string.Empty; // e.g. MST-2026-001

    [BsonElement("customerName")]
    public string CustomerName { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("phone")]
    public string Phone { get; set; } = string.Empty;

    [BsonElement("serviceType")]
    public string ServiceType { get; set; } = "Bespoke Suit"; // Bespoke Suit, Wedding Consultation, Suit Rental, Uniforms, Alterations

    [BsonElement("fittingLocation")]
    public string FittingLocation { get; set; } = "InStudioPanadura"; // InStudioPanadura, TravelingTailor

    [BsonElement("appointmentDate")]
    public DateTime AppointmentDate { get; set; }

    [BsonElement("preferredTimeSlot")]
    public string PreferredTimeSlot { get; set; } = "10:00 AM - 11:30 AM";

    [BsonElement("fabricInterest")]
    public string FabricInterest { get; set; } = string.Empty;

    [BsonElement("estimatedBudgetLkr")]
    public string EstimatedBudgetLkr { get; set; } = string.Empty;

    [BsonElement("specialNotes")]
    public string SpecialNotes { get; set; } = string.Empty;

    [BsonElement("status")]
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Completed, Cancelled

    [BsonElement("adminNotes")]
    public string AdminNotes { get; set; } = string.Empty;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime? UpdatedAt { get; set; }
}
