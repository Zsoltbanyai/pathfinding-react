import './Grid.css'
import {Node} from '../node/Node'
import {useState} from "react";

export const Grid = () => {
    const NUM_OF_ROWS = 20
    const NUM_OF_COLS = 40
    const GRID_WIDTH = NUM_OF_COLS * 2

    const [startNode, setStartNode] = useState('1-1');
    const [endNode, setEndNode] = useState('10-15');
    const [activeNodeType, setActiveNodeType] = useState(null);
    const [clickEvent, setClickEvent] = useState(false);
    const [isDrawingWall, setIsDrawingWall] = useState(false);
    const [wallNodes, setWallNodes] = useState([]);
    const [isErasingWalls, setIsErasingWalls] = useState(false);

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
                setWallNodes(wallNodes.filter(id => id !== nodeId))
            } else {
                // add wall
                setWallNodes([...wallNodes, nodeId])
            }
        }
    };

    const handleMouseEnter = (nodeId) => {
        if (clickEvent) {
            if (activeNodeType === "startNode") {
                setStartNode(nodeId)
            } else if (activeNodeType === "endNode") {
                setEndNode(nodeId)
            }
        }
    }

    const onMouseEnter = (nodeId) => {
        handleMouseEnter(nodeId)
        drawWall(nodeId)
    }

    const handleMouseDown = (e) => {
        // for the default 'dragging' functionality to turn off in the browser
        e.preventDefault()
        setIsDrawingWall(true)
    }

    const handleMouseUp = () => {
        setIsDrawingWall(false)
        setIsErasingWalls(false)
    }

    const handleLeftClick = (e) => {
        e.preventDefault()
        setIsErasingWalls(true)
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

    const grid = []
    for (let row = 0; row < NUM_OF_ROWS; row++) {
        for (let col = 0; col < NUM_OF_COLS; col++) {
            grid.push({
                id: `${row}-${col}`,
                row,
                col,
            })
        }
    }

    return (
        <div className="grid"
             onMouseDown={(e) => {
                 handleMouseDown(e)
             }}
             onMouseUp={handleMouseUp}
             onMouseEnter={drawWall}
             onContextMenu={(e) => {
                 handleLeftClick(e)
             }}
             style={{
                 // for dynamic styling for the grid
                 gridTemplateRows: `repeat(${NUM_OF_ROWS}, minmax(2vw, 1fr))`,
                 gridTemplateColumns: `repeat(${NUM_OF_COLS}, minmax(2vw, 1fr))`,
                 width: `${GRID_WIDTH}%`
        }}>
            {grid.map((node) => (
                <Node
                    key={node.id}
                    nodeId={node.id}
                    isStart={node.id === startNode}
                    isEnd={node.id === endNode}
                    activeNodeType={activeNodeType}
                    wallNodes={wallNodes}
                    onClick={() => handleNodeClick(node.id)}
                    onMouseEnter={() => onMouseEnter(node.id)}
                >
                </Node>
            ))}
        </div>
    )
}