using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class ProizvodDbContext :DbContext
    {
        public DbSet<Proizvod> Proizvod { get; set; }

        public ProizvodDbContext(DbContextOptions<ProizvodDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proizvod>()
                .ToTable("Proizvod");
        }
    }
}
