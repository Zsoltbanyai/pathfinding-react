import './Node.css'

export const Node = ({row, col, isStart, isEnd}) => {
    let className = 'node'
    if (isStart) className += ' start-node'
    if (isEnd) className += ' end-node'
    return <div className={className}></div>
}

