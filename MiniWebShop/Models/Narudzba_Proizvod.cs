using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class Narudzba_Proizvod
    {
        public int ID { get; set; }
        public int Narudzba_ID { get; set; }
        public int Proizvod_ID { get; set; }
    }
}
