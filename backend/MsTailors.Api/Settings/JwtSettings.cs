namespace MsTailors.Api.Settings;

public class JwtSettings
{
    public string Secret { get; set; } = string.Empty;
    public string Issuer { get; set; } = "MsTailorsApi";
    public string Audience { get; set; } = "MsTailorsClients";
    public int ExpiryMinutes { get; set; } = 1440;
}
