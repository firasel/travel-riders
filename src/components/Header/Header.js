import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { Button, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Header.css";

const Header = () => {

    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">
            <Button onClick={()=>setLoggedInUser({})} variant="secondary">LogOut</Button>
          </Popover.Title>
        </Popover>
    );


    return (
            <Navbar bg="light" expand="md">
                <div className="container">
                    <Navbar.Brand className="titleStyle" href="#home">Travel Riders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="navbarItem">
                        <Nav className="ml-auto navbarBtn" >
                            <Nav.Link>
                                <Link to="/home">Home</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/destination/Bike">Destination</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/blog">Blog</Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/contact">Contact</Link>
                            </Nav.Link>
                            {!loggedInUser?.email &&
                                <Nav.Link className="buttonStyle">
                                    <Link to="/login">Login</Link>
                                </Nav.Link>
                            }
                            {
                                loggedInUser?.email && 
                                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                    <h5 className="nameStyle">{loggedInUser.name?loggedInUser.name:loggedInUser.email}</h5>
                                </OverlayTrigger>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
    );
};

export default Header;