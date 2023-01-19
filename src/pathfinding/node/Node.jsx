import './Node.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFlag, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons'

export const Node = ({ nodeId, isStart, isEnd, wallNodes,
                         onClick, onMouseEnter }) => {

    let className = `node ${nodeId}`
    if (isStart) {
        className += " start-node"
    } else if (isEnd) {
        className += " end-node"
    } else if (wallNodes.includes(nodeId)) {
        className += " wall"
    }

    return (
        <div
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {isStart && <FontAwesomeIcon icon={faLocationCrosshairs} className="start-icon"/>}
            {isEnd && <FontAwesomeIcon icon={faFlag} className="end-icon"/>}
        </div>
    )

}
