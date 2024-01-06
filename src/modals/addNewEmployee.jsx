import React from "react";
import cross from "./../assests/cross.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchHelper from "../api";

const AddNewEmployee = (props) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      ...props.selectEmployeeData,
    };

    const response = await fetchHelper({
      url: "createEmployee",
      method: "POST",
      body: formData,
    });
    toast.success(response?.msg || "Data added successfully");
    props.fetchData();
    props.onHide();
  };

  return (
    <>
      <div className="modal" style={{ display: props.show ? "block" : "none" }}>
        <div className="modal-content">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3
              style={{
                marginBottom: "12px",
                marginTop: "2px",
                color: "#4caf50",
              }}
            >
              Add New Employee
            </h3>
            <span className="close" onClick={() => props.onHide()}>
              <img src={cross} alt="" />
            </span>
          </div>

          <form id="userForm" onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => {
                console.log(e.target.value);
                const data = { ...props.selectEmployeeData };
                data.name = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => {
                const data = { ...props.selectEmployeeData };
                data.email = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              id="dob"
              name="dob"
              required
              onChange={(e) => {
                const data = { ...props.selectEmployeeData };
                data.dob = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              required
              onChange={(e) => {
                const data = { ...props.selectEmployeeData };
                data.salary = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <label htmlFor="joiningDate">Joining Date</label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              required
              onChange={(e) => {
                const data = { ...props.selectEmployeeData };
                data.joiningDate = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <label htmlFor="relievingDate">Relieving Date</label>
            <input
              type="date"
              id="relievingDate"
              name="relievingDate"
              required
              onChange={(e) => {
                const data = { ...props.selectEmployeeData };
                data.relievingDate = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              required
              onChange={(e) => {
                const data = { ...props.selectEmployeeData };
                data.status = e.target.value;
                props.setSelectedEmployeeData(data);
              }}
            />

            <button type="submit" className="modal-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNewEmployee;
