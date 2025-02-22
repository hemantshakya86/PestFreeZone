using PestFreeZone.API.Domain;
using PestFreeZone.API.Services.Repository;

namespace PestFreeZone.API.Data
{
    public interface IUnitOfWork
    {
        IRepository<T> Repository <T>() where T : BaseEntity;
        Task CommitChanges();
    }
}
