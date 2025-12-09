import React, { useState } from "react";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from "reactstrap";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import Select from "react-select";

import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

// Function to decide input type based on label
const getInputType = (label) => {
  switch (label.toLowerCase()) {
    case "email id":
      return "email";
    case "contact no":
      return "number";
    case "date of birth":
    case "date of joining":
      return "date";
    default:
      return "text";
  }
};

// Personal Details Section Fields
const personalFields = [
  "Buckle No",
  "Employee Name",
  "Email Id",
  "Contact No",
 // searchable dropdown
  "Address",
  "Permanent Address",
  "Gender",
  "Date Of Birth",
];

// Official Details Section Fields
const officialFields = [
  "Designation", // searchable dropdown

  "Date Of Joining",
  "Company Name", // searchable dropdown
  "Hadicap",
];

// Searchable dropdown options
const locationOptions = [];
const designationOptions = [
  { label: "Constable", value: "Constable" },
  { label: "Head Constable", value: "Head Constable" },
  { label: "ASI", value: "ASI" },
  { label: "SI", value: "SI" },
  { label: "PSI", value: "PSI" },
  { label: "Inspector", value: "Inspector" },
];
const companyOptions = [
  { label: "LA1", value: "LA1" },
  { label: "LA2", value: "LA2" },
  { label: "LA3", value: "LA3" },
  { label: "LA4", value: "LA4" },
  { label: "LA5", value: "LA5" },
  { label: "LA6", value: "LA6" },
  { label: "LA7", value: "LA7" },
];

const BasicElements = () => {
  document.title = "Police Duty Management";

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add New Employee" pageTitle="Employee Report" />

          <Row>
            <Col lg={12}>
              <Card>
                 <PreviewCardHeader
                                    title="Employee Form"
                                    reportName="Employee Report"
                                    url="/Employee_Report"
                                    />


                <CardBody className="card-body">
                  <h5 className="mb-3">Personal Details</h5>
                  <Row className="gy-4">
                 {personalFields.map((label, index) => (
  <Col xxl={3} md={6} key={index}>
    <div>
      <Label className="form-label">{label}</Label>

      {/* Gender Dropdown */}
      {label === "Gender" ? (
        <select className="form-select">
          <option value="">Choose Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      ) : label === "Location" ? (
        <Select
          placeholder="Search or select location..."
          options={locationOptions}
          value={selectedLocation}
          onChange={setSelectedLocation}
          classNamePrefix="select2-selection"
        />
      ) : label === "Address" || label === "Permanent Address" ? (
        <textarea
          className="form-control"
          placeholder={`Enter ${label}`}
          rows={3}
        />
      ) : (
        <Input
          type={getInputType(label)}
          className="form-control"
          placeholder={`Enter ${label}`}
        />
      )}
    </div>
  </Col>
))}

                  </Row>

                  <hr className="my-4" />

                  <h5 className="mb-3">Official Details</h5>
                  <Row className="gy-4">
                    {officialFields.map((label, index) => (
                      <Col xxl={3} md={6} key={index}>
                        <div>
                          <Label className="form-label">{label}</Label>

                          {label === "Designation" ? (
                            <Select
                              placeholder="Search designation..."
                              options={designationOptions}
                              value={selectedDesignation}
                              onChange={setSelectedDesignation}
                              classNamePrefix="select2-selection"
                            />
                          ) : label === "Company Name" ? (
                            <Select
                              placeholder="Search company..."
                              options={companyOptions}
                              value={selectedCompany}
                              onChange={setSelectedCompany}
                              classNamePrefix="select2-selection"
                            />
                          ) : label === "Hadicap" ? (
                            <select className="form-select">
                              <option value="">Choose Hadicap</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : (
                            <Input
                              type={getInputType(label)}
                              className="form-control"
                              placeholder={`Enter ${label}`}
                            />
                          )}
                        </div>
                      </Col>
                    ))}
                  </Row>

                  <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
                    <Button color="primary"> Save And Add New </Button>
                    <Button color="success"> Save </Button>
                    <Button color="secondary"> Cancel </Button>
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

export default BasicElements;
