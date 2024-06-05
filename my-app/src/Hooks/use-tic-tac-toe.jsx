import { useState ,useEffect } from "react";

const initialBoard = () => Array(9).fill(null);

const useTictacToe = () => {
    const [board, setBoard] = useState(initialBoard());
    const [isRedNext, setIsRedNext] = useState(true);
    const [score, setScore] = useState({ Red: 0, Blue: 0 });


    useEffect(() => {
        // Load score from local storage
        const storedScore = localStorage.getItem('score');
        if (storedScore) {
            setScore(JSON.parse(storedScore));
        }
    }, []);

    useEffect(() => {
        // Save score to local storage
        localStorage.setItem('score', JSON.stringify(score));
    }, [score]);
   

    const WINNING_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const calculateWinner = (currentBoard) => {
        for (let i = 0; i < WINNING_PATTERNS.length; i++) {
            const [a, b, c] = WINNING_PATTERNS[i];
            if (
                currentBoard[a] &&
                currentBoard[a] === currentBoard[b] &&
                currentBoard[a] === currentBoard[c]
            ) {
                return currentBoard[a];
            }
        }

        return null;
    };

    
    const updateScore = (winner) => {
        if (winner) {
            setScore((prevScore) => ({
                ...prevScore,
                [winner]: prevScore[winner] + 1,
            }));
        }
    };
   

    const handleClick = (index) => {
        // check winner
        const winner = calculateWinner(board);
        if (winner || board[index]) return;
        const newBoard = [...board];
        newBoard[index] = isRedNext ? "Red" : "Blue";
        setBoard(newBoard);
        setIsRedNext(!isRedNext);
         newBoard[index] = isRedNext ? 'Red' : 'Blue';
         const newWinner = calculateWinner(newBoard);
         if (newWinner) {
             updateScore(newWinner);
         }
    };

    const getStatusMessage = () => {
        const winner = calculateWinner(board);
        if (winner) return `Player ${winner} wins!`;
        if (!board.includes(null)) return `It's a draw!`;
        return `Player ${isRedNext ? "Red" : "Blue"} turn`;
    };

    const resetGame = () => {
        setBoard(initialBoard());
        setIsRedNext(true);
    };

    return { board, handleClick, calculateWinner, getStatusMessage, resetGame , score};
};

export default useTictacToe;