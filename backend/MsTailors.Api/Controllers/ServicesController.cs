using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MsTailors.Api.Data;
using MsTailors.Api.DTOs;
using MsTailors.Api.Models;

namespace MsTailors.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly MsTailorsDbContext _context;

    public ServicesController(MsTailorsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ServiceItem>>> GetAll([FromQuery] bool activeOnly = true)
    {
        var filter = activeOnly
            ? Builders<ServiceItem>.Filter.Eq(s => s.IsActive, true)
            : Builders<ServiceItem>.Filter.Empty;

        var items = await _context.Services.Find(filter).SortBy(s => s.Order).ToListAsync();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceItem>> GetById(string id)
    {
        var item = await _context.Services.Find(s => s.Id == id).FirstOrDefaultAsync();
        if (item == null) return NotFound(new { message = "Service not found." });
        return Ok(item);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<ServiceItem>> Create([FromBody] ServiceDto dto)
    {
        var service = new ServiceItem
        {
            Title = dto.Title,
            Slug = string.IsNullOrWhiteSpace(dto.Slug) ? dto.Title.ToLower().Replace(" ", "-") : dto.Slug,
            Category = dto.Category,
            Tagline = dto.Tagline,
            Description = dto.Description,
            DetailedFeatures = dto.DetailedFeatures,
            StartingPriceLkr = dto.StartingPriceLkr,
            EstimatedDays = dto.EstimatedDays,
            ImageUrl = dto.ImageUrl,
            IconName = dto.IconName,
            IsActive = dto.IsActive,
            Order = dto.Order,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Services.InsertOneAsync(service);
        return CreatedAtAction(nameof(GetById), new { id = service.Id }, service);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<ServiceItem>> Update(string id, [FromBody] ServiceDto dto)
    {
        var existing = await _context.Services.Find(s => s.Id == id).FirstOrDefaultAsync();
        if (existing == null) return NotFound(new { message = "Service not found." });

        existing.Title = dto.Title;
        existing.Slug = dto.Slug;
        existing.Category = dto.Category;
        existing.Tagline = dto.Tagline;
        existing.Description = dto.Description;
        existing.DetailedFeatures = dto.DetailedFeatures;
        existing.StartingPriceLkr = dto.StartingPriceLkr;
        existing.EstimatedDays = dto.EstimatedDays;
        existing.ImageUrl = dto.ImageUrl;
        existing.IconName = dto.IconName;
        existing.IsActive = dto.IsActive;
        existing.Order = dto.Order;

        await _context.Services.ReplaceOneAsync(s => s.Id == id, existing);
        return Ok(existing);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _context.Services.DeleteOneAsync(s => s.Id == id);
        if (result.DeletedCount == 0) return NotFound(new { message = "Service not found." });
        return NoContent();
    }
}
