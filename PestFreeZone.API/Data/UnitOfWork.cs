using Microsoft.EntityFrameworkCore;
using PestFreeZone.API.Domain;
using PestFreeZone.API.Domain.Models;
using PestFreeZone.API.Services.Impl;
using PestFreeZone.API.Services.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PestFreeZone.API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly Dictionary<Type, object> _repositories = new();

        public UnitOfWork(ApplicationDbContext applicationDbContext)
        {
            _context = applicationDbContext;
        }

        public async Task CommitChanges()
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var entries = _context.ChangeTracker.Entries<BaseEntity>();
                var utcNow = DateTime.UtcNow;

                foreach (var entry in entries)
                {
                    if (entry.State == EntityState.Added)
                    {
                        entry.Entity.CreatedDate = utcNow;
                        entry.Entity.UpdatedDate = null;
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        entry.Entity.UpdatedDate = utcNow;
                    }
                }
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw; // Rethrow the exception for handling at a higher level
            }
        }

        public IRepository<T> Repository<T>() where T : BaseEntity
        {
            var type = typeof(T);
            if (!_repositories.ContainsKey(type))
            {
                var repositoryInstance = new Repository<T>(_context);
                _repositories[type] = repositoryInstance;
            }
            return (IRepository<T>)_repositories[type];
        }
    }
}