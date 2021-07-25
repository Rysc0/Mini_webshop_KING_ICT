using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class Narudzba_ProizvodDbContext : DbContext
    {
        public DbSet<Narudzba_Proizvod> Narudzba_Proizvod { get; set; }

        public Narudzba_ProizvodDbContext(DbContextOptions<Narudzba_ProizvodDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Narudzba_Proizvod>()
                .ToTable("Narudzba_proizvod");
        }
    }
}
