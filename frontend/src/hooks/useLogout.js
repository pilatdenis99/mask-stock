import { useAuthContext } from "./useAuthContext";
import { useHospitalContext } from "./useHospitalContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: hospitalsDispatch } = useHospitalContext();

  const logout = () => {
    // remove user from stoarage
    localStorage.removeItem("user");

    // remove global value with dispatch

    dispatch({ type: "LOGOUT" });
    hospitalsDispatch({ type: "SET_HOSPITALS", payload: "" });
  };
  return { logout };
};
