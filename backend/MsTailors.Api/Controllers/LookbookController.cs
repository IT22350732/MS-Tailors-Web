using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MsTailors.Api.Data;
using MsTailors.Api.DTOs;
using MsTailors.Api.Models;

namespace MsTailors.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LookbookController : ControllerBase
{
    private readonly MsTailorsDbContext _context;

    public LookbookController(MsTailorsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<LookbookItem>>> GetAll(
        [FromQuery] string? category = null,
        [FromQuery] bool? isRental = null,
        [FromQuery] bool? isFeatured = null)
    {
        var builder = Builders<LookbookItem>.Filter;
        var filter = builder.Empty;

        if (!string.IsNullOrEmpty(category) && !category.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            filter &= builder.Eq(l => l.Category, category);
        }

        if (isRental.HasValue)
        {
            filter &= builder.Eq(l => l.IsRental, isRental.Value);
        }

        if (isFeatured.HasValue)
        {
            filter &= builder.Eq(l => l.IsFeatured, isFeatured.Value);
        }

        var items = await _context.Lookbook.Find(filter).SortBy(l => l.Order).ToListAsync();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<LookbookItem>> GetById(string id)
    {
        var item = await _context.Lookbook.Find(l => l.Id == id).FirstOrDefaultAsync();
        if (item == null) return NotFound(new { message = "Lookbook item not found." });
        return Ok(item);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<LookbookItem>> Create([FromBody] LookbookDto dto)
    {
        var item = new LookbookItem
        {
            Title = dto.Title,
            Category = dto.Category,
            Description = dto.Description,
            FabricDetails = dto.FabricDetails,
            LapelStyle = dto.LapelStyle,
            FitType = dto.FitType,
            PriceLkr = dto.PriceLkr,
            IsRental = dto.IsRental,
            RentalPricePerDayLkr = dto.RentalPricePerDayLkr,
            AvailableSizes = dto.AvailableSizes,
            ImageUrl = dto.ImageUrl,
            GalleryUrls = dto.GalleryUrls,
            Tags = dto.Tags,
            IsFeatured = dto.IsFeatured,
            Order = dto.Order,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Lookbook.InsertOneAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<LookbookItem>> Update(string id, [FromBody] LookbookDto dto)
    {
        var existing = await _context.Lookbook.Find(l => l.Id == id).FirstOrDefaultAsync();
        if (existing == null) return NotFound(new { message = "Lookbook item not found." });

        existing.Title = dto.Title;
        existing.Category = dto.Category;
        existing.Description = dto.Description;
        existing.FabricDetails = dto.FabricDetails;
        existing.LapelStyle = dto.LapelStyle;
        existing.FitType = dto.FitType;
        existing.PriceLkr = dto.PriceLkr;
        existing.IsRental = dto.IsRental;
        existing.RentalPricePerDayLkr = dto.RentalPricePerDayLkr;
        existing.AvailableSizes = dto.AvailableSizes;
        existing.ImageUrl = dto.ImageUrl;
        existing.GalleryUrls = dto.GalleryUrls;
        existing.Tags = dto.Tags;
        existing.IsFeatured = dto.IsFeatured;
        existing.Order = dto.Order;

        await _context.Lookbook.ReplaceOneAsync(l => l.Id == id, existing);
        return Ok(existing);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _context.Lookbook.DeleteOneAsync(l => l.Id == id);
        if (result.DeletedCount == 0) return NotFound(new { message = "Lookbook item not found." });
        return NoContent();
    }
}
