import React from 'react';
import { InputExample, InputSizing, FileInput, InputGroup, InputGroupSizing, MultipleInputs, ButtonsCheckboxesRadiosGroup, ButtonsWithDropdowns, CustomForms } from './BasicElementCode';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row, Button, UncontrolledDropdown } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useState } from 'react';
const Department = () => {
    document.title = "Police Duty Management";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Add New Department" pageTitle=" Department Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader
                                    title="Department Form"
                                    reportName="Department Report"
                                    url="/Department_report"
                                />                                
                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Department Name</Label>
                                                    <Input type="text" className="form-control" id="basiInput" placeholder='Enter Department Name' />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className='d-flex flex-wrap gap-2 justify-content-center mt-3'>   <Button color="primary"> Save And Add New </Button>
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

export default Department;