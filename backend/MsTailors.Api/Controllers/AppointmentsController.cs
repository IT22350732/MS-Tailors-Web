using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MsTailors.Api.Data;
using MsTailors.Api.DTOs;
using MsTailors.Api.Models;

namespace MsTailors.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly MsTailorsDbContext _context;

    public AppointmentsController(MsTailorsDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Appointment>> Create([FromBody] CreateAppointmentRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.CustomerName) || string.IsNullOrWhiteSpace(request.Phone))
        {
            return BadRequest(new { message = "Customer name and phone number are required." });
        }

        var random = new Random();
        var refCode = $"MST-{DateTime.UtcNow:yyMM}-{random.Next(1000, 9999)}";

        var appointment = new Appointment
        {
            ReferenceCode = refCode,
            CustomerName = request.CustomerName,
            Email = request.Email,
            Phone = request.Phone,
            ServiceType = request.ServiceType,
            FittingLocation = request.FittingLocation,
            AppointmentDate = request.AppointmentDate,
            PreferredTimeSlot = request.PreferredTimeSlot,
            FabricInterest = request.FabricInterest ?? string.Empty,
            EstimatedBudgetLkr = request.EstimatedBudgetLkr ?? string.Empty,
            SpecialNotes = request.SpecialNotes ?? string.Empty,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        await _context.Appointments.InsertOneAsync(appointment);
        return CreatedAtAction(nameof(GetById), new { id = appointment.Id }, appointment);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Appointment>>> GetAll([FromQuery] string? status = null)
    {
        var builder = Builders<Appointment>.Filter;
        var filter = builder.Empty;

        if (!string.IsNullOrEmpty(status) && !status.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            filter &= builder.Eq(a => a.Status, status);
        }

        var appointments = await _context.Appointments.Find(filter).SortByDescending(a => a.CreatedAt).ToListAsync();
        return Ok(appointments);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetById(string id)
    {
        var appointment = await _context.Appointments.Find(a => a.Id == id).FirstOrDefaultAsync();
        if (appointment == null) return NotFound(new { message = "Appointment not found." });
        return Ok(appointment);
    }

    [Authorize]
    [HttpPatch("{id}/status")]
    public async Task<ActionResult<Appointment>> UpdateStatus(string id, [FromBody] UpdateAppointmentStatusRequest request)
    {
        var appointment = await _context.Appointments.Find(a => a.Id == id).FirstOrDefaultAsync();
        if (appointment == null) return NotFound(new { message = "Appointment not found." });

        appointment.Status = request.Status;
        if (!string.IsNullOrEmpty(request.AdminNotes))
        {
            appointment.AdminNotes = request.AdminNotes;
        }
        appointment.UpdatedAt = DateTime.UtcNow;

        await _context.Appointments.ReplaceOneAsync(a => a.Id == id, appointment);
        return Ok(appointment);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _context.Appointments.DeleteOneAsync(a => a.Id == id);
        if (result.DeletedCount == 0) return NotFound(new { message = "Appointment not found." });
        return NoContent();
    }
}
