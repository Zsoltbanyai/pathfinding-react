import './App.css';
import {Grid} from './grid/Grid';
import {Navbar} from "./navbar/Navbar";
import {useState} from "react";

function App() {
    const [isRunning, setIsRunning] = useState(false);

    const startStop = () => {
        setIsRunning(!isRunning);
    }

    return (
        <div className="App">
            <Navbar
                isRunning={isRunning}
                startStop={startStop}
            />
            <Grid
                numOfRows={20}
                numOfCols={40}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
            />
        </div>
    );
}

export default App;
