import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col, Badge } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const DeviceReport = () => {
  document.title = "Tracking | Device Report";
  const [filterText, setFilterText] = useState("");

  const [data] = useState([
    {
      srno: "1",
      deviceName: "Tracker A1",
      deviceType: "ND48",
      purchaseDate: "2024-01-10",
      condition: "Good",
      reason: "-",
      activationDate: "2024-01-15",
      status: 1,
      remark: "Working Fine"
    },
    {
      srno: "2",
      deviceName: "Tracker B2",
      deviceType: "QB38",
      purchaseDate: "2024-02-05",
      condition: "Average",
      reason: "Battery issue",
      activationDate: "2024-02-08",
      status: 0,
      remark: "Needs Service"
    }
  ]);

  const columns = [
    {
      name: "Sr.No.",
      selector: row => row.srno,
      sortable: true,
      width: "90px"
    },
    {
      name: "Actions",
      width: "220px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => alert("View: " + row.deviceName)}
          >
            View
          </button>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => alert("Edit: " + row.deviceName)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => alert("Delete: " + row.deviceName)}
          >
            Delete
          </button>
        </div>
      )
    },
    { name: "Device Name", selector: row => row.deviceName, sortable: true },
    { name: "Device Type", selector: row => row.deviceType },
    { name: "Purchase Date", selector: row => row.purchaseDate },
    { name: "Condition", selector: row => row.condition },
    { name: "Reason", selector: row => row.reason },
    { name: "Activation Date", selector: row => row.activationDate },
    {
      name: "Status",
      cell: row =>
        row.status === 1 ? (
          <Badge color="success">Active</Badge>
        ) : (
          <Badge color="danger">Inactive</Badge>
        )
    },
    { name: "Remark", selector: row => row.remark }
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
          <BreadCrumb title="Device Report" pageTitle="Device" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Device Report"
                  reportName="Add Device"
                  url="/addDevice"
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

                      <CSVLink data={data} filename="device_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="device_report.xlsx">
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

export default DeviceReport;
