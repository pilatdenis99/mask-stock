import { HospitalsContext } from "../context/HospitalContext";
import { useContext } from "react";

export const useHospitalContext = () => {
  const context = useContext(HospitalsContext);

  if (!context) {
    throw Error(
      "useHospitalContext must be used inside an HospitalContextProvider"
    );
  }

  return context;
};
