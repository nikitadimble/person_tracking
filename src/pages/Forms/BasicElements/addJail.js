import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddJail = () => {
    document.title = "Tracking";

    const districtOption = [
        { label : "Haweli" ,value : "Haweli"},
        { label : "Bhor" ,value : "Bhor"},
    ]

    const jailOption = [
        { label : "gurgao" , value : "gurgao" },
        { label : "yerawda" , value : "yerawda" }
    ]

    const [formData, setFormData] = useState({
        district_type : '',
        jail_type : ''
    })

return (
    <React.Fragment>
        <UiContent />
        <div className='page-content'>
            <Container fluid>
                    <BreadCrumb title="Add New Jail" pageTitle="Jail Report" />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Jail Form" reportName="Jail Report" />

                                    <CardBody className='card-body'>
                                        <div className='live-preview'>
                                            <Row className='gy-4'>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor='jail_name' className='form-label'>Jail Name</Label>
                                                        <input type='text' className='form-control' id='jail_name' placeholder='Enter Jail Name'></input>
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor='district_type' className='form-label'>District</Label>
                                                        <Select
                                                            id='district_type'
                                                            placeholder='Search Or Select District'
                                                            options={districtOption}
                                                            value={districtOption.find((item) => item.value === FormData.district_type)}
                                                            onChange={(option) => handleChangeSelect(option, district_type)}
                                                            classNamePrefix="select2-selection"
                                                        />
                                                    </div>
                                                </Col>

                                                <Col xxl={4} md={6}>
                                                    <div>
                                                        <Label htmlFor='jail_type' className='form-label'>Jail Type</Label>
                                                        <Select 
                                                            id='jail_type'
                                                            placeholder='Search Or Select Jail Type'
                                                            options={jailOption}
                                                            value={jailOption.find((item) => item.value === FormData.jail_type)}
                                                            onChange={(option) => handleChangeSelect(option, district_type)}
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
                                                        <Label htmlFor='email' className='form-label'>Email</Label>
                                                        <input type='email' className='form-control' id='email' placeholder='Please Enter Your Email' />
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
export default AddJail;

                                                                                                                                  