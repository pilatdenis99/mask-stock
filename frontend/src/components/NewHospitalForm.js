import React, { useEffect, useState } from "react";
import { useHospitalContext } from "../hooks/useHospitalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Select from "react-select";

const NewHospitalForm = () => {
  const { dispatch } = useHospitalContext();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [vat, setVat] = useState("");
  const [users, setUsers] = useState("");
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("http://localhost:4000/api/countries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const result = await response.json();
      setCountries(result);
    };
    getCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const hospital = {
      name,
      city,
      country,
      users,
      currency,
    };

    const respone = await fetch("http://localhost:4000/api/hospitals", {
      method: "POST",
      body: JSON.stringify(hospital),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await respone.json();

    if (!respone.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (respone.ok) {
      setName("");
      setCity("");
      setCountry("");
      setVat("");
      setUsers("");
      setCurrency("");
      setError(null);
      setEmptyFields([]);
      console.log("New hospital added", json);
      dispatch({
        type: "CREATE_HOSPITAL",
        payload: json,
      });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new hospital</h3>
      <label>Hospital name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        // className={emptyFields.includes("name") ? "error" : ""}
      />
      <label htmlFor="country">Country:</label>
      {/* <input
        type="text"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
        value={country}
        // className={emptyFields.includes("country") ? "error" : ""}
      /> */}

      <Select
        name="country"
        isClearable
        options={countries.map((country) => {
          return { value: country.currencyCode, label: country.countryName };
        })}
        className="basic-single"
        classNamePrefix="select"
        onChange={(e) => {
          setCountry(e.label);
          setCurrency(e.value);
        }}
      />

      <label>City:</label>
      <input
        type="text"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        // className={emptyFields.includes("city") ? "error" : ""}
      />

      {/* <label>VAT:</label>
      <input
        type="number"
        onChange={(e) => setVat(e.target.value)}
        value={vat}
        // className={emptyFields.includes("vat") ? "error" : ""}
      /> */}
      {/* <label>Currency:</label>
      <input
        type="text"
        onChange={(e) => setCurrency(e.target.value)}
        value={currency}
        // className={emptyFields.includes("currency") ? "error" : ""}
      /> */}
      <button>Add hospital</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NewHospitalForm;
