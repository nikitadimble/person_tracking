import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const UserTrackingReport = () => {
  document.title = "Tracking | User Report";

  const [data] = useState([
    {
      srno: 1,
      userName: "John Doe",
      contactNo: "1234567890",
      email: "john@example.com",
      userType: "pune",
      permission: "Admin",
      jailName: "pune",
      designationName: "pune",
    },
    {
      srno: 2,
      userName: "Jane Smith",
      contactNo: "0987654321",
      email: "jane@example.com",
      userType: "pune",
      permission: "User",
      jailName: "pune",
      designationName: "pune",
    },
  ]);

  const [filterText, setFilterText] = useState("");

  const columns = [
    { name: "Sr.No.", selector: (row) => row.srno, sortable: true, width: "90px" },
    {
      name: "Actions",
      width: "200px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => alert("View: " + row.userName)}
          >
            View
          </button>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => alert("Edit: " + row.userName)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => alert("Delete: " + row.userName)}
          >
            Delete
          </button>
        </div>
      ),
    },
    { name: "User Name", selector: (row) => row.userName, sortable: true },
    { name: "Contact No", selector: (row) => row.contactNo },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "User Type", selector: (row) => row.userType, sortable: true },
    { name: "Permission", selector: (row) => row.permission, sortable: true },
    { name: "Jail Name", selector: (row) => row.jailName, sortable: true },
    { name: "Designation Name", selector: (row) => row.designationName, sortable: true },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#F3F4F7",
      },
    },
    cells: {
      style: {
        padding: "12px",
        fontSize: "14px",
      },
    },
  };

  const buttonStyle = {
    background: "#6c757d",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User Report" pageTitle="User" />
          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="User Report"
                  reportName="Add User"
                  url="/addUserTracking"
                />
                <CardBody>
                  {/* Export and Search */}
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

                      <CSVLink data={data} filename="user_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="user_report.xlsx">
                        <button style={buttonStyle}>Excel</button>
                      </CSVLink>
                    </div>

                    {/* Search box */}
                    <input
                      type="text"
                      placeholder="Search..."
                      value={filterText}
                      onChange={(e) => setFilterText(e.target.value)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "200px",
                      }}
                    />
                  </div>

                  {/* Data Table */}
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

export default UserTrackingReport;
