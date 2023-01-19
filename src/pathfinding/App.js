import './App.css';
import {Grid} from './grid/Grid';
import {Navbar} from "./navbar/Navbar";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

function App() {
    const [isRunning, setIsRunning] = useState(false);

    const startStop = () => {
        setIsRunning(!isRunning);
    }

    return (
        <div className="App">
            {Navbar(
                isRunning ? <FontAwesomeIcon icon={faPause} className="icon"/>
                               : <FontAwesomeIcon icon={faPlay} className="icon"/>,
                     startStop)}
            {Grid(20, 40, isRunning)}
        </div>
    );
}

export default App;
