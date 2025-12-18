import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { GoogleMap, LoadScript, Circle, Polygon, Marker } from '@react-google-maps/api';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Alert, Form, FormFeedback } from "reactstrap";
import UiContent from "../../../Components/Common/UiContent";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import PreviewCardHeader from "../../../Components/Common/PreviewCardHeader";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/Police_Duty_Managemment/Controller";
const GOOGLE_MAPS_API_KEY = "AIzaSyAxeaJsOGOLUTF-ZczawSFyGutYDXu4BkQ";

const mapContainerStyle = {
    width: '100%',
    height: '500px',
};

const defaultCenter = {
    lat: 19.0760,
    lng: 72.8777,
};

const AssignDevice = () => {
    document.title = "Assign GPS Device | Police Duty Management";
    const navigate = useNavigate();

    // State for data from API
    const [devices, setDevices] = useState([]);
    const [criminals, setCriminals] = useState([]);
    const [allCriminals, setAllCriminals] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [jails, setJails] = useState([]);
    const [allJails, setAllJails] = useState([]);

    // State for filters
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedJail, setSelectedJail] = useState(null);
    const [firSearch, setFirSearch] = useState("");

    // State for geofencing
    const [geofencingEnabled, setGeofencingEnabled] = useState(false);
    const [geofenceType, setGeofenceType] = useState("");
    const [circularCenter, setCircularCenter] = useState(null);
    const [circularRadius, setCircularRadius] = useState("");
    const [polygonPoints, setPolygonPoints] = useState([]);

    // State for UI
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState("success");
    const [submitAction, setSubmitAction] = useState("save");

    // Fetch devices
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const res = await fetch(`${API_BASE}/getDevices.php`);
                const data = await res.json();
                if (data.status) {
                    const options = data.data.map((device) => ({
                        label: `${device.name} (IMEI: ${device.imei})`,
                        value: device.id,
                        imei: device.imei,
                    }));
                    setDevices(options);
                }
            } catch (err) {
                console.error("Failed to fetch devices:", err);
            }
        };
        fetchDevices();
    }, []);

    // Fetch criminals
    useEffect(() => {
        const fetchCriminals = async () => {
            try {
                const res = await fetch(`${API_BASE}/getCriminals.php`);
                const data = await res.json();
                if (data.status) {
                    setAllCriminals(data.data);
                    setCriminals(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch criminals:", err);
            }
        };
        fetchCriminals();
    }, []);

    // Fetch districts
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await fetch(`${API_BASE}/getDistricts.php`);
                const data = await res.json();
                if (data.status) {
                    const options = data.data.map((district) => ({
                        label: district,
                        value: district,
                    }));
                    setDistricts(options);
                }
            } catch (err) {
                console.error("Failed to fetch districts:", err);
            }
        };
        fetchDistricts();
    }, []);

    // Fetch jails
    useEffect(() => {
        const fetchJails = async () => {
            try {
                const res = await fetch(`${API_BASE}/getJails.php`);
                const data = await res.json();
                if (data.status) {
                    setAllJails(data.data);
                    const options = data.data.map((jail) => ({
                        label: jail.name,
                        value: jail.id,
                        district: jail.district,
                    }));
                    setJails(options);
                }
            } catch (err) {
                console.error("Failed to fetch jails:", err);
            }
        };
        fetchJails();
    }, []);

    // Filter criminals based on district, jail, and FIR search
    useEffect(() => {
        let filtered = [...allCriminals];

        if (selectedDistrict) {
            filtered = filtered.filter((c) => c.district === selectedDistrict.value);
        }

        if (selectedJail) {
            filtered = filtered.filter((c) => c.jail_id === selectedJail.value);
        }

        if (firSearch) {
            filtered = filtered.filter((c) =>
                c.fir_number.toLowerCase().includes(firSearch.toLowerCase())
            );
        }

        setCriminals(filtered);
    }, [selectedDistrict, selectedJail, firSearch, allCriminals]);

    // Filter jails based on selected district
    const filteredJails = selectedDistrict
        ? jails.filter((jail) => jail.district === selectedDistrict.value)
        : jails;

    // Auto-dismiss message
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Validation schema
    const validationSchema = Yup.object({
        deviceIds: Yup.array()
            .min(1, "Please select at least one device")
            .required("Required"),
        criminalId: Yup.string().required("Please select a criminal"),
    });

    const formik = useFormik({
        initialValues: {
            deviceIds: [],
            criminalId: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            // Validate geofencing if enabled
            if (geofencingEnabled) {
                if (!geofenceType) {
                    setMessage("Please select a geofence type");
                    setMessageType("danger");
                    return;
                }

                if (geofenceType === "circular") {
                    if (!circularCenter || !circularRadius || circularRadius <= 0) {
                        setMessage("Please set a center point and valid radius for circular geofence");
                        setMessageType("danger");
                        return;
                    }
                }

                if (geofenceType === "polygonal") {
                    if (polygonPoints.length < 3) {
                        setMessage("Please plot at least 3 points for polygonal geofence");
                        setMessageType("danger");
                        return;
                    }
                }
            }

            setMessage(null);
            setLoading(true);

            const payload = {
                deviceIds: values.deviceIds.map((d) => d.value),
                criminalId: values.criminalId,
                geofencing: geofencingEnabled
                    ? {
                        enabled: true,
                        type: geofenceType,
                        data:
                            geofenceType === "circular"
                                ? {
                                    center: circularCenter,
                                    radius: parseFloat(circularRadius),
                                }
                                : {
                                    points: polygonPoints,
                                },
                    }
                    : { enabled: false },
            };

            try {
                const res = await fetch(`${API_BASE}/assignDevice.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (data.status) {
                    setMessage("Device assigned successfully.");
                    setMessageType("success");

                    if (submitAction === "saveAndAdd") {
                        resetForm();
                        setGeofencingEnabled(false);
                        setGeofenceType("");
                        setCircularCenter(null);
                        setCircularRadius("");
                        setPolygonPoints([]);
                        setSelectedDistrict(null);
                        setSelectedJail(null);
                        setFirSearch("");
                    } else {
                        setTimeout(() => navigate("/"), 1000);
                    }
                } else {
                    setMessage("Error: " + data.message);
                    setMessageType("danger");
                }
            } catch (err) {
                console.error(err);
                setMessage("Something went wrong!");
                setMessageType("danger");
            } finally {
                setLoading(false);
            }
        },
    });

    // Map click handlers
    const handleMapClick = (e) => {
        if (!geofencingEnabled) return;

        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        if (geofenceType === "circular") {
            setCircularCenter({ lat, lng });
        } else if (geofenceType === "polygonal") {
            setPolygonPoints([...polygonPoints, { lat, lng }]);
        }
    };

    const clearPolygonPoints = () => {
        setPolygonPoints([]);
    };

    const clearCircularGeofence = () => {
        setCircularCenter(null);
        setCircularRadius("");
    };

    const customStyles = {
        multiValue: (styles) => ({ ...styles, backgroundColor: "#3762ea" }),
        multiValueLabel: (styles) => ({ ...styles, color: "white" }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: "white",
            backgroundColor: "#687cfe",
            ":hover": { backgroundColor: "#687cfe", color: "white" },
        }),
    };

    const criminalOptions = criminals.map((criminal) => ({
        label: `${criminal.name} (FIR: ${criminal.fir_number}) - ${criminal.jail_name}`,
        value: criminal.id,
    }));

    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Assign GPS Device" pageTitle="Device Management" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Device Assignment Form" />
                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                            {message && <Alert color={messageType}>{message}</Alert>}

                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    formik.handleSubmit(e);
                                                }}
                                            >
                                                {/* Device Selection */}

                                                <Row className="gy-4">
                                                    <Col xxl={12} md={12}>
                                                        <Label htmlFor="deviceIds" className="form-label">
                                                            Select GPS Device(s)
                                                        </Label>
                                                        <Select
                                                            id="deviceIds"
                                                            value={formik.values.deviceIds}
                                                            isMulti
                                                            onChange={(option) =>
                                                                formik.setFieldValue("deviceIds", option)
                                                            }
                                                            onBlur={() => formik.setFieldTouched("deviceIds", true)}
                                                            options={devices}
                                                            classNamePrefix="js-example-disabled-multi mb-0"
                                                            styles={customStyles}
                                                            placeholder="Search or Select GPS Devices..."
                                                        />
                                                        {formik.touched.deviceIds && formik.errors.deviceIds ? (
                                                            <div className="text-danger mt-1">
                                                                {formik.errors.deviceIds}
                                                            </div>
                                                        ) : null}
                                                    </Col>
                                                </Row>

                                                <hr className="my-4" />

                                                {/* Criminal Selection Section */}
                                                <h5 className="mb-3">Criminal Selection & Filters</h5>
                                                <Row className="gy-4">
                                                    {/* District Filter */}
                                                    <Col xxl={3} md={6}>
                                                        <Label htmlFor="districtFilter" className="form-label">
                                                            Filter by District
                                                        </Label>
                                                        <Select
                                                            id="districtFilter"
                                                            value={selectedDistrict}
                                                            onChange={(option) => {
                                                                setSelectedDistrict(option);
                                                                setSelectedJail(null);
                                                            }}
                                                            options={districts}
                                                            isClearable
                                                            placeholder="Select District..."
                                                        />
                                                    </Col>

                                                    {/* Jail Filter */}
                                                    <Col xxl={3} md={6}>
                                                        <Label htmlFor="jailFilter" className="form-label">
                                                            Filter by Jail
                                                        </Label>
                                                        <Select
                                                            id="jailFilter"
                                                            value={selectedJail}
                                                            onChange={(option) => setSelectedJail(option)}
                                                            options={filteredJails}
                                                            isClearable
                                                            placeholder="Select Jail..."
                                                            isDisabled={!selectedDistrict}
                                                        />
                                                    </Col>

                                                    {/* FIR Number Search */}
                                                    <Col xxl={3} md={6}>
                                                        <Label htmlFor="firSearch" className="form-label">
                                                            Search by FIR Number
                                                        </Label>
                                                        <Input
                                                            type="text"
                                                            className="form-control"
                                                            id="firSearch"
                                                            placeholder="Enter FIR Number..."
                                                            value={firSearch}
                                                            onChange={(e) => setFirSearch(e.target.value)}
                                                        />
                                                    </Col>

                                                    {/* Criminal Selection */}
                                                    <Col xxl={12} md={12}>
                                                        <Label htmlFor="criminalId" className="form-label">
                                                            Select Criminal
                                                        </Label>
                                                        <Select
                                                            id="criminalId"
                                                            value={criminalOptions.find(
                                                                (item) => item.value === formik.values.criminalId
                                                            )}
                                                            onChange={(option) =>
                                                                formik.setFieldValue("criminalId", option?.value || "")
                                                            }
                                                            onBlur={() => formik.setFieldTouched("criminalId", true)}
                                                            options={criminalOptions}
                                                            placeholder="Search or Select Criminal..."
                                                        />
                                                        {formik.touched.criminalId && formik.errors.criminalId ? (
                                                            <div className="text-danger mt-1">
                                                                {formik.errors.criminalId}
                                                            </div>
                                                        ) : null}
                                                        <small className="text-muted">
                                                            Showing {criminals.length} criminal(s)
                                                        </small>
                                                    </Col>
                                                </Row>

                                                <hr className="my-4" />

                                                {/* Geofencing Section */}
                                                <h5 className="mb-3">Geofencing Configuration</h5>
                                                <Row className="gy-4">
                                                    <Col xxl={12} md={12}>
                                                        <div className="form-check form-switch">
                                                            <Input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="geofencingToggle"
                                                                checked={geofencingEnabled}
                                                                onChange={(e) => {
                                                                    setGeofencingEnabled(e.target.checked);
                                                                    if (!e.target.checked) {
                                                                        setGeofenceType("");
                                                                        setCircularCenter(null);
                                                                        setCircularRadius("");
                                                                        setPolygonPoints([]);
                                                                    }
                                                                }}
                                                            />
                                                            <Label className="form-check-label" htmlFor="geofencingToggle">
                                                                Enable Geofencing
                                                            </Label>
                                                        </div>
                                                    </Col>

                                                    {geofencingEnabled && (
                                                        <>
                                                            {/* Geofence Type Selection */}
                                                            <Col xxl={12} md={12}>
                                                                <Label className="form-label">Geofence Type</Label>
                                                                <div className="d-flex gap-3">
                                                                    <div className="form-check">
                                                                        <Input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="geofenceType"
                                                                            id="circularType"
                                                                            value="circular"
                                                                            checked={geofenceType === "circular"}
                                                                            onChange={(e) => {
                                                                                setGeofenceType(e.target.value);
                                                                                setPolygonPoints([]);
                                                                            }}
                                                                        />
                                                                        <Label className="form-check-label" htmlFor="circularType">
                                                                            Circular
                                                                        </Label>
                                                                    </div>
                                                                    <div className="form-check">
                                                                        <Input
                                                                            className="form-check-input"
                                                                            type="radio"
                                                                            name="geofenceType"
                                                                            id="polygonalType"
                                                                            value="polygonal"
                                                                            checked={geofenceType === "polygonal"}
                                                                            onChange={(e) => {
                                                                                setGeofenceType(e.target.value);
                                                                                setCircularCenter(null);
                                                                                setCircularRadius("");
                                                                            }}
                                                                        />
                                                                        <Label className="form-check-label" htmlFor="polygonalType">
                                                                            Polygonal
                                                                        </Label>
                                                                    </div>
                                                                </div>
                                                            </Col>

                                                            {/* Circular Geofence Controls */}
                                                            {geofenceType === "circular" && (
                                                                <>
                                                                    <Col xxl={3} md={6}>
                                                                        <Label htmlFor="radius" className="form-label">
                                                                            Radius (meters)
                                                                        </Label>
                                                                        <Input
                                                                            type="number"
                                                                            className="form-control"
                                                                            id="radius"
                                                                            placeholder="Enter radius..."
                                                                            value={circularRadius}
                                                                            onChange={(e) => setCircularRadius(e.target.value)}
                                                                            min="1"
                                                                        />
                                                                    </Col>
                                                                    <Col xxl={3} md={6}>
                                                                        <Label className="form-label">Center Coordinates</Label>
                                                                        <Input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={
                                                                                circularCenter
                                                                                    ? `${circularCenter.lat.toFixed(6)}, ${circularCenter.lng.toFixed(6)}`
                                                                                    : "Click on map to set center"
                                                                            }
                                                                            readOnly
                                                                        />
                                                                    </Col>
                                                                    <Col xxl={2} md={6}>
                                                                        <Label className="form-label">&nbsp;</Label>
                                                                        <Button
                                                                            color="secondary"
                                                                            className="w-100"
                                                                            onClick={clearCircularGeofence}
                                                                        >
                                                                            Clear
                                                                        </Button>
                                                                    </Col>
                                                                </>
                                                            )}

                                                            {/* Polygonal Geofence Controls */}
                                                            {geofenceType === "polygonal" && (
                                                                <>
                                                                    <Col xxl={3} md={6}>
                                                                        <Label className="form-label">Points Plotted</Label>
                                                                        <Input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={`${polygonPoints.length} point(s)`}
                                                                            readOnly
                                                                        />
                                                                    </Col>
                                                                    <Col xxl={2} md={6}>
                                                                        <Label className="form-label">&nbsp;</Label>
                                                                        <Button
                                                                            color="secondary"
                                                                            className="w-100"
                                                                            onClick={clearPolygonPoints}
                                                                        >
                                                                            Clear Points
                                                                        </Button>
                                                                    </Col>
                                                                    <Col xxl={12}>
                                                                        <small className="text-muted">
                                                                            Click on the map to plot points. Minimum 3 points required.
                                                                        </small>
                                                                    </Col>
                                                                </>
                                                            )}

                                                            {/* Google Map */}
                                                            {geofenceType && (
                                                                <Col xxl={12}>
                                                                    <Label className="form-label">Map</Label>
                                                                    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                                                                        <GoogleMap
                                                                            mapContainerStyle={mapContainerStyle}
                                                                            center={circularCenter || defaultCenter}
                                                                            zoom={12}
                                                                            onClick={handleMapClick}
                                                                        >
                                                                            {/* Circular Geofence */}
                                                                            {geofenceType === "circular" && circularCenter && circularRadius && (
                                                                                <>
                                                                                    <Marker position={circularCenter} />
                                                                                    <Circle
                                                                                        center={circularCenter}
                                                                                        radius={parseFloat(circularRadius)}
                                                                                        options={{
                                                                                            fillColor: "#3762ea",
                                                                                            fillOpacity: 0.2,
                                                                                            strokeColor: "#3762ea",
                                                                                            strokeOpacity: 0.8,
                                                                                            strokeWeight: 2,
                                                                                        }}
                                                                                    />
                                                                                </>
                                                                            )}

                                                                            {/* Polygonal Geofence */}
                                                                            {geofenceType === "polygonal" && polygonPoints.length > 0 && (
                                                                                <>
                                                                                    {polygonPoints.map((point, index) => (
                                                                                        <Marker key={index} position={point} label={`${index + 1}`} />
                                                                                    ))}
                                                                                    {polygonPoints.length >= 3 && (
                                                                                        <Polygon
                                                                                            paths={polygonPoints}
                                                                                            options={{
                                                                                                fillColor: "#3762ea",
                                                                                                fillOpacity: 0.2,
                                                                                                strokeColor: "#3762ea",
                                                                                                strokeOpacity: 0.8,
                                                                                                strokeWeight: 2,
                                                                                            }}
                                                                                        />
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </GoogleMap>
                                                                    </LoadScript>
                                                                </Col>
                                                            )}
                                                        </>
                                                    )}
                                                </Row>

                                                {/* Form Actions */}
                                                <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                                                    <Button
                                                        color="primary"
                                                        disabled={loading}
                                                        type="submit"
                                                        onClick={() => setSubmitAction("saveAndAdd")}
                                                    >
                                                        {loading ? "Saving..." : "Save And Add New"}
                                                    </Button>
                                                    <Button
                                                        color="success"
                                                        disabled={loading}
                                                        type="submit"
                                                        onClick={() => setSubmitAction("save")}
                                                    >
                                                        {loading ? "Saving..." : "Save"}
                                                    </Button>
                                                    <Button color="secondary" onClick={() => window.history.back()}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};

export default AssignDevice;