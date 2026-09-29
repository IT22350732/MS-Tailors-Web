using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MsTailors.Api.Models;
using MsTailors.Api.Settings;

namespace MsTailors.Api.Data;

public class MsTailorsDbContext
{
    private readonly IMongoDatabase _database;

    public MsTailorsDbContext(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    public IMongoCollection<ServiceItem> Services => _database.GetCollection<ServiceItem>("Services");
    public IMongoCollection<LookbookItem> Lookbook => _database.GetCollection<LookbookItem>("Lookbook");
    public IMongoCollection<FabricSwatch> Fabrics => _database.GetCollection<FabricSwatch>("Fabrics");
    public IMongoCollection<Appointment> Appointments => _database.GetCollection<Appointment>("Appointments");
    public IMongoCollection<Inquiry> Inquiries => _database.GetCollection<Inquiry>("Inquiries");
}
