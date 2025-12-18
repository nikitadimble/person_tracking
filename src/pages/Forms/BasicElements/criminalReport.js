import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const CriminalReport = () => {
  document.title = "Police Duty Management | Criminal Report";
  const [filterText, setFilterText] = useState("");

  const [data] = useState([
    {
      srno: "1",
      criminalName: "John Doe",
      jailName: "Central Jail",
      policeStationName: "Station A",
      caseNo: "12345",
      crimeType: "FIR",
      arrestDate: "2024-01-10",
      arrestingIn: "Location X",
      address: "123 Main St",
      email: "john.doe@example.com",
      contactNo: "9876543210",
      altContactNo: "9123456789"
    },
    {
      srno: "2",
      criminalName: "Jane Smith",
      jailName: "City Jail",
      policeStationName: "Station B",
      caseNo: "67890",
      crimeType: "abc",
      arrestDate: "2024-02-15",
      arrestingIn: "Location Y",
      address: "456 Side Rd",
      email: "jane.smith@example.com",
      contactNo: "9080706050",
      altContactNo: "9012345678"
    }
  ]);

  const columns = [
    { name: "Sr.No.", selector: row => row.srno, sortable: true, width: "90px" },
    {
      name: "Actions",
      width: "220px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => alert("View: " + row.criminalName)}>
            View
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => alert("Edit: " + row.criminalName)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => alert("Delete: " + row.criminalName)}>
            Delete
          </button>
        </div>
      )
    },
    { name: "Criminal Name", selector: row => row.criminalName, sortable: true },
    { name: "Jail Name", selector: row => row.jailName },
    { name: "Police Station Name", selector: row => row.policeStationName },
    { name: "Case Number", selector: row => row.caseNo },
    { name: "Crime Type", selector: row => row.crimeType },
    { name: "Arrest Date", selector: row => row.arrestDate },
    { name: "Arresting In", selector: row => row.arrestingIn },
    { name: "Address", selector: row => row.address },
    { name: "Email", selector: row => row.email },
    { name: "Contact No", selector: row => row.contactNo },
    { name: "Alt Contact No", selector: row => row.altContactNo }
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#F3F4F7"
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
          <BreadCrumb title="Criminal Report" pageTitle="Criminal" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Criminal Report"
                  reportName="Add Criminal"
                  url="/addCriminal"
                />

                <CardBody>

                  {/* EXPORT & SEARCH */}
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

                      <CSVLink data={data} filename="criminal_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="criminal_report.xlsx">
                        <button style={buttonStyle}>Excel</button>
                      </CSVLink>
                    </div>

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

                  {/* DATA TABLE */}
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

export default CriminalReport;
