import React from 'react';
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

// Router
import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";

// Images
import logoLight from "../../assets/images/logo-light.png";

const Login = (props) => {

    const navigate = useNavigate();

    document.title = "Basic SignIn | Velzon - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content mt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <CardBody className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>

                                        <div className="p-2 mt-4">
                                            {/* 🔥 FORCE REDIRECT WITHOUT LOGIN */}
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    navigate("/dashboard");   // force redirect
                                                }}
                                            >
                                                <div className="mb-3">
                                                    <Label htmlFor="email" className="form-label">Email</Label>
                                                    <Input
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Enter email"
                                                        type="email"
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            type="password"
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                        />
                                                        <button
                                                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                                            type="button"
                                                            id="password-addon"
                                                        >
                                                            <i className="ri-eye-fill align-middle"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">
                                                        Remember me
                                                    </Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="secondary" className="w-100" type="submit">
                                                        Sign In
                                                    </Button>
                                                </div>

                                                <div className="mt-4 text-center">
                                                    <div className="signin-other-title">
                                                        <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                    </div>
                                                    <div>
                                                        <Link to="#" className="btn btn-primary btn-icon me-1">
                                                            <i className="ri-facebook-fill fs-16" />
                                                        </Link>
                                                        <Link to="#" className="btn btn-danger btn-icon me-1">
                                                            <i className="ri-google-fill fs-16" />
                                                        </Link>
                                                        <Button color="dark" className="btn-icon">
                                                            <i className="ri-github-fill fs-16"></i>
                                                        </Button>{" "}
                                                        <Button color="info" className="btn-icon">
                                                            <i className="ri-twitter-fill fs-16"></i>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    </CardBody>
                                </Card>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">
                                        Don't have an account ?
                                        <Link to="/register" className="fw-semibold text-primary text-decoration-underline">
                                            Signup
                                        </Link>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
