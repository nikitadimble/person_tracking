import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";


const AddUser = () => {
    document.title = "Police Duty Management";
    const [disselectMulti, setdisselectMulti] = useState(null);
    const locationOptions = [
        { label: "Baner", value: "Baner" },
        { label: "Hinjewadi", value: "Checkpoint" }

    ];
    const [disable, setdisable] = useState(false);
    const designationOptions = [
        { value: "DCP", label: "DCP" },
        { value: "PSI", label: "PSI" },
    ];

    const [formData, setFormData] = useState({
        dutyType: "",
        locationOptions: ""
    });
    const customStyles = {
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: "#3762ea",
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            backgroundColor: "#687cfe",
            color: "white",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: "white",
            backgroundColor: "#687cfe",
            ':hover': {
                backgroundColor: "#687cfe",
                color: 'white',
            },
        }),
    }

    const dissortbyMulti = [
        {
            label: "Buckle No",
            options: Array.from({ length: 101 }, (_, i) => ({
                label: ` ${i + 1}`,
                value: `B-${i + 1}`
            }))
        }
    ];
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Add New User" pageTitle="User Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader
                                    title="User Form"
                                    reportName="User Report"
                                />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">

                                            <Col xxl={12} md={6}>
                                                <div className="vstack">
                                                    <Label htmlFor="buckle_no" className="form-label"> Buckle No </Label>
                                                    <Select
                                                        value={disselectMulti}
                                                        isMulti={true}
                                                        onChange={(sortBy) => setdisselectMulti(sortBy)}
                                                        options={dissortbyMulti}
                                                        classNamePrefix="js-example-disabled-multi mb-0"
                                                        isDisabled={disable}
                                                        styles={customStyles}
                                                        placeholder="Search or Select Buckle No"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="valueInput" className="form-label">User Name</Label>
                                                    <Input type="text" className="form-control" id="valueInput" placeholder='Enter User Name' />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="valueInput" className="form-label">Email</Label>
                                                    <Input type="email" className="form-control" id="valueInput" placeholder='Enter Email ' />
                                                </div>
                                            </Col>

                                             <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="address" className="form-label">Address</Label>
                                                    <Input type="textarea" className="form-control" id="address" placeholder="Enter address" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="pAddress" className="form-label">Permenant Address</Label>
                                                    <Input type="textarea" className="form-control" id="pAddress" placeholder="Enter Permenant address" />
                                                </div>
                                            </Col>

                                             {/* End Date */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="mobileNumber" className="form-label">Contact Number</Label>
                                                    <Input type="number" className="form-control" id="mobileNumber" placeholder="Enter Contact Number" />
                                                </div>
                                            </Col>

                                            {/* Location Type */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="dutyType" className="form-label">Gender</Label>
                                                    <select className="form-select" id="dutyType">
                                                        <option>Choose...</option>
                                                        <option value="hardType">Male</option>
                                                        <option value="normalType">Female</option>
                                                    </select>
                                                </div>
                                            </Col>

                                            {/* Start Date */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="dob" className="form-label">Date Of Birth</Label>
                                                    <Input type="date" className="form-control" id="dob" />
                                                </div>
                                            </Col>

                                           

                                           

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="dob" className="form-label">Date Of Joining</Label>
                                                    <Input type="date" className="form-control" id="dob" />
                                                </div>
                                            </Col>




                                            {/* Reporting type */}
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


                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="reportingType" className="form-label">Designation</Label>
                                                    <Select
                                                        id="reportingType"
                                                        options={designationOptions}
                                                        placeholder="Choose..."
                                                        isSearchable={true}
                                                    />
                                                </div>
                                            </Col>

                                        </Row>
                                    </div>

                                    {/* Buttons */}
                                    <div className='d-flex flex-wrap gap-2 justify-content-center mt-3'>
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
}

export default AddUser;