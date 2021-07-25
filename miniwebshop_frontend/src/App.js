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


    useEffect(() => {
       setPodaci(items);        
    }, []);
        
    const handleKosarica = (event) => {
        const value = parseInt(event.currentTarget.value);
        const novi_data = data.find(data => (data.id === value));
        console.log("novi data: ", novi_data);
        if(novi_data.kolicina > 0){
            items.push(novi_data);
            // radi
            // setPodaci(items);
            // podaci.push(novi_data);
        }
        else console.log("OUT OF STOCK: ", {novi_data});
        // setPodaci(items);
        // setData1(novi_data);
        console.log("items:", podaci);
    }

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
                
                {/* <Kosarica>
                        {items.map((item) => (
                            <Proizvod_U_Kosarici key={item.id} {...item}></Proizvod_U_Kosarici>
                        ))}
                    </Kosarica> */}
            </div>
 
            <Table >
                {podaci.map((item) => (
                    <Proizvod key={item} {...item}></Proizvod>
                ))}
            </Table>


            {/* ovdje naručivanje */}
            <div>
                <h3>Narudžba</h3>
            </div>
        </div>
    );
}

export default App;
