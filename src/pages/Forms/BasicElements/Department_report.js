import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";

import {
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

const DepartmentReport = () => {
  const [filterText, setFilterText] = useState("");
  document.title = "Police Duty Management | Department Report";

  // ============================================================
  // 🔹 STATIC 10 DEPARTMENT ENTRIES (REALISTIC + POLICE RELATED)
  // ============================================================
  const [data] = useState([
    { srno: "1", dept_name: "Headquarters" },
    { srno: "2", dept_name: "Crime Branch" },
    { srno: "3", dept_name: "Traffic Control Department" },
    { srno: "4", dept_name: "Cyber Cell" },
    { srno: "5", dept_name: "Ladies Protection Wing" },
    { srno: "6", dept_name: "Anti-Narcotics Division" },
    { srno: "7", dept_name: "Emergency Response Team" },
    { srno: "8", dept_name: "Beat Management Department" },
    { srno: "9", dept_name: "Patrolling Department" },
    { srno: "10", dept_name: "Public Safety & Surveillance Unit" },
  ]);

  // Columns
  const columns = [
    { name: "Sr. No.", selector: row => row.srno, sortable: true, width: "150px" },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => alert("Delete clicked for " + row.user_name)}
          >
            View
          </button>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => alert("Edit clicked for " + row.user_name)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => alert("Delete clicked for " + row.user_name)}
          >
            Delete
          </button>
        </div>
      )
    },
    { name: "Department Name", selector: row => row.dept_name, sortable: true },

  ];

  // Styles
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#F3F4F7",
        padding: "12px"
      }
    },
    cells: {
      style: {
        padding: "10px",
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

          <BreadCrumb title="Department Report" pageTitle="Master Data" />

          <Row>
            <Col lg={12}>
              <Card>

                <PreviewCardHeader
                  title="Department Report"
                  reportName="Add Department"
                  url="/add-department"
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

                  {/* DATA TABLE */}
                  <div className="table-responsive">
                    <DataTable
                      columns={columns}
                      data={data}
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

export default DepartmentReport;
