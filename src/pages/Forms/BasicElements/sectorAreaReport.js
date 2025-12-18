import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const SectorAreaReport = () => {
  document.title = "Tracking | Sector Area Report";

  const [data] = useState([
    { srno: "1", areaName: "Area 1", latitude: "18.5204", longitude: "73.8567" },
    { srno: "2", areaName: "Area 2", latitude: "18.5300", longitude: "73.8600" },
    { srno: "3", areaName: "Area 3", latitude: "18.5400", longitude: "73.8700" }
  ]);

  const [filterText, setFilterText] = useState("");

  const columns = [
    { name: "Sr.No.", selector: row => row.srno, sortable: true, width: "90px" },
    {
      name: "Actions",
      width: "200px",
      cell: row => (
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => alert("View: " + row.areaName)}>View</button>
          <button className="btn btn-warning btn-sm" onClick={() => alert("Edit: " + row.areaName)}>Edit</button>
          <button className="btn btn-danger btn-sm" onClick={() => alert("Delete: " + row.areaName)}>Delete</button>
        </div>
      )
    },
    { name: "Area Name", selector: row => row.areaName, sortable: true },
    { name: "Latitude", selector: row => row.latitude, sortable: true },
    { name: "Longitude", selector: row => row.longitude, sortable: true }
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
          <BreadCrumb title="Sector Area Report" pageTitle="Sector Area" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Sector Area Report"
                  reportName="Add Sector Area"
                  url="/addSectorArea"
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

                      <CSVLink data={data} filename="sector_area_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="sector_area_report.xlsx">
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

export default SectorAreaReport;
