import { Table } from "./components/Table";
import { Proizvod } from "./components/Proizvod";
import { useState } from "react";
import { useEffect } from "react";
import './App.css';
import { Kosarica } from "./components/Kosarica";
import { Proizvod_U_Kosarici } from "./components/Proizvod_U_Kosarici";



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

    const handlePopustKod = (event) => {
        const kod = event.currentTarget.value;
        console.log("ovo je handlePopustKod:",kod);
        setuneseniKod(kod);
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
        console.log("iskoristen", trazeni.iskoristen); // ovo radi problem
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
        

        const narudzba = { 
            "id": 0,
            "datum": dd,
            "ukupna_Cijena_Bez_P": cijena,
            "ukupna_Cijena_S_P": cijena_s_popustom,
            "kod_Za_Popust_ID": kuponID,
            "nacin_Placanja_ID": 2,
            "broj_Kartice": "",
            "email": "sample@email.com",
            "broj_Mobitela": "091 091 0911",
            "adresa_Dostave": "adresa",
            "napomena": "ovo je napomena"
        };

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
                    <button onClick={handleNaruci}>Naruči</button>
            </div>
        </div>
    );
}

export default App;
