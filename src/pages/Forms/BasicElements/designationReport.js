import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const DesignationReport = () => {
  document.title = "Tracking | Designation Report";

  // Dummy data for designations
  const [data] = useState([
    { srno: "1", designationName: "Constable", servingLevel: "Haweli" },
    { srno: "2", designationName: "Inspector", servingLevel: "Bhor" },
    { srno: "3", designationName: "Head Constable", servingLevel: "Haweli" },
    { srno: "4", designationName: "Sub-Inspector", servingLevel: "Bhor" }
  ]);

  const [filterText, setFilterText] = useState("");

  // Columns for the table
  const columns = [
    { name: "Sr.No.", selector: row => row.srno, sortable: true, width: "90px" },
    {
      name: "Actions",
      width: "200px",
      cell: row => (
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => alert("View: " + row.designationName)}>View</button>
          <button className="btn btn-warning btn-sm" onClick={() => alert("Edit: " + row.designationName)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => alert("Delete: " + row.designationName)}>Delete</button>
        </div>
      )
    },
    { name: "Designation Name", selector: row => row.designationName, sortable: true },
    { name: "Serving Level", selector: row => row.servingLevel, sortable: true }
  ];

  // Custom styles for the table
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

  // Filter data based on search text
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
          <BreadCrumb title="Designation Report" pageTitle="Designation" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Designation Report"
                  reportName="Add Designation"
                  url="/addDesignation"
                />

                <CardBody>

                  {/* Export and Search */}
                  <div className="d-flex gap-3 mb-3 flex-wrap align-items-center justify-content-between">
                    <div className="d-flex gap-3 flex-wrap">
                      <button
                        style={buttonStyle}
                        onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
                      >
                        Copy
                      </button>

                      <CSVLink data={data} filename="designation_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="designation_report.xlsx">
                        <button style={buttonStyle}>Excel</button>
                      </CSVLink>
                    </div>

                    {/* Search box */}
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

export default DesignationReport;
