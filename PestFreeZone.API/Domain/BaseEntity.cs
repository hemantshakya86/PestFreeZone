using System.ComponentModel.DataAnnotations;

namespace PestFreeZone.API.Domain
{
    public abstract class BaseEntity
    {
        [Key]
        public int Id { get; set; }  // Primary Key

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;  // Default to current time
        public DateTime? UpdatedDate { get; set; }  // Nullable for initial insert
        public DateTime? DeletedDate { get; set; }  // For soft deletion
        public bool IsDeleted { get; set; } = false;  // Soft delete flag
    }
}
