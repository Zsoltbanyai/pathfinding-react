import './Node.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFlag, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';

export const Node = ({ nodeId, onClick, onMouseEnter, onMouseLeave, state }) => {
    let className = `node node${nodeId}`;
    className += ` ${state}`;

    const isStart = state.includes('start');
    const isEnd = state.includes('end');

    return (
        <div
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {isStart && <FontAwesomeIcon icon={faLocationCrosshairs} className="start-icon"/>}
            {isEnd && <FontAwesomeIcon icon={faFlag} className="end-icon"/>}
        </div>
    );

}
