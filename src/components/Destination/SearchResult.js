import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import "./Destination";

export const searchResult=(ride)=>{
    const {loadCapacity,cost,imgURL,rideType}=ride[0]?ride[0]:{};
    
    return(
        <Col className="p-0" lg={12}>
            <Row className="searchResult">
                <Col xs={4} sm={4} md={4} lg={4}>
                    <img style={{width:'100%'}} src={`${imgURL}`} alt=""/>
                </Col>
                <Col className="searchDetail" xs={8} sm={8} md={8} lg={8}>
                    <span>
                        {rideType}
                        <FontAwesomeIcon style={{color:"gray",margin:'0 2px 0 15px'}} icon={faUserFriends} />
                        {loadCapacity}
                    </span>
                    <span>$ {cost}</span>
                </Col>
            </Row>
        </Col>
    );
}