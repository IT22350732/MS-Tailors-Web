namespace MsTailors.Api.DTOs;

public class CreateAppointmentRequest
{
    public string CustomerName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string ServiceType { get; set; } = "Bespoke Suit";
    public string FittingLocation { get; set; } = "InStudioPanadura";
    public DateTime AppointmentDate { get; set; }
    public string PreferredTimeSlot { get; set; } = "10:00 AM - 11:30 AM";
    public string? FabricInterest { get; set; }
    public string? EstimatedBudgetLkr { get; set; }
    public string? SpecialNotes { get; set; }
}

public class UpdateAppointmentStatusRequest
{
    public string Status { get; set; } = "Pending";
    public string? AdminNotes { get; set; }
}
