"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { checkDB, getTheWord, createGame, checkGame } from "@/lib/checkDB";
import { getUserId } from "@/lib/users";

const GameContext = createContext();

export default function GameContextProvider({ children }) {
  let currentGameObject = {
    id: null,
    user_id: null,
    game_start_time: null,
    game_end_time: null,
    solution: null,
    guess_one: null,
    guess_two: null,
    guess_three: null,
    guess_four: null,
    guess_five: null,
    guess_six: null,
    duration: null,
    success: null,
    score: null,
  };

  const [currentGame, setCurrentGame] = useState(currentGameObject);

  const [gamesolution, setGamesolution] = useState();

  const [display1, setDisplay1] = useState("");
  const [display2, setDisplay2] = useState("");
  const [display3, setDisplay3] = useState("");
  const [display4, setDisplay4] = useState("");
  const [display5, setDisplay5] = useState("");

  async function getGuess() {
    if (display5 !== "") {
      const guess = display1 + display2 + display3 + display4 + display5;
      //console.log("important string!", guess);
      const isAllowedGuess = await checkDB(guess);
      if (isAllowedGuess.rowCount > 0) {
        let solutionarray = currentGame.solution.split("");

        if (solutionarray[0] == display1.toLowerCase()) {
          console.log("perfect");
        } else if (
          solutionarray[0] == display2.toLowerCase() ||
          solutionarray[0] == display3.toLowerCase() ||
          solutionarray[0] == display4.toLowerCase() ||
          solutionarray[0] == display5.toLowerCase()
        ) {
          console.log("good");
        } else {
          console.log("back");
        }

        console.log("It is a valid word but might not be correct");
      } else {
        console.log("Not a valid word");
      }

      console.log(isAllowedGuess);
    } else {
      // getTheWord();
      console.log("BAD BOY!");
    }
  }

  async function startNewGame() {
    const user = await getUserId();
    const isGame = await checkGame(user);
    if (!isGame) {
      const solution = await getTheWord();
      console.log(solution, user);
      createGame(solution, user);
    } else {
      let gameValues = {};
      if (isGame.rows[0]) {
        gameValues = isGame.rows[0];
        const copyCurrentGame = { ...currentGameObject };
        copyCurrentGame.id = gameValues.id;
        copyCurrentGame.user_id = gameValues.user_id;
        copyCurrentGame.game_start_time = gameValues.game_start_time;
        copyCurrentGame.solution = gameValues.solution;
        updateCurrentGame(copyCurrentGame);
      }
    }
  }

  function updateCurrentGame(copiedObject) {
    setCurrentGame({ ...currentGame, ...copiedObject });
  }

  function typeInLine(key) {
    if (display1 === "") {
      setDisplay1(key);
    } else if (display1 !== "" && display2 === "") {
      setDisplay2(key);
    } else if (display1 !== "" && display2 !== "" && display3 === "") {
      setDisplay3(key);
    } else if (display1 !== "" && display2 !== "" && display3 !== "" && display4 === "") {
      setDisplay4(key);
    } else if (display1 !== "" && display2 !== "" && display3 !== "" && display4 !== "" && display5 === "") {
      setDisplay5(key);
    }
  }

  function deleteLetter() {
    if (display5 !== "") {
      setDisplay5("");
    } else if (display5 === "" && display4 !== "") {
      setDisplay4("");
    } else if (display5 === "" && display4 === "" && display3 !== "") {
      setDisplay3("");
    } else if (display5 === "" && display4 === "" && display3 === "" && display2 !== "") {
      setDisplay2("");
    } else if (display5 === "" && display4 === "" && display3 === "" && display2 === "" && display1 !== "") {
      setDisplay1("");
    }
  }

  return (
    <GameContext.Provider value={{ currentGame, display1, display2, display3, display4, display5, getGuess, typeInLine, startNewGame, deleteLetter }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
