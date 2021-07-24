import {Table} from "./components/Table";
import {Proizvod} from "./components/Proizvod";
import {useState} from "react";
import {useEffect} from "react";
import './App.css';

function App() {
    const [data, setData] = useState([]);

    //  dohvaćanje podataka sa API-a
    useEffect(() => {
        fetch("https://localhost:44358/api/Proizvods")
        .then(reponse => reponse.json())
        .then(data => {
            console.log(data);
            setData(data);
        });
    }, [])
  
  
    return (
        <div>
            <Table>
                {data.map((item) => (
                    <Proizvod key={item.id} {...item}></Proizvod>
                ))}
            </Table>
        </div>
  );
}

export default App;
