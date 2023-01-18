import './Node.css'
import { useEffect } from "react"

export const Node = ({ nodeId, isStart, isEnd, activeNodeType, onClick, onMouseEnter }) => {

    useEffect(() => {
    }, [activeNodeType, nodeId]);

    let className = `node ${nodeId}`;
    if (isStart) {
        className += " start-node";
    } else if (isEnd) {
        className += " end-node";
    }

    return (
        <div
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
        </div>
    );

}
