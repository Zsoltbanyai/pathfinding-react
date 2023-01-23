// Breadth-first search (BFS)

// The BFS algorithm guarantees that the first path it finds to the end node is the shortest path
// because of the way it explores the grid. The algorithm starts by exploring all the neighboring nodes
// of the start node, then it explores all the neighboring nodes of the neighbor nodes, and so on.
// It does this in a breadth-first manner, which means that it explores all the nodes at a certain depth
// in the grid before moving on to the next depth.
//
// So, when the algorithm finds the end node, it has already explored all the neighboring nodes of the start node
// and all the neighboring nodes of the neighboring nodes. Therefore, we know that the path that the algorithm finds
// is the shortest path because it is guaranteed that the algorithm has not yet explored any shorter paths.
//
// Also, the algorithm uses a queue to keep track of the nodes that it needs to visit next.
// The nodes are added to the queue in the order that they are discovered, so the first path
// that the algorithm finds is guaranteed to be the shortest because the algorithm explores
// the nodes in the order of their distance from the start node.

export function BFS(startNode, endNode, wallNodes, numOfCols, numOfRows) {
    if (startNode === endNode) return [[startNode], [startNode]];

    let queue = [startNode];
    let visitedNodes = [];
    let parentNodes = new Map();

    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (visitedNodes.includes(currentNode)) continue;
        visitedNodes.push(currentNode);

        if (currentNode === endNode) {
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
// When parentNodes is set, you take a node and add every unvisited neighbor as key, with the node as value.
// So in retracePath, in the first iteration when you do 'parentNodes.get(currentNode)',
// think of the endNode as the neighbor of the previous step, and so on.
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

    const NORTH = node - numOfCols;
    const SOUTH = node + numOfCols;
    const EAST = node + 1;
    const WEST = node - 1;
    const MAX = numOfCols * numOfRows;
    const rowNum = Math.floor(node/numOfCols);

    // Check north
    if (NORTH >= 0) {
        neighbors.push(NORTH);
    }
    // Check east
    if (EAST - (rowNum * numOfCols) !== numOfCols) {
        neighbors.push(EAST);
    }
    // Check south
    if (SOUTH < MAX) {
        neighbors.push(SOUTH);
    }
    // Check west
    if (WEST - (rowNum * numOfCols) !== 0) {
        neighbors.push(WEST);
    }
    return neighbors;
}

function getUnvisitedNeighbors(node, endNode, visitedNodes, wallNodes, numOfCols, numOfRows) {
    const neighbors = getNeighbors(node, numOfCols, numOfRows);
    return neighbors.filter(neighbor =>
                            !visitedNodes.includes(neighbor)
                        && (!wallNodes.includes(neighbor) || neighbor === endNode));
}
