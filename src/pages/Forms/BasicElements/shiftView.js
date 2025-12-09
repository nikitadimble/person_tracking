import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Button } from "reactstrap";
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

const shiftView = () => {
  document.title = "Police Duty Management | View Shift";

  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [shift, setShift] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setErrorMsg("No Shift ID provided.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost/Police_Duty_Managemment/Controller/getById_schedule.php?id=${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.status === "success") {
          setShift(result.data);
          setErrorMsg("");
        } else {
          setErrorMsg(result.message || "Failed to fetch shift details.");
        }
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg("Error: " + err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="View Shift" pageTitle="Master Data > Shift Report" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader title="View Shift" reportName="Shift Report" url="/schedule_report" />
                <CardBody>
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

                  {shift && (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th style={{ width: "30%" }}>Field</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td>ID</td><td>{shift.id}</td></tr>
                          <tr><td>Shift Name</td><td>{shift.shift_name}</td></tr>
                          <tr><td>Start Time</td><td>{shift.start_time}</td></tr>
                          <tr><td>End Time</td><td>{shift.end_time}</td></tr>
                          <tr><td>Shift Time</td><td>{shift.shift_time}</td></tr>
                          <tr><td>Description</td><td>{shift.description}</td></tr>
                          <tr><td>Status</td><td>{shift.status}</td></tr>
                          <tr><td>Created At</td><td>{shift.created_at}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="text-center mt-3">
                    <Button color="secondary" onClick={() => navigate("/Shedule_report")}>
                      Back
                    </Button>
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

export default shiftView;
