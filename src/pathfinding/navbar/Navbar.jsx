import './Navbar.css';
import {MyButton} from "../button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";


export const Navbar = ({ startStop, isRunning }) => {
    return (
        <div className="navbar">
            <MyButton
                content={isRunning ? <FontAwesomeIcon icon={faPause} className="icon play-icon"/>
                                   : <FontAwesomeIcon icon={faPlay} className="icon play-icon"/>}
                onClick={startStop}
                className={'play'}
            />
        </div>
    );
}
