using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class NarudzbaDbContext :DbContext
    {
        public DbSet<Narudzba> Narudzba { get; set; }

        public NarudzbaDbContext(DbContextOptions<NarudzbaDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Narudzba>()
                .ToTable("Narudzba");
        }
    }
}
