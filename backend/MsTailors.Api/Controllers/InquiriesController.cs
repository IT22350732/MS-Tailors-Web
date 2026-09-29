using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MsTailors.Api.Data;
using MsTailors.Api.DTOs;
using MsTailors.Api.Models;

namespace MsTailors.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InquiriesController : ControllerBase
{
    private readonly MsTailorsDbContext _context;

    public InquiriesController(MsTailorsDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Inquiry>> Create([FromBody] CreateInquiryRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.CustomerName) || string.IsNullOrWhiteSpace(request.Phone))
        {
            return BadRequest(new { message = "Customer name and contact number are required." });
        }

        var inquiry = new Inquiry
        {
            CustomerName = request.CustomerName,
            Email = request.Email,
            Phone = request.Phone,
            Subject = request.Subject,
            Message = request.Message,
            InquiryType = request.InquiryType,
            PreferredContactMethod = request.PreferredContactMethod,
            Status = "New",
            CreatedAt = DateTime.UtcNow
        };

        await _context.Inquiries.InsertOneAsync(inquiry);
        return CreatedAtAction(nameof(GetById), new { id = inquiry.Id }, inquiry);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<List<Inquiry>>> GetAll([FromQuery] string? status = null)
    {
        var builder = Builders<Inquiry>.Filter;
        var filter = builder.Empty;

        if (!string.IsNullOrEmpty(status) && !status.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            filter &= builder.Eq(i => i.Status, status);
        }

        var inquiries = await _context.Inquiries.Find(filter).SortByDescending(i => i.CreatedAt).ToListAsync();
        return Ok(inquiries);
    }

    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<Inquiry>> GetById(string id)
    {
        var inquiry = await _context.Inquiries.Find(i => i.Id == id).FirstOrDefaultAsync();
        if (inquiry == null) return NotFound(new { message = "Inquiry not found." });
        return Ok(inquiry);
    }

    [Authorize]
    [HttpPatch("{id}/status")]
    public async Task<ActionResult<Inquiry>> UpdateStatus(string id, [FromBody] UpdateInquiryStatusRequest request)
    {
        var inquiry = await _context.Inquiries.Find(i => i.Id == id).FirstOrDefaultAsync();
        if (inquiry == null) return NotFound(new { message = "Inquiry not found." });

        inquiry.Status = request.Status;
        await _context.Inquiries.ReplaceOneAsync(i => i.Id == id, inquiry);
        return Ok(inquiry);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _context.Inquiries.DeleteOneAsync(i => i.Id == id);
        if (result.DeletedCount == 0) return NotFound(new { message = "Inquiry not found." });
        return NoContent();
    }
}
