import './Grid.css';
import {Node} from '../node/Node';
import {BFS} from '../algorithm/Bfs';
import {useEffect, useState} from 'react';

export const Grid = ({ numOfRows, numOfCols, isRunning, setIsRunning, eraseButton }) => {
    const startIndex = Math.floor(numOfCols * numOfRows / 2) - (numOfCols / 2);
    const endIndex = startIndex + numOfCols - 1;
    const initialNodes = Array(numOfCols * numOfRows).fill('');
    initialNodes[startIndex] = 'start';
    initialNodes[endIndex] = 'end';

    const [interactionIndex, setInteractionIndex] = useState(-1);
    const [activeNodeType, setActiveNodeType] = useState('');
    const [clickEvent, setClickEvent] = useState(false);
    const [isButtonDown, setIsButtonDown] = useState(false);
    const [isErasingWalls, setIsErasingWalls] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [timeoutIds, setTimeoutIds] = useState([]);

    const [nodes, setNodes] = useState(initialNodes);

    const clearNodeValue = (value) => {
        setNodes(prev => prev.map(node => node.replace(value, '')));

    }

    const changeNodeValue = (index, value) => {
        setNodes(prev => {
            const newNodes = [...prev];
            newNodes[index] = value;
            return newNodes;
        });

    }

    const updateNodeValue = (index, value) => {
        setNodes(prev => {
            const newNodes = [...prev];
            newNodes[index] += ` ${value}`;
            return newNodes;
        });

    }

    const removeNodeValue = (index, value) => {
        setNodes(prev => {
            const newNodes = [...prev];
            newNodes[index] = newNodes[index].replace(value, '');
            return newNodes;
        });

    }

    function updateNodeValues(indexes, value) {
        setNodes(prev => {
            const updatedNodes = [...prev];
            indexes.forEach(index => {
                updatedNodes[index] += ` ${value}`;
            });
            return updatedNodes;
        });

    }

    function findNodeIndexes(value) {
        return nodes.reduce((acc, node, index) => {
            if (node.includes(value)) acc.push(index);
            return acc;
        }, []);

    }

    const findNodeIndex = (value) => {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].includes(value)) {
                return i;
            }
        }
        return -1;

    }

    const animate = (pathIndexes, visitedIndexes) => {
        let delay = 0;
        let ids = [];
        setIsAnimating(true);
        for (let visitedIndex of visitedIndexes) {
            const visitedTimeoutId = setTimeout(() => {
                const node = document.querySelector(`.node${visitedIndex} div`);
                node.classList.add('visited');
            }, delay);
            delay += 8;

            ids.push(visitedTimeoutId);
        }
        for (let pathIndex of pathIndexes) {
            const pathTimeoutId = setTimeout(() => {
                const node = document.querySelector(`.node${pathIndex} div`);
                node.classList.add('path');
            }, delay);
            delay += 30;
            ids.push(pathTimeoutId);
        }

        const timeoutId = setTimeout(() => {
            setIsAnimating(false);
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
        // these are set to false due to the if conditions in the effect hook below
        setIsAnimating(false);
        // the animation would not start over but render instantly when you press Play again
        setIsAnimationDone(false);

    };

    useEffect(() => {
        if (!isRunning) {
            clearAnimation();
            return;
        }

        if (!isAnimating) {
            const result = BFS(
                findNodeIndex('start'),
                findNodeIndex('end'),
                findNodeIndexes('wall'),
                numOfCols,
                numOfRows
            );
            if (!isAnimationDone) {
                setTimeoutIds(animate(result[0], result[1]));
                setIsAnimationDone(true);
            } else {
                clearNodeValue('visited');
                clearNodeValue('path');
                updateNodeValues(result[1], 'visited');
                updateNodeValues(result[0], 'path');
            }
        }
    }, [isAnimating, isAnimationDone, isRunning, numOfCols, numOfRows, interactionIndex]);

    // Erases all wall nodes and stops the animation when the button is pressed
    useEffect(() => {
        setIsRunning(false);
        clearNodeValue('wall');
    }, [eraseButton]);

    const isStartNode = (index) => {
        return index === findNodeIndex('start');
    }

    const isEndNode = (index) => {
        return index === findNodeIndex('end');
    }

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

    }

    const handleNodeEnter = (index) => {
        if (clickEvent) {
            if (activeNodeType === 'start') {
                updateNodeValue(index, 'start');
            } else {
                updateNodeValue(index, 'end');
            }
        }

    }

    const onNodeLeave = (index) => {
        if (clickEvent) {
            if (nodes[index].includes('end') && activeNodeType === 'end') {
                removeNodeValue(index, 'end');
            } else if (nodes[index].includes('start') && activeNodeType === 'start') {
                removeNodeValue(index, 'start');
            }
        }

    }

    const onNodeEnter = (index) => {
        handleNodeEnter(index);
        drawWall(index);

    }

    const onNodeClick = (index) => {
        if (nodes[index].includes('end')) {
            setClickEvent(!clickEvent);
            setActiveNodeType('end');
        } else if (nodes[index].includes('start')) {
            setClickEvent(!clickEvent);
            setActiveNodeType('start');
        }

    }

    const onNodeMove = (index) => {
        if (interactionIndex !== index) setInteractionIndex(index);
    }

    const onGridMouseDown = (e) => {
        // for the default 'dragging' functionality to turn off in the browser
        e.preventDefault();
        // this will trigger the clearAnimation() function
        if (isAnimating) setIsRunning(false);
        setIsButtonDown(true);

    }

    const onGridLeftClick = (e) => {
        e.preventDefault();
        setIsErasingWalls(true);

    }

    const onGridMouseUp = () => {
        // 'onMouseUp' is triggered on both the left and right mouse buttons
        setIsButtonDown(false);
        setIsErasingWalls(false);

    }

    const grid = [];
    for (let row = 0; row < numOfRows; row++) {
        for (let col = 0; col < numOfCols; col++) {
            grid.push({
                id: `${row}_${col}`,
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
                    key={node.id}
                    nodeId={node.index}
                    onClick={() => onNodeClick(node.index)}
                    onMouseEnter={() => onNodeEnter(node.index)}
                    onMouseLeave={() => onNodeLeave(node.index)}
                    onMouseMove={() => onNodeMove(node.index)}
                    state={nodes[node.index]}
                />
            ))}
        </div>
    );

}
