import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function App() {

    const [xIsNext, setXIsNext] = useState(true);
    const [number, setNumber] = useState(Array(9).fill(null));

    const handleClick = (index) => {

        //bugFix
        if (number[index] || calculateWinner(number)) {
            return;
        }

        const nextSquares = number.slice();
        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }
        setNumber(nextSquares);
        setXIsNext(!xIsNext);
    };

    const winner = calculateWinner(number);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className='Board'>
                <div>
                    <Board value={number[0]} onClick={() => handleClick(0)}/>
                    <Board value={number[1]} onClick={() => handleClick(1)}/>
                    <Board value={number[2]} onClick={() => handleClick(2)}/>
                </div>
                <div>
                    <Board value={number[3]} onClick={() => handleClick(3)}/>
                    <Board value={number[4]} onClick={() => handleClick(4)}/>
                    <Board value={number[5]} onClick={() => handleClick(5)}/>
                </div>
                <div>
                    <Board value={number[6]} onClick={() => handleClick(6)}/>
                    <Board value={number[7]} onClick={() => handleClick(7)}/>
                    <Board value={number[8]} onClick={() => handleClick(8)}/>
                </div>
            </div>
            <div>
                <div className="status">{status}</div>
            </div>
        </>
    );
}

function Board({value, onClick}) {

    return (
        <button className='BoardCell' onClick={onClick}>
            {value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

ReactDOM.render(<App/>, document.getElementById('root'));
