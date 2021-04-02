import React, { Component, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col } from 'react-bootstrap';
import '../component/Toggle1/toggle.css';

// Data fucntion
import {readStock, readSET} from "../component/database";

//Search Box
import { MDBCol, MDBFormInline, MDBBtn, MDBRow } from "mdbreact";

//CSS
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css.map";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.min.css";

import darkMode from "../component/Navbar";

const Dashboard = () => {
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

    const [darkMode, setDarkMode] = React.useState(getInitialMode());
    React.useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(darkMode));
    }, [darkMode]);

    function getInitialMode() {
        const isReturningUser = "dark" in localStorage;
        const savedMode = JSON.parse(localStorage.getItem("dark"));
        const userPrefersDark = getPrefColorScheme();
        // if mode was saved --> dark / light
        if (isReturningUser) {
            return savedMode;
            // if preferred color scheme is dark --> dark
        } else if (userPrefersDark) {
            return true;
            // otherwise --> light
        } else {
            return false;
        }
        // return savedMode || false;
    }

    function getPrefColorScheme() {
        if (!window.matchMedia) return;

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    // Fucntion Compare status
    function compareStatus(After, Before){
        if(After - Before > 0){
            return('Up');
        }else if(After - Before < 0){
            return('Down');
        }else {
            return('Eq');
        }
    }

    function percen(After, Before){
        return (((After - Before)/Before)*100).toFixed(2);
    }
    // END Fucntion Compare status

    // DATA CALL
    const [PTT, SetPTT] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        },
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        }
    ]);

    const [SUSCO, SetSUSCO] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        },
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        }
    ]);

    const [BCP, SetBCP] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        },
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        }
    ]);

    const [IRPC, SetIRPC] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        },
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        }
    ]);

    const [TOP, SetTOP] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        },
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0,
            volume : 0,
            predict : 0
        }
    ]);

    const [SET, SetSET] = useState([
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0
        },
        {
            date : "",
            close : 0,
            open : 0,
            high : 0,
            low : 0
        }
    ]);

    useEffect(() => {
        function data(){
            readStock('PTT').then((x) => SetPTT(x));
            readStock('SUSCO').then((x) => SetSUSCO(x));
            readStock('IRPC').then((x) => SetIRPC(x));
            readStock('TOP').then((x) => SetTOP(x));
            readStock('BCP').then((x) => SetBCP(x));
            readSET().then((x) => SetSET(x));
        }
        data();
    }, []);

    const [statusSET,SetstatusSET] = useState('Eq'); //Up+ Down- Eq=
    const [deffSET, SetdeffSET] = useState(0);
    const [perSET, SetperSET] = useState(0);
    const [statusperHigh,SetstatusperHigh] = useState('Eq'); //Up+ Down- Eq=
    const [perHigh, SetperHigh] = useState(0);
    const [statusperLow,SetstatusperLow] = useState('Eq'); //Up+ Down- Eq=
    const [perLow, SetperLow] = useState(0);
    const [statusperOpen,SetstatusperOpen] = useState('Eq'); //Up+ Down- Eq=
    const [perOpen, SetperOpen] = useState(0);
    const [statusperClose,SetstatusperClose] = useState('Eq'); //Up+ Down- Eq=
    const [perClose, SetperClose] = useState(0);

    useEffect(() => {
        function calculate(){
            SetdeffSET((SET[0].close - SET[1].close).toFixed(2));
            SetperSET(percen(SET[0].close, SET[1].close));
            SetstatusSET(compareStatus(SET[0].close, SET[1].close));

            SetperHigh(percen(SET[0].high, SET[1].high));
            SetstatusperHigh(compareStatus(SET[0].high, SET[1].high));

            SetperLow(percen(SET[0].low, SET[1].low));
            SetstatusperLow(compareStatus(SET[0].low, SET[1].low));

            SetperOpen(percen(SET[0].open, SET[1].open));
            SetstatusperOpen(compareStatus(SET[0].open, SET[1].open));

            SetperClose(percen(SET[0].close, SET[1].close));
            SetstatusperClose(compareStatus(SET[0].close, SET[1].close));
        }
        calculate();
    }, [SET]);

    const [changePTT, SetchangePTT] = useState(0);
    const [changeperPTT, SetchangeperPTT] = useState(0);
    const [statusPTT, SetstatusPTT] = useState('Eq');

    useEffect (() => {
        function calculate(){
            SetchangePTT((PTT[0].predict - PTT[0].close).toFixed(2));
            SetchangeperPTT(percen(PTT[0].predict, PTT[0].close));
            SetstatusPTT(compareStatus(PTT[0].predict, PTT[0].close));
        }
        calculate();
    }, [PTT]);

    const [changeSUSCO, SetchangeSUSCO] = useState(0);
    const [changeperSUSCO, SetchangeperSUSCO] = useState(0);
    const [statusSUSCO, SetstatusSUSCO] = useState('Eq');

    useEffect (() => {
        function calculate(){
            SetchangeSUSCO((SUSCO[0].predict - SUSCO[0].close).toFixed(2));
            SetchangeperSUSCO(percen(SUSCO[0].predict, SUSCO[0].close));
            SetstatusSUSCO(compareStatus(SUSCO[0].predict, SUSCO[0].close));
        }
        calculate();
    }, [SUSCO]);
    
    const [changeIRPC, SetchangeIRPC] = useState(0);
    const [changeperIRPC, SetchangeperIRPC] = useState(0);
    const [statusIRPC, SetstatusIRPC] = useState('Eq');

    useEffect (() => {
        function calculate(){
            SetchangeIRPC((IRPC[0].predict - IRPC[0].close).toFixed(2));
            SetchangeperIRPC(percen(IRPC[0].predict, IRPC[0].close));
            SetstatusIRPC(compareStatus(IRPC[0].predict, IRPC[0].close));
        }
        calculate();
    }, [IRPC]);

    const [changeTOP, SetchangeTOP] = useState(0);
    const [changeperTOP, SetchangeperTOP] = useState(0);
    const [statusTOP, SetstatusTOP] = useState('Eq');

    useEffect (() => {
        function calculate(){
            SetchangeTOP((TOP[0].predict - TOP[0].close).toFixed(2));
            SetchangeperTOP(percen(TOP[0].predict, TOP[0].close));
            SetstatusTOP(compareStatus(TOP[0].predict, TOP[0].close));
        }
        calculate();
    }, [TOP]);

    const [changeBCP, SetchangeBCP] = useState(0);
    const [changeperBCP, SetchangeperBCP] = useState(0);
    const [statusBCP, SetstatusBCP] = useState('Eq');

    useEffect (() => {
        function calculate(){
            SetchangeBCP((BCP[0].predict - BCP[0].close).toFixed(2));
            SetchangeperBCP(percen(BCP[0].predict, BCP[0].close));
            SetstatusBCP(compareStatus(BCP[0].predict, BCP[0].close));

        }
        calculate();
    }, [BCP]);
    // END DATA CALL

    return (
        <div>
            <main class="fullscreen-block">
                {isDesktopOrLaptop && <>
                    {/* <p>You are a desktop or laptop</p> */}
                    <div style={{ marginTop: -10, paddingBottom: -30 }}>
                        <section id="Set" class="bg-set">
                            <div class="container-fluid">
                                <div class="row">
                                    <h1 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">SET</h1>
                                    <h2 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">{SET[0].close}</h2>
                                    <table align="center">
                                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" className="result" align="center" style={{ marginBottom: -15 }}>
                                                <h3>{deffSET}</h3>
                                            </div>
                                            <div class="row" className="result" align="center">
                                                <h4>{perSET}%</h4>
                                            </div>
                                        </div>
                                    </table>
                                    <table align="center">
                                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" align="center">
                                                <table>
                                                    <td className="info"><h4>High&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{SET[0].high}&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{perHigh}%&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                            <div class="row" align="center">
                                                <table>
                                                    <td className="info"><h4>Low&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{SET[0].low}&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{perLow}%&nbsp;&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                        </div>
                                    </table>
                                    <table align="center">
                                        {/* <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" className="info" align="center">
                                                <table>
                                                    <td><h4>Value&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="mb"><h4>82,776.88&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td><h4>MB&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                            <div class="row" className="info">
                                                <table>
                                                    <td className="result" align="left"><h4>843&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result1" align="center"><h4>762&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result2" align="right"><h4>513</h4></td>
                                                </table>
                                            </div>
                                        </div> */}
                                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" align="center">
                                                <table>
                                                    <td className="info"><h4>Open&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{SET[0].open}&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{perOpen}%&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                            <div class="row" align="center">
                                                <table>
                                                    <td className="info"><h4>Close&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{SET[0].close}&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>{perClose}%&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                        </div>
                                    </table>
                                    <h4 class="col-xs-2 col-sm-2 col-md-2 col-lg-2">SET : Open/Close</h4>
                                </div>
                            </div>
                        </section>
                        {/* <section id="search" class="bg-black">
                            <div class="container-fluid">
                                <div class="row" style={{ marginBottom: -30 }}>
                                    <h3 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto" style={{ paddingTop: 15 }}>ค้นหาหลักทรัพย์</h3>
                                    <MDBCol size="6" className="search" style={{ paddingTop: 15 }}>
                                        <MDBFormInline className="md-form mr-auto mb-4">
                                            <input className="form-control mr-sm-2" type="text" placeholder="ค้นหา" aria-label="Search" />
                                            <MDBBtn color="warning" rounded size="sm" type="submit" className="mr-auto">
                                                ค้นหา
                                        </MDBBtn>
                                        </MDBFormInline>
                                    </MDBCol>
                                </div>
                            </div>
                        </section> */}
                    </div>
                    <div>
                        <Row>
                            <Col md="12">
                                <Card className="card-plain">
                                    <Card.Header>
                                        <Card.Title tag="h3">ค้นหาหลักทรัพย์</Card.Title>
                                        <MDBCol md="12">
                                            <MDBFormInline className="md-form mr-auto mb-4">
                                                <input className="form-control mr-sm-2" type="text" placeholder="ค้นหา" aria-label="Search" />
                                                <MDBBtn color="warning" rounded size="sm" type="submit" className="mr-auto">
                                                    ค้นหา
                                                </MDBBtn>
                                            </MDBFormInline>
                                        </MDBCol>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead className="text-primary">
                                                <tr className="bg-set">
                                                    <th>ชื่อบริษัท</th>
                                                    <th className="text-center">ราคาเปิด</th>
                                                    <th className="text-center">ราคาปิด</th>
                                                    <th className="text-center">ราคาสูงสุด</th>
                                                    <th className="text-center">ราคาต่ำสุด</th>
                                                    <th className="text-center">ปริมาณซื้อขาย (หุ้น)</th>
                                                    <th className="text-center">เปลี่ยนแปลง</th>
                                                    <th className="text-center">%เปลี่ยนแปลง</th>
                                                    <th className="text-center">ราคาทำนาย</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><a href="/Info?BCP">BCP</a></td>
                                                    <td className="text-center">{(BCP[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{BCP[0].volume}</td>
                                                    <td className="text-center">{changeBCP}</td>
                                                    <td className="text-center">{changeperBCP}</td>
                                                    <td className="text-center">{(BCP[0].predict).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info?IRPC">IRPC</a></td>
                                                    <td className="text-center">{(IRPC[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{IRPC[0].volume}</td>
                                                    <td className="text-center">{changeIRPC}</td>
                                                    <td className="text-center">{changeperIRPC}</td>
                                                    <td className="text-center">{(IRPC[0].predict).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info?PTT">PTT</a></td>
                                                    <td className="text-center">{(PTT[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{PTT[0].volume}</td>
                                                    <td className="text-center">{changePTT}</td>
                                                    <td className="text-center">{changeperPTT}</td>
                                                    <td className="text-center">{(PTT[0].predict).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info?SUSCO">SUSCO</a></td>
                                                    <td className="text-center">{(SUSCO[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{SUSCO[0].volume}</td>
                                                    <td className="text-center">{changeSUSCO}</td>
                                                    <td className="text-center">{changeperSUSCO}</td>
                                                    <td className="text-center">{(SUSCO[0].predict).toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info?TOP">TOP</a></td>
                                                    <td className="text-center">{(TOP[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{TOP[0].volume}</td>
                                                    <td className="text-center">{changeTOP}</td>
                                                    <td className="text-center">{changeperTOP}</td>
                                                    <td className="text-center">{(TOP[0].predict).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    {/* {isBigScreen && <p>You also have a huge screen</p>}
                    {isTabletOrMobile && <p>You are sized like a tablet or mobile phone though</p>} */}
                </>}
                {/* <Card className="card-plain">
                    <div class="container-fluid" className="" align="center">
                    <Card.Body>
                        <Table responsive >
                            <thead className="text-primary">
                                <tr className="bg-set" style={{ color: "white" }}>
                                    <th>ชื่อบริษัท</th>
                                    <th className="text-center">ราคาเปิด</th>
                                    <th className="text-center">ราคาปิด</th>
                                    <th className="text-center">ราคาสูงสุด</th>
                                    <th className="text-center">ราคาต่ำสุด</th>
                                    <th className="text-center">ปริมาณซื้อขาย (หุ้น)</th>
                                    <th className="text-center">เปลี่ยนแปลง</th>
                                    <th className="text-center">%เปลี่ยนแปลง</th>
                                    <th className="text-center">ราคาทำนาย</th>
                                </tr>
                            </thead>
                            <tbody class="bg-black">
                                <tr>
                                    <td><a href="/Info">BCP</a></td>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <td key={index} className="text-center">Table cell {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><a href="/Info">IRPC</a></td>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <td key={index} className="text-center">Table cell {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><a href="/Info">PTT</a></td>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <td key={index} className="text-center">Table cell {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><a href="/Info">SUSCO</a></td>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <td key={index} className="text-center">Table cell {index}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td><a href="/Info">TOP</a></td>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <td key={index} className="text-center">Table cell {index}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                    </div>
                </Card> */}
                {isTabletOrMobileDevice && <>
                    <div>
                        <section id="Set" class="bg-set">
                            <div class="container-fluid">
                                <div class="row">
                                    <h1 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">SET</h1>
                                    <h2 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">1,493.62</h2>
                                    <table align="center">
                                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" className="result" align="center" style={{ marginBottom: -15 }}>
                                                <h3>+11.11</h3>
                                            </div>
                                            <div class="row" className="result" align="center">
                                                <h4>+0.80%</h4>
                                            </div>
                                        </div>
                                    </table>
                                    <table align="center">
                                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" align="center">
                                                <table>
                                                    <td className="info"><h4>High&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>1,454.94&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>+16.62%&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                            <div class="row" align="center">
                                                <table>
                                                    <td className="info"><h4>Low&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>1,439.14&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result"><h4>+0.82%&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                        </div>
                                    </table>
                                    <table align="center">
                                        <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                            <div class="row" className="info" align="center">
                                                <table>
                                                    <td><h4>Value&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="mb"><h4>82,776.88&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td><h4>MB&nbsp;&nbsp;&nbsp;</h4></td>
                                                </table>
                                            </div>
                                            <div class="row" className="info">
                                                <table>
                                                    <td className="result" align="left"><h4>843&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result1" align="center"><h4>762&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4></td>
                                                    <td className="result2" align="right"><h4>513</h4></td>
                                                </table>
                                            </div>
                                        </div>
                                    </table>
                                    <h4 class="col-xs-2 col-sm-2 col-md-2 col-lg-2">SET: Open/Close</h4>
                                </div>
                            </div>
                        </section>
                        {/* <section id="search" class="bg-black">
                            <div class="container-fluid">
                                <div class="row" style={{ marginBottom: -30 }}>
                                    <h3 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto" style={{ paddingTop: 15 }}>ค้นหาหลักทรัพย์</h3>
                                    <MDBCol size="6" className="search" style={{ paddingTop: 15 }}>
                                        <MDBFormInline className="md-form mr-auto mb-4">
                                            <input className="form-control mr-sm-2" type="text" placeholder="ค้นหา" aria-label="Search" />
                                            <MDBBtn color="warning" rounded size="sm" type="submit" className="mr-auto">
                                                ค้นหา
                                        </MDBBtn>
                                        </MDBFormInline>
                                    </MDBCol>
                                </div>
                            </div>
                        </section> */}
                    </div>
                    <div>
                        <Row>
                            <Col md="12">
                                <Card className="card-plain">
                                    <Card.Header>
                                        <Card.Title tag="h3">ค้นหาหลักทรัพย์</Card.Title>
                                        <MDBCol md="12">
                                            <MDBFormInline className="md-form mr-auto mb-4">
                                                <input className="form-control mr-sm-2" type="text" placeholder="ค้นหา" aria-label="Search" />
                                                <MDBBtn color="warning" rounded size="sm" type="submit" className="mr-auto">
                                                    ค้นหา
                                        </MDBBtn>
                                            </MDBFormInline>
                                        </MDBCol>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive>
                                            <thead className="text-primary" style={{ paddingTop: -10 }}>
                                                <tr className="bg-set">
                                                    <th>ชื่อบริษัท</th>
                                                    <th className="text-center">ราคาเปิด</th>
                                                    <th className="text-center">ราคาปิด</th>
                                                    <th className="text-center">ราคาสูงสุด</th>
                                                    <th className="text-center">ราคาต่ำสุด</th>
                                                    <th className="text-center">ปริมาณซื้อขาย (หุ้น)</th>
                                                    <th className="text-center">เปลี่ยนแปลง</th>
                                                    <th className="text-center">%เปลี่ยนแปลง</th>
                                                    <th className="text-center">ราคาทำนาย</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><a href="/Info?BCP">BCP</a></td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info">IRPC</a></td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info">PTT</a></td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info">SUSCO</a></td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/Info">TOP</a></td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                    <td className="text-center">xxx</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </>}

                {/* <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
                {isRetina && <p>You are retina</p>} */}


            </main>
        </div>
    );
    this.forceUpdate();
};

export default (Dashboard);
