import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const PoliceStationReport = () => {
  document.title = "Tracking | Police Station Report";

  const [data] = useState([
    {
      srno: 1,
      policeStationName: "Pune Central",
      locationType: "pune",
      address: "123 Pune Road",
      contactNo: "1234567890",
      altContactNo: "0987654321",
      email: "punecentral@police.gov",
    },
    {
      srno: 2,
      policeStationName: "Pune East",
      locationType: "pune",
      address: "456 East Street",
      contactNo: "1112223333",
      altContactNo: "4445556666",
      email: "puneeast@police.gov",
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
            onClick={() => alert("View: " + row.policeStationName)}
          >
            View
          </button>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => alert("Edit: " + row.policeStationName)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => alert("Delete: " + row.policeStationName)}
          >
            Delete
          </button>
        </div>
      ),
    },
    { name: "Police Station Name", selector: (row) => row.policeStationName, sortable: true },
    { name: "Location Type", selector: (row) => row.locationType, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "Contact No", selector: (row) => row.contactNo },
    { name: "Alt Contact No", selector: (row) => row.altContactNo },
    { name: "Email", selector: (row) => row.email, sortable: true },
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
          <BreadCrumb title="Police Station Report" pageTitle="Police Station" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Police Station Report"
                  reportName="Add Police Station"
                  url="/addPoliceStation"
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

                      <CSVLink data={data} filename="police_station_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="police_station_report.xlsx">
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

export default PoliceStationReport;
