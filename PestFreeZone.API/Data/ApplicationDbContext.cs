using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using PestFreeZone.API.Domain;

namespace PestFreeZone.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public DbSet<ContentPage> ContentPages { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings =>
                warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {   
            base.OnModelCreating(builder);
            builder.Entity<User>().Property(s => s.DateOfBirth);
            builder.Entity<ContentPage>();
            builder.HasDefaultSchema("PestFreeZoneDB");

        }
    }
}
