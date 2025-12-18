import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddPoliceStation = () => {
    document.title = "Tracking";

    const locationOption = [
        { label: "pune", value: "pune" }
    ]

    const [formData, setFormData] = useState({
        locationType: ""
    })
    return (
        <React.Fragment>
            <UiContent />
            <div className='page-content'>
                <Container fluid>
                    <BreadCrumb title="Add Police Station" pageTitle="Police Station Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Police Station Form" reportName="Police Station Report" url="/policeStationReport" />

                                <CardBody className='card-body'>
                                    <div className='live-preview'>
                                        <Row className='gy-4'>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'>police station Name</Label>
                                                    <input type='text' className='form-control' id='jail_name' placeholder='Enter Police Station Name'></input>
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='locationType' className='form-label'>Location Type</Label>
                                                    <Select
                                                        id='locationType'
                                                        placeholder='Search Or Select Jail Type'
                                                        options={locationOption}
                                                        value={locationOption.find((item) => item.value === FormData.locationType)}
                                                        onChange={(option) => handleChangeSelect(option, locationType)}
                                                        classNamePrefix="select3-selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='address' className='form-label'>Address</Label>
                                                    <input type='textarea' className='form-control' id='address' placeholder='Please Enter Your Address' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <label htmlFor='contact_no' className='form-label'>Contact Number</label>
                                                    <input type='number' className='form-control' id='contact_no' placeholder='Enter Your Number' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='alt_contact_no' className='form-label'>Alternative Contact Number</Label>
                                                    <input type='Alt_contact_no' className='form-control' id='alt_contact_no' placeholder='Please Enter Alternative Contact Number' />
                                                </div>
                                            </Col>


                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='email' className='form-label'>Email</Label>
                                                    <input type='email' className='form-control' id='email' placeholder='Enter your Email' />
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

    )

}
export default AddPoliceStation;

