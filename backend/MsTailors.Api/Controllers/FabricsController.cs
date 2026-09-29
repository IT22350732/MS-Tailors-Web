using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MsTailors.Api.Data;
using MsTailors.Api.DTOs;
using MsTailors.Api.Models;

namespace MsTailors.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FabricsController : ControllerBase
{
    private readonly MsTailorsDbContext _context;

    public FabricsController(MsTailorsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<FabricSwatch>>> GetAll(
        [FromQuery] string? millOrigin = null,
        [FromQuery] string? colorFamily = null,
        [FromQuery] bool? inStock = null)
    {
        var builder = Builders<FabricSwatch>.Filter;
        var filter = builder.Empty;

        if (!string.IsNullOrEmpty(millOrigin))
        {
            filter &= builder.Regex(f => f.MillOrigin, new MongoDB.Bson.BsonRegularExpression(millOrigin, "i"));
        }

        if (!string.IsNullOrEmpty(colorFamily) && !colorFamily.Equals("All", StringComparison.OrdinalIgnoreCase))
        {
            filter &= builder.Eq(f => f.ColorFamily, colorFamily);
        }

        if (inStock.HasValue)
        {
            filter &= builder.Eq(f => f.InStock, inStock.Value);
        }

        var items = await _context.Fabrics.Find(filter).ToListAsync();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<FabricSwatch>> GetById(string id)
    {
        var item = await _context.Fabrics.Find(f => f.Id == id).FirstOrDefaultAsync();
        if (item == null) return NotFound(new { message = "Fabric swatch not found." });
        return Ok(item);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<FabricSwatch>> Create([FromBody] FabricDto dto)
    {
        var item = new FabricSwatch
        {
            Name = dto.Name,
            Code = dto.Code,
            MillOrigin = dto.MillOrigin,
            Country = dto.Country,
            Composition = dto.Composition,
            Weave = dto.Weave,
            WeightGsm = dto.WeightGsm,
            Season = dto.Season,
            TextureImageUrl = dto.TextureImageUrl,
            ColorHex = dto.ColorHex,
            ColorFamily = dto.ColorFamily,
            InStock = dto.InStock,
            IsFeatured = dto.IsFeatured,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Fabrics.InsertOneAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<FabricSwatch>> Update(string id, [FromBody] FabricDto dto)
    {
        var existing = await _context.Fabrics.Find(f => f.Id == id).FirstOrDefaultAsync();
        if (existing == null) return NotFound(new { message = "Fabric swatch not found." });

        existing.Name = dto.Name;
        existing.Code = dto.Code;
        existing.MillOrigin = dto.MillOrigin;
        existing.Country = dto.Country;
        existing.Composition = dto.Composition;
        existing.Weave = dto.Weave;
        existing.WeightGsm = dto.WeightGsm;
        existing.Season = dto.Season;
        existing.TextureImageUrl = dto.TextureImageUrl;
        existing.ColorHex = dto.ColorHex;
        existing.ColorFamily = dto.ColorFamily;
        existing.InStock = dto.InStock;
        existing.IsFeatured = dto.IsFeatured;
        existing.Description = dto.Description;

        await _context.Fabrics.ReplaceOneAsync(f => f.Id == id, existing);
        return Ok(existing);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var result = await _context.Fabrics.DeleteOneAsync(f => f.Id == id);
        if (result.DeletedCount == 0) return NotFound(new { message = "Fabric swatch not found." });
        return NoContent();
    }
}
