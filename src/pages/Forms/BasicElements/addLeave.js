import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const addLeave = () => {
    document.title = "Police Duty Management";
    const [dissortBy, setdissortBy] = useState(null);
    const [disable, setdisable] = useState(false);
    const [disselectMulti, setdisselectMulti] = useState(null);
    const [approvedBy, setApprovedBy] = useState(null);
    const [leaveType, setLeaveType] = useState(null);
    const [leaveDuration, setLeaveDuration] = useState("");



    const dissortbyMulti = [
        {
            // label: "UK",
            options: [
                { label: "Buckle No (123)", value: "123" },
                { label: "Buckle No (124)", value: "124" },
                { label: "Buckle No (125)", value: "125" },
                
            ]

        },
    ];

    const approvedByOptions = [
        { label: "Commissioner", value: "Commissioner" },
        { label: "DCP", value: "DCP" },
        { label: "ACP", value: "ACP" },
        { label: "PI", value: "PI" },
        { label: "API", value: "API" },
        { label: "PSI", value: "PSI" },
        { label: "ASI", value: "ASI" },
    ];

    const leaveTypeOptions = [
        { label: "Casual Leave", value: "Casual Leave" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Paid Leave", value: "Paid Leave" },
        { label: "Unpaid Leave", value: "Unpaid Leave" },
        { label: "Emergency Leave", value: "Emergency Leave" },
    ];

    const dissortbyname = [
        {
            options: [
                { label: "Alabama", value: "AL" },
                { label: "Madrid", value: "MA" },
                { label: "Toronto", value: "TO" },
                { label: "Londan", value: "LO" },
                { label: "Wyoming", value: "WY" }
            ],
        },
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
                    <BreadCrumb title="Add Leave" pageTitle="Forms" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader
                                    title="Leave Form"
                                    reportName="Leave Report"
                                />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">

                                            {/* Location Name */}
                                            <Col xxl={6} md={6}>
                                                <div className="vstack">
                                                    <Label htmlFor="dutyType" className="form-label"> Buckle No </Label>
                                                    <Select
                                                        value={disselectMulti}
                                                        isMulti={true}
                                                        onChange={(sortBy) => {
                                                            setdisselectMulti(sortBy);
                                                        }}
                                                        options={dissortbyMulti}
                                                        classNamePrefix="js-example-disabled-multi mb-0"
                                                        isDisabled={disable}
                                                        styles={customStyles}
                                                    />
                                                </div>
                                            </Col>



                                            {/* Location Type */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="leaveType" className="form-label">Leave Type</Label>
                                                    <Select
                                                        id="leaveType"
                                                        placeholder="Select or Search Leave..."
                                                        options={leaveTypeOptions}
                                                        value={leaveType}
                                                        onChange={(option) => setLeaveType(option)}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                            </Col>


                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="leaveDuration" className="form-label">Leave Duration</Label>
                                                    <select
                                                        className="form-select"
                                                        id="leaveDuration"
                                                        value={leaveDuration}
                                                        onChange={(e) => setLeaveDuration(e.target.value)}
                                                    >
                                                        <option value="">Select Duration...</option>
                                                        <option value="half">Half Day</option>
                                                        <option value="full">Full Day</option>
                                                        <option value="long">Long Leave</option>
                                                    </select>
                                                </div>
                                            </Col>



                                            {leaveDuration === "long" && (
                                                <>
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
                                                </>
                                            )}




                                            {/* Reporting type */}
                                            {/* <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="reportingType" className="form-label">Reporting type</Label>
                                                    <select className="form-select" id="reportingType">
                                                        <option>Choose...</option>
                                                        <option value="Beat">Police Station</option>
                                                        <option value="Checkpoint">Individual</option>
                                                    </select>
                                                </div>
                                            </Col> */}

                                            {/* Reporting To */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="approvedBy" className="form-label">Approved By</Label>
                                                    <Select
                                                        id="approvedBy"
                                                        placeholder="Search or Select"
                                                        options={approvedByOptions}
                                                        value={approvedBy}
                                                        onChange={(option) => setApprovedBy(option)}
                                                        isSearchable={true}
                                                    />
                                                </div>
                                            </Col>


                                            {/* Note  */}


                                            <Col lg={3}>
                                                <div>
                                                    <Label htmlFor="formFile" className="form-label">Leave Approval Letter</Label>
                                                    <Input className="form-control" type="file" id="formFile" />
                                                </div>
                                            </Col>

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

export default addLeave;