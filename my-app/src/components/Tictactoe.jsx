import useTictacToe from "../Hooks/use-tic-tac-toe";

function TicTacToe() {
  const { board, handleClick, resetGame, getStatusMessage, score } = useTictacToe();
  return (
    <div className="game">
      <div className="status">
        {getStatusMessage()}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
      <div className="score-board">
        <div>Red: <span>{score.Red}</span></div>
        <div>Blue: <span>{score.Blue}</span></div>
      </div>

      <div className="board">
        {board.map((b, index) => {
          return (
            <button
              className={`cell ${b === 'Red' ? 'red' : b === 'Blue' ? 'blue' : ''}`}
              key={index}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicTacToe;