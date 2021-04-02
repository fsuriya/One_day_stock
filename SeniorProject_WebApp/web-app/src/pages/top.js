import React, { Component, useState } from "react";
import { useMediaQuery } from 'react-responsive';
// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import TestGraph from './testGraph.js';
import '../component/Toggle1/toggle.css';

import { Tab, Nav, Row, Col, Card } from 'react-bootstrap'

//CSS
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css.map";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.min.css";

const TOP = () => {
    // const currentDate = new Date().toLocaleDateString();
    // const currentTime = new Date().toLocaleTimeString();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    return (
        <div>
            <main class="fullscreen-block">
                {isDesktopOrLaptop && <>
                {/* <p>You are a desktop or laptop</p> */}
                <div style={{marginTop: -30}}>
                    <Card style={{ backgroundColor: "black", paddingLeft: 25, paddingTop: 15, marginTop: -30 }}>
                        <div>
                            <Col sm={2}>
                                <Nav.Item><h4 style={{ color: "white", paddingTop: 5 }}>ชื่อบริษัท</h4></Nav.Item>
                            </Col>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="/top">
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link href="/bcp">BCP</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/irpc">IRPC</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/ptt">PTT</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/susco">SUSCO</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/top">TOP</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={10} style={{marginTop: -40, marginLeft: -10}}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="/top">
                                                <div id="chart" align="center" style={{ paddingLeft: 0 }}>
                                                    <Card style={{ backgroundColor: "#808080" }}>
                                                        <TestGraph />
                                                    </Card>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </Card>
                </div>
                {/* {isBigScreen && <p>You also have a huge screen</p>}
                    {isTabletOrMobile && <p>You are sized like a tablet or mobile phone though</p>} */}
                </>}
                {isTabletOrMobileDevice && <>
                    <div>
                    <Card style={{ backgroundColor: "black", paddingLeft: 25, paddingTop: 15}}>
                        <div>
                            <Col sm={2}>
                                <Nav.Item><h4 style={{ color: "white", paddingTop: 5 }}>ชื่อบริษัท</h4></Nav.Item>
                            </Col>
                            <Tab.Container id="left-tabs-example" defaultActiveKey="/top">
                                <Row>
                                    <Col sm={2}>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link href="/bcp">BCP</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/irpc">IRPC</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/ptt">PTT</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/susco">SUSCO</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link href="/top">TOP</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col sm={10} style={{marginTop: 0, marginLeft: -10}}>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="/top">
                                                <div id="chart" align="center" style={{ paddingLeft: 0 }}>
                                                    <Card style={{ backgroundColor: "#808080" }}>
                                                        <TestGraph />
                                                    </Card>
                                                </div>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </div>
                    </Card>
                </div>
                </>}
                {/* <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
                {isRetina && <p>You are retina</p>} */}


            </main>
        </div>
    );
    this.forceUpdate();
};

export default (TOP);
