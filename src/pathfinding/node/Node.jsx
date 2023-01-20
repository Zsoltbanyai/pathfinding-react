import './Node.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFlag, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';
import React from "react";

export const Node = React.memo(({ nodeId, onClick, onMouseEnter,
                                            isStart, isEnd, isVisited, isPath, isWall }) => {

    let className = `node node${nodeId}`;
    if (isStart) className += " start-node";
    if (isEnd) className += " end-node";
    if (isPath) className += " path";
    if (isWall) className += " wall";
    if (isVisited) className += " visited";

    return (
        <div
            className={className}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {isStart && <FontAwesomeIcon icon={faLocationCrosshairs} className="start-icon"/>}
            {isEnd && <FontAwesomeIcon icon={faFlag} className="end-icon"/>}
        </div>
    );

}, (prevProps, nextProps) => {
    return (nextProps.isStart === prevProps.isStart &&
        nextProps.isEnd === prevProps.isEnd &&
        nextProps.isWall === prevProps.isWall &&
        nextProps.isVisited === prevProps.isVisited &&
        nextProps.isPath === prevProps.isPath &&
        nextProps.onClick === prevProps.onClick &&
        nextProps.onMouseEnter === prevProps.onMouseEnter);
});
