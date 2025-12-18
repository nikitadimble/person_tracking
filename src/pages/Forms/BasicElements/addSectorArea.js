import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddSectorArea = () => {
    document.title = "Tracking";



    return (
        <React.Fragment>
            <UiContent />
            <div className='page-content'>
                <Container fluid>
                    <BreadCrumb title="Add New Sector Area" pageTitle="Sector Area Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Sector Area Form" reportName="Sector Area Report" url="/sectorAreaReport"/>

                                <CardBody className='card-body'>
                                    <div className='live-preview'>
                                        <Row className='gy-4'>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'>Area Name</Label>
                                                    <input type='text' className='form-control' id='jail_name' placeholder='Enter Area Name'></input>
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'>Latitude</Label>
                                                    <input type='number' className='form-control' id='jail_name' placeholder='Enter Latitude Name'></input>
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'>Longitude</Label>
                                                    <input type='number' className='form-control' id='jail_name' placeholder='Enter Longitude Name'></input>
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
export default AddSectorArea;

