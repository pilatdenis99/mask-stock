import React, { useEffect, useState } from "react";
import { useHospitalContext } from "../hooks/useHospitalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Select from "react-select";

const NewHospitalForm = () => {
  const { dispatch } = useHospitalContext();
  const { user } = useAuthContext();

  const [hospitals, setHospitals] = useState([]);
  const [id, setId] = useState("");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const getHospitalsName = async () => {
      const results = [];
      const response = await fetch("http://localhost:4000/api/hospitals/name", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      data.map((hospital) =>
        results.push({ value: hospital._id, label: hospital.name })
      );
      setHospitals(results);
    };

    getHospitalsName();
  }, [clicked]);

  const [selected, setSelected] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (!user) {
      setError("You must be logged id");
      return;
    }

    if (id !== "") {
      const respone = await fetch("http://localhost:4000/api/hospitals/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await respone.json();

      if (!respone.ok) {
        setError(json.error);
      }

      if (respone.ok) {
        setId("");
        setSelected("");
        setClicked(!clicked);
        setError(null);
        console.log("New hospital added", json);
        dispatch({
          type: "CREATE_HOSPITAL",
          payload: json,
        });
      }
    }
  };

  return (
    <div>
      <h3>Pick from one of the existing hospitals</h3>
      <br />
      <label htmlFor="hospitals">Select your hospital</label>
      <Select
        // isMulti
        name="hospitals"
        // value={selected}
        // placeholder={selected}
        isClearable
        options={hospitals}
        className="basic-single"
        classNamePrefix="select"
        onChange={(e) => {
          setId(e.value);
          setSelected(e.label);
          console.log(e.label);
        }}
      />
      {/* <select
        onChange={(e) => {
          console.log(e.value);
          console.log(e.label);
        }}
      >
        {hospitals.map((hospital) => {
          return <option value={hospital.value}>{hospital.label}</option>;
        })}
      </select> */}
      <br />
      <button className="add-button" onClick={handleSubmit}>
        Add Hospital
      </button>
    </div>
  );
};

export default NewHospitalForm;
