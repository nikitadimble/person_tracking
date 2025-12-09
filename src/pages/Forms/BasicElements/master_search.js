import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";

import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const MasterSearch = () => {

    document.title = "Police Duty Management";

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [results, setResults] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [filterText, setFilterText] = useState("");

    const [form, setForm] = useState({
        search: "",
        keyword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        axios
            .get("http://localhost/Police_Duty_Managemment/Controller/getDutiesContact.php")
            .then((res) => {
                console.log("=== API Response ===", res.data);
                if (Array.isArray(res.data)) {
                    setData(res.data.reverse());
                }
            })
            .catch((err) => {
                console.error("=== API Error ===", err);
            });
    }, []);

    const showShift = () => {
        const keyword = form.keyword.toLowerCase().trim();

        if (!form.search) {
            alert("Please select search type");
            return;
        }

        if (!keyword) {
            alert("Please enter keyword");
            return;
        }

        let filtered = [];

        switch (form.search) {
            case "Buckle Number":
                filtered = data.filter(i => i.buckle_numbers?.toLowerCase().includes(keyword));
                break;

            case "Location":
                filtered = data.filter(i => i.location_type?.toLowerCase().includes(keyword));
                break;

            case "Designation":
                filtered = data.filter(i => i.designation?.toLowerCase().includes(keyword));
                break;

            case "Employee":
                filtered = data.filter(i => i.name?.toLowerCase().includes(keyword));
                break;

            case "Mobile":
                filtered = data.filter(i => i.contact_no?.toLowerCase().includes(keyword));
                break;


            default:
                filtered = [];
        }

        console.log("Filtered:", filtered);

        setResults(filtered);
        setShowTable(true);
    };

    const buttonStyle = {
        background: "#6c757d",
        color: "white",
        padding: "8px 16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    };

    useEffect(() => {
        if (!showTable) return;

        if ($.fn.DataTable.isDataTable("#searchTable")) {
            $("#searchTable").DataTable().clear().destroy();
        }

        const table = $("#searchTable").DataTable({
            pageLength: 10,
            searching: false,
            info: false,
        });

        results.forEach((item, index) => {
            table.row.add([
                index + 1,
                item.name || "-",
                item.designation || "-",
                item.buckle_numbers || "-",
                item.location_type || "-",
                item.duty_type || "-",
                item.reporting_to || "-",
                item.start_date || "-",
                item.end_date || "-",
                item.contact_no || "-"
            ]);
        });

        table.draw();
    }, [results, showTable]);

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Master Search" pageTitle="Dashboard" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Master Search" />

                                <CardBody className="card-body">

                                    {/* Search UI */}
                                    <Row className="gy-4">
                                        <Col xxl={3} md={6}>
                                            <Label className="form-label">Search By</Label>
                                            <Input type="select" id="search" value={form.search} onChange={handleChange}>
                                                <option value="">Select Option</option>
                                                <option value="Buckle Number">Buckle Number</option>
                                                <option value="Location">Location</option>
                                                <option value="Designation">Designation</option>
                                                <option value="Mobile">Mobile Number</option>
                                                <option value="Employee">Employee Name</option>
                                            </Input>
                                        </Col>

                                        <Col xxl={3} md={6}>
                                            <Label className="form-label">Enter Keyword</Label>
                                            <Input type="text" id="keyword" value={form.keyword} onChange={handleChange} />
                                        </Col>
                                    </Row>

                                    <div className='d-flex justify-content-center mt-3'>
                                        <Button color="primary" onClick={showShift}>Show</Button>
                                    </div>

                                    {/* *********** SHOW EXPORT BUTTONS ONLY AFTER CLICK *********** */}
                                    {showTable && (
                                        <div className="d-flex gap-3 mb-3 flex-wrap align-items-center justify-content-between mt-4">
                                            <div className="d-flex gap-3 flex-wrap">
                                                <button
                                                    style={buttonStyle}
                                                    onClick={() =>
                                                        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
                                                    }
                                                >
                                                    Copy
                                                </button>

                                                <CSVLink data={data} filename="schedule_report.csv">
                                                    <button style={buttonStyle}>CSV</button>
                                                </CSVLink>

                                                <button style={buttonStyle} onClick={() => window.print()}>
                                                    PDF
                                                </button>

                                                <CSVLink data={data} filename="schedule_report.xlsx">
                                                    <button style={buttonStyle}>Excel</button>
                                                </CSVLink>
                                            </div>

                                            <input
                                                type="text"
                                                placeholder="Search..."
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                                style={{
                                                    padding: "8px 12px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #ccc",
                                                    width: "200px",
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* ===== SHOW TABLE ONLY AFTER CLICK ===== */}
                                    {showTable && (
                                        <div className="mt-4">
                                            {/* <h5>Search Results:</h5> */}

                                            <div className="table-responsive mt-4">
                                                <table
                                                    id="searchTable"
                                                    className="table table-bordered table-striped"
                                                >
                                                    <thead className="table-dark">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Designation</th>
                                                            <th>Buckle No</th>
                                                            <th>Location</th>
                                                            <th>Duty Type</th>
                                                            <th>Reporting To</th>
                                                            <th>Start Date</th>
                                                            <th>End Date</th>
                                                            <th>mobile No</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MasterSearch;
