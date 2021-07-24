import {Table} from "./components/Table";
import './App.css';

function App() {
    //  dohvaćanje podataka sa API-a
    fetch("https://localhost:44358/api/Proizvods")
    .then(reponse => reponse.json())
    .then(data => console.log(data));
  
  
    return (
        <Table>

        </Table>
  );
}

export default App;
