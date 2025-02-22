using Microsoft.AspNetCore.Identity;

namespace PestFreeZone.API.Domain
{
    public class User : IdentityUser
    {
        public DateTime? DateOfBirth { get; set; }
    }
}
