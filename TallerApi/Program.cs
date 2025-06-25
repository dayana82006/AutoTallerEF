using System.Reflection;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using TallerApi.Extensions;
using TallerApi.Helpers.Errors;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureCors();
builder.Services.AddAutoMapper(Assembly.GetEntryAssembly());
builder.Services.AddAplicacionServices();
builder.Services.AddCustomRateLimiter();
builder.Services.AddJwt(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddValidationErrors();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<PublicDbContext>(options =>
{
    string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
    options.UseNpgsql(connectionString);
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseRateLimiter();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();
app.Run();
