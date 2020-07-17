using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppingapp.Models;

namespace shoppingapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ShoppingDBContext _context;

        public SalesController(ShoppingDBContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Saless>>> GetSales()
        {
            //return await _context.Sales.ToListAsync();
            //var result = from s in student
            //             where s.StudentID > 500
            //             select s;
            //List<Customer> customer = await _context.Customer.ToList<Customer>();
            //return await _context.Sales.Include(s =>  s.Customer).ToListAsync();

            List<Customer> cList = new List<Customer>();
            List<Saless> ssList = new List<Saless>();
            cList = await _context.Customer.ToListAsync();
            List<Sales> sList = await _context.Sales.ToListAsync();
            List<Store> stList = await _context.Store.ToListAsync();
            List<Product> pList = await _context.Product.ToListAsync();
            



            foreach (var sale in sList)
            {
                var isales = new Saless();
                isales.Id = sale.Id;
                isales.ProductId = sale.ProductId;
                isales.CustomerId = sale.CustomerId;
                isales.DateSold = sale.DateSold.ToString("dd-MM-yyyy");
                isales.StoreId = sale.StoreId;
                foreach (var customer in cList)
                {
                    if(sale.CustomerId == customer.Id)
                    {
                        isales.CustomerName = customer.Name;
                    }
                }
                foreach (var store in stList)
                {
                    if (sale.StoreId == store.Id)
                    {
                        isales.StoreName = store.Name;
                    }
                }
                foreach (var product in pList)
                {
                    if (sale.ProductId == product.Id)
                    {
                        isales.ProductName = product.Name;
                    }
                }
                ssList.Add(isales);

            }


            //var sales = _context.Sales;
            //return await _context.Sales
            //.Include(s => s.Customer)

            return ssList;



                //.Include(s => s.Customer.Id)

                //.ToListAsync()
                //.Include(s => s.Store.Id)
                //.Include(s => s.Store)

                //.Include(s => s.Product)
                //.ToListAsync();
            }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sales>> GetSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);

            if (sales == null)
            {
                return NotFound();
            }

            return sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sales sales)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
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

        // POST: api/Sales
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sales>> PostSales(Sales sales)
        {
            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sales>> DeleteSales(int id)
        {
            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return sales;
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
