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
    public class NarudzbasController : ControllerBase
    {
        private readonly NarudzbaDbContext _context;

        public NarudzbasController(NarudzbaDbContext context)
        {
            _context = context;
        }

        // GET: api/Narudzbas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Narudzba>>> GetNarudzba()
        {
            return await _context.Narudzba.ToListAsync();
        }

        // GET: api/Narudzbas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Narudzba>> GetNarudzba(int id)
        {
            var narudzba = await _context.Narudzba.FindAsync(id);

            if (narudzba == null)
            {
                return NotFound();
            }

            return narudzba;
        }

        // PUT: api/Narudzbas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNarudzba(int id, Narudzba narudzba)
        {
            if (id != narudzba.ID)
            {
                return BadRequest();
            }

            _context.Entry(narudzba).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NarudzbaExists(id))
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

        // POST: api/Narudzbas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Narudzba>> PostNarudzba(Narudzba narudzba)
        {
            _context.Narudzba.Add(narudzba);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNarudzba", new { id = narudzba.ID }, narudzba);
        }

        // DELETE: api/Narudzbas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNarudzba(int id)
        {
            var narudzba = await _context.Narudzba.FindAsync(id);
            if (narudzba == null)
            {
                return NotFound();
            }

            _context.Narudzba.Remove(narudzba);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NarudzbaExists(int id)
        {
            return _context.Narudzba.Any(e => e.ID == id);
        }
    }
}
