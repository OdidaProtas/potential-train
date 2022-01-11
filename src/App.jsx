import { useReducer } from "react";
import Navigation from "./navigation/Navigation";
import { reducer, initialState, StateContext } from "./app/State";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ ...state, dispatch }}>
      <Navigation />
    </StateContext.Provider>
  );
}

export default App;
