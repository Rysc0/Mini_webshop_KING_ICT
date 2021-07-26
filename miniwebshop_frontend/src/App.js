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
        
        //  linija 115 i 116 iz nekog razloga blokiraju i baca mi error: Cannot read property 'iskoristen' of undefined
        // detaljni opis kako ovo zaobić je u readMe.md-u
        // console.log("iskoristen", trazeni.iskoristen);
        if(trazeni.iskoristen === false){
            console.log("vidis da mozes citat", trazeni.popust);
            setPopust(trazeni.popust);

        }
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
            </div>
            

            
            {/* ovdje naručivanje */}
            <div>
                <h3>Narudžba</h3>
            </div>
        </div>
    );
}

export default App;
