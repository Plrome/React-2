import React from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { loginService, profileService } from "../../services/service";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, FormLabel } from 'react-bootstrap';
import './LoginPage.css'


const LoginPage = ({ setButtonLog, isLogin, setIsLogin, data, setData }) => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Required!"),
            password: Yup.string()
                .min(8, "At least 8 characters")
                .required("Required!")
        }),
        onSubmit: () => {
            loginService().then((response) => {
                console.log(response);
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userID", response.data.userId)
            })
                .then(() => {
                    setButtonLog('Logout');
                    setIsLogin(true);
                })
            profileService('3').then((response) => {
                setData(response.data)
            })

        }
    });
    return (
        <div className="App">

            <Form onSubmit={formik.handleSubmit}>
                <Form.Label style={{fontSize:'30px',fontWeight:'bold'}}>Login</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="center_Form">
                        <Col sm={3}>
                            <Form.Control
                                placeholder="Enter email"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onBlur={formik.onBlur}
                                onChange={formik.handleChange} />
                        </Col>
                    </div>
                    {formik.errors.email && formik.touched.email && (
                        <p style={{ color: 'red', fontSize: '15px',fontWeight:'bold' }}>{formik.errors.email}</p>
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <div className="center_Form">
                        <Col sm={3} >
                            <Form.Control
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onBlur={formik.onBlur}
                                onChange={formik.handleChange}
                                placeholder="Password" />
                        </Col>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                        <p style={{ color: 'red', fontSize: '15px',fontWeight:'bold' }}>{formik.errors.password}</p>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={formik.onSubmit}>
                    Submit
                </Button>
                <div>{isLogin && <FormLabel style={{margin: '5px' , color:'green'}}>Login success</FormLabel>}</div>
                
            </Form>
        </div>
    );
}
export default LoginPage;