import React, { Component, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Table, Card, Row, Col } from 'react-bootstrap';
import '../component/Toggle1/toggle.css';

// Data fucntion
import { readStock, readSET } from "../component/database";

//CSS
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.css.map";
import "../black-dashboard-react-master/src/assets/css/black-dashboard-react.min.css";

const Setbar = () => {
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

    const [SET, SetSET] = useState(initStock);

    useEffect(() => {
        function data() {
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

    return (
        <main class="fullscreen">
            {isDesktopOrLaptop && <>
                {/* <p>You are a desktop or laptop</p> */}
                <div style={{ marginTop: -20, marginBottom: -30, paddingTop: 68 }}>
                    <section id="Set" class="bg-set">
                        <div class="container-fluid">
                            <Row>
                                <h1 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">SET</h1>
                                <h2 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto" style={{ color: statusSET }}>{SET[0].close.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</h2>
                                <table align="center">
                                    <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                        <div class="row" className="result" align="center" style={{ marginBottom: -15 }}>
                                            <h3 style={{ color: statusSET }}>{deffSET}</h3>
                                        </div>
                                        <div class="row" className="result" align="center">
                                            <h4 style={{ color: statusSET }}>{perSET}%</h4>
                                        </div>
                                    </div>
                                </table>
                                <table align="center" width="20%">
                                    <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>High&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperHigh }}>{SET[0].high.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperHigh }}>{perHigh}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>Low&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperLow }}>{SET[0].low.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperLow }}>{perLow}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                    </div>
                                </table>
                                <table align="center" width="20%">
                                    <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>Open&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperOpen }}>{SET[0].open.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperOpen }}>{perOpen}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>Close&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperClose }}>{SET[0].close.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperClose }}>{perClose}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                    </div>
                                </table>
                            </Row>
                        </div>
                    </section>
                </div>
                {/* {isBigScreen && <p>You also have a huge screen</p>}
                    {isTabletOrMobile && <p>You are sized like a tablet or mobile phone though</p>} */}
            </>}
            {isTabletOrMobileDevice && <>
                <div style={{ marginTop: -20, paddingTop: 80 }}>
                    <section id="Set1" class="bg-set">
                        <div class="container-fluid">
                            <Row>
                                <h1 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">SET</h1>
                                <h2 class="col-xs-auto col-sm-auto col-md-auto col-lg-auto" style={{ color: statusSET }}>{SET[0].close.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}</h2>
                                <table align="center">
                                    <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                        <div class="row" className="result" align="center" style={{ marginBottom: -15 }}>
                                            <h3 style={{ color: statusSET }}>{deffSET}</h3>
                                        </div>
                                        <div class="row" className="result" align="center">
                                            <h4 style={{ color: statusSET }}>{perSET}%</h4>
                                        </div>
                                    </div>
                                </table>
                                <table align="center" width="20%">
                                    <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>High&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperHigh }}>{SET[0].high.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperHigh }}>{perHigh}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>Low&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperLow }}>{SET[0].low.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperLow }}>{perLow}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                    </div>
                                </table>
                                <table align="center" width="20%">
                                    <div class="col-xs-auto col-sm-auto col-md-auto col-lg-auto">
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>Open&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperOpen }}>{SET[0].open.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperOpen }}>{perOpen}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                        <div class="row" align="center">
                                            <table>
                                                <td className="info"><h4>Close&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperClose }}>{SET[0].close.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}&nbsp;&nbsp;&nbsp;</h4></td>
                                                <td className="result"><h4 style={{ color: statusperClose }}>{perClose}%&nbsp;&nbsp;&nbsp;</h4></td>
                                            </table>
                                        </div>
                                    </div>
                                </table>
                            </Row>
                        </div>
                    </section>
                </div>
            </>}

            {/* <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p> */}
                {/* {isRetina && <>
                
                </>} */}
        </main>
    );
};

export default Setbar;
