import './Pathfinding.css'
import {Node} from './node/Node'

export const Pathfinding = () => {
    const createGrid = (numRows, numCols) => {
        const grid = []
        for (let row = 0; row < numRows; row++) {
            const currentRow = []
            for (let col = 0; col < numCols; col++) {
                currentRow.push(<Node row={row} col={col} />)
            }
            grid.push(currentRow)
        }
        return grid
    }

    const grid = createGrid(20, 40)
    const gridElement =
        <div className="grid">
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx} className="row">
                        {row.map((node, nodeIdx) => {
                            return <Node key={nodeIdx} row={rowIdx} col={nodeIdx} />
                        })}
                    </div>
                )
            })}
        </div>


    return (
        <div>
            {gridElement}
        </div>
    )
}
