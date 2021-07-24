using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class Popust_KodoviDbContext : DbContext
    {
        public DbSet<Popust_Kodovi> Popust_Kod { get; set; }

        public Popust_KodoviDbContext(DbContextOptions<Popust_KodoviDbContext> options) 
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Popust_Kodovi>()
                .ToTable("Popust_kodovi");
        }
    }
}
