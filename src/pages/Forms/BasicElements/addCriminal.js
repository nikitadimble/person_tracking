import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddCriminal = () => {
    document.title = "Police Duty Management";

    const crimeOption = [
        { label : "FIR" , value : "FIR" },
        { label : "Abc" , value : "abc" }
    ]

    const [formData, setFormData] = useState({
        crime_type : ''
    })


    return (
        <React.Fragment>
            <UiContent />
            <div className='page-content'>
                <Container fluid>
                    <BreadCrumb title="Add New Criminal" pageTitle="Criminal Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Criminal Form" reportName="Criminal Report"  url="/criminalReport" />

                                <CardBody className='card-body'>
                                    <div className='live-preview'>
                                        <Row className='gy-4'>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='criminal_name' className='form-label'>Criminal Name</Label>
                                                    <input type='criminal_name' className='form-control' id='criminal_name' placeholder='Enter Criminal Name' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'>Jail Name</Label>
                                                    <input type='text' className='form-control' id="jail_name" placeholder='Enter Jail Name' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='police_station_name' className='form-label'>Police Station Name</Label>
                                                    <input type='text' className='form-control' id='police_station_name' placeholder='Enter Police Station Name' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='case_no' className='form-label'>Case Number</Label>
                                                    <input type='number' className='form-control' id='case_no' placeholder='Enter Case No' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='crime_type' className='form-label'>Crime Type</Label>
                                                    <Select
                                                        id='crime_type'
                                                        placeholder='Serach Or Select Crime Type'
                                                        options={crimeOption}
                                                        value={crimeOption.find((item) => item.value === FormData.crime_type)}
                                                        onChange={(option) => handleChangeSelect(option, crime_type)}
                                                        classNamePrefix="select2-selection"
                                                    />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='arrest_date' className='form-label'>Arrest Date</Label>
                                                    <input type='date' className='form-control' id='arrest_date' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='arresting_in' className='form-label'>Arresting In</Label>
                                                    <input type='text' className='form-control' id='arresting_in' placeholder='Arresting In' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='address' className='form-label'>Address</Label>
                                                    <input type='text' className='form-control' id='address' placeholder='Enter Your Address' />
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
                                                    <Label htmlFor='contact_no' className='form-label'>Contact Number</Label>
                                                    <input type='number' className='form-control' id='contact_no' placeholder='Please Enter yout Contact Number' />
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='alt_contact_no' className='form-label'>Alternative Contact Number</Label>
                                                    <input type='Alt_contact_no' className='form-control' id='alt_contact_no' placeholder='Please Enter Alternative Contact Number' /> 
                                                </div>
                                            </Col>
                                        </Row>
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
export default AddCriminal;

                                                                                                                                  