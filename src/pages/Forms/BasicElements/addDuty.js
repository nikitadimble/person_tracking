import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddDuty = () => {
    document.title = "Police Duty Management";

    const dutyOptions = [
        { label: "Hard", value: "Hard" },
        { label: "Normal", value: "Normal" },
        { label: "Fixed", value: "Fixed" },
        { label: "Reserved", value: "Reserved" },
        { label: "Soft Duty", value: "HQ" }
    ]
    const locationOptions = [
        { label: "Baner", value: "Baner" },
        { label: "Hinjewadi", value: "Checkpoint" }

    ];
    const [formData, setFormData] = useState({
        dutyType: "",
        locationOptions: ""
    });

    const [dissortBy, setdissortBy] = useState(null);
    const [disable, setdisable] = useState(false);
    const [disselectMulti, setdisselectMulti] = useState(null);


    const dissortbyMulti = [
        {
            label: "Buckle No",
            options: Array.from({ length: 101 }, (_, i) => ({
                label: ` buckle no(${i + 1})`,
                value: `B-${i + 1}`
            }))
        }
    ];


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

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Add New Duty" pageTitle="Duty Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader
                                    title="Duty Form"
                                    reportName="Duty Report"
                                />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">

                                            {/* Location Name */}
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
                                                    <Label htmlFor="dutyType" className="form-label">Duty Type</Label>
                                                    <Select
                                                        id="dutyType"
                                                        placeholder="Search or Select Location..."
                                                        options={dutyOptions}
                                                        value={dutyOptions.find((item) => item.value === formData.dutyType)}
                                                        onChange={(option) => handleChangeSelect(option, "dutyType")}
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>
                                            </Col>




                                            {/* Start Date */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="startDate" className="form-label">Start Date</Label>
                                                    <Input type="date" className="form-control" id="startDate" />
                                                </div>
                                            </Col>

                                            {/* End Date */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="endDate" className="form-label">End Date</Label>
                                                    <Input type="date" className="form-control" id="endDate" />
                                                </div>
                                            </Col>

                                            {/* Location */}
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


                                            {/* Reporting type */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="reportingType" className="form-label">Reporting type</Label>
                                                    <select className="form-select" id="reportingType">
                                                        <option>Choose...</option>
                                                        <option value="Beat">Police Station</option>
                                                        <option value="Checkpoint">Individual</option>
                                                    </select>
                                                </div>
                                            </Col>

                                            {/* Reporting To */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="reportingTo" className="form-label">Reporting To</Label>
                                                    <Input type="text" className="form-control" id="reportingTo" placeholder="Enter Reporting To" />
                                                </div>
                                            </Col>

                                            {/* Note  */}
                                            <Col xxl={6} md={6}>
                                                <div>
                                                    <Label htmlFor="note" className="form-label">Note </Label>
                                                    <Input type="textarea" className="form-control" id="note" placeholder="Enter Note" />
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

export default AddDuty;