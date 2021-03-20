import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import GoogleMapsContainer from '../GoogleMapsContainer/GoogleMapsContainer';
import "./Destination.css";
import { searchResult } from './SearchResult';
 
const Destination = () => {
    const {rideType} = useParams();

    const [ride,setRide]=useState([]);
    const [isAddress,setIsAddress]=useState(false);
    const [address,setAddress]=useState({});

    useEffect(()=>{
        fetch('https://api.mocki.io/v1/18aae1ef')
        .then(res=>res.json())
        .then(data=>{
            setRide(data.filter(rideData=>rideData.rideType.toLowerCase()==rideType.toLowerCase()));
        })
        .catch(error => console.log(error))
    },[])

    const { register, handleSubmit, errors } = useForm();
    const handleSearch=(data)=>{
        setAddress(data);
        setIsAddress(true);
    }

    return (
        <div className="container">
            <Row className="mt-4 mb-3">
                <Col className="mt-4" sm={11} md={5} lg={5}>
                    <div className="searchForm">
                    {
                        !isAddress && 
                        <Form onSubmit={handleSubmit(handleSearch)}>
                            <Form.Group>
                                <Form.Label>Pick From</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" name="pickFrom" ref={register({ required: true })} />
                                <Form.Text className="text-danger">
                                    {errors.pickFrom && <span>Address is required</span>}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Pick To</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" name="pickTo" ref={register({ required: true })} />
                                <Form.Text className="text-danger">
                                    {errors.pickTo && <span>Address is required</span>}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Start time</Form.Label>
                                <Form.Control type="datetime-local" name="dateTime" ref={register({ required: true })} />
                                <Form.Text className="text-danger">
                                    {errors.dateTime && <span>date is required</span>}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Control className="buttonDesign" type="submit" value="Search" />
                            </Form.Group>
                        </Form>
                    }
                    {
                        isAddress && 
                        <Row>
                            <Col lg={12} className="searchAddress">
                                <ul className="ulStyleFromTo">
                                    <li className="listStyle">{address.pickFrom}</li>
                                    <li className="listStyle">{address.pickTo}</li>
                                </ul>
                            </Col>
                            {searchResult(ride)}
                            {searchResult(ride)}
                            {searchResult(ride)}
                            {searchResult(ride)}
                        </Row>
                    }
                    </div>
                </Col>
                <Col className="mt-4" sm={11} md={7} lg={7}>
                    <GoogleMapsContainer></GoogleMapsContainer>
                </Col>
            </Row>
        </div>
    );
};

export default Destination;