import React from "react";

// createContext = create storage like redux "createStore"
// createContext(here is a default value structure)
// When proper Provider is not detected, returns this value.
const store = React.createContext<any>(null);

export default store;
