import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchHelper from "../api";
const DeleteEmployee = (props) => {
  const handleDelete = async () => {
    const response = await fetchHelper({
      url: "deleteEmployee/" + props.empID,
      method: "DELETE",
    });

    toast.success(response.msg || "Employee Data deleted successfully");
    props.fetchData();
    props.onHide();
  };

  return (
    <>
      <div className="modal" style={{ display: props.show ? "block" : "none" }}>
        <div className="delete-modal-content">
          <div class="modal-alert-box">
            <h4>Alert! </h4>
            <p>Are you sure you want to delete ?</p>
          </div>
          <div class="modal-action-btn">
            <a
              href="#!"
              class={`btn btn-delete ${props.loadingDelete && "disabled"}`}
              onClick={() => !props.loadingDelete && handleDelete()}
            >
              Delete
            </a>
            <a href="#!" class=" btn btn-cancel" onClick={() => props.onHide()}>
              Cancel
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteEmployee;
