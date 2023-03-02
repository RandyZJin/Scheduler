import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newState, replace) => {

    setHistory(prev => {
      let prevCopy = prev;
      if (!replace) {
          prevCopy.push(newState);
          return prevCopy;
      } else {

        return [...prevCopy.slice(0, prev.length - 1), newState];
      }
    });

    setMode(newState);
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();
      return setMode(history[history.length - 1])
    } else {
      return setMode(initial);
    }
  }
  return { mode, transition, back };
}
