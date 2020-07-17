using System;
using System.Collections.Generic;

namespace shoppingapp.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }

        //public string CustomerName { get; set; }
        //public string ProductName { get; set; }

        //public string StoreName { get; set; }


        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
    }
}
