import { createContext, useReducer } from "react";

export const HospitalsContext = createContext();
export const hospitalsReducer = (state, action) => {
  switch (action.type) {
    case "SET_HOSPITALS":
      return {
        hospitals: action.payload,
      };
    case "CREATE_HOSPITAL":
      return {
        hospitals: [action.payload, ...state.hospitals],
      };
    case "DELETE_HOSPITAL":
      return {
        hospitals: state.hospitals.filter((h) => h._id !== action.payload._id),
      };
    case "UPDATE_HOSPITAL":
      return {
        hospitals: state.hospitals.filter((h) => h._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const HospitalsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hospitalsReducer, {
    hospitals: null,
  });

  return (
    <HospitalsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HospitalsContext.Provider>
  );
};
