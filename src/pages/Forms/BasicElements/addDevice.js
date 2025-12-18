import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";
import { values } from 'lodash';

const AddDevice = () => {
    document.title = "Tracking";

    const deviceOption = [
        { label : "ND48" , value : "ND48"},
        { label : "QB38" , value : "QB38"}
    ]

    const conditionOption =[
        { label : "Good" ,value : "Good"},
        { label : "Average" ,value : "Average"},
        { label : "Damaged" ,value : "Damaged"}
    ]

    const statusOption = [
        { label : "Active" , value : 1},
        { label : "Inactive" , value : 0}
    ]

    const [formData, setFormData] = useState({
        deviceType : "",
        conditionType : "",
        statusType : ""
    });

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Add New Device" pageTitle="Device Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Device Form" reportName="Device Report"  url="/deviceReport"/>

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">

                                            {/* Location Name */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='device_name' className='form-label'>Device Name</Label>
                                                    <input type='text' className='form-control' id='device_name' placeholder='Enter Device Name' />
                                                </div>
                                            </Col>


                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="deviceType" className="form-label">Device Type</Label>
                                                    <Select
                                                        id="deviceType"
                                                        placeholder="Search or Select Location..."
                                                        options={deviceOption}
                                                        value={deviceOption.find((item) => item.value === FormData.deviceType)}
                                                        onChange={(option) => handleChangeSelect(option, "deviceType")}
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='purchase_date' className='purchase_date'>Purchase Date</Label>
                                                    <input type='date' className='form-control' id="purchase_date" />
                                                </div>
                                            </Col>

                                            {/* Condition Type */}
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='condition_type' className='form-label'>Condition Type</Label>
                                                    <Select
                                                        id='condition_type'
                                                        placeholder="Search Or Select Condition"
                                                        options={conditionOption}
                                                        value={conditionOption.find((item) => item.value === formData.conditionType)}
                                                        onChange={(option) => handleChangeSelect(option, "condition_type")}
                                                        classNamePrefix="Select2-Selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='reasone' className='form-label'>reasone</Label>
                                                    <input type='textarea' className='form-control' id="reasone" placeholder='Please Enter Reasone' />
                                                </div>
                                            </Col>


                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='activation_date' className='form-label'>Activation Date</Label>
                                                    <input type='date' className='form-control' id='activation_date' />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='status_type' className="form-label">Status</Label>
                                                    <Select
                                                        id='status_type'
                                                        placeholder="Search Or Select Status"
                                                        options={statusOption}
                                                        value={statusOption.find((item) => item.value === formData.statusOption)}
                                                        onChange={(option) => handleChangeSelect(option, "status_type")}
                                                        classNamePrefix="Select2-Selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor='remark' className='form-label'>Remark</Label>
                                                    <input type='textarea' className="form-control" id='remark' placeholder='Please Enter Remark' />
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
export default AddDevice;

                                                                                                                                  