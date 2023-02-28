import { useState } from "react";

// export default function useVisualMode(mode) {
//   setState(prev => ({ ...prev, mode: mode }));
//   return state;
// }

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newState, replace) => {
    // console.log(`as of line 13 ${history}`)

    // console.log(`this is ${newState}`);
    setHistory(prev => {
      let prevCopy = prev;
      if (!replace) {
          // console.log(`prev right now is ${prev}`);
          prevCopy.push(newState);
          return prevCopy;
      } else {
        console.log(`prev right now is ${prev}`);

        return [...prevCopy.slice(0, prev.length - 1), newState];
      }
    });
    // setHistory(prev => {
    //     if (prev) {

    //       let prevCopy = prev
    //       // console.log(`prev right now is ${prev}`);
    //       prevCopy.push(newState);
    //       return prevCopy;
    //     }

    // })
    // ;
    setMode(newState);
  }

  const back = () => {
    // console.log(`history is ${history}`);
    if (history.length > 1) {
      history.pop();
      // console.log(`history pop is ${history.pop()}`);
      return setMode(history[history.length - 1])
    } else {
      return setMode(initial);
    }
  }

  return { mode, transition, back };
}

// export default function transition(state, mode) {
//   setMode(mode);
//   return(mode)
// }
