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
    public class Popust_KodoviController : ControllerBase
    {
        private readonly Popust_KodoviDbContext _context;

        public Popust_KodoviController(Popust_KodoviDbContext context)
        {
            _context = context;
        }

        // GET: api/Popust_Kodovi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Popust_Kodovi>>> GetPopust_Kod()
        {
            return await _context.Popust_Kod.ToListAsync();
        }

        // GET: api/Popust_Kodovi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Popust_Kodovi>> GetPopust_Kodovi(int id)
        {
            var popust_Kodovi = await _context.Popust_Kod.FindAsync(id);

            if (popust_Kodovi == null)
            {
                return NotFound();
            }

            return popust_Kodovi;
        }

        // PUT: api/Popust_Kodovi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPopust_Kodovi(int id, Popust_Kodovi popust_Kodovi)
        {
            if (id != popust_Kodovi.ID)
            {
                return BadRequest();
            }

            _context.Entry(popust_Kodovi).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Popust_KodoviExists(id))
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

        // POST: api/Popust_Kodovi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Popust_Kodovi>> PostPopust_Kodovi(Popust_Kodovi popust_Kodovi)
        {
            _context.Popust_Kod.Add(popust_Kodovi);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPopust_Kodovi", new { id = popust_Kodovi.ID }, popust_Kodovi);
        }

        // DELETE: api/Popust_Kodovi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePopust_Kodovi(int id)
        {
            var popust_Kodovi = await _context.Popust_Kod.FindAsync(id);
            if (popust_Kodovi == null)
            {
                return NotFound();
            }

            _context.Popust_Kod.Remove(popust_Kodovi);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Popust_KodoviExists(int id)
        {
            return _context.Popust_Kod.Any(e => e.ID == id);
        }
    }
}
