# Mini_webshop_KING_ICT

Pokretanje aplikacije

1. Pokrenuti skriptu "create_database_full_data" za generiranje baze podataka. Skripta se nalazi u mapi SQL_scripts
2. Pokrenuti Solution u Visual Studiu. Solution se nalazi u mapi MiniWebShop.
3. Koristeći cmd/windows terminal/PowerShell doći na putanju: /Mini_webshop_KING_ICT i upisati komandu: npm run start
4. Pročitati daljnji opis



Error na frontendu i koraci kako ga zaobić dok ne nađem fix:
	- unijeti ID proizvoda u košaricu
	- unijeti kod za popust i kliknuti na gumb Provjeri
	- baci error
	- u App.js datoteci odkomentirati liniju 163 i napraviti Save da se stranica refresha
	- ponovno kliknuti na gumb Provjeri
	- popust se obračuna 

Kod za popust mora biti unesen i to na način opisan iznad!!!
	- ideja da ukoliko koristnik ne unese kod automatski se koristi prvi zapis iz baze jer je kod njega popust 0
	- SQL skripta nije ažurirana pa prvi popust kod nema vrijednost 0 ali kod mene lokalno je, nema razlike u obračunavanju
	- potrebno implementirati do kraja
	