import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import Select from "react-select";

const AddDesignation = () => {
    document.title = "Tracking";

    const districtOption = [
        { label: "Haweli", value: "Haweli" },
        { label: "Bhor", value: "Bhor" },
    ]

    const jailOption = [
        { label: "gurgao", value: "gurgao" },
        { label: "yerawda", value: "yerawda" }
    ]

    const [formData, setFormData] = useState({
        district_type: '',
        jail_type: ''
    })

    return (
        <React.Fragment>
            <UiContent />
            <div className='page-content'>
                <Container fluid>
                    <BreadCrumb title="Add New Designation" pageTitle="Designation Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Designation Form" reportName="Designation Report" url="/designationReport"/>

                                <CardBody className='card-body'>
                                    <div className='live-preview'>
                                        <Row className='gy-4'>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='jail_name' className='form-label'>Designation Name</Label>
                                                    <input type='text' className='form-control' id='jail_name' placeholder='Enter Jail Name'></input>
                                                </div>
                                            </Col>

                                            <Col xxl={4} md={6}>
                                                <div>
                                                    <Label htmlFor='district_type' className='form-label'>Serving Level(District/Division Level)</Label>
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
export default AddDesignation;

