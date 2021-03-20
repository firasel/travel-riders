import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Vehicle from '../Vehicle/Vehicle';
import "./Home.css";

const Home = () => {

    const [vehicles,setVehicles]=useState([]);

    useEffect(()=>{
        fetch('https://api.mocki.io/v1/18aae1ef')
        .then(res=>res.json())
        .then(data=>setVehicles(data))
        .catch(error => console.log(error))
    },[])


    return (
        <div className="homeBackground" >
            <div className="mt-5 container">
            <Row className="m-2 justify-content-lg-start justify-content-sm-center" style={{padding:'0',margin:'0'}}>
                {
                    vehicles.map(vehicle=><Vehicle key={vehicle.id} ride={vehicle}></Vehicle>)
                }
            </Row>
            </div>
        </div>
    );
};

export default Home;