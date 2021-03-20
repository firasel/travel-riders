import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";
import { createUserSignUp, facebookSignIn, googleSignIn, userSignIn } from "./firebaseSignIn";
import "./Login.css";

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.app();
}

const Login = () => {

    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const [newUser,setNewUser]=useState(false);
    const [newPassword,setNewPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const { register, handleSubmit, errors } = useForm();

    const handleSignIn = data =>{
        if(newUser){
            if(data.email.length && data.password.length){
                createUserSignUp(data).then(res=>{
                    if(res.success){
                        setLoggedInUser(res);
                        history.replace(from);
                    }else{
                        setLoggedInUser(res);
                        history.replace('/error');
                    }
                })
            }
        }else{
            if(data.email.length && data.password.length){
                userSignIn(data).then(res=>{
                    if(res.success){
                        setLoggedInUser(res);
                        history.replace(from);
                    }else{
                        setLoggedInUser(res);
                        history.replace('/error');
                    }
                })
            }
        }
    }

    const handleGoogleSignIn=()=>{
        googleSignIn().then(res=>{
            if(res.success){
                setLoggedInUser(res);
                history.replace(from);
            }else{
                setLoggedInUser(res);
                history.replace('/error');
            }
        })
    }
    const handleFbSignIn=()=>{
        facebookSignIn().then(res=>{
            if(res.success){
                setLoggedInUser(res);
                history.replace(from);
            }else{
                setLoggedInUser(res);
                history.replace('/error');
            }
        })
    }
    const handlePasswordMatch=(e)=>{
        const message=e.target.value == newPassword?'':'password not matched.'
        setErrorMsg(message);
    }

    return (
        <div className="container">
            <div className="loginForm mt-4">
                <div className="formDesign">
                    <Form onSubmit={handleSubmit(handleSignIn)}>
                        <h3>{newUser?'Sign Up':'LogIn'}</h3>
                        {
                            newUser && <Form.Group>
                                            <Form.Control className="inputDesign" type="text" placeholder="Name" name="name" ref={register({ required: true })} />
                                            <Form.Text className="text-danger">
                                                {errors.name && <span>Name is required</span>}
                                            </Form.Text>
                                        </Form.Group>
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control className="inputDesign" type="email" placeholder="Email" name="email" ref={register({ pattern: /\S+@\S+\.\S+/ })} />
                            <Form.Text className="text-danger">
                                {errors.email && <span>Valid email is required</span>}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group onChange={(e)=>setNewPassword(e.target.value)} controlId="formBasicPassword">
                            <Form.Control className="inputDesign" type="password" placeholder="Password" name="password" ref={register({ pattern: /[0-9a-zA-Z]{6,}/ })} />
                            <Form.Text className="text-danger">
                                {errors.password && <span>Password is required</span>}
                            </Form.Text>
                        </Form.Group>

                        {
                            newUser && <Form.Group>
                                            <Form.Control onChange={handlePasswordMatch} className="inputDesign" type="password" placeholder="Confirm Password" name="confirmPassword" ref={register({ pattern: /[0-9a-zA-Z]{6,}/ })} />
                                            <Form.Text className="text-danger">
                                                {errors.password && <span></span>}
                                                <span>{errorMsg}</span>
                                            </Form.Text>
                                        </Form.Group>
                        }

                        <Form.Group className="d-flex justify-content-between mt-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember Me" />
                            <button className="textLink">Forgot PassWord</button>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control className="buttonDesign" type="submit" value={newUser?'SignUp':'LogIn'} />
                        </Form.Group>
                        {
                            !newUser && 
                            <Form.Group className="text-center mt-3">
                                <span>Don't have an account? <button onClick={()=>setNewUser(!newUser)} className="textLink">Create an account</button></span>
                            </Form.Group>
                        }
                        {
                            newUser &&
                            <Form.Group className="text-center mt-3">
                                <span>Have an account? <button onClick={()=>setNewUser(!newUser)} className="textLink">LogIn</button></span>
                            </Form.Group>
                        }
                    </Form>
                </div>
                <div className="orStyle" >
                    <span>Or</span>
                </div>
                <div className="otherSignInBtn">
                    <Button onClick={handleFbSignIn} variant="primary">
                        <Row style={{width:'100%'}}>
                            <Col sm={12} md={1} lg={1}>
                            <FontAwesomeIcon style={{color:'rgb(0 93 173)',fontSize:'22px'}} icon={faFacebook} />
                            </Col>
                            <Col className="text-center iconDesign" style={{overFlow:'hidden'}} sm={0} md={11} lg={11}>
                                Continue With FaceBook
                            </Col>
                        </Row>
                    </Button>
                    <Button onClick={handleGoogleSignIn} variant="primary">
                        <Row style={{width:'100%'}}>
                            <Col sm={12} md={1} lg={1}>
                                <FontAwesomeIcon style={{color:"rgb(216 159 0)",fontSize:'22px'}} icon={faGoogle} />
                            </Col>
                            <Col className="text-center iconDesign" style={{overFlow:'hidden'}} sm={0} md={11} lg={11}>
                                Continue With Google
                            </Col>
                        </Row>  
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;