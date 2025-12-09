import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import axios from "axios";
import { Card, CardBody, Container, Row, Col } from "reactstrap";
import { CSVLink } from "react-csv";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const SheduleReport = () => {
  document.title = "Police Duty Management | Shift Report";

  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

  // Fetch data
  useEffect(() => {
    axios
      .get("http://localhost/Police_Duty_Managemment/Controller/getAll_Schedule.php")
      .then((res) => {
        console.log("=== API Response ===", res.data);

        if (Array.isArray(res.data)) {
          setData(res.data.reverse());
        } else {
          setError("Unexpected API Response");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("=== API Error ===", err);
        setError("Failed to fetch data. Check API.");
        setLoading(false);
      });
  }, []);

  // Initialize/Update DataTable
  useEffect(() => {
    // Destroy existing DataTable instance first
    if (dataTableRef.current) {
      dataTableRef.current.destroy();
      dataTableRef.current = null;
    }

    // Only initialize if we have data and table reference
    if (data.length > 0 && tableRef.current) {
      // Use requestAnimationFrame to ensure React has finished DOM updates
      requestAnimationFrame(() => {
        if (tableRef.current && !dataTableRef.current) {
          try {
            dataTableRef.current = $(tableRef.current).DataTable({
              destroy: true,
              searching: false,
              pageLength: 10,
              lengthMenu: [10, 25, 50, 100],
            });
          } catch (error) {
            console.error("DataTable initialization error:", error);
          }
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (dataTableRef.current) {
        try {
          dataTableRef.current.destroy();
        } catch (error) {
          console.error("DataTable cleanup error:", error);
        }
        dataTableRef.current = null;
      }
    };
  }, [data]);

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
      val?.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      // First destroy DataTable to release DOM control
      if (dataTableRef.current) {
        try {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        } catch (error) {
          console.error("Error destroying DataTable:", error);
        }
      }

      axios
        .post("http://localhost/Police_Duty_Managemment/Controller/delete_schedule.php", { id })
        .then((res) => {
          console.log("=== Full Delete Response ===", res);
          
          // Check if deletion was successful
          if (res.status === "success" && res.code === 200) {
            // Update local state: remove deleted shift
            setData(prev => {
              const newData = prev.filter(item => item.id.toString() !== id.toString());
              console.log("Updated data length:", newData.length);
              return newData;
            });
            alert(res.message || "Shift deleted successfully");
          } else {
            alert(res.message || "Failed to delete shift");
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Error deleting shift");
        });
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <React.Fragment>
        <UiContent />
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Shift Report" pageTitle="Master Data" />
            <div className="text-center p-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Loading shift data...</p>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }

  // Show error
  if (error) {
    return (
      <React.Fragment>
        <UiContent />
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Shift Report" pageTitle="Master Data" />
            <div className="alert alert-danger mt-4">{error}</div>
          </Container>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Shift Report" pageTitle="Master Data" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Shift Report"
                  reportName="Add Shift"
                  url="/add-shedule"
                />

                <CardBody>
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

                      <CSVLink data={data} filename="schedule_report.csv">
                        <button style={buttonStyle}>CSV</button>
                      </CSVLink>

                      <button style={buttonStyle} onClick={() => window.print()}>
                        PDF
                      </button>

                      <CSVLink data={data} filename="schedule_report.xlsx">
                        <button style={buttonStyle}>Excel</button>
                      </CSVLink>
                    </div>

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

                  {/* TABLE */}
                  {filteredData.length > 0 ? (
                    <table
                      ref={tableRef}
                      className="display table table-striped table-bordered"
                    >
                      <thead style={{ backgroundColor: "#f3f4f7" }}>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Actions</th>
                          <th>Shift Name</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item, index) => (
                          <tr key={`shift-${item.id}-${index}`}>
                            <td>{index + 1}</td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => navigate(`/shiftView?id=${item.id}`)}
                              >
                                View
                              </button>

                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => navigate(`/shift_update?id=${item.id}`)}
                              >
                                Edit
                              </button>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                            <td>{item.shift_name}</td>
                            <td>{item.start_time}</td>
                            <td>{item.end_time}</td>
                            <td>{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No data found</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SheduleReport;