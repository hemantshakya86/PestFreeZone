using PestFreeZone.API.Domain;
using System.Linq.Expressions;

namespace PestFreeZone.API.Services.Repository
{
    public interface IRepository<T> where T : BaseEntity 
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
    }
   
}
