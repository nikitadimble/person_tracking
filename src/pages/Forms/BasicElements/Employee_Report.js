import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const EmployeeReport = () => {
  document.title = "Police Duty Management | Employee Report";
  const [filterText, setFilterText] = useState("");

  const [data] = useState([
    { srno: "1", buckleNo: "10001", name: "Rajesh Patil", email: "rajesh.patil@example.com", contact: "9876543210", gender: "Male", dob: "1990-05-12", designation: "Constable", company: "LA1", handicap: "No" },

    { srno: "2", buckleNo: "10002", name: "Sneha Kulkarni", email: "sneha.kulkarni@example.com", contact: "9123456780", gender: "Female", dob: "1994-11-20", designation: "SI", company: "LA3", handicap: "Yes" },

    { srno: "3", buckleNo: "10003", name: "Amit Shinde", email: "amit.shinde@example.com", contact: "9988776655", gender: "Male", dob: "1988-03-14", designation: "Head Constable", company: "LA2", handicap: "No" },

    { srno: "4", buckleNo: "10004", name: "Pranali Deshmukh", email: "pranali.deshmukh@example.com", contact: "9090909090", gender: "Female", dob: "1995-09-08", designation: "ASI", company: "LA4", handicap: "No" },

    { srno: "5", buckleNo: "10005", name: "Sachin More", email: "sachin.more@example.com", contact: "8080808080", gender: "Male", dob: "1991-12-01", designation: "Constable", company: "LA1", handicap: "Yes" },

    { srno: "6", buckleNo: "10006", name: "Rutuja Jadhav", email: "rutuja.jadhav@example.com", contact: "9812345678", gender: "Female", dob: "1996-04-23", designation: "PSI", company: "LA6", handicap: "No" },

    { srno: "7", buckleNo: "10007", name: "Vikram Pawar", email: "vikram.pawar@example.com", contact: "9723456780", gender: "Male", dob: "1987-10-11", designation: "Inspector", company: "LA7", handicap: "No" },

    { srno: "8", buckleNo: "10008", name: "Komal Gawade", email: "komal.gawade@example.com", contact: "9098789098", gender: "Female", dob: "1993-07-19", designation: "Constable", company: "LA5", handicap: "No" },

    { srno: "9", buckleNo: "10009", name: "Sagar Nikam", email: "sagar.nikam@example.com", contact: "9822223344", gender: "Male", dob: "1989-02-03", designation: "ASI", company: "LA2", handicap: "Yes" },

    { srno: "10", buckleNo: "10010", name: "Pooja Khot", email: "pooja.khot@example.com", contact: "9765432100", gender: "Female", dob: "1997-01-27", designation: "SI", company: "LA3", handicap: "No" }
  ]);


  const columns = [
    { name: "Sr.No.", selector: row => row.srno, sortable: true, width: "90px" },
    {
      name: "Actions",
      width: "220px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => alert("View: " + row.name)}>
            View
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => alert("Edit: " + row.name)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => alert("Delete: " + row.name)}>
            Delete
          </button>
        </div>
      )
    },
    { name: "Buckle No", selector: row => row.buckleNo, sortable: true },
    { name: "Name", selector: row => row.name, sortable: true },
    { name: "Email", selector: row => row.email },
    { name: "Contact", selector: row => row.contact },
    { name: "Gender", selector: row => row.gender },
    { name: "DOB", selector: row => row.dob },
    { name: "Designation", selector: row => row.designation },
    { name: "Company", selector: row => row.company },
    { name: "Handicap", selector: row => row.handicap },


  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#F3F4F7",
      }
    },
    cells: {
      style: {
        padding: "12px",
        fontSize: "14px"
      }
    }
  };
  const buttonStyle = {
    background: "#6c757d",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };
  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      val.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );
  return (
    <React.Fragment>
      <UiContent />

      <div className="page-content">
        <Container fluid>

          <BreadCrumb title="Employee Report" pageTitle="Employee" />

          <Row>
            <Col lg={12}>
              <Card>

                <PreviewCardHeader
                  title="Employee Report"
                  reportName="Add Employee"
                  url="/add-employee"
                />

                <CardBody>

                  {/* EXPORT BUTTONS */}
                  <div className="d-flex gap-3 mb-3 flex-wrap align-items-center justify-content-between">
                    <div className="d-flex gap-3 flex-wrap">
                      <button
                        style={buttonStyle}
                        onClick={() =>
                          navigator.clipboard.writeText(JSON.stringify(data, null, 2))
                        }
                      >
                        Copy
                      </button>

                      <CSVLink data={data} filename="department_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>PDF</button>

                      <CSVLink data={data} filename="department_report.xlsx">
                        <button style={buttonStyle}>Excel</button>
                      </CSVLink>
                    </div>

                    {/* SEARCH BOX */}
                    <input
                      type="text"
                      placeholder="Search..."
                      value={filterText}
                      onChange={e => setFilterText(e.target.value)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "200px"
                      }}
                    />
                  </div>

                  {/* REPORT TABLE */}
                  <div className="table-responsive">
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      highlightOnHover
                      customStyles={customStyles}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmployeeReport;
