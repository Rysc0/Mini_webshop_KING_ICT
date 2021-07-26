import { Table } from "./components/Table";
import { Proizvod } from "./components/Proizvod";
import { useState } from "react";
import { useEffect } from "react";
import './App.css';
import { Kosarica } from "./components/Kosarica";
import { Proizvod_U_Kosarici } from "./components/Proizvod_U_Kosarici";
import { unstable_renderSubtreeIntoContainer } from "react-dom";



function App() {
    const [data, setData] = useState([]);
    const [podaci, setPodaci] = useState([]);
    const items = [];
    const [itemID, setitemID] = useState();
    const [promjena, setpromjena] = useState(0);
    const [cijena, setcijena] = useState(0);
    // ID kupona koji je unesen
    const [kuponID, setKuponID] = useState(0);
    // tekst koda
    const [uneseniKod, setuneseniKod] = useState();
    // iznos popusta
    const [popust, setPopust] = useState(0);
    // dohvaćeni svi popusti
    const [sviPopusti, setsviPopusti] = useState([]);
    // kupon koji se trazio
    const [trazeni_kupon, settrazeni_kupon] = useState();
    // nacin placanja
    const [placanje, setPlacanje] = useState(0);
    const [brojKartice, setBrojKartice] = useState();
    const [Email, setEmail] = useState();
    const [BrojMobitela, setBrojMobitela] = useState();
    const [Adresa, setAdresa] = useState();
    const [Napomena, setNapomena] = useState();
    const [NarudzbaID, setNarudzbaID] = useState();
    const [SveNarudzbe, setSveNarudzbe] = useState([]);
    const [LastOrderID, setLastOrderID] = useState();

    


    // const popust = 30;
    // const kupon = "isus";


    // useEffect(() => {
    //    setPodaci(items);        
    // }, [items.length]);

    //  dohvaćanje podataka sa API-a
    useEffect(() => {
        fetch("https://localhost:44358/api/Proizvods")
            .then(reponse => reponse.json())
            .then(data => {
                console.log(data);
                setData(data);
                //  radi
                // console.log(data.find(data => (data.id === 3)));
            });
    }, [])
        
    const handleKosarica = (event) => {
        const value = parseInt(event.currentTarget.value);
        setitemID(value);
    }

    const dodajItem = (event) => {
        const novi_data = data.find(data => (data.id === itemID));
        console.log("novi data: ", novi_data);
        if(novi_data.kolicina > 0){
            items.push(novi_data);
            // radi
            setPodaci(items);
            setcijena(novi_data.cijena);
            // console.log("na add", podaci);
            // podaci.push(novi_data);
        }
        else console.log("OUT OF STOCK: ", {novi_data});
        // setPodaci(items);
        // setData1(novi_data);
        setpromjena(3);
        console.log("podaci:", podaci);
        console.log("items:", items);
    }

    const ukloniItem = (event) => {
        const index = items.indexOf((item) => item.id === itemID);
        // console.log("itemID=", itemID);
        // console.log("index=", index);
        
        items.splice(index+2,1);
        console.log("itemID=", itemID);
        console.log("index=", index);
        setPodaci(items);
        console.log("podaci:", podaci);
        console.log("items:", items);
        setcijena(0);
        setpromjena(2);
        
    }

    const handleEmail = (event) => {
        const email = event.currentTarget.value;
        setEmail(email);
    }

    const handleBrojMobitela = (event) => {
        const broj = event.currentTarget.value;
        setBrojMobitela(broj);
    }

    const handleAdresa = (event) => {
        const adresa = event.currentTarget.value;
        setAdresa(adresa);
    }

    const handleNapomena = (event) => {
        const napomena = event.currentTarget.value;
        setNapomena(napomena);
    }

    const handleKarticno = (event) => {
        setPlacanje(1);
    }

    const handleGotovinski = (event) => {
        setPlacanje(2);
    }

    const handlePopustKod = (event) => {
        const kod = event.currentTarget.value;
        console.log("ovo je handlePopustKod:",kod);
        setuneseniKod(kod);
    }

    const handleBrojKartice = (event) => {
        const kartica = event.currentTarget.value;
        console.log("broj kartice: ", kartica);
        setBrojKartice(kartica);
    }

    function dohvatiSveKupone(){
        return(
        fetch("https://localhost:44358/api/Popust_Kodovi")
        .then(reponse => reponse.json())
        .then(kupon => {
            console.log("ovo su svi popusti:",kupon);
            setsviPopusti(kupon);
        }));
    }

    const handleKupon = (event) => {
        dohvatiSveKupone();
        const trazeni = sviPopusti.find(sviPopusti => (sviPopusti.kod == uneseniKod));
        
        console.log("trazeni", trazeni);
        settrazeni_kupon(trazeni);
        setKuponID(trazeni.id);
        
        // iz nekog razloga blokiraju i baca mi error: Cannot read property 'iskoristen' of undefined
        // detaljni opis kako ovo zaobić je u readMe.md-u
        // console.log("iskoristen", trazeni.iskoristen); // ovo radi problem
        if(trazeni.iskoristen === false){
            console.log("vidis da mozes citat", trazeni.popust);
            setPopust(trazeni.popust);
        

        }
    }

    function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

    function GetLastOrderID(){
        const reversaniArray = SveNarudzbe.sort().reverse();
        console.log("obrnute narudzbe", reversaniArray);
        const id = SveNarudzbe[0].id +2;
        console.log("id zadnje narudzbe:",id);
        setLastOrderID(id);
    }

    function GetAllOrders(){
        fetch("https://localhost:44358/api/Narudzbas")
        .then(response => response.json())
        .then(data => {
            console.log("sve narudzbe", data);
            setSveNarudzbe(data);
        })
    }

    function ProizvodiNaNarudzbiPost(){
        GetAllOrders();
        GetLastOrderID();
        const zapis = {
            "id": 0,
            "narudzba_ID": LastOrderID+1,
            "proizvod_ID": itemID
        }
        return(
            fetch("https://localhost:44358/api/Narudzba_Proizvod", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(zapis)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Uspjesan post:", zapis);
            })
            .catch((error) => {
                console.error("Error:", error);
            })
        )
    }
    
    function NarudzbaPost(){
        const dd = getCurrentDate().toString();
        // const cijena_s_popustom = 0;
        // if(popust == 0 && cijena > 0){
        //     cijena_s_popustom = cijena;
        // }
        // else{
        //     cijena_s_popustom = (cijena - (cijena*popust)).toFixed(2);
        // }
        const cijena_s_popustom = (cijena - (cijena*popust)).toFixed(2);
        
        var narudzba = [];
        if(placanje == 2){
            narudzba = { 
                "id": 0,
                "datum": dd,
                "ukupna_Cijena_Bez_P": cijena,
                "ukupna_Cijena_S_P": cijena_s_popustom,
                "kod_Za_Popust_ID": kuponID,
                "nacin_Placanja_ID": placanje,
                "broj_Kartice": "",
                "email": Email,
                "broj_Mobitela": BrojMobitela,
                "adresa_Dostave": Adresa,
                "napomena": Napomena
            };
        }

        else{
            narudzba = { 
                "id": 0,
                "datum": dd,
                "ukupna_Cijena_Bez_P": cijena,
                "ukupna_Cijena_S_P": cijena_s_popustom,
                "kod_Za_Popust_ID": kuponID,
                "nacin_Placanja_ID": placanje,
                "broj_Kartice": brojKartice,
                "email": Email,
                "broj_Mobitela": BrojMobitela,
                "adresa_Dostave": Adresa,
                "napomena": Napomena
            };
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({title: 'Narudzba'})
        }
        return(
            fetch("https://localhost:44358/api/Narudzbas", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(narudzba)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Uspjesan post:", narudzba);
            })
            .catch((error) => {
                console.error("Error:", error);
            })
        )
    }
    const handleNaruci = (event) => {
        NarudzbaPost();
        ProizvodiNaNarudzbiPost();
    }


    return (
        <div>
            {/* mjesto za filter */}
            <div>
                <h3>Ovdje ide filter</h3>
            </div>

            {/* tablica */}
            <Table>
                {data.map((item) => (
                    <Proizvod key={item.id} {...item}></Proizvod>
                ))}
            </Table>

            {/* ovdje paginacija? */}
            <div>
                <h3>paginacija</h3>
            </div>

            {/* ovdje košarica */}
            <div>
                <h3>Košarica</h3>
                <label>Za unos u košaricu unesite ID proizvoda</label>
                <br></br>
                <label>ID proizvoda</label>
                <input type="number" onChange={handleKosarica} ></input>
                <button onClick={dodajItem}>Dodaj</button>
                <button onClick={ukloniItem}>Ukloni</button>
                

            </div>
 
            <div>
                <Table >
                    {podaci.map((item) => (
                        <Proizvod key={item} {...item}></Proizvod>
                    ))}
                </Table>
                <br></br>
                    <label>Popust kod: </label>
                    <input type="text" onChange={handlePopustKod}></input>
                    <button onClick={handleKupon}>Provjeri</button>
                    <br></br>     
                    <label>Popust: {popust*100}%</label>    
                    <br></br>           
                    <label>Iznos bez popusta:  {cijena}kn</label>
                    <br></br>
                    <label>Iznos sa popustom:  {(cijena - (cijena*popust)).toFixed(2)}kn</label>
                    <br></br>
                    <label>Odaberite način plaćanja: </label>
                    <button onClick={handleKarticno}>Kartično</button>
                    <button onClick={handleGotovinski}>Gotovinski</button>
                    <br></br>
                    <label>Broj kartice:</label>
                    <input onChange={handleBrojKartice}></input>
                    <br></br>
                    <h6>(nije potrebno ako ste odabrali gotovinsko plaćanje)</h6>
                    <label>Email:</label>
                    <input onChange={handleEmail}></input>
                    <label>Broj mobitela:</label>
                    <input onChange={handleBrojMobitela}></input>
                    <label>Adresa dostave:</label>
                    <input onChange={handleAdresa}></input>
                    <label>Napomena:</label>
                    <input onChange={handleNapomena}></input>
                    <br></br>
                    <button onClick={handleNaruci}>Naruči</button>
            </div>
        </div>
    );
}

export default App;
