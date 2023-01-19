// Breadth-first search (BFS)
export function BFS(startNode, endNode, wallNodes, numOfCols, numOfRows) {
    if (startNode === endNode) return [[startNode], [startNode]];

    let queue = [startNode];
    let visitedNodes = [];
    let parentNodes = new Map();

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (visitedNodes.includes(currentNode)) continue;
        visitedNodes.push(currentNode);
        const [currentRow, currentCol] = currentNode.split("_").map(n => parseInt(n));
        const [endRow, endCol] = endNode.split("_").map(n => parseInt(n));

        if (currentRow === endRow && currentCol === endCol) {
            return [retracePath(startNode, endNode, parentNodes), visitedNodes];
        }

        for (let neighbor of getUnvisitedNeighbors(currentNode, endNode,
                                                   visitedNodes, wallNodes,
                                                   numOfCols, numOfRows)) {
            queue.push(neighbor);
            parentNodes.set(neighbor, currentNode);
        }
    }

    return [[], visitedNodes];
}

function retracePath(startNode, endNode, parentNodes) {
    let path = [endNode];
    let currentNode = endNode;

    while (currentNode !== startNode) {
        currentNode = parentNodes.get(currentNode);
        path.unshift(currentNode);
    }

    return path;
}

function getNeighbors(node, numOfCols, numOfRows) {
    const neighbors = [];
    const [row, col] = node.split("_").map(n => parseInt(n));
    // Check north
    if (row > 0) {
        neighbors.push(`${row-1}_${col}`);
    }
    // Check east
    if (col < numOfCols - 1) {
        neighbors.push(`${row}_${col+1}`);
    }
    // Check south
    if (row < numOfRows - 1) {
        neighbors.push(`${row+1}_${col}`);
    }
    // Check west
    if (col > 0) {
        neighbors.push(`${row}_${col-1}`);
    }
    return neighbors;
}

function getUnvisitedNeighbors(node, endNode, visitedNodes, wallNodes, numOfCols, numOfRows) {
    const neighbors = getNeighbors(node, numOfCols, numOfRows);
    return neighbors.filter(neighbor => !visitedNodes.includes(neighbor)
        && (!wallNodes.includes(neighbor) || neighbor === endNode));
}
