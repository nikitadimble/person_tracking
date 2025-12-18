import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const JailReport = () => {
  document.title = "Tracking | Jail Report";
  const [filterText, setFilterText] = useState("");

  const [data] = useState([
    {
      srno: "1",
      jailName: "gurgao",
      district: "Haweli",
      jailType: "gurgao",
      address: "123 Street, City",
      contactNo: "9876543210",
      email: "contact@gurgao.com"
    },
    {
      srno: "2",
      jailName: "yerawda",
      district: "Bhor",
      jailType: "yerawda",
      address: "456 Avenue, Town",
      contactNo: "9123456789",
      email: "contact@yerawda.com"
    }
  ]);

  const columns = [
    { name: "Sr.No.", selector: row => row.srno, sortable: true, width: "90px" },
    {
      name: "Actions",
      width: "200px",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={() => alert("View: " + row.jailName)}>
            View
          </button>
          <button className="btn btn-warning btn-sm" onClick={() => alert("Edit: " + row.jailName)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => alert("Delete: " + row.jailName)}>
            Delete
          </button>
        </div>
      )
    },
    { name: "Jail Name", selector: row => row.jailName, sortable: true },
    { name: "District", selector: row => row.district },
    { name: "Jail Type", selector: row => row.jailType },
    { name: "Address", selector: row => row.address },
    { name: "Contact No", selector: row => row.contactNo },
    { name: "Email", selector: row => row.email }
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
          <BreadCrumb title="Jail Report" pageTitle="Jail" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Jail Report"
                  reportName="Add Jail"
                  url="/addJail"
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

                      <CSVLink data={data} filename="jail_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="jail_report.xlsx">
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

export default JailReport;
