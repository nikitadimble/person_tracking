import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddUserTracking = () => {
    document.title = "Tracking";

    const userOption = [
        { label: "pune", value: "pune" }
    ]

    const jailOption = [
         { label: "pune", value: "pune" }
    ]

    const designationOption = [
         { label: "pune", value: "pune" }
    ]

    const [formData, setFormData] = useState({
        userType: "",
        jailNames: "",
        designationNames: ""
    })
    return (
        <React.Fragment>
            <UiContent />
            <div className='page-content'>
                <Container fluid>
                    <BreadCrumb title="Add User" pageTitle="User Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="User Form" reportName="User Report" url="/userTrackingReport" />

                                <CardBody className='card-body'>
                                    <div className='live-preview'>
                                        <Row className='gy-4'>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'> User  Name</Label>
                                                    <input type='text' className='form-control' id='jail_name' placeholder='Enter user Name'></input>
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
                                                    <Label htmlFor='email' className='form-label'>Email</Label>
                                                    <input type='email' className='form-control' id='email' placeholder='Enter your Email' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='userType' className='form-label'>User Type</Label>
                                                    <Select
                                                        id='userType'
                                                        placeholder='Search Or Select Jail Type'
                                                        options={userOption}
                                                        value={userOption.find((item) => item.value === FormData.userType)}
                                                        onChange={(option) => handleChangeSelect(option, userType)}
                                                        classNamePrefix="select3-selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='address' className='form-label'>permission</Label>
                                                    <input type='textarea' className='form-control' id='address' placeholder='Please Enter permission' />
                                                </div>
                                            </Col>

                                           <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jailNames' className='form-label'>Jail Name</Label>
                                                    <Select
                                                        id='jailNames'
                                                        placeholder='Search Or Select Jail Name'
                                                        options={jailOption}
                                                        value={jailOption.find((item) => item.value === FormData.jailNames)}
                                                        onChange={(option) => handleChangeSelect(option, jailNames)}
                                                        classNamePrefix="select3-selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='designationNames' className='form-label'>Designation Name</Label>
                                                    <Select
                                                        id='designationNames'
                                                        placeholder='Search Or Select Designation Name'
                                                        options={designationOption}
                                                        value={designationOption.find((item) => item.value === FormData.designationNames)}
                                                        onChange={(option) => handleChangeSelect(option, designationNames)}
                                                        classNamePrefix="select3-selection"
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

    )

}
export default AddUserTracking;

