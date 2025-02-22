using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PestFreeZone.API.Domain;

namespace PestFreeZone.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<ContentPage> ContentPages { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>().Property(s => s.DateOfBirth);
            builder.Entity<ContentPage>();
            builder.HasDefaultSchema("PestFreeZoneDB");

        }
    }
}
