import React, { useEffect } from "react";
import { useHospitalContext } from "../hooks/useHospitalContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import HospitalDetails from "../components/HospitalDetails";
import HospitalForm from "../components/HospitalForm";
const Home = () => {
  const { hospitals, dispatch } = useHospitalContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await fetch("http://localhost:4000/api/hospitals", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_HOSPITALS", payload: json });
      }
    };

    if (user) {
      fetchHospitals();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="hospitals">
        {hospitals &&
          hospitals.map((hospital) => (
            <HospitalDetails key={hospital._id} hospital={hospital} />
          ))}
      </div>
      <HospitalForm />
    </div>
  );
};

export default Home;
