import { useHospitalContext } from "../hooks/useHospitalContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import Modal from "react-modal";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import React from "react";

const HospitalDetails = ({ hospital }) => {
  const { dispatch } = useHospitalContext();
  const { user } = useAuthContext();
  const downloadInvoice = require("./downloadInvoice");

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "http://localhost:4000/api/hospitals/" + hospital._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_HOSPITAL", payload: json });
    }
    window.location.reload(true);
  };
  return (
    <div className="hospital-details">
      <h4>{hospital.name}</h4>
      <p>
        <strong>City: </strong>
        {hospital.city}
      </p>
      <p>
        <strong>Country: </strong>
        {hospital.country}
      </p>
      <p>
        <strong>VAT: </strong>
        {hospital.vat}%
      </p>
      <p>
        <strong>Currency: </strong>
        {hospital.currency}
      </p>
      <p>
        {formatDistanceToNow(new Date(hospital.createdAt), { addSuffix: true })}
      </p>
      <span
        style={{ cursor: "pointer" }}
        className="material-symbols-outlined"
        onClick={handleClick}
      >
        delete
      </span>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button
          className="add-button"
          onClick={async () => {
            const response = await fetch(
              `http://localhost:4000/api/orders/${hospital._id}`,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            const result = await response.json();

            result.length > 0
              ? setModalData(
                  <>
                    <h2 style={{ display: "flex", justifyContent: "center" }}>
                      List of orders for {hospital.name}
                    </h2>
                    <Table celled>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>User ID</Table.HeaderCell>
                          <Table.HeaderCell>Hospital ID</Table.HeaderCell>
                          <Table.HeaderCell>Hospital Name</Table.HeaderCell>
                          <Table.HeaderCell>Product</Table.HeaderCell>
                          <Table.HeaderCell>Quantity</Table.HeaderCell>
                          <Table.HeaderCell>Price per Piece</Table.HeaderCell>
                          <Table.HeaderCell>VAT %</Table.HeaderCell>
                          <Table.HeaderCell>Total VAT</Table.HeaderCell>
                          <Table.HeaderCell>
                            Total ( VAT incl. )
                          </Table.HeaderCell>
                          <Table.HeaderCell>Created At</Table.HeaderCell>
                          <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {result.map((order) => (
                          <Table.Row>
                            <Table.Cell>{order.user_ID}</Table.Cell>
                            <Table.Cell>{order.hospital_ID}</Table.Cell>
                            <Table.Cell>{order.hospital_Name}</Table.Cell>
                            <Table.Cell>{order.items}</Table.Cell>
                            <Table.Cell>{order.ammount}</Table.Cell>
                            <Table.Cell>{order.price_Per_Piece}</Table.Cell>
                            <Table.Cell>{order.vat}</Table.Cell>
                            <Table.Cell>{order.total_Vat}</Table.Cell>
                            <Table.Cell>{order.total}</Table.Cell>
                            <Table.Cell>
                              {new Date(order.createdAt).toLocaleString()}
                            </Table.Cell>
                            <Table.Cell>
                              <Button
                                onClick={() => downloadInvoice(order, hospital)}
                              >
                                Download Invoice
                              </Button>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </>
                )
              : setModalData(
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h2>No orders in history</h2>
                  </div>
                );
            setModalIsOpen(true);
          }}
        >
          Orders
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <Button
            floated="right"
            icon="times"
            onClick={() => setModalIsOpen(false)}
          ></Button>
          {modalData}
          {/* <Button onClick={() => setModalIsOpen(false)}>Close</Button> */}
        </Modal>
      </div>
    </div>
  );
};

export default HospitalDetails;
