import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    //       // CETTE PETITE BOUCLE PERMET: D'ignorer le clic si quelqu’un a déjà gagné la partie, ou si la case est déjà remplie.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice(); // Copy the array(créer une nouvelle copie du tableau)
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  // ICI, je verifie s'il y a un gagnant
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// Affichage de la liste  des tours passés(history)et afficher l'état du jeu
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//  Déclaration d'un vaiqueur
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// function App() {
//   // Ex 1
//   // function waitForData(input) {
//   //   const inter = 2 * Number(input) + 1;
//   //   const data = Promise.resolve(inter);
//   //   return data;
//   // }
//   // console.log(waitForData(2));
//   // --------------------
//   // let fetchData = (inter) => Promise.resolve(inter);
//   // function waitForData(input) {
//   //   const inter = 2 * Number(input) + 1;
//   //   const data$ = fetchData(inter);
//   //   return data$;
//   // }
//   // console.log(waitForData(2));
//   // -----------------------
//   // Ex2
//   // async function waitForData(input) {
//   //   let data = [];
//   //   for (const element of Array.from(input)) {
//   //     data = data.concat(Promise.resolve(input), element);
//   //   }
//   //   return data;
//   // }
//   // console.log(waitForData("foooooo"));
//   // -----------------------------
//   // function fetchChunk(element) {
//   //   return Promise.resolve([element, element + 1, element + 2]);
//   // }
//   // function waitForData(input) {
//   //   // Fonction récursive
//   //   function getNextChunk(index) {
//   //     if (input.length <= index) return Promise.resolve([]);
//   //     const element = input[index];
//   //     const chunk$ = fetchChunk(element);
//   //     return chunk$.then((chunk) => {
//   //       let nextData$ = getNextChunk(index + 1);
//   //       return nextData$.then((nextData) => chunk.concat(nextData));
//   //     });
//   //   }
//   //   return getNextChunk(0);
//   // }
//   // console.log(waitForData([1, 2, 3]));
//   // // --------------------
//   // async function waitForData2(input) {
//   //   let data = [];
//   //   for (const element of input) {
//   //     data = data.concat(await fetchChunk(element));
//   //   }
//   //   return data;
//   // }
//   // console.log(waitForData2([1, 2, 3]));
//   // Ex3
//   //
//   // function waitForData(input) {
//   //   let dataChunks$ = [];
//   //   // Launch all parallel requests
//   //   for (const element of Array.from(input)) {
//   //     dataChunks$.push(Promise.resolve(element));
//   //   }
//   //   return dataChunks$;
//   // }
//   // console.log(waitForData("hello"));
//   // ------------------------
//   // EX4
//   // Complète le code pour retourner le premier résultat :
//   // function waitForData(availableServers) {
//   //   let data$ = [];
//   //   // Launch all parallel identical requests
//   //   for (const server of Array.from(availableServers)) {
//   //     data$.push(Promise.resolve(server));
//   //   }
//   //   return data$[0]; // TO BE COMPLETED: return the data of the first server to answer
//   // }
//   // console.log(waitForData("Hello"));
//   // EX 5------------------------------
//   // function MakeImg(props) {
//   //   return <img src={props.src} alt="" />;
//   // }
//   // const element = (
//   //   <MakeImg src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg" />
//   // );
//   // ReactDOM.render(element, document.getElementById("root"));
//   // --------------------------------
//   // function MakeImg(props) {
//   //   return <img src={props.src} alt="" />;
//   // }
//   // const element = MakeImg({
//   //   src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
//   // });
//   // ReactDOM.render(element, document.getElementById("root"));
//   // EX 6-----------------------------------
//   // const MakeImg = React.createElement;
//   // const root = ReactDOM.createRoot(document.getElementById("root"));
//   // root.render(
//   //   MakeImg(
//   //     "img",
//   //     {
//   //       src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
//   //     },
//   //     null
//   //   )
//   // );
//   // -----------------------------------
//   // const MakeImg = ({ src }) => React.createElement("img", { src });
//   // const element = MakeImg({
//   //   src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
//   // });
//   // ReactDOM.render(element, document.getElementById("root"));
//   // EX 7
//   // EX 8
//   // function Element(props) {
//   //   return (
//   //     <div>
//   //       <img src={props.src} alt="cat" />
//   //     </div>
//   //   );
//   // }
//   // const element = (
//   //   <Element
//   //     id="app"
//   //     src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
//   //   />
//   // );
//   // ReactDOM.render(element, document.getElementById("root"));
//   // -------------------------
//   // EX 9-----------------
//   // Étant donné fetchSrc
//   // function fetchSrc() {
//   //   return new Promise((resolve) =>
//   //     setTimeout(
//   //       () =>
//   //         resolve(
//   //           "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
//   //         ),
//   //       1000
//   //     )
//   //   );
//   // }

// export default App;
