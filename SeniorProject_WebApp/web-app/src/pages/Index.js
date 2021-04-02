import React, { Component, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Card, Row, Col } from 'react-bootstrap';
import '../component/Toggle1/toggle.css';

// Data fucntion
import { readStock, readSET } from "../component/database";

//Search Box
import { MDBCol, MDBFormInline, MDBBtn, MDBRow } from "mdbreact";

//CSS
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css.map";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.min.css";

const Index = () => {
    // const currentDate = new Date().toLocaleDateString();
    // const currentTime = new Date().toLocaleTimeString();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1223px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


    // Fucntion Compare status
    function compareStatus(After, Before) {
        if (After - Before > 0) {
            return ('lime');
        } else if (After - Before < 0) {
            return ('red');
        } else {
            return ('yellow');
        }
    }

    function percen(After, Before) {
        return (((After - Before) / Before) * 100).toFixed(2);
    }
    // END Fucntion Compare status

    // DATA CALL
    var initStock = [
        {
            date: "",
            close: 0,
            open: 0,
            high: 0,
            low: 0,
            volume: 0,
            predict: 0
        },
        {
            date: "",
            close: 0,
            open: 0,
            high: 0,
            low: 0,
            volume: 0,
            predict: 0
        }
    ]

    const [PTT, SetPTT] = useState(initStock);
    const [SUSCO, SetSUSCO] = useState(initStock);
    const [BCP, SetBCP] = useState(initStock);
    const [IRPC, SetIRPC] = useState(initStock);
    const [TOP, SetTOP] = useState(initStock);
    const [SET, SetSET] = useState(initStock);

    useEffect(() => {
        function data() {
            readStock('PTT').then((x) => SetPTT(x));
            readStock('SUSCO').then((x) => SetSUSCO(x));
            readStock('IRPC').then((x) => SetIRPC(x));
            readStock('TOP').then((x) => SetTOP(x));
            readStock('BCP').then((x) => SetBCP(x));
            readSET().then((x) => SetSET(x));
        }
        data();
    }, []);

    const [statusSET, SetstatusSET] = useState('yellow'); //Up+ Down- Eq=
    const [deffSET, SetdeffSET] = useState(0);
    const [perSET, SetperSET] = useState(0);
    const [statusperHigh, SetstatusperHigh] = useState('yellow'); //Up+ Down- Eq=
    const [perHigh, SetperHigh] = useState(0);
    const [statusperLow, SetstatusperLow] = useState('yellow'); //Up+ Down- Eq=
    const [perLow, SetperLow] = useState(0);
    const [statusperOpen, SetstatusperOpen] = useState('yellow'); //Up+ Down- Eq=
    const [perOpen, SetperOpen] = useState(0);
    const [statusperClose, SetstatusperClose] = useState('yellow'); //Up+ Down- Eq=
    const [perClose, SetperClose] = useState(0);

    useEffect(() => {
        function calculate() {
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
    const [statusPTT, SetstatusPTT] = useState('yellow');

    useEffect(() => {
        function calculate() {
            SetchangePTT((PTT[0].predict - PTT[0].close).toFixed(2));
            SetchangeperPTT(percen(PTT[0].predict, PTT[0].close));
            SetstatusPTT(compareStatus(PTT[0].predict, PTT[0].close));
        }
        calculate();
    }, [PTT]);

    const [changeSUSCO, SetchangeSUSCO] = useState(0);
    const [changeperSUSCO, SetchangeperSUSCO] = useState(0);
    const [statusSUSCO, SetstatusSUSCO] = useState('yellow');

    useEffect(() => {
        function calculate() {
            SetchangeSUSCO((SUSCO[0].predict - SUSCO[0].close).toFixed(2));
            SetchangeperSUSCO(percen(SUSCO[0].predict, SUSCO[0].close));
            SetstatusSUSCO(compareStatus(SUSCO[0].predict, SUSCO[0].close));
        }
        calculate();
    }, [SUSCO]);

    const [changeIRPC, SetchangeIRPC] = useState(0);
    const [changeperIRPC, SetchangeperIRPC] = useState(0);
    const [statusIRPC, SetstatusIRPC] = useState('yellow');

    useEffect(() => {
        function calculate() {
            SetchangeIRPC((IRPC[0].predict - IRPC[0].close).toFixed(2));
            SetchangeperIRPC(percen(IRPC[0].predict, IRPC[0].close));
            SetstatusIRPC(compareStatus(IRPC[0].predict, IRPC[0].close));
        }
        calculate();
    }, [IRPC]);

    const [changeTOP, SetchangeTOP] = useState(0);
    const [changeperTOP, SetchangeperTOP] = useState(0);
    const [statusTOP, SetstatusTOP] = useState('yellow');

    useEffect(() => {
        function calculate() {
            SetchangeTOP((TOP[0].predict - TOP[0].close).toFixed(2));
            SetchangeperTOP(percen(TOP[0].predict, TOP[0].close));
            SetstatusTOP(compareStatus(TOP[0].predict, TOP[0].close));
        }
        calculate();
    }, [TOP]);

    const [changeBCP, SetchangeBCP] = useState(0);
    const [changeperBCP, SetchangeperBCP] = useState(0);
    const [statusBCP, SetstatusBCP] = useState('yellow');

    useEffect(() => {
        function calculate() {
            SetchangeBCP((BCP[0].predict - BCP[0].close).toFixed(2));
            SetchangeperBCP(percen(BCP[0].predict, BCP[0].close));
            SetstatusBCP(compareStatus(BCP[0].predict, BCP[0].close));

        }
        calculate();
    }, [BCP]);
    // END DATA CALL

    return (
        <div>
            <main class="fullscreen-block" style={{ paddingTop: -50 }}>
                {isDesktopOrLaptop && <>
                    {/* <p>You are a desktop or laptop</p> */}
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
                                    <Card.Body style={{ marginTop: "-15px" }}>
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
                                                    <td><a href="/bcp" style={{color: statusBCP}}>BCP</a></td>
                                                    <td className="text-center">{(BCP[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{BCP[0].volume.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</td>
                                                    <td className="text-center"><p style={{color: statusBCP, display: "inline"}}>{changeBCP}</p></td>
                                                    <td className="text-center"><p style={{color: statusBCP, display: "inline"}}>{changeperBCP}%</p></td>
                                                    <td className="text-center"><p style={{color: statusBCP, display: "inline"}}>{(BCP[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/irpc" style={{color: statusIRPC}}>IRPC</a></td>
                                                    <td className="text-center">{(IRPC[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{IRPC[0].volume.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</td>
                                                    <td className="text-center"><p style={{color: statusIRPC, display: "inline"}}>{changeIRPC}</p></td>
                                                    <td className="text-center"><p style={{color: statusIRPC, display: "inline"}}>{changeperIRPC}%</p></td>
                                                    <td className="text-center"><p style={{color: statusIRPC, display: "inline"}}>{(IRPC[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/ptt" style={{color: statusPTT}}>PTT</a></td>
                                                    <td className="text-center">{(PTT[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{PTT[0].volume.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</td>
                                                    <td className="text-center"><p style={{color: statusPTT, display: "inline"}}>{changePTT}</p></td>
                                                    <td className="text-center"><p style={{color: statusPTT, display: "inline"}}>{changeperPTT}%</p></td>
                                                    <td className="text-center"><p style={{color: statusPTT, display: "inline"}}>{(PTT[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/susco" style={{color: statusSUSCO}}>SUSCO</a></td>
                                                    <td className="text-center">{(SUSCO[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{SUSCO[0].volume.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</td>
                                                    <td className="text-center"><p style={{color: statusSUSCO, display: "inline"}}>{changeSUSCO}</p></td>
                                                    <td className="text-center"><p style={{color: statusSUSCO, display: "inline"}}>{changeperSUSCO}%</p></td>
                                                    <td className="text-center"><p style={{color: statusSUSCO, display: "inline"}}>{(SUSCO[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/top" style={{color: statusTOP}}>TOP</a></td>
                                                    <td className="text-center">{(TOP[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{TOP[0].volume.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</td>
                                                    <td className="text-center"><p style={{color: statusTOP, display: "inline"}}>{changeTOP}</p></td>
                                                    <td className="text-center"><p style={{color: statusTOP, display: "inline"}}>{changeperTOP}%</p></td>
                                                    <td className="text-center"><p style={{color: statusTOP, display: "inline"}}>{(TOP[0].predict).toFixed(2)}</p></td>
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
                {isTabletOrMobileDevice && <>
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
                                    <Card.Body style={{ marginTop: "-15px" }}>
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
                                                    <td><a href="/bcp" style={{color: statusBCP}}>BCP</a></td>
                                                    <td className="text-center">{(BCP[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(BCP[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{BCP[0].volume}</td>
                                                    <td className="text-center"><p style={{color: statusBCP, display: "inline"}}>{changeBCP}</p></td>
                                                    <td className="text-center"><p style={{color: statusBCP, display: "inline"}}>{changeperBCP}%</p></td>
                                                    <td className="text-center"><p style={{color: statusBCP, display: "inline"}}>{(BCP[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/irpc" style={{color: statusIRPC}}>IRPC</a></td>
                                                    <td className="text-center">{(IRPC[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(IRPC[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{IRPC[0].volume}</td>
                                                    <td className="text-center"><p style={{color: statusIRPC, display: "inline"}}>{changeIRPC}</p></td>
                                                    <td className="text-center"><p style={{color: statusIRPC, display: "inline"}}>{changeperIRPC}%</p></td>
                                                    <td className="text-center"><p style={{color: statusIRPC, display: "inline"}}>{(IRPC[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/ptt" style={{color: statusPTT}}>PTT</a></td>
                                                    <td className="text-center">{(PTT[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(PTT[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{PTT[0].volume}</td>
                                                    <td className="text-center"><p style={{color: statusPTT, display: "inline"}}>{changePTT}</p></td>
                                                    <td className="text-center"><p style={{color: statusPTT, display: "inline"}}>{changeperPTT}%</p></td>
                                                    <td className="text-center"><p style={{color: statusPTT, display: "inline"}}>{(PTT[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/susco" style={{color: statusSUSCO}}>SUSCO</a></td>
                                                    <td className="text-center">{(SUSCO[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(SUSCO[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{SUSCO[0].volume}</td>
                                                    <td className="text-center"><p style={{color: statusSUSCO, display: "inline"}}>{changeSUSCO}</p></td>
                                                    <td className="text-center"><p style={{color: statusSUSCO, display: "inline"}}>{changeperSUSCO}%</p></td>
                                                    <td className="text-center"><p style={{color: statusSUSCO, display: "inline"}}>{(SUSCO[0].predict).toFixed(2)}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><a href="/top" style={{color: statusTOP}}>TOP</a></td>
                                                    <td className="text-center">{(TOP[0].open).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].close).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].high).toFixed(2)}</td>
                                                    <td className="text-center">{(TOP[0].low).toFixed(2)}</td>
                                                    <td className="text-center">{TOP[0].volume}</td>
                                                    <td className="text-center"><p style={{color: statusTOP, display: "inline"}}>{changeTOP}</p></td>
                                                    <td className="text-center"><p style={{color: statusTOP, display: "inline"}}>{changeperTOP}%</p></td>
                                                    <td className="text-center"><p style={{color: statusTOP, display: "inline"}}>{(TOP[0].predict).toFixed(2)}</p></td>
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
};

export default (Index);
