import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";


const Location = () => {
  document.title = "Police Duty Management";

  const locationOptions = [
  { label: "Beat", value: "Beat" },
  { label: "Checkpoint", value: "Checkpoint" },
  { label: "Petrol Point", value: "Petrol" },
  { label: "Station", value: "Station" },
  { label: "HQ", value: "HQ" },
  { label: "Custom", value: "Custom" },
];
  // 🔹 State to store form values
  const [formData, setFormData] = useState({
    location_name: "",
    location_type: "",
    address: "",
    radius: ""
  });

// 🔹 Update State on Input Change
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
};

// 🔹 Handle Select Input (react-select)
const handleChangeSelect = (selectedOption, field) => {
  setFormData({
    ...formData,
    [field]: selectedOption ? selectedOption.value : ""
  });
};


  // 🔹 Clear Form
  const clearForm = () => {
    setFormData({
      location_name: "",
      location_type: "",
      address: ""
    });
  };

  // 🔹 API CALL
  const saveLocation = (resetAfterSave = false) => {
    fetch("http://localhost/Police_Duty_Managemment/Controller/add_location.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.msg);
        if (resetAfterSave && data.status) {
          clearForm();
        }
      })
      .catch(() => alert("Failed to connect API"));
  };

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add New Location" pageTitle="Forms" />

          <Row>
            <Col lg={12}>
              <Card>
            <PreviewCardHeader
                    title="Location Form"
                    reportName="Location Report"
                    url="/Location_report"
                    />



                <CardBody className="card-body">
                  <div className="live-preview">
                    <Row className="gy-4">

                      {/* Location Name */}
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="location_name" className="form-label">Location Name</Label>
                          <Input type="text" className="form-control" id="location_name"
                            placeholder="Enter Location Name" value={formData.location_name}
                            onChange={handleChange} />
                        </div>
                      </Col>

                      {/* Location Type */}
                     <Col xxl={3} md={6}>
                        <div>
                            <Label htmlFor="location_type" className="form-label">Location Type</Label>
                          <Select
  id="location_type"
  placeholder="Search or Select Location..."
  options={locationOptions}
  value={locationOptions.find((item) => item.value === formData.location_type)}
  onChange={(option) => handleChangeSelect(option, "location_type")}
  classNamePrefix="select2-selection"
/>

                        </div>
                        </Col>

                      {/* Address */}
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="address" className="form-label">Address</Label>
                          <Input type="text" className="form-control" id="address"
                            placeholder="Enter Address" value={formData.address}
                            onChange={handleChange} />
                        </div>
                      </Col>

                      {/* Radius */}
                      <Col xxl={3} md={6}>
                        <div>
                          <Label htmlFor="radius" className="form-label">Radius (Meters)</Label>
                          <Input type="number" className="form-control" id="radius"
                            placeholder="Enter Radius" value={formData.radius}
                            onChange={handleChange} />
                        </div>
                      </Col>

                     

                    </Row>
                  </div>

                  {/* Buttons */}
                  <div className='d-flex flex-wrap gap-2 justify-content-center mt-3'>
                    <Button color="primary" onClick={() => saveLocation(true)}> Save And Add New </Button>
                    <Button color="success" onClick={() => saveLocation(false)}> Save </Button>
                    <Button color="secondary" onClick={clearForm}> Cancel </Button>
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

export default Location;