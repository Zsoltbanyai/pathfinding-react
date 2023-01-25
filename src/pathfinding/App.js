import './App.css';
import {Grid} from './grid/Grid';
import {Navbar} from "./navbar/Navbar";
import {useState} from "react";
import {MyButton} from "./button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [eraseButton, setEraseButton] = useState(false);

    const handleEraseButtonClick = () => {
        setEraseButton(!eraseButton);
    }

    const startStop = () => {
        setIsRunning(!isRunning);
    }

    return (
        <div className="App">
            <Navbar
                isRunning={isRunning}
                startStop={startStop}
            />
            <div className='grid-container'>
                <Grid
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                    eraseButton={eraseButton}
                />
                <MyButton
                    content={<FontAwesomeIcon icon={faTrash} title={'Erase Wall'}/>}
                    className={'erase-wall'}
                    onClick={handleEraseButtonClick}
                />
            </div>
        </div>
    );
}

export default App;
