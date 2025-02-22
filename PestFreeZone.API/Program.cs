using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PestFreeZone.API.Data;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Domain.Models;
using PestFreeZone.API.Services;
using PestFreeZone.API.Services.Impl;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddAuthorization();
builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
        .AddCookie(IdentityConstants.ApplicationScheme);

builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddApiEndpoints();
builder.Services.AddDbContext<ApplicationDbContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IContentService, ContentService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.MapGet("users/me", async (ClaimsPrincipal claims, ApplicationDbContext context) =>
//{
//    string userId = claims.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

//    return await context.Users.FindAsync(userId);
//})
//.RequireAuthorization();

app.UseHttpsRedirection();

app.MapIdentityApi<User>();

app.UseAuthorization();

app.MapControllers();

app.Run();
