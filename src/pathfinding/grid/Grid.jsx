import './Grid.css';
import {Node} from '../node/Node';
import {BFS} from '../algorithm/Bfs';
import {useEffect, useState} from 'react';

export const Grid = ({ isRunning, setIsRunning, eraseButton }) => {
    const numOfRows = 20;
    const numOfCols = 40;

    const startIndex = Math.floor(numOfCols * numOfRows / 2) - (numOfCols / 2);
    const endIndex = startIndex + numOfCols - 1;
    const initialNodes = Array(numOfCols * numOfRows).fill('');
    initialNodes[startIndex] = 'start';
    initialNodes[endIndex] = 'end';

    const [nodes, setNodes] = useState(initialNodes);

    const [interactionIndex, setInteractionIndex] = useState(-1);
    const [activeNodeType, setActiveNodeType] = useState('');
    const [clickEvent, setClickEvent] = useState(false);
    const [isButtonDown, setIsButtonDown] = useState(false);
    const [isErasingWalls, setIsErasingWalls] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [timeoutIds, setTimeoutIds] = useState([]);

    const clearNodeValue = (value) => {
        setNodes(prev => prev.map(node => node.replace(value, '')));

    };

    const changeNodeValue = (index, value) => {
        setNodes(prev => {
            const newNodes = [...prev];
            newNodes[index] = value;
            return newNodes;
        });

    };

    const updateNodeValue = (index, value) => {
        setNodes(prev => {
            const newNodes = [...prev];
            newNodes[index] += ` ${value}`;
            return newNodes;
        });

    };

    const removeNodeValue = (index, value) => {
        setNodes(prev => {
            const newNodes = [...prev];
            newNodes[index] = newNodes[index].replace(value, '');
            return newNodes;
        });

    };

    const updateNodeValues = (indexes, value) => {
        setNodes(prev => {
            const updatedNodes = [...prev];
            indexes.forEach(index => {
                updatedNodes[index] += ` ${value}`;
            });
            return updatedNodes;
        });

    };

    const findNodeIndexes = (value) => {
        return nodes.reduce((acc, node, index) => {
            if (node.includes(value)) acc.push(index);
            return acc;
        }, []);

    };

    const findNodeIndex = (value) => {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].includes(value)) {
                return i;
            }
        }
        return -1;

    };

    const animate = (pathIndexes, visitedIndexes) => {
        let delay = 0;
        let ids = [];
        for (let visitedIndex of visitedIndexes) {
            const visitedTimeoutId = setTimeout(() => {
                const node = document.querySelector(`.node${visitedIndex} div`);
                if (node) node.classList.add('visited');
            }, delay);
            delay += 7;

            ids.push(visitedTimeoutId);
        }
        for (let pathIndex of pathIndexes) {
            const pathTimeoutId = setTimeout(() => {
                const node = document.querySelector(`.node${pathIndex} div`);
                if (node) node.classList.add('path');
            }, delay);
            delay += 30;
            ids.push(pathTimeoutId);
        }

        const timeoutId = setTimeout(() => {
            setIsAnimationDone(true);
        }, delay);
        ids.push(timeoutId);

        return ids;

    };

    const clearAnimation = () => {
        timeoutIds.forEach(clearTimeout);
        const visitedNodes = document.querySelectorAll('.visited');
        const pathNodes = document.querySelectorAll('.path');
        visitedNodes.forEach(node => node.classList.remove('visited'));
        pathNodes.forEach(node => node.classList.remove('path'));
        clearNodeValue('path');
        clearNodeValue('visited');
        // the animation would not start over but render instantly when you press Play again
        setIsAnimationDone(false);

    };

    useEffect(() => {
        if (!isRunning) {
            clearAnimation();
            return;
        }

        const result = BFS(
            findNodeIndex('start'),
            findNodeIndex('end'),
            findNodeIndexes('wall'),
            numOfCols,
            numOfRows
        );
        if (!isAnimationDone) {
            setTimeoutIds(animate(result[0], result[1]));
        } else {
            clearNodeValue('visited');
            clearNodeValue('path');
            updateNodeValues(result[1], 'visited');
            updateNodeValues(result[0], 'path');
        }

    }, [isAnimationDone, isRunning, interactionIndex]);

    // Erases all wall nodes and stops the animation when the button is pressed
    useEffect(() => {
        setIsRunning(false);
        clearNodeValue('wall');
    }, [eraseButton]);

    const isStartNode = (index) => {
        return index === findNodeIndex('start');

    };

    const isEndNode = (index) => {
        return index === findNodeIndex('end');

    };

    const drawWall = (index) => {
        if (isButtonDown && !isStartNode(index) && !isEndNode(index)) {
            if (isErasingWalls) {
                // remove wall
                removeNodeValue(index, 'wall');
            } else {
                // add wall
                changeNodeValue(index, 'wall');
            }
        }

    };

    const handleNodeEnter = (index) => {
        if (clickEvent) {
            if (activeNodeType === 'start') {
                updateNodeValue(index, 'start');
            } else {
                updateNodeValue(index, 'end');
            }
        }

    };

    const onNodeLeave = (index) => {
        if (clickEvent) {
            if (activeNodeType === 'end') {
                removeNodeValue(index, 'end');
            } else {
                removeNodeValue(index, 'start');
            }
        }

    };

    const onNodeEnter = (index) => {
        if (isRunning && (isButtonDown || clickEvent)) setInteractionIndex(index);
        if (!isAnimationDone && (isButtonDown || clickEvent)) setIsRunning(false);
        handleNodeEnter(index);
        drawWall(index);

    };

    const onNodeClick = (index) => {
        if (nodes[index].includes('end')) {
            setClickEvent(!clickEvent);
            setActiveNodeType('end');
        } else if (nodes[index].includes('start')) {
            setClickEvent(!clickEvent);
            setActiveNodeType('start');
        }

    };

    const onGridMouseDown = (e) => {
        // for the default 'dragging' functionality to turn off in the browser
        e.preventDefault();
        setIsButtonDown(true);

    };

    const onGridLeftClick = (e) => {
        e.preventDefault();
        setIsErasingWalls(true);

    };

    const onGridMouseUp = () => {
        // 'onMouseUp' is triggered on both the left and right mouse buttons
        setIsButtonDown(false);
        setIsErasingWalls(false);

    };

    const grid = [];
    for (let row = 0; row < numOfRows; row++) {
        for (let col = 0; col < numOfCols; col++) {
            grid.push({
                index: col + (row * numOfCols)
            });
        }
    }

    return (
        <div className='grid'
             onMouseDown={(e) => {
                 onGridMouseDown(e);
             }}
             onContextMenu={(e) => {
                 onGridLeftClick(e);
             }}
             onMouseUp={onGridMouseUp}
             style={{
                 // for dynamic styling of the grid
                 gridTemplateRows: `repeat(${numOfRows}, 2vw)`,
                 gridTemplateColumns: `repeat(${numOfCols}, 2vw)`
             }}
        >
            {grid.map((node) => (
                <Node
                    key={node.index}
                    nodeId={node.index}
                    onClick={() => onNodeClick(node.index)}
                    onMouseEnter={() => onNodeEnter(node.index)}
                    onMouseLeave={() => onNodeLeave(node.index)}
                    state={nodes[node.index]}
                />
            ))}
        </div>
    );

}
