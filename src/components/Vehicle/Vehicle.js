import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import "./Vehicle.css";

const Vehicle = (props) => {
    const {rideType,imgURL}=props.ride;
    const history=useHistory();
    const handleCardClick=()=>{
        history.replace(`/destination/${rideType}`);
    }

    return (
        <Col className="cardGap" xs="12" sm="10" md="4" lg="3" >
            <Card onClick={handleCardClick} className="cardDesign">
                <Card.Img variant="top" src={`${imgURL}`} />
                <Card.Body className="d-flex justify-content-center align-items-end">
                    <Card.Title>{rideType}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Vehicle;