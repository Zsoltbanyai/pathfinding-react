import './Grid.css';
import {Node} from '../node/Node';
import {BFS} from "../algorithm/Bfs";
import React, {useEffect, useState} from "react";

export const Grid = ({ numOfRows, numOfCols, isRunning }) => {
    const GRID_WIDTH = numOfCols * 2;
    const START_ROW = Math.floor(numOfRows/5);
    const START_COL = Math.floor(numOfCols/6);
    const END_ROW = Math.floor(numOfRows/4*2);
    const END_COL = Math.floor(numOfCols/5*3);

    const [startNode, setStartNode] = useState(`${START_ROW}_${START_COL}`);
    const [endNode, setEndNode] = useState(`${END_ROW}_${END_COL}`);
    const [activeNodeType, setActiveNodeType] = useState(null);
    const [clickEvent, setClickEvent] = useState(false);
    const [isDrawingWall, setIsDrawingWall] = useState(false);
    const [isErasingWalls, setIsErasingWalls] = useState(false);
    const [wallNodes, setWallNodes] = useState([]);

    const [path, setPath] = useState([]);
    const [visitedNodes, setVisitedNodes] = useState([]);

    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function animate(path, visitedNodes) {
        let visitedIntervalId;
        let pathIntervalId;
        let visitedDelay = 3;
        let pathDelay = 22;
        setIsAnimating(true);
        visitedIntervalId = setInterval(() => {
            if (visitedNodes.length) {
                const nodeId = visitedNodes.shift();
                const node = document.querySelector(`.node${nodeId}`);
                node.classList.add('visited');
            } else {
                clearInterval(visitedIntervalId);
                pathIntervalId = setInterval(() => {
                    if (path.length) {
                        const nodeId = path.shift();
                        const node = document.querySelector(`.node${nodeId}`);
                        node.classList.add('path');
                    } else {
                        clearInterval(pathIntervalId);
                        setIsAnimating(false);
                    }
                }, pathDelay);
            }
        }, visitedDelay);
    }

    useEffect(() => {
        if (!isRunning) {
            setPath([]);
            setVisitedNodes([]);
            setIsAnimationDone(false);
            return;
        }

        if (!isAnimating) {
            const result = BFS(startNode, endNode, wallNodes, numOfCols, numOfRows);
            if (!isAnimationDone) {
                animate(result[0], result[1]);
                setIsAnimationDone(true);
            } else {
                setPath(result[0]);
                setVisitedNodes(result[1]);
            }
        }
    }, [endNode, isAnimating, isAnimationDone, isRunning, numOfCols, numOfRows, startNode, wallNodes]);

    const isStartNode = (nodeId) => {
        return nodeId === startNode;
    }
    const isEndNode = (nodeId) => {
        return nodeId === endNode;
    }
    const drawWall = (nodeId) => {
        if (isDrawingWall && !isStartNode(nodeId) && !isEndNode(nodeId)) {
            if (isErasingWalls) {
                // remove wall
                setWallNodes(wallNodes.filter(id => id !== nodeId));
            } else {
                // add wall
                setWallNodes([...wallNodes, nodeId]);
            }
        }
    }

    const handleMouseEnter = (nodeId) => {
        if (clickEvent) {
            if (activeNodeType === "startNode") {
                setStartNode(nodeId);
            } else if (activeNodeType === "endNode") {
                setEndNode(nodeId);
            }
        }
    }

    const onMouseEnter = (nodeId) => {
        handleMouseEnter(nodeId);
        drawWall(nodeId);
    }

    const handleNodeClick = (nodeId) => {
        if (nodeId === startNode) {
            setClickEvent(!clickEvent);
            setActiveNodeType("startNode");
        } else if (nodeId === endNode) {
            setClickEvent(!clickEvent);
            setActiveNodeType("endNode");
        }
    }

    const handleMouseDown = (e) => {
        // for the default 'dragging' functionality to turn off in the browser
        e.preventDefault();
        setIsDrawingWall(true);
    }

    const handleLeftClick = (e) => {
        e.preventDefault();
        setIsErasingWalls(true);
    }

    const handleMouseUp = () => {
        // 'onMouseUp' is triggered on both the left and right mouse buttons
        setIsDrawingWall(false);
        setIsErasingWalls(false);
    }

    const grid = []
    for (let row = 0; row < numOfRows; row++) {
        for (let col = 0; col < numOfCols; col++) {
            grid.push({
                id: `${row}_${col}`
            });
        }
    }

    return (
        <div className="grid"
             onMouseDown={(e) => {
                 handleMouseDown(e);
             }}
             onContextMenu={(e) => {
                 handleLeftClick(e);
             }}
             onMouseUp={handleMouseUp}
             style={{
                 // for dynamic styling of the grid
                 gridTemplateRows: `repeat(${numOfRows}, minmax(2vw, 1fr))`,
                 gridTemplateColumns: `repeat(${numOfCols}, minmax(2vw, 1fr))`,
                 width: `${GRID_WIDTH}%`
        }}>
            {grid.map((node) => (
                <Node
                    key={node.id}
                    nodeId={node.id}
                    isStart={node.id === startNode}
                    isEnd={node.id === endNode}
                    isVisited={visitedNodes.includes(node.id)}
                    isPath={path.includes(node.id)}
                    isWall={wallNodes.includes(node.id) && node.id !== endNode}
                    onClick={() => handleNodeClick(node.id)}
                    onMouseEnter={() => onMouseEnter(node.id)}
                >
                </Node>
            ))}
        </div>
    );
}
