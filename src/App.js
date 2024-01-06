import { useEffect, useRef, useState } from "react";
import "./App.css";
import LoadingBar from "react-top-loading-bar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import editIcon from "./assests/download.png";
import deleteIcon from "./assests/delete-icon-1864x2048-bp2i0gor.png";
import AddNewEmployee from "./modals/addNewEmployee";
import EditEmployee from "./modals/editEmployee";
import DeleteEmployee from "./modals/deleteEmployee";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchHelper from "./api";
function App() {
  var ref = useRef(null);
  const [loadingEmployeeDetails, setLoadingEmployeeDetails] = useState(false);
  const [addNewEmp, setAddNewEmp] = useState(false);
  const [editEmp, setEditEmp] = useState(false);
  const [deleteEmp, setDeleteEmp] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [empID, setEmpId] = useState();
  const [selectEmployeeData, setSelectedEmployeeData] = useState(null);

  const toggleAddModal = () => {
    setAddNewEmp(!addNewEmp);
    setSelectedEmployeeData(null);
  };

  const toggleEditModal = () => {
    setEditEmp(!editEmp);
    setSelectedEmployeeData(null);
  };

  const toggleDeleteModal = (employee) => {
    if (employee !== undefined) {
      setEmpId(employee._id);
      setDeleteEmp(!deleteEmp);
    } else setDeleteEmp(false);
  };

  // for fetching employee data

  const fetchData = async () => {
    try {
      if (ref.current) {
        ref.current.continuousStart();
      }
      const response = await fetchHelper({url:"getAllEmployee"});
      setEmployeeData(response);
      setLoadingEmployeeDetails(false);
    } finally {
      if (ref.current) {
        ref.current.complete();
      }
      setLoadingEmployeeDetails(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div className="main">
      <LoadingBar height={5} color="#47AD1D" ref={ref} />
      <div className="top-s">
        <h1>Employee Management</h1>
        <button onClick={() => toggleAddModal()}>Add new Employee</button>
      </div>

      <h1 className="title">Employee List</h1>
      <div className="userTable">
        <table className="">
          <thead>
            <tr>
              <th>
                <span>Name</span>
              </th>
              <th>
                <span>Email</span>
              </th>

              <th>
                <span>DOB</span>
              </th>

              <th>
                <span>Salary</span>
              </th>

              <th>
                <span>Joining Date</span>
              </th>

              <th>
                <span>Relieving Date</span>
              </th>

              <th>
                <span>Status</span>
              </th>
              <th colSpan={2}>
                <span>Action</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {loadingEmployeeDetails
              ? [1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <tr key={item}>
                    <td style={{ width: "18%" }}>
                      <Skeleton />
                    </td>
                    <td style={{ width: "18%" }}>
                      <Skeleton />
                    </td>
                    <td style={{ width: "25%" }} className="word-break">
                      <Skeleton />
                    </td>
                    <td style={{ width: "25%" }} className="word-break">
                      <Skeleton />
                    </td>
                    <td style={{ width: "18%" }}>
                      <Skeleton />
                    </td>
                    <td style={{ width: "18%" }}>
                      <Skeleton />
                    </td>
                    <td style={{ width: "18%" }}>
                      <Skeleton />
                    </td>
                    <td style={{ width: "18%" }}>
                      <Skeleton />
                    </td>
                  </tr>
                ))
              : employeeData &&
                employeeData.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{formatDate(employee.dob)}</td>
                    <td>{employee.salary}</td>
                    <td>{formatDate(employee.joiningDate)}</td>
                    <td>{formatDate(employee.relievingDate)}</td>
                    <td>{employee.status}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        onClick={() => {
                          toggleEditModal();
                          setSelectedEmployeeData(employee);
                        }}
                      >
                        <img src={editIcon} alt="" />
                      </button>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button onClick={() => toggleDeleteModal(employee)}>
                        <img src={deleteIcon} alt="" />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <AddNewEmployee
          show={addNewEmp}
          onHide={toggleAddModal}
          loading={loadingEmployeeDetails}
          setSelectedEmployeeData={setSelectedEmployeeData}
          selectEmployeeData={selectEmployeeData}
          fetchData={fetchData}
          />
        <EditEmployee
          fetchData={fetchData}
          show={editEmp}
          onHide={toggleEditModal}
          loading={loadingEmployeeDetails}
          setSelectedEmployeeData={setSelectedEmployeeData}
          selectEmployeeData={selectEmployeeData}
          />
        <DeleteEmployee
          fetchData={fetchData}
          show={deleteEmp}
          onHide={toggleDeleteModal}
          loadingDelete={loadingEmployeeDetails}
          empID={empID}
        />
      </div>
      <ToastContainer
      autoClose={2000} />
    </div>
  );
}

export default App;
