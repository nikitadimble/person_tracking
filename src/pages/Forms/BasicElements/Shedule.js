import React, { useState } from 'react';
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate  } from 'react-router-dom';

const Shedule = () => {

    document.title = "Police Duty Management";
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState("");
    const [form, setForm] = useState({
        shift_name: "",
        start_time: "",
        end_time: "",
        shift_time: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };


    const saveShift = async (isNew) => {
        setSuccessMsg("");
        try {
            const response = await axios.post(
                "http://localhost/Police_Duty_Managemment/Controller/add_schedule.php",
                form,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Full response:", response);

            if (response.status === "Success") {
                setSuccessMsg(response.message || "Shift saved successfully!");


                setTimeout(() => setSuccessMsg(""), 3000);
                navigate("/Shedule_report"); 
                

                if (isNew) {
                    setForm({ shift_name: "", start_time: "", end_time: "", shift_time: "", description: "" });
                } else {
                    // navigate("/Shift_report"); 
                }
            } else {
                alert(response.message || "Failed to save");
            }
        } catch (error) {
            console.error("API Error:", error);
            alert("API Error: Check Console");
        }
    };



    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Add New Shift" pageTitle="Shift Report" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader
                                    title="Shift Form"
                                    reportName="Shift Report"
                                    url="/Shift_report"
                                />
                                <CardBody className="card-body">
                                     {successMsg && (
                                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                                            <strong>Success!</strong> {successMsg}
                                        </div>
                                    )}
                                    <div className="live-preview">
                                        <Row className="gy-4">

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label className="form-label">Shift Name</Label>
                                                    <Input type="text" id="shift_name" value={form.shift_name}
                                                        onChange={handleChange} placeholder="Enter Shift Name" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label className="form-label">Start Time</Label>
                                                    <Input type="time" id="start_time" value={form.start_time}
                                                        onChange={handleChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label className="form-label">End Time</Label>
                                                    <Input type="time" id="end_time" value={form.end_time}
                                                        onChange={handleChange} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label className="form-label">Shift Time (Hours)</Label>
                                                    <Input type="text" id="shift_time" min="1" value={form.shift_time}
                                                        onChange={handleChange} placeholder="e.g. 8 hours" />
                                                </div>
                                            </Col>

                                            <Col xxl={6} md={12}>
                                                <div>
                                                    <Label className="form-label">Description</Label>
                                                    <Input type="textarea" id="description" rows="3" value={form.description}
                                                        onChange={handleChange} placeholder="Enter Description" />
                                                </div>
                                            </Col>

                                        </Row>
                                    </div>

                                    <div className='d-flex flex-wrap gap-2 justify-content-center mt-3'>
                                        <Button color="primary" onClick={() => saveShift(true)}> Save And Add New </Button>
                                        <Button color="success" onClick={() => saveShift(false)}> Save </Button>
                                        <Button color="secondary" onClick={() => window.location.href = "/Shift_report"}> Cancel </Button>
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

export default Shedule;
