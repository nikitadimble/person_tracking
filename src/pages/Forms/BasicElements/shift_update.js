import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';

import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Input, Label, Button } from "reactstrap";

const shiftUpdate = () => {
  document.title = "Police Duty Management | Update Shift";
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const [form, setForm] = useState({
    shift_name: "",
    start_time: "",
    end_time: "",
    shift_time: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch shift data by ID
  useEffect(() => {
    if (!id) {
      alert("No Shift ID provided.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost/Police_Duty_Managemment/Controller/getById_schedule.php?id=${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setForm(result.data);
        } else {
          alert(result.message || "Failed to fetch shift data.");
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("Error fetching shift data: " + err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = () => {
    fetch("http://localhost/Police_Duty_Managemment/Controller/update_schedule.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
            alert("Shift updated successfully!"),
          navigate("/Shedule_report", {
            state: { message: "Shift updated successfully!" },
          });
        } else {
          alert(result.message || "Failed to update shift.");
        }
      })
      .catch((err) => {
        alert("Error updating shift: " + err.message);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Update Shift" pageTitle="Master Data > Shift Report" />

          <Row>
            <Col lg={12}>
              <Card>
                <PreviewCardHeader
                  title="Update Shift"
                  reportName="Shift Report"
                  url="/schedule_report"
                />
                <CardBody>
                  <Row className="gy-4">
                    {/* Shift Name */}
                    <Col md={6}>
                      <Label>Shift Name</Label>
                      <Input
                        type="text"
                        name="shift_name"
                        value={form.shift_name}
                        onChange={handleChange}
                      />
                    </Col>

                    {/* Start Time */}
                    <Col md={6}>
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleChange}
                      />
                    </Col>

                    {/* End Time */}
                    <Col md={6}>
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        name="end_time"
                        value={form.end_time}
                        onChange={handleChange}
                      />
                    </Col>

                    {/* Shift Time */}
                    <Col md={6}>
                      <Label>Shift Time</Label>
                      <Input
                        type="text"
                        name="shift_time"
                        value={form.shift_time}
                        onChange={handleChange}
                        placeholder="e.g., 8 hours"
                      />
                    </Col>

                    {/* Description */}
                    <Col md={12}>
                      <Label>Description</Label>
                      <Input
                        type="textarea"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                      />
                    </Col>

                    <div className='d-flex flex-wrap gap-2 justify-content-center mt-3'>
                      <Button color="primary" onClick={handleUpdate} className="mt-3">
                        Update Shift
                      </Button>
                      <Button
                        color="secondary"
                        className="mt-3"
                        onClick={() => navigate("/schedule_report")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default shiftUpdate;
