import './Grid.css'
import {Node} from '../node/Node'
import {useState} from "react";

export const Grid = () => {
    const NUM_OF_ROWS = 20
    const NUM_OF_COLS = 40
    const [startNode, setStartNode] = useState('1-1');
    const [endNode, setEndNode] = useState('10-15');
    const [activeNodeType, setActiveNodeType] = useState(null);
    const [clickEvent, setClickEvent] = useState(false);

    const handleNodeClick = (nodeId) => {
        if (nodeId === startNode) {
            setActiveNodeType("startNode");
        } else if (nodeId === endNode) {
            setActiveNodeType("endNode");
        }
        setClickEvent(!clickEvent);
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
        <div className="grid">
            {grid.map((node) => (
                <Node
                    key={node.id}
                    nodeId={node.id}
                    isStart={node.id === startNode}
                    isEnd={node.id === endNode}
                    activeNodeType={activeNodeType}
                    onClick={() => handleNodeClick(node.id)}
                    onMouseEnter={() => handleMouseEnter(node.id)}
                >
                </Node>
            ))}
        </div>
    )
}