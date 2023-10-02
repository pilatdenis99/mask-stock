import React, { useState } from "react";
import ExistingHospitalForm from "./ExistingHospitalForm";
import NewHospitalForm from "./NewHospitalForm";
import OrderForm from "./OrderForm";

const HospitalForm = () => {
  const [form, setForm] = useState("existing");
  return (
    <>
      <div className="modal-btn">
        <button className="form-select" onClick={() => setForm("new")}>
          New Hospital
        </button>
        <button className="form-select" onClick={() => setForm("existing")}>
          Existing Hospital
        </button>
        <button className="form-select" onClick={() => setForm("order")}>
          Place Order
        </button>
        <br />
        {form === "order" ? (
          <OrderForm />
        ) : form === "existing" ? (
          <ExistingHospitalForm />
        ) : (
          <NewHospitalForm />
        )}
      </div>
    </>
  );
};

export default HospitalForm;
