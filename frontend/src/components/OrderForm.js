import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useAuthContext } from "../hooks/useAuthContext";

const OrderForm = () => {
  const { user } = useAuthContext();
  const [hospitals, setHospitals] = useState([]);

  function formatNumber(number) {
    return isNaN(number)
      ? 0
      : new Intl.NumberFormat("en-EN").format(Math.round(number * 100) / 100);
  }

  useEffect(() => {
    const getHospitalsName = async () => {
      const results = [];
      const response = await fetch("http://localhost:4000/api/hospitals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      data.map((hospital) =>
        results.push({ value: hospital._id, label: hospital.name })
      );
      setHospitals(results);
    };

    getHospitalsName();
  }, []);

  const [id, setId] = useState("");
  const [hospital, setHospital] = useState(null);
  const [price, setPrice] = useState(0);
  const [rate, setRate] = useState(0);
  const [ammount, setAmmount] = useState("");
  const [totalVat, setTotalVat] = useState("");
  const [total, setTotal] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ammount !== "" && price && price !== 0) {
      const updateData = async () => {
        setTotal(
          ammount * price + ammount * price * (parseInt(hospital.vat) / 100)
        );
        setTotalVat(ammount * price * (parseInt(hospital.vat) / 100));
      };
      updateData();
    }
  }, [ammount]);

  useEffect(() => {
    const getHospitalDetails = async () => {
      const response = await fetch(
        "http://localhost:4000/api/hospitals/id/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setHospital(data);
    };

    if (id !== "") getHospitalDetails();
  }, [id, user.token]);

  useEffect(() => {
    const getRates = async () => {
      const response = await fetch(
        "http://localhost:4000/api/currency/" + hospital.currency,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setPrice(data.rate * 10);
    };
    if (hospital) getRates();
  }, [hospital]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged id");
      return;
    }

    const order = {
      hospitalId: id,
      hospitalName: hospital.name,
      items: "Masks",
      pricePerPiece: price,
      ammount: ammount,
      vat: hospital.vat,
      totalVat: totalVat,
      total: total,
    };

    const respone = await fetch("http://localhost:4000/api/orders/" + id, {
      method: "POST",
      body: JSON.stringify(order),
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
      setHospital(null);
      setAmmount("");
      setTotalVat("");
      setTotal("");
      setPrice(0);
      setError(null);
      console.log("New order added", json);
    }
  };

  return (
    <div>
      <h3>Order Masks for your hospital</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="hospital">Select your hospital:</label>
        <Select
          name="hospital"
          isClearable
          options={hospitals}
          className="basic-single"
          classNamePrefix="select"
          onChange={(e) => {
            setId(e.value);
          }}
        />
        <br />
        <label htmlFor="masks">Masks Ammount:</label>
        <input
          type="number"
          value={ammount}
          onChange={(e) => setAmmount(e.target.value)}
        />
        <br />
        {hospital !== null ? (
          <div>
            <span>
              <strong>Price per Unit : </strong> {price} {hospital.currency}
            </span>
            <br />
            <span>
              <strong>VAT({hospital.vat}%) : </strong>
              {hospital
                ? formatNumber(ammount * price * (parseInt(hospital.vat) / 100))
                : ""}{" "}
              {hospital.currency}
            </span>
            <br />
            <span>
              <strong>Total price ( VAT incl. ) :{"  "}</strong>
              {hospital
                ? formatNumber(
                    ammount * price +
                      ammount * price * (parseInt(hospital.vat) / 100)
                  )
                : ""}{" "}
              {hospital.currency}
            </span>
          </div>
        ) : (
          ""
        )}
        <br />
        <button className="add-button">Place Order</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default OrderForm;
