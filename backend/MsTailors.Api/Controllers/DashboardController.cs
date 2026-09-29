using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MsTailors.Api.Data;
using MsTailors.Api.Models;

namespace MsTailors.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly MsTailorsDbContext _context;

    public DashboardController(MsTailorsDbContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("stats")]
    public async Task<ActionResult<object>> GetDashboardStats()
    {
        var totalAppointments = await _context.Appointments.CountDocumentsAsync(FilterDefinition<Appointment>.Empty);
        var pendingAppointments = await _context.Appointments.CountDocumentsAsync(a => a.Status == "Pending");
        var confirmedAppointments = await _context.Appointments.CountDocumentsAsync(a => a.Status == "Confirmed");
        var completedAppointments = await _context.Appointments.CountDocumentsAsync(a => a.Status == "Completed");

        var totalInquiries = await _context.Inquiries.CountDocumentsAsync(FilterDefinition<Inquiry>.Empty);
        var newInquiries = await _context.Inquiries.CountDocumentsAsync(i => i.Status == "New");

        var totalLookbookItems = await _context.Lookbook.CountDocumentsAsync(FilterDefinition<LookbookItem>.Empty);
        var totalRentalItems = await _context.Lookbook.CountDocumentsAsync(l => l.IsRental);
        var totalFabrics = await _context.Fabrics.CountDocumentsAsync(FilterDefinition<FabricSwatch>.Empty);

        var recentAppointments = await _context.Appointments
            .Find(FilterDefinition<Appointment>.Empty)
            .SortByDescending(a => a.CreatedAt)
            .Limit(5)
            .ToListAsync();

        var recentInquiries = await _context.Inquiries
            .Find(FilterDefinition<Inquiry>.Empty)
            .SortByDescending(i => i.CreatedAt)
            .Limit(5)
            .ToListAsync();

        return Ok(new
        {
            appointments = new
            {
                total = totalAppointments,
                pending = pendingAppointments,
                confirmed = confirmedAppointments,
                completed = completedAppointments
            },
            inquiries = new
            {
                total = totalInquiries,
                pending = newInquiries
            },
            catalog = new
            {
                lookbookItems = totalLookbookItems,
                rentals = totalRentalItems,
                fabrics = totalFabrics
            },
            recentAppointments,
            recentInquiries
        });
    }
}
