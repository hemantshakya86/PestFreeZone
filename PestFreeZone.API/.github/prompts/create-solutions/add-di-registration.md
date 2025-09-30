Goal: Add an extension method in Infrastructure to register EF DbContext, UnitOfWork, and repository implementations, then call it from `Program.cs`.

Context:
- Infrastructure project: `PestFreeZone.Infrastructure`
- DbContext: `PestFreeZone.Infrastructure.Data.ApplicationDbContext`
- UnitOfWork: `PestFreeZone.Infrastructure.Data.UnitOfWork`
- Service implementations: `PestFreeZone.Application.Services.Impl.ContentService`

Steps for assistant:
1. Create `PestFreeZone.Infrastructure/DependencyInjection.cs` with an extension method `AddInfrastructureServices(this IServiceCollection services, IConfiguration config)` which:
   - Registers `ApplicationDbContext` with `UseNpgsql(config.GetConnectionString("Database"))`.
   - Registers `IUnitOfWork` -> `UnitOfWork`.
2. Optionally create `PestFreeZone.Application/DependencyInjection.cs` to register application services like `IContentService` -> `ContentService`.
3. Modify `Program.cs` to call `builder.Services.AddInfrastructureServices(builder.Configuration)` and `builder.Services.AddApplicationServices()`.

Example (PowerShell/C# changes are required):
- Add code files and update `Program.cs` to call the new extension methods.
- Run `dotnet build` to validate.
