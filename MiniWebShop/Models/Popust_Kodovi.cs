using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class Popust_Kodovi
    {
        public int ID { get; set; }
        public string Kod { get; set; }
        public double Popust { get; set; }
        public bool Iskoristen { get; set; }
    }
}
