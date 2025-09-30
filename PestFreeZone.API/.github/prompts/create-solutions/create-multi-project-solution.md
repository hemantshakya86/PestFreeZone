Goal: Add a solution file and register existing projects so the workspace displays as a multi-project solution.

Context:
- Repo root: `d:\Projects\PestFreeZone`
- API folder: `d:\Projects\PestFreeZone\PestFreeZone.API`
- New projects:
  - `PestFreeZone.Core\PestFreeZone.Core.csproj`
  - `PestFreeZone.Application\PestFreeZone.Application.csproj`
  - `PestFreeZone.Infrastructure\PestFreeZone.Infrastructure.csproj`
- Existing API project: `PestFreeZone.API.csproj`

Steps for assistant:
1. Create a solution in `PestFreeZone.API` named `PestFreeZone.API.sln` if it doesn't exist.
2. Add the four projects (Core, Application, Infrastructure, API) using `dotnet sln add` commands.
3. Update or create a minimal README entry in `.github/prompts/create-solutions/README.md` describing how to open the solution in the IDE.

PowerShell commands (run from `d:\Projects\PestFreeZone\PestFreeZone.API`):

```powershell
# create or reuse solution
if (-not (Test-Path .\PestFreeZone.API.sln)) { dotnet new sln -n PestFreeZone.API }
# add projects
dotnet sln PestFreeZone.API.sln add .\PestFreeZone.Core\PestFreeZone.Core.csproj
dotnet sln PestFreeZone.API.sln add .\PestFreeZone.Application\PestFreeZone.Application.csproj
dotnet sln PestFreeZone.API.sln add .\PestFreeZone.Infrastructure\PestFreeZone.Infrastructure.csproj
dotnet sln PestFreeZone.API.sln add .\PestFreeZone.API.csproj
```

Notes:
- Run `dotnet restore` and `dotnet build` after adding projects to the solution.
- If the top-level `PestFreeZone.sln` is used in CI, prefer adding projects there instead (run from repo root).
