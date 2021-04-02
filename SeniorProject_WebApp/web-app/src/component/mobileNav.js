import React from "react";
import '../component/Toggle1/toggle.css';
import { Navbar, Nav } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const MoblieNav = () => {
    const currentDate = new Date().toLocaleDateString();
    return (
        <header className="fixed-top">
         
                {/* <nav class="mobilenav">
                    <Navbar collapseOnSelect expand="xl" variant="dark">
                        <Navbar.Brand href="/" style={{position: "relative", display: "flex"}}>One Day Stock</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto"></Nav>
                            <Nav text-align="center">
                                <h5 style={{position: "relative", display: "flex", top: 10}}>อัพเดทเมื่อ {currentDate}</h5>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </nav> */}
        </header>
    );
};

export default (MoblieNav);
