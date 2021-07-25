using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniWebShop.Models;

namespace MiniWebShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Narudzba_ProizvodController : ControllerBase
    {
        private readonly Narudzba_ProizvodDbContext _context;

        public Narudzba_ProizvodController(Narudzba_ProizvodDbContext context)
        {
            _context = context;
        }

        // GET: api/Narudzba_Proizvod
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Narudzba_Proizvod>>> GetNarudzba_Proizvod()
        {
            return await _context.Narudzba_Proizvod.ToListAsync();
        }

        // GET: api/Narudzba_Proizvod/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Narudzba_Proizvod>> GetNarudzba_Proizvod(int id)
        {
            var narudzba_Proizvod = await _context.Narudzba_Proizvod.FindAsync(id);

            if (narudzba_Proizvod == null)
            {
                return NotFound();
            }

            return narudzba_Proizvod;
        }

        // PUT: api/Narudzba_Proizvod/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNarudzba_Proizvod(int id, Narudzba_Proizvod narudzba_Proizvod)
        {
            if (id != narudzba_Proizvod.ID)
            {
                return BadRequest();
            }

            _context.Entry(narudzba_Proizvod).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Narudzba_ProizvodExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Narudzba_Proizvod
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Narudzba_Proizvod>> PostNarudzba_Proizvod(Narudzba_Proizvod narudzba_Proizvod)
        {
            _context.Narudzba_Proizvod.Add(narudzba_Proizvod);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNarudzba_Proizvod", new { id = narudzba_Proizvod.ID }, narudzba_Proizvod);
        }

        // DELETE: api/Narudzba_Proizvod/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNarudzba_Proizvod(int id)
        {
            var narudzba_Proizvod = await _context.Narudzba_Proizvod.FindAsync(id);
            if (narudzba_Proizvod == null)
            {
                return NotFound();
            }

            _context.Narudzba_Proizvod.Remove(narudzba_Proizvod);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Narudzba_ProizvodExists(int id)
        {
            return _context.Narudzba_Proizvod.Any(e => e.ID == id);
        }
    }
}
