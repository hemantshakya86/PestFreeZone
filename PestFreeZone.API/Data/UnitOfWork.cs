
using Microsoft.Extensions.Options;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Domain.Models;
using PestFreeZone.API.Services.Impl;
using PestFreeZone.API.Services.Repository;

namespace PestFreeZone.API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        private readonly Dictionary<Type, object> _repositories = new ();
        public UnitOfWork(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

      

        public async Task CommitChanges()
        {
           
            await _context.SaveChangesAsync();

            
        }

        public IRepository<T> Repository<T>() where T : BaseEntity
        {
           var type = typeof(T);
            if (!_repositories.ContainsKey(type))
            {
                var repositoriesInstance= new Repository<T>(_context);
                _repositories[type] = repositoriesInstance;
            }
            return (IRepository<T>)_repositories[type];
        }
    }
}
