using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniWebShop.Models
{
    public class Narudzba
    {
        public int ID { get; set; }
        public DateTime Datum { get; set; }
        public double Ukupna_Cijena_Bez_P { get; set; }
        public double Ukupna_Cijena_S_P { get; set; }
        public int Kod_Za_Popust_ID { get; set; }
        public int Nacin_Placanja_ID { get; set; }
        public string Broj_Kartice { get; set; }
        public string Email { get; set; }
        public string Broj_Mobitela { get; set; }
        public string Adresa_Dostave { get; set; }
        public string Napomena { get; set; }
    }
}
